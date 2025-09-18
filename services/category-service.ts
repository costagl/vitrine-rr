import { apiClient } from "@/utils/api-client"
import { API_ENDPOINTS } from "@/config/api"
import type { Category } from "@/types/category"

class CategoryService {
  async listarCategorias(): Promise<Category[]> {
    try {
      const response = await apiClient.get<Category[]>(API_ENDPOINTS.PRODUTO.LISTAR_CATEGORIA)
      
      if (!response || !Array.isArray(response)) {
        console.error("Resposta inválida da API:", response)
        throw new Error("Resposta inválida da API")
      }

      return response
    } catch (error) {
      console.error("Erro ao listar categorias:", error)
      throw error
    }
  }
}

export const categoryService = new CategoryService() 