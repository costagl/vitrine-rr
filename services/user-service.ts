import { apiClient } from "@/utils/api-client"
import { API_ENDPOINTS } from "@/config/api"

export interface UserProfile {
  id: string
  nome: string
  email: string
  cpf: string
  telefone: string
  dataNascimento: string
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileRequest {
  nome?: string
  telefone?: string
  dataNascimento?: string
}

export class UserService {
  static async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE)
    return response.data!
  }

  static async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>(API_ENDPOINTS.USER.UPDATE_PROFILE, data)
    return response.data!
  }

  static async deleteAccount(): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT)
  }
}
