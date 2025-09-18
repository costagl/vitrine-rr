// Lista de categorias
export const categories = [
  { id: 1, nome: "Eletrônicos" },
  { id: 2, nome: "Roupas" },
  { id: 3, nome: "Alimentos" },
  { id: 4, nome: "Beleza" },
  { id: 5, nome: "Saúde" },
  { id: 6, nome: "Brinquedos" },
  { id: 7, nome: "Automóveis" },
  { id: 8, nome: "Móveis" },
  { id: 9, nome: "Esportes" },
  { id: 10, nome: "Livros" }
];

export function getCategoryNameById(id: number): string {
  const category = categories.find(category => category.id === id);
  return category ? category.nome : "Categoria não encontrada";
}
