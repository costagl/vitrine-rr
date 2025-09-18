import useSWR from "swr"
import { toast } from "sonner"
import { apiClient } from "@/utils/api-client"
import { API_ENDPOINTS } from "@/config/api"
import type { ProductCategory } from "@/types/product"

interface CategoryResponse {
  id: number
  titulo: string
  imagem: string
  produto: any[]
}

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<ProductCategory[]>(
    "categories",
    async () => {
      try {
        const response = await apiClient.get<CategoryResponse[]>(API_ENDPOINTS.PRODUTO.LISTAR_CATEGORIA)
        console.log("📦 Resposta da API de categorias:", response)
        
        // Mapear a resposta para o formato esperado
        const categories = response.data?.map(cat => ({
          id: cat.id,
          nome: cat.titulo,
          ativo: 1
        })) || []
        
        return categories
      } catch (error) {
        console.error("❌ Erro ao buscar categorias:", error)
        toast.error("Erro ao carregar categorias")
        throw error
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  )

  return {
    categories: data || [],
    isLoadingCategories: isLoading,
    error,
    mutate,
  }
}
