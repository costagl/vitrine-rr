import { CategoryService } from "@/services/category-service"

// Lista de categorias
export const categories = [
  { id: 21, nome: "Eletrônicos" },
  { id: 22, nome: "Roupas" },
  { id: 23, nome: "Alimentos" },
  { id: 24, nome: "Beleza" },
  { id: 25, nome: "Saúde" },
  { id: 26, nome: "Brinquedos" },
  { id: 27, nome: "Automóveis" },
  { id: 28, nome: "Móveis" },
  { id: 29, nome: "Esportes" },
  { id: 30, nome: "Livros" }
];

export function getCategoryNameById(id: number): string {
  const category = categories.find(category => category.id === id);
  return category ? category.nome : "Categoria não encontrada";
}
