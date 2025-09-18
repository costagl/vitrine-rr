import { apiClient } from "@/utils/api-client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse,
  ProductListResponse,
  ProductSearchParams,
} from "@/types/product";
import { getApiBaseUrl } from "@/config/api-url";

export class ProductService {
  /**
   * Cadastra um novo produto
   * @param data Dados do produto a ser cadastrado
   * @returns Produto cadastrado
   */
  static async cadastrarProduto(data: CreateProductRequest): Promise<Product> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const fullUrl = `${getApiBaseUrl()}${API_ENDPOINTS.PRODUTO.CADASTRAR}`;

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        } catch (parseError) {
          throw new Error(`Erro HTTP ${response.status}: ${responseText}`);
        }
      }

      try {
        const responseData = JSON.parse(responseText);
        return responseData.data;
      } catch (parseError) {
        throw new Error("Resposta da API não está em formato JSON válido");
      }
    } catch (error) {
      console.error("❌ ProductService: Erro ao cadastrar produto:", error);
      throw error;
    }
  }

  /**
   * Lista todos os produtos com opções de paginação e filtros
   * @param params Parâmetros de busca e paginação
   * @returns Lista de produtos e informações de paginação
   */
  static async listarProdutos(
    params?: ProductSearchParams
  ): Promise<ProductListResponse["data"]> {
    console.log("🔍 ProductService: Listando produtos com parâmetros:", params);

    // Verificar se o token está presente antes de fazer a requisição
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    // Construir query string para os parâmetros
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.pagina) queryParams.append("pagina", params.pagina.toString());
      if (params.limite) queryParams.append("limite", params.limite.toString());
      if (params.busca) queryParams.append("busca", params.busca);
      if (params.ativo !== null && params.ativo !== undefined) {
        queryParams.append("ativo", params.ativo.toString());
      }
      if (
        params.idCategoriaProduto !== null &&
        params.idCategoriaProduto !== undefined
      ) {
        queryParams.append(
          "idCategoriaProduto",
          params.idCategoriaProduto.toString()
        );
      }
    }

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `${API_ENDPOINTS.PRODUTO.LISTAR}?${queryString}`
      : API_ENDPOINTS.PRODUTO.LISTAR;

    try {
      const response = await apiClient.get<ProductListResponse>(endpoint);

      console.log(
        "✅ ProductService: Produtos listados com sucesso:",
        response.data
      );
      return response.data!.data;
    } catch (error) {
      console.error("❌ ProductService: Erro ao listar produtos:", error);
      throw error;
    }
  }

  /**
   * Busca um produto específico pelo ID
   * @param id ID do produto
   * @returns Detalhes do produto
   */
  static async listarProdutoPorId(id: string): Promise<Product> {
    console.log(`🔍 ProductService: Buscando produto com ID: ${id}`);

    // Verificar se o token está presente antes de fazer a requisição
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    try {
      const response = await apiClient.get<ProductResponse>(
        API_ENDPOINTS.PRODUTO.LISTAR_POR_ID(id)
      );

      console.log("✅ ProductService: Produto encontrado:", response.data);
      return response.data!.data;
    } catch (error) {
      console.error("❌ ProductService: Erro ao buscar produto:", error);
      throw error;
    }
  }

  /**
   * Altera um produto existente
   * @param id ID do produto a ser alterado
   * @param data Dados atualizados do produto
   * @returns Produto atualizado
   */
  static async alterarProduto(
    id: string,
    data: UpdateProductRequest
  ): Promise<Product> {
    console.log(`📝 ProductService: Alterando produto ${id} com dados:`, data);

    // Verificar se o token está presente antes de fazer a requisição
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    try {
      const response = await apiClient.put<ProductResponse>(
        API_ENDPOINTS.PRODUTO.ALTERAR(id),
        data
      );

      console.log(
        "✅ ProductService: Produto alterado com sucesso:",
        response.data
      );
      return response.data!.data;
    } catch (error) {
      console.error("❌ ProductService: Erro ao alterar produto:", error);
      throw error;
    }
  }

  /**
   * Exclui um produto
   * @param id ID do produto a ser excluído
   * @returns Confirmação de exclusão
   */
  static async excluirProduto(id: string): Promise<void> {
    console.log(`🗑️ ProductService: Excluindo produto com ID: ${id}`);

    // Verificar se o token está presente antes de fazer a requisição
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    try {
      const response = await apiClient.delete<ProductResponse>(
        API_ENDPOINTS.PRODUTO.EXCLUIR(id)
      );

      console.log(
        "✅ ProductService: Produto excluído com sucesso:",
        response.data
      );
      return;
    } catch (error) {
      console.error("❌ ProductService: Erro ao excluir produto:", error);
      throw error;
    }
  }
}
