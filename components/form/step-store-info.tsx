"use client"

import type { StepProps } from "@/types/form"
import { FormInput } from "./form-input"
import { FormSelect } from "./form-select"
import { SubdomainInput } from "./subdomain-input"

const categoryOptions = [
  { value: "roupas", label: "Roupas e Acessórios" },
  { value: "eletronicos", label: "Eletrônicos" },
  { value: "alimentos", label: "Alimentos" },
  { value: "beleza", label: "Beleza e Cuidados Pessoais" },
  { value: "casa", label: "Casa e Decoração" },
  { value: "esportes", label: "Esportes e Lazer" },
  { value: "outros", label: "Outros" },
]

export function StepStoreInfo({ formData, errors, attempted, onChange, onSelectChange, onCNPJChange }: StepProps) {
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
          id="categoriaVenda"
          label="Categoria de Venda"
          placeholder="Selecione a categoria"
          value={formData.categoriaVenda}
          onValueChange={(value) => onSelectChange(value, "categoriaVenda")}
          error={errors.categoriaVenda}
          attempted={attempted}
          options={categoryOptions}
        />
      </form>
    </div>
  )
}
