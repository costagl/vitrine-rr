export interface Product {
  id: number;
  titulo: string;
  idLoja: number;
  valorUnitario: number;
  valorPromocional?: number;
  estoque: number;
  sku: string;
  imagem: string;
  ativo: number; // 0 ou 1
  peso: number;
  descricao: string;
  altura: number;
  largura: number;
  profundidade: number;
  idCategoriaProduto: string; 
  tituloCategoriaProduto: string;
  idCategoriaLoja: string;
  tituloCategoriaLoja: string;
}

export interface CreateProductRequest {
  id: number;
  titulo: string;
  idLoja: number;
  valorUnitario: number;
  valorPromocional?: number;
  estoque: number;
  sku: string;
  imagem: string;
  ativo: number; // 0 ou 1
  peso: number;
  descricao: string;
  altura: number;
  largura: number;
  profundidade: number;
  idCategoriaProduto: string; 
  formDataToSend?: FormData;
}

export interface UpdateProductRequest {
  titulo?: string;
  valorUnitario?: number;
  valorPromocional?: number;
  estoque?: number;
  sku?: string;
  imagem?: string;
  ativo?: number;
  peso?: number;
  descricao?: string;
  altura?: number;
  largura?: number;
  profundidade?: number;
  idCategoriaProduto?: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export interface ProductListResponse {
  success: boolean;
  data: {
    produtos: Product[];
    paginacao: ProductPaginationType;
  };
  message?: string;
}

export interface ProductPaginationType {
  total: number;
  paginas: number;
  paginaAtual: number;
  limite: number;
}

export interface ProductSearchParams {
  pagina?: number;
  limite?: number;
  busca?: string;
  idCategoriaProduto?: string;
  ativo?: number | null; // 0, 1 ou null
}

// Tipo para erros da API
export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}
