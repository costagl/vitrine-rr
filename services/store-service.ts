import { apiClient } from "@/utils/api-client";
import { API_ENDPOINTS } from "@/config/api";
import { getApiBaseUrl } from "@/config/api-url";

export interface Store {
  id: string;
  nome: string;
  categoria: string;
  subdomain: string;
  cnpj?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  stock: number;
}

export interface UpdateStoreRequest {
  nome?: string;
  categoria?: string;
  description?: string;
  isActive?: boolean;
}

export interface SubdomainVerifyRequest {
  subdominio: string;
}

export interface SubdomainVerifyResponse {
  disponivel: boolean;
  message?: string;
}

export interface LayoutThemeResponse {
  layoutId: number;
  themeId: number;
}

export class StoreService {
  static async getStore(): Promise<Store> {
    const response = await apiClient.get<Store>(API_ENDPOINTS.STORE.GET_STORE);
    return response.data!;
  }

  static async updateStore(data: UpdateStoreRequest): Promise<Store> {
    const response = await apiClient.put<Store>(
      API_ENDPOINTS.STORE.UPDATE_STORE,
      data
    );
    return response.data!;
  }

  static async getProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(
      API_ENDPOINTS.PRODUTO.LISTAR
    );
    return response.data!;
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post<Product>(
      API_ENDPOINTS.PRODUTO.CADASTRAR,
      data
    );
    return response.data!;
  }

  static async updateProduct(
    id: string,
    data: Partial<CreateProductRequest>
  ): Promise<Product> {
    const response = await apiClient.put<Product>(
      `${API_ENDPOINTS.PRODUTO.ALTERAR}/${id}`,
      data
    );
    return response.data!;
  }

  static async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.PRODUTO.EXCLUIR}/${id}`);
  }

  static async verifySubdomainAvailability(
    subdominio: string
  ): Promise<SubdomainVerifyResponse> {
    const response = await apiClient.post<SubdomainVerifyResponse>(
      API_ENDPOINTS.STORE.VERIFY_SUBDOMAIN,
      {
        subdominio,
      } as SubdomainVerifyRequest
    );
    return response.data!;
  }

  static async verifyLayoutTheme(): Promise<LayoutThemeResponse> {
    const response = await apiClient.get<LayoutThemeResponse>(
      API_ENDPOINTS.STORE.VERIFY_LAYOUT_THEME
    );
    console.log(response);
    return response.data!;
  }

  // TODO: Limpar Código Depois
  static async abrirMinhaLoja(): Promise<void> {
    // Verificar se o token está presente
    const token = localStorage.getItem("token");

    if (!token) {
      console.error(
        "❌ Token de autenticação não encontrado. Faça login novamente."
      );
      return; // Early return para evitar a execução do código abaixo
    }

    console.log("✅ Token encontrado:", token);

    // Criar headers com o token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      console.log("PRIMEIRA LINHA");
      const url = `${getApiBaseUrl()}${
        API_ENDPOINTS.STORE.VERIFY_LAYOUT_THEME
      }`;
      console.log("❗ URL que será consumida:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        const responseText = await response.text();
        console.log("🚨 Resposta da API não OK:", response.status);
        console.log("Erro detalhado:", responseText);

        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || `Erro HTTP ${response.status}`);
      }

      console.log("✅ Resposta da API foi bem-sucedida!");

      // Parse a resposta de sucesso
      const data = await response.json(); // já retorna um objeto JavaScript
      console.log("🔍 Dados recebidos da API:", JSON.stringify(data, null, 2));

      const { idTema, idLayout } = data;
      console.log(`📦 idTema: ${idTema}, idLayout: ${idLayout}`);

      let layouts: { [key: string]: string } = {
        "1002": "layout-1",
        "1003": "layout-2",
        "1004": "layout-3",
        "1005": "layout-4",
      };
      let temas: { [key: string]: string } = {
        "1002": "tema-1",
        "1003": "tema-2",
        "1004": "tema-3",
        "1005": "tema-4",
      };

      console.log("🔧 Layouts definidos:", layouts);
      console.log("🔧 Temas definidos:", temas);

      const layoutSelecionado = layouts[idLayout];
      const temaSelecionado = temas[idTema];

      console.log(
        `✅ Layout Selecionado: ${layoutSelecionado}, Tema Selecionado: ${temaSelecionado}`
      );

      let lojaUrl = `http://localhost:3000/minha-loja/${layoutSelecionado}`;
      console.log("🔗 Redirecionando para a URL:", lojaUrl);

      window.open(lojaUrl, "_blank");
    } catch (error) {
      console.error("❌ Erro ao buscar dados de layout/tema:", error);
    }
  }
}
