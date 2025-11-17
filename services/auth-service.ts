import { apiClient } from "@/utils/api-client"
import { API_ENDPOINTS } from "@/config/api"
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/api"

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

    console.log("RESPOSTA DO LOGIN RECEBIDA:")
    console.log("- Success:", response.success)
    console.log("- Data presente:", !!response.data)
    return response.data!
  }

  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData)
    return response.data!
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      // Log do erro, mas não impede o logout local
      console.error("Erro ao fazer logout no backend:", error)
    }
  }

  static async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH)
    return response.data!
  }

  static async verifyEmail(token: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token })
  }

  static async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword })
  }

  static async validateCpfCnpj(cpf_cnpj: string): Promise<{ isValid: boolean; message?: string }> {
    const response = await apiClient.post<{ isValid: boolean; message?: string }>(
      API_ENDPOINTS.AUTH.VALIDATE_CPF_CNPJ,
      { cpf_cnpj }
    );
    return response.data!;
  }

  static async checkAuthStatus(): Promise<boolean> {
    try {
      await apiClient.get("/status")
      return true
    } catch (error) {
      return false
    }
  }
}
