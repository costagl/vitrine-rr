export interface CategoryStore {
  id: string
  titulo: string
  imagem: string // TODO: Alterar tipo
}

export interface CategoryProduct {
  id: string
  titulo: string
  imagem: string // TODO: Alterar tipo
  idCategoriaLoja: string
}

