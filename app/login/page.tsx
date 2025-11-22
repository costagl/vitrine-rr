"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useRememberMe } from "@/hooks/use-remember-me";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckboxField } from "@/components/form/checkbox-field";
import Navbar from "@/components/navbar";
import { AuthService } from "@/services/auth-service";
import type { LoginRequest } from "@/types/api";
import { ApiError } from "@/utils/api-client";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const {
    rememberMe,
    rememberedEmail,
    handleRememberMeChange,
    saveEmailIfRemembered,
  } = useRememberMe();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  // Carregar email lembrado quando o componente montar
  useEffect(() => {
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
    }
  }, [rememberedEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      senha: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isDevLogin = formData.email === "Dev1@email.com" && formData.senha === "Dev1@email.com";

    if (isDevLogin == true) {
      // console.log("🔒 Login de desenvolvimento detectado.");

      // Simulação de resposta de login para o desenvolvimento
      const simulatedResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva8O1byBvZSBXZWJzY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.Cn0h9UN28EjBaDSjbsMYHYHG_vtF4pa7sHUE5qXuyD0",
        refreshToken: "refresh-token-simulado",
        expiresIn: 3600,
        user: {
          id: "1",
          cpfCnpj: "123.456.789-00",
          nome: "Gabriel da Silva",
          email: formData.email,
          loja: {
            id: "101",
            nome: "Loja Exemplo",
            categoria: "Vestuário",
            subdominio: "lojaexemplo"
          }
        },
      };

      // Salvar email se "Lembrar de mim" estiver marcado
      if (rememberMe) {
        saveEmailIfRemembered(formData.email);
      }

      // Atualiza contexto de autenticação com os dados simulados
      login(simulatedResponse.token, simulatedResponse.refreshToken, simulatedResponse.user);

      toast({
        title: "Login de desenvolvimento realizado com sucesso!",
        description: rememberMe
          ? "Você será lembrado na próxima visita."
          : "Você será redirecionado para a página inicial.",
        duration: 3000,
      });

      resetForm();
      setTimeout(() => router.push("/"), 0);
    }
    else {
      try {
        // Organiza os dados de login do formulário
        const credentials: LoginRequest = {
          email: formData.email,
          senha: formData.senha,
          rememberMe: rememberMe,
        };

        const response = await AuthService.login(credentials); // Realiza o Login

        // Salvar email se "Lembrar de mim" estiver marcado
        if (rememberMe) {
          saveEmailIfRemembered(formData.email);
        }

        // Atualiza contexto de autenticação
        login(response.token, response.refreshToken, response.user);

        toast({
          title: "Login realizado com sucesso!",
          description: rememberMe
            ? "Você será lembrado na próxima visita."
            : "Você será redirecionado para a página inicial.",
          duration: 3000,
        });

        resetForm();
        setTimeout(() => router.push("/"), 0);
      } catch (error) {
        console.error("Erro ao fazer login:", error);

        if (error instanceof ApiError) {
          toast({
            title: "Erro ao entrar",
            description: error.message,
            variant: "destructive",
            duration: 5000,
          });
        } else {
          toast({
            title: "Erro ao entrar",
            description: (error as Error).message,
            variant: "destructive",
            duration: 5000,
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Entrar</CardTitle>
            <CardDescription>
              Acesse sua conta para gerenciar sua loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Checkbox Lembrar de mim */}
              <div className="flex items-center justify-between">
                <CheckboxField
                  id="rememberMe"
                  name="rememberMe"
                  label="Lembrar de mim"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  description="Mantenha-me conectado neste dispositivo"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
