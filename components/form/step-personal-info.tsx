"use client";

import type { StepProps } from "@/types/form";
import { FormInput } from "./form-input";

export function StepPersonalInfo({
  formData,
  errors,
  attempted,
  onChange,
  onCPFOrCNPJChange,
  onPhoneChange,
}: StepProps) {
  return (
    <div className="w-full flex-shrink-0 p-6">
      <form className="space-y-4">
        <FormInput
          id="cpf_cnpj"
          name="cpf_cnpj"
          label="CPF ou CNPJ"
          placeholder="000.000.000-00"
          value={formData.cpf_cnpj}
          onChange={onCPFOrCNPJChange}
          error={errors.cpf_cnpj}
          attempted={attempted}
          required
        />

        <FormInput
          id="nome"
          name="nome"
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          value={formData.nome}
          onChange={onChange}
          error={errors.nome}
          attempted={attempted}
          required
        />

        <FormInput
          id="celular"
          name="celular"
          label="Celular"
          placeholder="(99) 9 9999-9999"
          value={formData.celular}
          onChange={onPhoneChange}
          error={errors.celular}
          attempted={attempted}
          required
        />

        <FormInput
          id="dataNascimento"
          name="dataNascimento"
          label="Data de Nascimento"
          type="date"
          value={formData.dataNascimento}
          onChange={onChange}
          error={errors.dataNascimento}
          attempted={attempted}
          required
          min="1900-01-01"
          max="2099-12-31"
        />
      </form>
    </div>
  );
}
