"use client";

import { apiClient } from "@/utils/api-client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
  Product,
  ApiError,
  BackendErrorResponse,
} from "@/types/product";
import { ServiceApiError } from "@/types/product";
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
   * Lista todos os produtos do usuário autenticado
   * @returns Lista de produtos
   */
  static async listarProdutos(): Promise<Product[]> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Se o token estiver ausente, lançamos um erro local
    if (!token) {
      // Usamos ServiceApiError para garantir que o useSWR trate
      throw new ServiceApiError(
        "Token de autenticação não encontrado. Faça login novamente.",
        401
      );
    }

    const endpoint = `${getApiBaseUrl()}${API_ENDPOINTS.PRODUTO.LISTAR_TODOS}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // --- LÓGICA DE TRATAMENTO DE ERRO COM LEITURA DO CORPO (CORRIGIDO) ---
      if (!response.ok) {
        let customMessage = `Erro HTTP ${response.status}: Erro ao listar produtos`;
        let errorStatus = response.status;

        try {
          // Tenta ler o corpo da resposta como JSON
          const errorBody: BackendErrorResponse = await response.json();

          // Verifica se a chave 'erro' (do seu backend) existe
          if (errorBody && errorBody.erro) {
            // AQUI está a sua mensagem: "Por favor, faça login novamente."
            customMessage = errorBody.erro;
          }
        } catch (e) {
          // Falhou ao ler JSON, usa a mensagem genérica HTTP
          console.error("Falha ao ler JSON de erro:", e);
        }

        // Lança o erro ServiceApiError (que é um ApiError) com a mensagem capturada
        throw new ServiceApiError(customMessage, errorStatus);
      }
      // --- FIM DA CORREÇÃO ---

      const data = await response.json();

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("❌ ProductService: Erro ao listar produtos:", error);

      // Se já for um ServiceApiError (lançado acima), ele é re-lançado.
      // Se for um erro de rede/fetch, ele será lançado como Error nativo.
      throw error;
    }
  }

  static async listarProdutosPorLoja(idLoja : number): Promise<Product[]> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Se o token estiver ausente, lançamos um erro local
    if (!token) {
      // Usamos ServiceApiError para garantir que o useSWR trate
      throw new ServiceApiError(
        "Token de autenticação não encontrado. Faça login novamente.",
        401
      );
    }

    const endpoint = `${getApiBaseUrl()}${API_ENDPOINTS.PRODUTO.LISTAR_POR_LOJA}${idLoja}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // --- LÓGICA DE TRATAMENTO DE ERRO COM LEITURA DO CORPO (CORRIGIDO) ---
      if (!response.ok) {
        let customMessage = `Erro HTTP ${response.status}: Erro ao listar produtos`;
        let errorStatus = response.status;

        try {
          // Tenta ler o corpo da resposta como JSON
          const errorBody: BackendErrorResponse = await response.json();

          // Verifica se a chave 'erro' (do seu backend) existe
          if (errorBody && errorBody.erro) {
            // AQUI está a sua mensagem: "Por favor, faça login novamente."
            customMessage = errorBody.erro;
          }
        } catch (e) {
          // Falhou ao ler JSON, usa a mensagem genérica HTTP
          console.error("Falha ao ler JSON de erro:", e);
        }

        // Lança o erro ServiceApiError (que é um ApiError) com a mensagem capturada
        throw new ServiceApiError(customMessage, errorStatus);
      }
      // --- FIM DA CORREÇÃO ---

      const data = await response.json();
      console.log("[DEBUG] Dados recebidos de /produto/listar/{idLoja}:", data);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("❌ ProductService: Erro ao listar produtos:", error);

      // Se já for um ServiceApiError (lançado acima), ele é re-lançado.
      // Se for um erro de rede/fetch, ele será lançado como Error nativo.
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

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      throw new Error(
        "Token de autenticação não encontrado. Faça login novamente."
      );
    }

    try {
      const response = await apiClient.get<ProductResponse>(
        API_ENDPOINTS.PRODUTO.BUSCAR(id)
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
