export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface LoginRequest {
  email: string
  senha: string
  rememberMe: boolean
}

export interface LoginResponse {
  token: string
  refreshToken?: string
  expiresIn: number
  user: {
    id: string
    nome: string
    email: string
    loja?: {
      id: string
      nome: string
      categoria: string
      subdominio: string
    }
  }
}

export interface RegisterRequest {
  cpf: string
  nome: string
  telefone: string
  dataNascimento: string
  cnpj?: string
  nomeLoja: string
  subdominio: string
  categoriaVenda: string
  email: string
  senha: string
  confirmarSenha: string
}

export interface RegisterResponse {
  id: string
  email: string
  message: string
}

export interface ApiError {
  message: string
  status: number
  errors?: string[]
}
