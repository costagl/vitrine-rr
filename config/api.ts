// Corrigindo o import para usar caminho absoluto em vez de relativo
import { getApiBaseUrl, isApiConfigured, getApiUrl } from "@/config/api-url"

// Configurações da API
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: 30000, // 30 segundos
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const

// Endpoints da API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/usuario/login",
    LOGOUT: "/usuario/logout",
    REGISTER: "/usuario/cadastrar",
    REFRESH: "/usuario/renovar-token",
    VERIFY_EMAIL: "/usuario/verificar-email",
    FORGOT_PASSWORD: "/usuario/esqueci-senha",
    RESET_PASSWORD: "/usuario/redefinir-senha",
    VALIDATE_CPF_CNPJ: "/usuario/validar-cpf-cnpj",
  },
  USER: {
    PROFILE: "/usuario/perfil",
    UPDATE_PROFILE: "/usuario/atualizar-perfil",
    DELETE_ACCOUNT: "/usuario/excluir-conta",
  },
  STORE: {
    GET_STORE: "/loja",
    UPDATE_STORE: "/loja/atualizar",
    VERIFY_SUBDOMAIN: "/loja/verificar-subdominio", 
  },
  ORDERS: {
    GET_ORDERS: "/pedidos",
    LISTAR_POR_ID: (id: string) => `/pedido/listar/${id}`,
    UPDATE_ORDER_STATUS: "/pedido/atualizar-status",
  },
  PRODUTO: {
    CADASTRAR: "/produto/cadastrar",
    LISTAR: "/produto/listar",
    LISTAR_POR_ID: (id: string) => `/produto/listar/${id}`,
    ALTERAR: (id: string) => `/produto/alterar/${id}`,
    EXCLUIR: (id: string) => `/produto/excluir/${id}`,
  },
  CATEGORIA: {
    LISTAR_LOJA: "/categoria/loja",
    LISTAR_PRODUTO: (id: string) => `/categoria/produtos/${id}`,
  }
} as const

// Re-exporta funções úteis
export { getApiBaseUrl, isApiConfigured, getApiUrl }
