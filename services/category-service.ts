import { apiClient } from "@/utils/api-client";
import { API_ENDPOINTS } from "@/config/api";
import type { CategoryProduct, CategoryStore } from "@/types/category";

export class CategoryService {
  static async listarCategoriasLoja() {
    try {
      // Faz a requisição para listar as categorias
      const response = await apiClient.get<CategoryStore>(
        API_ENDPOINTS.CATEGORIA.LISTAR_LOJA
      );

      // Verifica se a resposta tem a propriedade `data` e se ela é um array
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Resposta inválida da API:", response.data);
        throw new Error("Resposta inválida da API");
      }

      const formattedCategories: CategoryStore[] = response.data.map(
        (category) => ({
          id: category.id,
          titulo: category.titulo,
          imagem: category.imagem,
        })
      );

      return formattedCategories;
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      throw error;
    }
  }

  static async listarCategoriasProduto(idCategoriaLoja: string) {
    try {
      // Faz a requisição para listar as categorias
      const response = await apiClient.get<CategoryProduct>(
        API_ENDPOINTS.CATEGORIA.LISTAR_PRODUTO(idCategoriaLoja)
      );

      // Verifica se a resposta tem a propriedade `data` e se ela é um array
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Resposta inválida da API:", response.data);
        throw new Error("Resposta inválida da API");
      }

      const formattedCategories: CategoryProduct[] = response.data.map(
        (category) => ({
          id: category.id,
          titulo: category.titulo,
          imagem: category.imagem,
          idCategoriaLoja: category.idCategoriaLoja,
        })
      );

      return formattedCategories;
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      throw error;
    }
  }
}
