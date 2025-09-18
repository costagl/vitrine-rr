import type React from "react"

export interface FormData {
  cpf: string
  nome: string
  celular: string
  dataNascimento: string
  cnpj: string
  nomeLoja: string
  subdominio: string
  categoriaVenda: string
  email: string
  senha: string
  confirmarSenha: string
}

export interface FormErrors {
  [key: string]: string
}

export interface StepProps {
  formData: FormData
  errors: FormErrors
  attempted: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (value: string, field: string) => void
  onCPFChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCNPJChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SubdomainCheckResult {
  available: boolean
  message: string
  checked: boolean
}
