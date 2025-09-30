// 🔗 CONFIGURAÇÃO CENTRALIZADA DA API
export const API_BASE_URL = "https://localhost:7083"

// Função para obter a URL base da API
export const getApiBaseUrl = (): string => {
  // Prioriza a variável de ambiente se estiver definida
  const useUrl = process.env.NEXT_PUBLIC_USE_API_URL === 'true'
  const apiUrl = "https://b28db93386e5.ngrok-free.app"
  if (useUrl) {
    console.log("🌍 Usando URL da variável de ambiente:", apiUrl)
    return apiUrl
  }
  // Caso contrário, usa a URL configurada acima
  console.log("🔗 Usando URL configurada:", API_BASE_URL)
  return API_BASE_URL
}

// Função para verificar se a API está configurada
export const isApiConfigured = (): boolean => {
  const url = getApiBaseUrl()
  return !!url && url !== ""
}

// Função para obter URL completa de um endpoint
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl()
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}

// Log da configuração atual (apenas em desenvolvimento)
if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
  console.log("🔧 API URL configurada:", getApiBaseUrl())
}
