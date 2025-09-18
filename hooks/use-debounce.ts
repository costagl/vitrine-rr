"use client"

import { useState, useEffect } from "react"

/**
 * Hook para debounce de valores
 * @param value Valor a ser debounced
 * @param delay Tempo de espera em ms
 * @returns Valor após o debounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
