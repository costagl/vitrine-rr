"use client"

import { Check, X } from "lucide-react"

interface PasswordValidationProps {
  password: string
  showValidation: boolean
}

interface ValidationRule {
  id: string
  label: string
  test: (password: string) => boolean
}

const validationRules: ValidationRule[] = [
  {
    id: "length",
    label: "Pelo menos 8 caracteres",
    test: (password: string) => password.length >= 8,
  },
  {
    id: "digit",
    label: "Pelo menos um dígito (0-9)",
    test: (password: string) => /\d/.test(password),
  },
  {
    id: "uppercase",
    label: "Pelo menos uma letra maiúscula (A-Z)",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "Pelo menos uma letra minúscula (a-z)",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: "special",
    label: "Pelo menos um caractere especial (!@#$%^&*)",
    test: (password: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
]

export function PasswordValidation({ password, showValidation }: PasswordValidationProps) {
  if (!showValidation) return null

  return (
    <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Requisitos da senha:</h4>
      <div className="space-y-2">
        {validationRules.map((rule) => {
          const isValid = rule.test(password)
          const hasStartedTyping = password.length > 0

          let textColor = "text-gray-500" // Cor padrão (cinza)
          let iconColor = "text-gray-400"
          let Icon = X

          if (hasStartedTyping) {
            if (isValid) {
              textColor = "text-primary" // Cor de destaque (anil/índigo)
              iconColor = "text-primary"
              Icon = Check
            } else {
              textColor = "text-red-500" // Cor de erro (vermelho)
              iconColor = "text-red-500"
              Icon = X
            }
          }

          return (
            <div key={rule.id} className={`flex items-center gap-2 text-sm transition-colors ${textColor}`}>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  hasStartedTyping
                    ? isValid
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-red-500 bg-red-500"
                    : "border-gray-400"
                }`}
              >
                {hasStartedTyping && <Icon className={`h-3 w-3 ${isValid ? "text-white" : "text-white"}`} />}
              </div>
              <span className="font-medium">{rule.label}</span>
            </div>
          )
        })}
      </div>

      {/* Indicador de força da senha */}
      {password.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Força da senha:</span>
            <span
              className={`text-xs font-medium ${
                getPasswordStrength(password) === "forte"
                  ? "text-indigo-600"
                  : getPasswordStrength(password) === "média"
                    ? "text-yellow-600"
                    : "text-red-500"
              }`}
            >
              {getPasswordStrength(password)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                getPasswordStrength(password) === "forte"
                  ? "bg-indigo-600 w-full"
                  : getPasswordStrength(password) === "média"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-red-500 w-1/3"
              }`}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

function getPasswordStrength(password: string): "fraca" | "média" | "forte" {
  const validCount = validationRules.filter((rule) => rule.test(password)).length

  if (validCount >= 5) return "forte"
  if (validCount >= 3) return "média"
  return "fraca"
}

// Função para validar se a senha atende a todos os critérios
export function isPasswordValid(password: string): boolean {
  return validationRules.every((rule) => rule.test(password))
}
