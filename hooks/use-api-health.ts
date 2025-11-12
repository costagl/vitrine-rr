"use client"

import { useState, useEffect, useCallback } from "react"
import { getApiUrl } from "@/config/api-url"

interface ApiHealthStatus {
  isOnline: boolean
  isLoading: boolean
  lastChecked: Date | null
  error: string | null
}

// ALTERAÇÃO: Função auxiliar para iniciar o estado.
// Permite definir isLoading: true fora do useEffect.
const getInitialStatus = (): ApiHealthStatus => ({
  isOnline: false,
  isLoading: true, 
  lastChecked: null,
  error: null,
})

export function useApiHealth() {
  // ALTERAÇÃO: Uso de função de inicialização síncrona (lazy initial state).
  const [status, setStatus] = useState<ApiHealthStatus>(getInitialStatus)

  // ALTERAÇÃO: Adicionado parâmetro 'isInitialCheck' para controlar o setStatus.
  const checkApiHealth = useCallback(async (isInitialCheck = false) => {
    // Evita o setStatus(isLoading: true) se for o check inicial, 
    // pois o estado já começou como true.
    if (!isInitialCheck) {
        setStatus((prev) => ({ ...prev, isLoading: true, error: null }))
    }

    try {
      const healthUrl = getApiUrl("usuario/health")

      const response = await fetch(healthUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000),
      })

      const isOnline = response.ok

      setStatus({
        isOnline,
        isLoading: false,
        lastChecked: new Date(),
        error: isOnline ? null : `API respondeu com status ${response.status}`,
      })
    } catch (error) {
      setStatus({
        isOnline: false,
        isLoading: false,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }
  }, [])

  useEffect(() => {
    // A chamada inicial é feita de forma assíncrona, sem fazer setState diretamente dentro do useEffect
    const initializeApiCheck = async () => {
      await checkApiHealth(true)
    }
    initializeApiCheck()

    const interval = setInterval(() => checkApiHealth(false), 30000)

    return () => clearInterval(interval)
  }, [checkApiHealth])

  return {
    ...status,
    checkApiHealth,
  }
}
