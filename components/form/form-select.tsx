"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage } from "./error-message";

interface FormSelectProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  attempted: boolean;
  options: { value: string; label: string }[];
}

export function FormSelect({
  id,
  label,
  placeholder,
  value,
  onValueChange,
  error,
  attempted,
  options,
}: FormSelectProps) {
  const hasError = !!(error && attempted);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={hasError ? "text-red-500" : ""}>
        {label}
      </Label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger id={id} className={hasError ? "border-red-500" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage message={error || ""} show={hasError} />
    </div>
  );
}
