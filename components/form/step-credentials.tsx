"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import { FormInput } from "./form-input";
import { PasswordValidation } from "./password-validation";
import { Eye, EyeOff } from "lucide-react";

export function StepCredentials({ formData, errors, attempted, onChange }: StepProps) {

  // Comportamento de mostrar/esconder Senha e ConfirmarSenha
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const toggleSenhaVisibility = () => {
    setShowSenha(!showSenha);
  };

  const toggleConfirmarSenhaVisibility = () => {
    setShowConfirmarSenha(!showConfirmarSenha);
  };

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

        <div className="relative">
          <FormInput
            id="senha"
            name="senha"
            label="Senha"
            type={showSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={onChange}
            error={errors.senha}
            attempted={attempted}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-[2.75rem] opacity-75 hover:opacity-100 text-gray-500 cursor-pointer"
            onClick={toggleSenhaVisibility}
            aria-label="Mostrar/Esconder Senha"
          >
            {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <FormInput
            id="confirmarSenha"
            name="confirmarSenha"
            label="Confirmar Senha"
            type={showConfirmarSenha ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={onChange}
            error={errors.confirmarSenha}
            attempted={attempted}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-[2.75rem] opacity-75 hover:opacity-100 text-gray-500 cursor-pointer"
            onClick={toggleConfirmarSenhaVisibility}
            aria-label="Mostrar/Esconder Senha"
          >
            {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {formData.senha.length > 0 && (
          <PasswordValidation password={formData.senha} showValidation={true} />
        )}
      </form>
    </div>
  );
}
