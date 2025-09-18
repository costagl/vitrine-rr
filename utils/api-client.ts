// import { getApiBaseUrl } from "@/config/api-url"
// import { API_CONFIG } from "@/config/api"
// import type { ApiResponse } from "@/types/api"

// class ApiClient {
//   private timeout: number
//   private defaultHeaders: Record<string, string>

//   constructor() {
//     this.timeout = API_CONFIG.TIMEOUT
//     this.defaultHeaders = { ...API_CONFIG.HEADERS }

//     // Log da configuração em desenvolvimento
//     if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
//       console.log(`🔗 API Client configurado para: ${getApiBaseUrl()}`)
//     }
//   }

//   private getAuthToken(): string | null {
//     if (typeof window === "undefined") {
//       return null;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("⚠️ Token não encontrado no localStorage");
//         return null;
//       }
//       return token;
//     } catch (error) {
//       console.error("❌ Erro ao acessar localStorage:", error);
//       return null;
//     }
//   }

//   private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
//     const headers = { ...this.defaultHeaders, ...customHeaders }

//     const token = this.getAuthToken()
//     console.log("🔍 VERIFICANDO TOKEN PARA REQUISIÇÃO:")
//     console.log("Token encontrado:", !!token)

//     if (token) {
//       console.log("Token:", token)

//       headers.Authorization = `Bearer ${token}`
//       console.log("🔐 Header Authorization adicionado:", `Bearer ${token.substring(0, 20)}...`)
//     } else {
//       console.warn("⚠️ NENHUM TOKEN ENCONTRADO NO LOCALSTORAGE")

//       // Verificar o que tem no localStorage
//       const allKeys = Object.keys(localStorage)
//       console.log("- Valor da chave 'token':", localStorage.getItem("token"))
//     }
//     return headers
//   }

//   private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
//     const contentType = response.headers.get("content-type")
//     const isJson = contentType?.includes("application/json")

//     let data: any
//     try {
//       data = isJson ? await response.json() : await response.text()
//       console.log("📦 Dados brutos da resposta:", data)
//     } catch (error) {
//       console.error("❌ Erro ao processar resposta:", error)
//       throw new Error("Erro ao processar resposta do servidor")
//     }

//     if (!response.ok) {
//       console.error(`❌ Resposta HTTP não OK [${response.status}]:`, data)

//       // Tratamento específico para erro 401
//       if (response.status === 401) {
//         console.error("🚫 Erro 401: Token inválido ou expirado")
//         // Limpar token inválido do localStorage
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("token")
//           localStorage.removeItem("refreshToken")
//           localStorage.removeItem("user")
//         }
//         throw new Error("Token de autenticação inválido ou expirado. Faça login novamente.")
//       }

//       throw new Error(data?.message || `Erro HTTP ${response.status}`)
//     }

//     const apiResponse = {
//       success: true,
//       data,
//       message: data?.message,
//     }

//     console.log("📋 ApiResponse formatada:", apiResponse)
//     return apiResponse
//   }

//   private createAbortController(): AbortController {
//     const controller = new AbortController()
//     setTimeout(() => controller.abort(), this.timeout)
//     return controller
//   }

//   async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
//     const controller = this.createAbortController()
//     const fullUrl = `${getApiBaseUrl()}${endpoint}`

//     console.log(`🔍 GET: ${fullUrl}`)

//     try {
//       const headers = this.getHeaders()
//       console.log("📋 Headers da requisição GET:", headers)

//       const response = await fetch(fullUrl, {
//         method: "GET",
//         headers,
//         signal: controller.signal,
//         ...options,
//       })

//       console.log(`✅ GET Response [${response.status}]: ${fullUrl}`)
//       return this.handleResponse<T>(response)
//     } catch (error) {
//       console.error(`❌ GET Error: ${fullUrl}`, error)
//       if (error instanceof Error) {
//         throw error
//       }
//       throw new Error("Erro de rede")
//     }
//   }

//   async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
//     const controller = this.createAbortController()
//     const fullUrl = `${getApiBaseUrl()}${endpoint}`

//     console.log(`📤 POST: ${fullUrl}`, data ? { body: data } : { body: "sem dados" })

