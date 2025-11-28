"use client"

import { apiClient } from "@/utils/api-client";
import { API_ENDPOINTS } from "@/config/api";
import axios from "axios";
import { getApiBaseUrl } from "@/config/api-url";
import { API_BASE_URL, LOCAL_BASE_URL } from "@/config/api-url";

export interface Store {
  id: string;
  nome: string;
  categoria: string;
  subdomain: string;
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

  static async abrirMinhaLoja(): Promise<void> {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const idLoja = userData.loja.id;
    const subdominio = userData.loja.subdominio;
    axios
      .get(`${API_BASE_URL}/loja/layout-tema/${idLoja}`)
      .then((response) => {
        console.log("DATA:", response.data);
        const layoutSelecionado = response.data.tituloLayout;
        let lojaUrl = `${LOCAL_BASE_URL}/loja/${layoutSelecionado}/?subdominio=${subdominio}&idLoja=${idLoja}`;
        window.open(lojaUrl, "_blank");
      })
      .catch((error) => {
        console.error("❌ Erro ao buscar dados de layout/tema:", error);
      });
  }
}
