"use client"

import { useEffect, useState } from "react"
import type { StepProps } from "@/types/form"
import { FormInput } from "./form-input"
import { FormSelect } from "./form-select"
import { SubdomainInput } from "./subdomain-input"

interface Categoria {
  id: number
  titulo: string
}

export function StepStoreInfo({ formData, errors, attempted, onChange, onSelectChange, onCNPJChange }: StepProps) {
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7083/produto/listar-categoria-loja")
        const data: Categoria[] = await response.json()

        const formattedCategories = data.map((category) => ({
          value: category.id.toString(),
          label: category.titulo,
        }))
        
        setCategoryOptions(formattedCategories)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }

    fetchCategories()
  }, [])

  // console.log("categorias: ", categoryOptions)
  return (
    <div className="w-full flex-shrink-0 p-6">
      <form className="grid grid-cols-1 gap-4">
        <FormInput
          id="cnpj"
          name="cnpj"
          label="CNPJ (opcional)"
          placeholder="00.000.000/0001-00"
          value={formData.cnpj}
          onChange={onCNPJChange}
          error={errors.cnpj}
          attempted={attempted}
        />

        <FormInput
          id="nomeLoja"
          name="nomeLoja"
          label="Nome da Loja"
          placeholder="Digite o nome da sua loja"
          value={formData.nomeLoja}
          onChange={onChange}
          error={errors.nomeLoja}
          attempted={attempted}
          required
        />

        <SubdomainInput
          id="subdominio"
          name="subdominio"
          label="Endereço da sua loja"
          value={formData.subdominio}
          onChange={onChange}
          error={errors.subdominio}
          attempted={attempted}
          storeName={formData.nomeLoja}
        />

        <FormSelect
          id="categoriaLoja"
          label="Categoria de Loja"
          placeholder="Selecione a categoria"
          value={formData.categoriaLoja}
          onValueChange={(value) => onSelectChange(value, "categoriaLoja")}
          error={errors.categoriaLoja}
          attempted={attempted}
          options={categoryOptions}
        />
      </form>
    </div>
  )
}
