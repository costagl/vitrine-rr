"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/types/form";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { SubdomainInput } from "./subdomain-input";
import { CategoryService } from "@/services/category-service";
import type { CategoryStore } from "@/types/category";

export function StepStoreInfo({
  formData,
  errors,
  attempted,
  onChange,
  onSelectChange,
}: StepProps) {
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    // Função assíncrona dentro do useEffect
    const fetchCategories = async () => {
      try {
        const categorias: CategoryStore[] =
          await CategoryService.listarCategoriasLoja(); // Espera a resposta da API
        const formattedCategories = categorias.map((category) => ({
          value: category.id.toString(),
          label: category.titulo,
        }));
        setCategoryOptions(formattedCategories); // Atualiza o estado com os dados formatados
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories(); // Chama a função para buscar as categorias
  }, []);

  return (
    <div className="w-full flex-shrink-0 p-6">
      <form className="grid grid-cols-1 gap-4">
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
  );
}
