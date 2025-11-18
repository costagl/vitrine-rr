"use client";

import type { StepProps } from "@/types/form";
import { FormInput } from "./form-input";
import { PasswordValidation } from "./password-validation";

export function StepCredentials({ formData, errors, attempted, onChange }: StepProps) {
  return (
    <div className="w-full flex-shrink-0 p-6">
      <form className="grid grid-cols-1 gap-4">
        <FormInput
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          attempted={attempted}
          required
        />

        <FormInput
          id="senha"
          name="senha"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={formData.senha}
          onChange={onChange}
          error={errors.senha}
          attempted={attempted}
          required
        />

        <FormInput
          id="confirmarSenha"
          name="confirmarSenha"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          value={formData.confirmarSenha}
          onChange={onChange}
          error={errors.confirmarSenha}
          attempted={attempted}
          required
        />

        {formData.senha.length > 0 && (
          <PasswordValidation password={formData.senha} showValidation={true} />
        )}
      </form>
    </div>
  );
}
