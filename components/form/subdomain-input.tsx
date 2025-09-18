"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from "./error-message"

interface SubdomainInputProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  attempted: boolean
  storeName: string
}

export function SubdomainInput({ id, name, label, value, onChange, error, attempted, storeName }: SubdomainInputProps) {
  const hasError = error && attempted

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className={hasError ? "text-red-500" : ""}>
        {label}
      </Label>

      {/* Campo de input com preview da URL */}
      <div className="space-y-2">
        <div
          className={`flex border rounded-md overflow-hidden transition-colors ${
            hasError
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary"
          }`}
        >
          <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border-r border-gray-300">
            https://
          </span>

          <div className="relative flex-1">
            <input
              id={id}
              name={name}
              type="text"
              placeholder="minha-loja"
              value={value}
              onChange={handleInputChange}
              className={`
                w-full
                px-3 
                py-2 
                text-sm 
                bg-white 
                border-0 
                focus:outline-none 
                focus:ring-0
                ${hasError ? "text-red-900" : ""}
              `}
            />
          </div>

          <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border-l border-gray-300">
            .vitrine.com.br
          </span>
        </div>
      </div>

      <ErrorMessage message={error || ""} show={hasError} />
    </div>
  )
}
