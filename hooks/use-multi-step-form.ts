"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { FormData, FormErrors } from "@/types/form";
import {
  validateSlide1,
  validateSlide2,
  validateSlide3,
} from "@/utils/validators";
import { AuthService } from "@/services/auth-service";
import { RegisterRequest } from "@/types/api";
import { ApiError } from "@/utils/api-client";

const initialFormData: FormData = {
  cpf_cnpj: "",
  nome: "",
  celular: "",
  dataNascimento: "",
  nomeLoja: "",
  subdominio: "",
  categoriaLoja: "",
  email: "",
  senha: "",
  confirmarSenha: "",
};

export function useMultiStepForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setErrors({});
    setAttempted(false);
  };

  const validateCurrentStep = async () => {
    let stepErrors: FormErrors = {};

    if (step === 1) {
      stepErrors = await validateSlide1(formData);
    } else if (step === 2) {
      stepErrors = await validateSlide2(formData);
    } else if (step === 3) {
      stepErrors = validateSlide3(formData);
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = async () => {
    setAttempted(true);
    const isValid = await validateCurrentStep();

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
      setAttempted(false);
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    setAttempted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    const isValid = await validateCurrentStep();

    if (!isValid) {
      toast({
        title: "Campos obrigatórios",
        description:
          "Por favor, preencha todos os campos obrigatórios corretamente.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    function formatDateToDDMMYYYY(dateString: string) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    try {
      const registerData: RegisterRequest = {
        cpf_cnpj: formData.cpf_cnpj.replace(/\D/g, ""),
        nome: formData.nome,
        telefone: formData.celular.replace(/\D/g, ""),
        dataNascimento: formatDateToDDMMYYYY(formData.dataNascimento),
        nomeLoja: formData.nomeLoja,
        subdominio: formData.subdominio,
        idCategoriaLoja: formData.categoriaLoja,
        email: formData.email,
        senha: formData.senha,
        confirmarSenha: formData.confirmarSenha,
      };
      const response = await AuthService.register(registerData);

      console.log("Cadastro realizado com sucesso:", response);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a página de login.",
        duration: 3000,
      });

      resetForm();
      setTimeout(() => {
        router.push("/login");
      }, 50);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);

      // Verificação para identificar se o erro é do tipo ApiError
      if (error instanceof ApiError) {
        // Extração da mensagem de erro da API (errors, description ou message)
        const errorMessage =
          error.errors?.join(", ") || error.description || error.message;

        // Exibe a mensagem extraída no toast
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        // Caso o erro não seja da API, exibe uma mensagem genérica
        toast({
          title: "Erro inesperado",
          description: "Não foi possível realizar o cadastro.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    formData,
    errors,
    attempted,
    isSubmitting,
    setFormData,
    setErrors,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
