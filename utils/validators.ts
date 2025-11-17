import type { FormData, FormErrors } from "@/types/form"
import { validateSubdomain } from "@/utils/subdomain-utils"
import { StoreService } from "@/services/store-service"
import { AuthService } from "@/services/auth-service"  
import { isPasswordValid } from "@/components/form/password-validation"

export const validateSlide1 = async (formData: FormData): Promise<FormErrors> => {
  const errors: FormErrors = {}

  if (!formData.cpf_cnpj) {
    errors.cpf_cnpj = "CPF/CNPJ é obrigatório"
  }

  const response = await AuthService.validateCpfCnpj(formData.cpf_cnpj);
  if (!response.isValid) {
    errors.cpf_cnpj = response.message || "CPF inválido";
  }
  
  if (!formData.nome) {
    errors.nome = "Nome é obrigatório"
  }

  if (!formData.celular) {
    errors.celular = "Celular é obrigatório"
  } else if (formData.celular.replace(/\D/g, "").length < 10) {
    errors.celular = "Celular inválido"
  }

  if (!formData.dataNascimento) {
    errors.dataNascimento = "Data de nascimento é obrigatória"
  }

  return errors
}

export const validateSlide2 = async (formData: FormData): Promise<FormErrors> => {
  const errors: FormErrors = {}

  console.log("🔍 Iniciando validação do slide 2 com dados:", {
    nomeLoja: formData.nomeLoja,
    subdominio: formData.subdominio,
    categoriaLoja: formData.categoriaLoja,
  })

  if (!formData.nomeLoja) {
    errors.nomeLoja = "Nome da loja é obrigatório"
  }

  if (!formData.subdominio) {
    errors.subdominio = "Subdomínio é obrigatório"
  } else {
    const subdomainError = validateSubdomain(formData.subdominio)
    if (subdomainError) {
      errors.subdominio = subdomainError
      console.log("❌ Erro de validação básica do subdomínio:", subdomainError)
    }
  }

  // Verificar disponibilidade do subdomínio se passou na validação básica
  if (!errors.subdominio && formData.subdominio) {
    try {
      console.log("🔍 Verificando disponibilidade do subdomínio:", formData.subdominio)

      const response = await StoreService.verifySubdomainAvailability(formData.subdominio)

      console.log("📡 Resposta da API de verificação:", {
        disponivel: response.disponivel,
        message: response.message,
      })

      if (response.disponivel === true) {
        console.log("✅ Subdomínio disponível!")
      } else if (response.disponivel === false) {
        errors.subdominio = "Este subdomínio já está em uso"
        console.log("❌ Subdomínio não disponível")
      } else {
        console.log("⚠️ Resposta inesperada da API - disponivel não é boolean:", response.disponivel)
        errors.subdominio = "Erro ao verificar disponibilidade do subdomínio"
      }
    } catch (error) {
      console.error("❌ Erro ao verificar disponibilidade do subdomínio:", error)
      errors.subdominio = "Erro ao verificar disponibilidade do subdomínio"
    }
  }

  if (!formData.categoriaLoja) {
    errors.categoriaLoja = "Categoria de loja é obrigatória"
  }

  console.log("📋 Resultado final da validação do slide 2:", {
    hasErrors: Object.keys(errors).length > 0,
    errors: errors,
  })

  return errors
}

export const validateSlide3 = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!formData.email) {
    errors.email = "Email é obrigatório"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email inválido"
  }

  if (!formData.senha) {
    errors.senha = "Senha é obrigatória"
  } else if (!isPasswordValid(formData.senha)) {
    errors.senha = "A senha não atende aos requisitos de segurança"
  }

  if (!formData.confirmarSenha) {
    errors.confirmarSenha = "Confirmação de senha é obrigatória"
  } else if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas não coincidem"
  }

  return errors
}
