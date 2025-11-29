"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import { ProductForm } from "@/components/products/product-form"
import { ProductList } from "@/components/products/product-list"
import { ProductSearch } from "@/components/products/product-search"
import { ProductStats } from "@/components/products/product-stats"
import { ProductDetailModal } from "@/components/products/product-detail-modal"
import { Plus, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProductService } from "@/services/product-service";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/use-products"
import { useAuthToken } from "@/hooks/use-auth-token"
import type {
  Product,
  CreateProductRequest,
  ProductSearchParams,
} from "@/types/product"
import { CategoryProduct } from "@/types/category";
import axios from "axios";
import { API_BASE_URL } from "@/config/api-url";

export default function ProductsManagementPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    busca: "",
    idCategoriaProduto: "",
    ativo: null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  const { mutate: createProduct, isLoading: isCreating, error: createError } = useCreateProduct();
  const { mutate: updateProduct, isLoading: isUpdating, error: updateError } = useUpdateProduct();
  const { mutate: deleteProduct, isLoading: isDeleting, error: deleteError } = useDeleteProduct();
  const { token, isLoading: authTokenLoading } = useAuthToken();
  const [categories, setCategories] = useState<CategoryProduct[]>([]);

  const handleApiResponse = (response: any) => {
    const data = response.data;
    if (data && typeof data === 'object' && Array.isArray(data.data)) {
      // Caso: { message: "...", data: [] }
      return data.data;
    } else if (Array.isArray(data)) {
      // Caso: [{...}, {...}]
      return data;
    }
    return []; // Fallback para um array vazio se o formato for inesperado
  };

  const refetchProducts = useCallback(() => {
    if (user?.loja?.id && token) {
      setIsLoading(true);
      axios.get(`${API_BASE_URL}/produto/listar/${user.loja.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setProducts(handleApiResponse(response));
      })
      .catch(err => {
        console.error("Erro ao recarregar produtos:", err);
        setError(err.message || "Falha ao recarregar produtos");
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [user?.loja?.id, token]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (user?.loja?.id && token) {
        setIsLoading(true);
        setError(null);
        try {
          const categoriesPromise = axios.get(`${API_BASE_URL}/categoria/produtos/${user.loja.idCategoria}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const productsPromise = axios.get(`${API_BASE_URL}/produto/listar/${user.loja.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const [categoriesResponse, productsResponse] = await Promise.all([categoriesPromise, productsPromise]);

          setCategories(categoriesResponse.data);
          setProducts(handleApiResponse(productsResponse));
        } catch (err: any) {
          console.error("Erro ao buscar dados iniciais:", err);
          setError(err.message || "Falha ao carregar dados da página");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInitialData();
  }, [user?.loja?.id, user?.loja?.idCategoria, token]);
  
  // Filtrar produtos localmente
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro de busca
    if (searchParams.busca) {
      const searchLower = searchParams.busca.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.titulo.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.descricao?.toLowerCase().includes(searchLower)
      );
    }

    // Filtro de categoria
    if (searchParams.idCategoriaProduto) {
      filtered = filtered.filter(
        (p) => p.idCategoriaProduto.toString() === searchParams.idCategoriaProduto
      );
    }

    // Filtro de status ativo
    if (searchParams.ativo !== null && searchParams.ativo !== undefined) {
      filtered = filtered.filter((p) => p.ativo === searchParams.ativo);
    }

    return filtered;
  }, [products, searchParams]);

  // Redirecionamento caso não esteja autenticado
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authTokenLoading && !token) {
        router.push("/login");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [token, authTokenLoading, router]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(productId.toString());
        refetchProducts(); // Recarrega os produtos
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
      }
    }
  };

  const handleSaveProduct = async (productData: CreateProductRequest) => {
    try {
      if (editingProduct) {
        await updateProduct({
          ...productData,
          id: editingProduct.id.toString(),
        });
      } else {
        await createProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
      refetchProducts(); // Recarrega os produtos
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  const handleSearchChange = (newParams: Partial<ProductSearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  // Verifica se o token está sendo carregado
  if (authTokenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!token) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/minha-loja">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Package className="h-8 w-8" />
                Gerenciar Produtos
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.loja?.nomeLoja && `Loja: ${user.loja.nomeLoja}`}
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddProduct}
            className="flex items-center gap-2"
            disabled={isCreating || isUpdating || isDeleting}
          >
            <Plus className="h-4 w-4" />
            Adicionar Produto
          </Button>
        </div>

        {/* Estatísticas */}
        <ProductStats products={filteredProducts} isLoading={isLoading} />

        {/* Barra de Pesquisa */}
        <ProductSearch
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          categories={categories}
        />

        {/* Formulário de Produto */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                isLoading={isCreating || isUpdating}
              />
              {(createError || updateError) && (
                <div className="text-red-500 mt-2">
                  {createError?.message || updateError?.message}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Lista de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Produtos</span>
              <Badge variant="secondary">
                {filteredProducts.length} produto(s)
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-500">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                Erro ao carregar produtos: {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {products.length === 0
                  ? "Nenhum produto cadastrado ainda."
                  : "Nenhum produto encontrado com os filtros aplicados."}
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onOpenDetail={handleViewProductDetails}
                isDeleting={isDeleting}
              />
            )}
            {deleteError && (
              <div className="text-red-500 mt-2">
                Erro ao excluir produto: {deleteError.message}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Detalhes do Produto */}
        <ProductDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          product={selectedProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}