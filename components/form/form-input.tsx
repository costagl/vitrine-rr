"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "./error-message";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  attempted: boolean;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  attempted,
  required = false,
  ...rest
}: FormInputProps) {
  const hasError = error && attempted;
  const inputClassName = hasError
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "";

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={hasError ? "text-red-500" : ""}>
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName}
        required={required}
        {...rest}
      />
      <ErrorMessage message={error || ""} show={hasError} />
    </div>
  );
}
