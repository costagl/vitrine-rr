import { CategoryService } from "@/services/category-service";
import { manageLocalStorage } from "@/contexts/auth-context";
import type { LoginResponse } from "@/types/api";
import type { CategoryProduct, CategoryStore } from "@/types/category";

export async function getProductCategoriesById(): Promise<CategoryProduct[]> {
  const userDataString = manageLocalStorage("get", "user");

  let userData: LoginResponse["user"] | null = null;
  let categories: CategoryProduct[] = [];

  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  if (userData && userData.loja) {
    const idCategoriaLoja = userData.loja.idCategoria;
    
    categories = await CategoryService.listarCategoriasProduto(idCategoriaLoja);
    
  } else {
    console.error("Usuário não autenticado ou dados da loja não encontrados.");
  }
  return categories;
}

export async function getStoreCategories(): Promise<CategoryStore[]> {
  let categories: CategoryStore[] = [];
  categories = await CategoryService.listarCategoriasLoja();
  return categories;
}

export async function getCategoryTitleById(id: string): Promise<string> {
  const categories = await getProductCategoriesById();

  const category = categories.find((category) => category.id === id);
  return category ? category.titulo : "Categoria não encontrada";
}
