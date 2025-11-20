export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  senha: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn: number;
  user: {
    id: string;
    nome: string;
    email: string;
    cpfCnpj: string;
    telefone?: string;
    dataNascimento?: string;
    loja?: {
      id: string;
      nomeLoja: string;
      idCategoria: string;
      categoria: string;
      subdominio: string;
      descricao?: string;
      avaliacao?: number;
      logo?: string;
    };
  };
}

export interface RegisterRequest {
  cpf_cnpj: string;
  nome: string;
  telefone: string;
  dataNascimento: string;
  nomeLoja: string;
  subdominio: string;
  idCategoriaLoja: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}
