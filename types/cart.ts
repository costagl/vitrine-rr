export interface CartItem {
  id: string;
  titulo: string;
  descricao: string;
  valorUnitario: number;
  valorPromocional: number;
  estoque: number;
  ativo: number;
  imagemUrl: string;
  peso: number;
  altura: number;
  largura: number;
  profundidade: number;
  valorCusto: number;
  categoriaProduto: string;
  idCategoriaProduto: number;
  idLoja: number;
  quantidade: number
  removed?: boolean
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface CartContextType {
  cart: Cart
  isCartOpen: boolean
  addToCart: (item: Omit<CartItem, "quantidade">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  itemCount: number;
}

export interface ProductFilters {
  genero: string
  tipoRoupa: string
  ordemClassificacao: "lancamentos" | "menor-preco" | "maior-preco" | "mais-vendidos"
  pesquisaConsulta: string
}

export interface FilterOption {
  value: string
  label: string
}
