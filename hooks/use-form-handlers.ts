import type React from "react"
import type { FormData, FormErrors } from "@/types/form"
import { formatCPFOrCNPJ, formatPhoneNumber } from "@/utils/formatters"
// import { generateSubdomainFromStoreName } from "@/utils/subdomain-utils"

export function useFormHandlers(
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (setErrors) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // TODO:
    // Se o nome da loja for alterado e o subdomínio estiver vazio, sugerir um subdomínio
    // if (name === "nomeLoja" && value && !formData.subdominio) {
    //   const suggestedSubdomain = generateSubdomainFromStoreName(value)
    //   if (suggestedSubdomain) {
    //     setFormData((prev) => ({ ...prev, subdominio: suggestedSubdomain }))
    //   }
    // }
  }

  const handleCPFOrCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPFOrCNPJ(e.target.value)
    setFormData((prev) => ({ ...prev, cpf_cnpj: formattedValue }))
    setErrors((prev) => ({ ...prev, cpf_cnpj: "" }))
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, celular: formattedValue }))
    setErrors((prev) => ({ ...prev, celular: "" }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  return {
    handleChange,
    handleCPFOrCNPJChange,
    handlePhoneChange,
    handleSelectChange,
  }
}
