"use client"

import { useApiHealth } from "@/hooks/use-api-health"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Wifi, WifiOff } from "lucide-react"

interface ApiStatusIndicatorProps {
  showDetails?: boolean
}

export function ApiStatusIndicator({ showDetails = false }: ApiStatusIndicatorProps) {
  const { isOnline, isLoading, lastChecked, error, checkApiHealth } = useApiHealth()

  if (!showDetails) {
    return (
      <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
        {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
        {isOnline ? "API Online" : "API Offline"}
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2 p-2 border rounded-md bg-card">
      <div className="flex items-center gap-2">
        {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
        <span className="text-sm font-medium">{isOnline ? "API Online" : "API Offline"}</span>
      </div>

      {lastChecked && (
        <span className="text-xs text-muted-foreground">Última verificação: {lastChecked.toLocaleTimeString()}</span>
      )}

      {error && (
        <span className="text-xs text-red-500" title={error}>
          Erro: {error.length > 30 ? `${error.substring(0, 30)}...` : error}
        </span>
      )}

      {/* LINHA CORRIGIDA: Envolver checkApiHealth em uma função anônima () => */}
      <Button variant="ghost" size="sm" onClick={() => checkApiHealth()} disabled={isLoading} className="h-6 w-6 p-0">
        <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </div>
  )
}