"use client"

import { useState, useEffect } from "react"
import { getApiUrl } from "@/config/api-url"

interface ApiHealthStatus {
  isOnline: boolean
  isLoading: boolean
  lastChecked: Date | null
  error: string | null
}

export function useApiHealth() {
  const [status, setStatus] = useState<ApiHealthStatus>({
    isOnline: false,
    isLoading: true,
    lastChecked: null,
    error: null,
  })

  const checkApiHealth = async () => {
    setStatus((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const healthUrl = getApiUrl("usuario/health")
      // console.log("🔍 Verificando saúde da API em:", healthUrl)

      const response = await fetch(healthUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Timeout de 5 segundos para health check
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
  }

  useEffect(() => {
    // Verificar status da API ao montar o componente
    checkApiHealth()

    // Verificar a cada 30 segundos
    const interval = setInterval(checkApiHealth, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    ...status,
    checkApiHealth,
  }
}
