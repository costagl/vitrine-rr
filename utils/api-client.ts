import { getApiBaseUrl } from "@/config/api-url"
import { API_CONFIG } from "@/config/api"
import type { ApiResponse } from "@/types/api"

class ApiClient {
  private timeout: number
  private defaultHeaders: Record<string, string>
  private authToken: string | null = null

  constructor() {
    this.timeout = API_CONFIG.TIMEOUT
    this.defaultHeaders = { ...API_CONFIG.HEADERS }

    // Log da configuração em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log(`🔗 API Client configurado para: ${getApiBaseUrl()}`)
    }

    // Inicialize o token apenas no cliente, se necessário
    if (typeof window !== "undefined") {
      this.authToken = localStorage.getItem("token")
    }
  }

  private getAuthToken(): string | null {
    // Garantir que o token seja acessado apenas no lado do cliente
    if (typeof window === "undefined") return null

    if (!this.authToken) {
      try {
        this.authToken = localStorage.getItem("token")
      } catch (error) {
        console.error("❌ Erro ao acessar localStorage:", error)
      }
    }

    return this.authToken
  }

  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const token = this.getAuthToken()
    const headers = { ...this.defaultHeaders, ...(customHeaders || {}) }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")

    let data: any
    try {
      data = isJson ? await response.json() : await response.text()
    } catch (error) {
      console.error("❌ Erro ao processar resposta:", error)
      throw new Error("Erro ao processar resposta do servidor")
    }

    if (!response.ok) {
      console.error(`❌ Resposta HTTP não OK [${response.status}]:`, data)

      if (response.status === 401) {
        // TODO:
        // console.error("🚫 Erro 401: Token inválido ou expirado")
        // localStorage.removeItem("token")
        // localStorage.removeItem("refreshToken")
        // localStorage.removeItem("user")
        // throw new Error("Token inválido ou expirado. Faça login novamente.")
        throw new Error(data?.message || `Erro HTTP ${response.status}`)
      }

      throw new Error(data?.message || `Erro HTTP ${response.status}`)
    }

    return { success: true, data, message: data?.message }
  }

  private createAbortController(): AbortController {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), this.timeout)
    return controller
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = this.createAbortController()
    const fullUrl = `${getApiBaseUrl()}${endpoint}`

    console.log(`🔍 ${method}: ${fullUrl}`)

    try {
      const headers = this.getHeaders()

      const response = await fetch(fullUrl, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      })

      console.log(`✅ ${method} Response [${response.status}]: ${fullUrl}`)
      return this.handleResponse<T>(response)
    } catch (error) {
      console.error(`❌ ${method} Error: ${fullUrl}`, error)
      throw new Error("Erro de rede")
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    console.log("GET", endpoint, options)
    return this.makeRequest<T>("GET", endpoint, null, options)
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    console.log("POST", endpoint, data, options)
    return this.makeRequest<T>("POST", endpoint, data, options)
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    console.log("PUT", endpoint, data, options)
    return this.makeRequest<T>("PUT", endpoint, data, options)
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    console.log("DELETE", endpoint, options)
    return this.makeRequest<T>("DELETE", endpoint, null, options)
  }
}


// Classe de erro personalizada para a API
class ApiError extends Error {
  status: number
  errors?: string[]
  description?: string

  constructor({ message, status, errors, description }: { message: string; status: number; errors?: string[]; description?: string }) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
    this.description = description
  }
}

export const apiClient = new ApiClient()
export { ApiError }
