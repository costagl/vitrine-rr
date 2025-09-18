"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, FileText, Shield, Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const plans: Record<string, Plan> = {
  basico: {
    id: "basico",
    name: "Básico",
    price: 29,
    description: "Ideal para iniciantes",
    features: [
      "Até 5 produtos",
      "Análises básicas",
      "Suporte por email",
      "1GB de armazenamento",
    ],
  },
  profissional: {
    id: "profissional",
    name: "Profissional",
    price: 79,
    description: "Perfeito para negócios em crescimento",
    features: [
      "Até 50 produtos",
      "Análises avançadas",
      "Suporte prioritário",
      "10GB de armazenamento",
    ],
  },
  empresarial: {
    id: "empresarial",
    name: "Empresarial",
    price: 199,
    description: "Para grandes empresas",
    features: [
      "Produtos ilimitados",
      "Análises em tempo real",
      "Suporte 24/7",
      "100GB de armazenamento",
    ],
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plano") || "basico";
  const selectedPlan = plans[planId] || plans.basico;

  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!planId || !plans[planId]) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Plano não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O plano selecionado não foi encontrado. Por favor, volte à página de
            planos e selecione um plano válido.
          </p>
          <Button asChild>
            <Link href="/planos">Voltar aos Planos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular processamento do pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Pagamento processado com sucesso!");
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground">Plano selecionado:</span>
            <Badge variant="default" className="text-sm">
              {selectedPlan.name} - R$ {selectedPlan.price}/mês
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Complete seus dados para ativar seu plano
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>Informações para sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input
                        id="nome"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados da Empresa */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa (Opcional)</CardTitle>
                  <CardDescription>
                    Informações para emissão de nota fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="empresa">Nome da empresa</Label>
                      <Input id="empresa" placeholder="Nome da sua empresa" />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                  <CardDescription>Escolha como deseja pagar</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cartao" id="cartao" />
                      <CreditCard className="h-5 w-5" />
                      <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                        Cartão de Crédito
                        <span className="block text-sm text-muted-foreground">
                          Visa, Mastercard, Elo
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pix" id="pix" />
                      <Smartphone className="h-5 w-5" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        PIX
                        <span className="block text-sm text-muted-foreground">
                          Pagamento instantâneo
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <FileText className="h-5 w-5" />
                      <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                        Boleto Bancário
                        <span className="block text-sm text-muted-foreground">
                          Vencimento em 3 dias úteis
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Formulário do Cartão */}
                  {paymentMethod === "cartao" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="numero-cartao">Número do cartão</Label>
                        <Input
                          id="numero-cartao"
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="validade">Validade</Label>
                          <Input id="validade" placeholder="MM/AA" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="000" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nome-cartao">Nome no cartão</Label>
                        <Input
                          id="nome-cartao"
                          placeholder="Nome como está no cartão"
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Atualizar o botão de finalizar compra para mostrar o nome do plano */}
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processando..."
                  : `Ativar Plano ${selectedPlan.name} - R$ ${selectedPlan.price}/mês`}
              </Button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlan.description}
                    </p>
                  </div>
                  <Badge variant="secondary">Mensal</Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Recursos inclusos:</h4>
                  <ul className="space-y-1">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Impostos</span>
                    <span>Inclusos</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {selectedPlan.price}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mt-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Pagamento 100% seguro e criptografado
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
