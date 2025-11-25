"use client"

import { useState, useEffect, useMemo } from "react" // Importação de hooks do React: useState, useEffect e useMemo, que permitem controlar o estado, realizar efeitos colaterais e memorizar valores respectivamente.
import { useRouter } from "next/navigation" // Hook do Next.js para controle de navegação entre páginas.
import { useAuth } from "@/contexts/auth-context" // Hook customizado para acessar o contexto de autenticação do usuário.
import { Button } from "@/components/ui/button" // Componente de botão reutilizável da UI.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Componentes reutilizáveis para exibir informações em formato de cartão.
import { Badge } from "@/components/ui/badge" // Componente de badge para exibir contadores ou status.
import Navbar from "@/components/navbar" // Componente de navegação (barra superior).
import { ProductForm } from "@/components/products/product-form" // Componente de formulário para adicionar ou editar produtos.
import { ProductList } from "@/components/products/product-list" // Componente para listar os produtos.
import { ProductSearch } from "@/components/products/product-search" // Componente de pesquisa para filtrar produtos.
import { ProductStats } from "@/components/products/product-stats" // Componente para exibir estatísticas dos produtos.
import { ProductDetailModal } from "@/components/products/product-detail-modal" // Componente de modal para exibir detalhes do produto selecionado.
import { Plus, Package, ArrowLeft } from "lucide-react" // Ícones utilizados na interface, fornecidos pelo pacote lucide-react.
import Link from "next/link" // Componente de link do Next.js para navegação sem recarregar a página.
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-products" // Hooks customizados para realizar operações CRUD nos produtos (listar, criar, editar, excluir).
import { useAuthToken } from "@/hooks/use-auth-token" // Hook customizado para acessar o token de autenticação.
import type { Product, CreateProductRequest, ProductSearchParams } from "@/types/product" // Tipagens relacionadas aos produtos, incluindo a estrutura do produto, dados de criação e parâmetros de pesquisa.

export default function ProductsManagementPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    busca: "",
    idCategoriaProduto: "",
    ativo: null,
  })

  // Hooks para operações CRUD
  const { products, isLoading, error, mutate } = useProducts()
  const { mutate: createProduct, isLoading: isCreating, error: createError } = useCreateProduct()
  const { mutate: updateProduct, isLoading: isUpdating, error: updateError } = useUpdateProduct()
  const { mutate: deleteProduct, isLoading: isDeleting, error: deleteError } = useDeleteProduct()
  const { token, isLoading: authTokenLoading } = useAuthToken()

  // Filtrar produtos localmente
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filtro de busca
    if (searchParams.busca) {
      const searchLower = searchParams.busca.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.titulo.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.descricao?.toLowerCase().includes(searchLower),
      )
    }

    // Filtro de categoria
    if (searchParams.idCategoriaProduto) {
      filtered = filtered.filter((p) => p.idCategoriaProduto === searchParams.idCategoriaProduto)
    }

    // Filtro de status ativo
    if (searchParams.ativo !== null && searchParams.ativo !== undefined) {
      filtered = filtered.filter((p) => p.ativo === searchParams.ativo)
    }

    return filtered
  }, [products, searchParams])

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
      router.push("/login")
    }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [token, authTokenLoading, router])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (productId: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(productId.toString())
        mutate()
      } catch (err) {
        console.error("Erro ao excluir produto:", err)
      }
    }
  }

  const handleSaveProduct = async (productData: CreateProductRequest) => {
    try {
      if (editingProduct) {
        await updateProduct({
          ...productData,
          id: editingProduct.id.toString(),
        })
      } else {
        await createProduct(productData)
      }
      setShowForm(false)
      setEditingProduct(null)
      mutate()
    } catch (err) {
      console.error("Erro ao salvar produto:", err)
    }
  }

  const handleSearchChange = (newParams: Partial<ProductSearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }))
  }

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product)
    setDetailModalOpen(true)
  }

  // Verifica se o token está sendo carregado
  if (authTokenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!token) return null

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
              <p className="text-gray-600 mt-1">{user?.loja?.nomeLoja && `Loja: ${user.loja.nomeLoja}`}</p>
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
        <ProductSearch searchParams={searchParams} onSearchChange={handleSearchChange} />

        {/* Formulário de Produto */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                isLoading={isCreating || isUpdating}
              />
              {(createError || updateError) && (
                <div className="text-red-500 mt-2">{createError?.message || updateError?.message}</div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Lista de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Produtos</span>
              <Badge variant="secondary">{filteredProducts.length} produto(s)</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-500">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">Erro ao carregar produtos: {error.message}</div>
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
            {deleteError && <div className="text-red-500 mt-2">Erro ao excluir produto: {deleteError.message}</div>}
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
  )
}
