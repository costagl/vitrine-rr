// Tipos para produtos baseados na model do backend

export interface Product {
  id: number
  titulo: string
  idLoja: number
  valorUnitario: number
  valorPromocional?: number
  estoque: number
  sku: string
  imagem: string
  ativo: number // 0 ou 1
  peso: number
  descricao: string
  altura: number
  largura: number
  profundidade: number
  idCategoriaProduto: number
  // Campos de navegação
  categoriaProduto?: {
    id: number
    nome: string
  }
  loja?: {
    id: number
    nome: string
  }
}

export interface CreateProductRequest {
  titulo: string
  idLoja: number
  valorUnitario: number
  valorPromocional?: number
  estoque: number
  sku: string
  imagem: string
  ativo: number
  peso: number
  descricao: string
  altura: number
  largura: number
  profundidade: number
  idCategoriaProduto: number
  formDataToSend?: FormData
}

export interface UpdateProductRequest {
  titulo?: string
  valorUnitario?: number
  valorPromocional?: number
  estoque?: number
  sku?: string
  imagem?: string
  ativo?: number
  peso?: number
  descricao?: string
  altura?: number
  largura?: number
  profundidade?: number
  idCategoriaProduto?: number
}

export interface ProductResponse {
  success: boolean
  data: Product
  message?: string
}

export interface ProductListResponse {
  success: boolean
  data: {
    produtos: Product[]
    paginacao: ProductPaginationType
  }
  message?: string
}

export interface ProductPaginationType {
  total: number
  paginas: number
  paginaAtual: number
  limite: number
}

export interface ProductSearchParams {
  pagina?: number
  limite?: number
  busca?: string
  idCategoriaProduto?: number
  ativo?: number | null // 0, 1 ou null
}

// Tipo para categorias de produto
export interface ProductCategory {
  id: number
  nome: string
  descricao?: string
  ativo: number
}

// Tipo para erros da API
export interface ApiError {
  message: string
  status: number
  errors?: string[]
}
