export interface CartItem {
  id: string
  titulo: string
  descricao: string
  valorUnitario: number
  valorPromocional?: number
  imagemUrl?: string
  categoria: string
  estoque: number
  quantidade: number
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
  gender: string
  clothingType: string
  sortOrder: "lancamentos" | "menor-preco" | "maior-preco" | "mais-vendidos"
  searchQuery: string
}

export interface FilterOption {
  value: string
  label: string
}
