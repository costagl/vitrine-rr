export interface CategoryStore {
  id: number
  titulo: string
  imagem: string // TODO: Alterar tipo
}

export interface CategoryProduct {
  id: number
  titulo: string
  imagem: string // TODO: Alterar tipo
  idCategoriaLoja?: number
}