//     try {
//       const headers = this.getHeaders()
//       console.log("📋 Headers da requisição POST:", headers)

//       const response = await fetch(fullUrl, {
//         method: "POST",
//         headers,
//         body: data ? JSON.stringify(data) : undefined,
//         signal: controller.signal,
//         ...options,
//       })

//       console.log(`✅ POST Response [${response.status}]: ${fullUrl}`)
//       return this.handleResponse<T>(response)
//     } catch (error) {
//       console.error(`❌ POST Error: ${fullUrl}`, error)
//       if (error instanceof Error) {
//         throw error
//       }
//       throw new Error("Erro de rede")
//     }
//   }

//   async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
//     const controller = this.createAbortController()
//     const fullUrl = `${getApiBaseUrl()}${endpoint}`

//     console.log(`📝 PUT: ${fullUrl}`, data ? { body: data } : { body: "sem dados" })

//     try {
//       const headers = this.getHeaders()
//       console.log("📋 Headers da requisição PUT:", headers)

//       const response = await fetch(fullUrl, {
//         method: "PUT",
//         headers,
//         body: data ? JSON.stringify(data) : undefined,
//         signal: controller.signal,
//         ...options,
//       })

//       console.log(`✅ PUT Response [${response.status}]: ${fullUrl}`)
//       return this.handleResponse<T>(response)
//     } catch (error) {
//       console.error(`❌ PUT Error: ${fullUrl}`, error)
//       if (error instanceof Error) {
//         throw error
//       }
//       throw new Error("Erro de rede")
//     }
//   }

//   async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
//     const controller = this.createAbortController()
//     const fullUrl = `${getApiBaseUrl()}${endpoint}`

//     console.log(`🗑️ DELETE: ${fullUrl}`)

//     try {
//       const headers = this.getHeaders()
//       console.log("📋 Headers da requisição DELETE:", headers)

//       const response = await fetch(fullUrl, {
//         method: "DELETE",
//         headers,
//         signal: controller.signal,
//         ...options,
//       })

//       console.log(`✅ DELETE Response [${response.status}]: ${fullUrl}`)
//       return this.handleResponse<T>(response)
//     } catch (error) {
//       console.error(`❌ DELETE Error: ${fullUrl}`, error)
//       if (error instanceof Error) {
//         throw error
//       }
//       throw new Error("Erro de rede")
//     }
//   }
// }

// // Classe de erro personalizada para a API
// class CustomApiError extends Error {
//   public status: number;
//   public errors?: string[];
//   public description?: string; 

//   constructor({ message, status, errors, description }: { message: string; status: number; errors?: string[]; description?: string }) {
//     super(message);
//     this.name = "CustomApiError";
//     this.status = status;
//     this.errors = errors;
//     this.description = description;
//   }
// }


// // Instância singleton do cliente da API
// export const apiClient = new ApiClient()
// export { CustomApiError as ApiError }

import { getApiBaseUrl } from "@/config/api-url"
import { API_CONFIG } from "@/config/api"
import type { ApiResponse } from "@/types/api"

class ApiClient {
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor() {
    this.timeout = API_CONFIG.TIMEOUT
    this.defaultHeaders = { ...API_CONFIG.HEADERS }

    // Log da configuração em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log(`🔗 API Client configurado para: ${getApiBaseUrl()}`)
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null

    try {
      return localStorage.getItem("token") || null
    } catch (error) {
      console.error("❌ Erro ao acessar localStorage:", error)
      return null
    }
  }

  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const token = this.getAuthToken()
    const headers = { ...this.defaultHeaders, ...(customHeaders || {}) }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    } else {
      console.warn("⚠️ Nenhum token encontrado no localStorage")
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
      console.log(localStorage.getItem("token"))

      if (response.status === 401) {
        console.error("🚫 Erro 401: Token inválido ou expirado")
        // localStorage.removeItem("token")
        // localStorage.removeItem("refreshToken")
        // localStorage.removeItem("user")
        throw new Error("Token inválido ou expirado. Faça login novamente.")
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
    return this.makeRequest<T>("GET", endpoint, null, options)
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>("POST", endpoint, data, options)
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>("PUT", endpoint, data, options)
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
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
