"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import axios from "axios"
import { useCart } from "@/contexts/cart-context"
import { CartModal } from "@/components/layouts/cart-modal"
import { API_BASE_URL } from "@/config/api-url"

interface Product {
  id: string
  titulo: string
  descricao: string
  valorUnitario: number
  valorPromocional: number
  estoque: number
  ativo: number
  imagemUrl: string
  peso: number
  altura: number
  largura: number
  profundidade: number
  valorCusto: number
  categoriaProduto: string
  idCategoriaProduto: number
  idLoja: number
}

export default function Layout1Page() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loja, setLoja] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const { cart, addToCart } = useCart()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const idLoja = urlParams.get("idLoja")
    const subdominio = urlParams.get("subdominio")
    const parametrosLocalStorage = {
      idLoja,
      subdominio,
    }
    localStorage.setItem("urlParams", JSON.stringify(parametrosLocalStorage))

    if (subdominio) {
      async function fetchLojaData() {
        setIsLoading(true)
        setError(null)

        try {
          const response = await axios.get(`${API_BASE_URL}/vitrine/${subdominio}`)

          if (response.data.lojaRequest) {
            setLoja(response.data.lojaRequest)
            setProdutos(response.data.lojaRequest.produtos || [])
            localStorage.setItem(`${subdominio}`, JSON.stringify(response.data.lojaRequest))
          } else {
            throw new Error("Loja não encontrada")
          }
        } catch (err: any) {
          setError(err.message || "Erro ao carregar dados da loja")
        } finally {
          setIsLoading(false)
        }
      }

      fetchLojaData()
    }
  }, [])

  const produtosEmDestaque = useMemo(() => {
    return produtos.filter((p) => p.ativo === 1).slice(0, 4)
  }, [produtos])

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((p) => p.ativo === 1)
      .filter((p) => {
        if (selectedCategory !== "Todos" && p.categoriaProduto !== selectedCategory) return false
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
          p.titulo.toLowerCase().includes(query) ||
          p.descricao?.toLowerCase().includes(query) ||
          p.categoriaProduto.toLowerCase().includes(query)
        )
      })
  }, [produtos, searchQuery, selectedCategory])

  const categorias = useMemo(() => {
    const cats = Array.from(new Set(produtos.filter((p) => p.ativo === 1).map((p) => p.categoriaProduto)))
    return ["Todos", ...cats]
  }, [produtos])

  const getProductRating = (id: string) => {
    const idInt = Number.parseInt(id)
    const ratings = [2, 5, 3, 4, 1, 4, 3, 5]
    return ratings[idInt % ratings.length]
  }

  const handleAddToCart = (produto: Product) => {
    addToCart({
      id: produto.id.toString(),
      titulo: produto.titulo,
      valorUnitario: produto.valorUnitario,
      valorPromocional: produto.valorPromocional,
      estoque: produto.estoque,
      imagemUrl: produto.imagemUrl,
      categoriaProduto: produto.categoriaProduto || "Sem Categoria",
      ativo: produto.ativo,
      descricao: produto.descricao,
      peso: produto.peso,
      altura: produto.altura,
      largura: produto.largura,
      profundidade: produto.profundidade,
      valorCusto: produto.valorCusto,
      idCategoriaProduto: produto.idCategoriaProduto,
      idLoja: produto.idLoja,
    })
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Superior */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {loja?.lojista?.telefone || "(11) 9999-9999"}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {loja?.lojista?.email || "contato@minhaloja.com"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {loja?.lojista?.nomeCompleto || "Lojista"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Facebook className="h-4 w-4 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-4 w-4 hover:text-pink-400 cursor-pointer" />
              <Twitter className="h-4 w-4 hover:text-blue-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">{loja?.nomeLoja}</h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:block">Contato</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="hidden md:block">Favoritos</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 relative"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:block">Carrinho</span>
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{cart.itemCount}</Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Principal */}
       <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Bem-vindo à {loja?.nomeLoja}</h2>
          <p className="text-xl mb-8 opacity-90">Descubra produtos de qualidade com os melhores preços</p>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Confira nossa seleção especial de produtos</p>
          </div>

          {!isLoading && !error && produtosEmDestaque.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {produtosEmDestaque.map((produto) => {
                const rating = getProductRating(produto.id)
                const temDesconto = produto.valorPromocional && produto.valorPromocional < produto.valorUnitario
                const desconto = temDesconto
                  ? Math.round(((produto.valorUnitario - produto.valorPromocional!) / produto.valorUnitario) * 100)
                  : 0

                return (
                  <Card key={produto.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gray-100">
                        {produto.imagemUrl ? (
                          <Image
                            src={produto.imagemUrl || "/placeholder.svg"}
                            alt={produto.titulo}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            width={500}
                            height={300}
                          />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">Sem imagem</span>
                          </div>
                        )}
                        {temDesconto && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{desconto}%</Badge>
                        )}
                        {produto.estoque === 0 && (
                          <Badge className="absolute top-2 right-2 bg-gray-500 text-white">Esgotado</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {produto.categoriaProduto || "Sem Categoria"}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{produto.titulo}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              R${" "}
                              {((produto.valorPromocional ?? produto.valorUnitario) || 0).toFixed(2).replace(".", ",")}
                            </span>
                            {produto.valorPromocional && produto.valorPromocional < produto.valorUnitario && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                R$ {produto.valorUnitario.toFixed(2).replace(".", ",")}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={produto.estoque === 0}
                          onClick={() => handleAddToCart(produto)}
                        >
                          {produto.estoque === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Todos os Produtos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore todos os nossos produtos por categoria</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={selectedCategory === categoria ? "default" : "outline"}
                onClick={() => setSelectedCategory(categoria)}
                className={selectedCategory === categoria ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {categoria}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {!isLoading && !error && produtosFiltrados.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {produtosFiltrados.map((produto) => {
                const rating = getProductRating(produto.id)
                const temDesconto = produto.valorPromocional && produto.valorPromocional < produto.valorUnitario
                const desconto = temDesconto
                  ? Math.round(((produto.valorUnitario - produto.valorPromocional!) / produto.valorUnitario) * 100)
                  : 0

                return (
                  <Card key={produto.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gray-100">
                        {produto.imagemUrl ? (
                          <Image
                            src={produto.imagemUrl || "/placeholder.svg"}
                            alt={produto.titulo}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            width={500}
                            height={300}
                          />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">Sem imagem</span>
                          </div>
                        )}
                        {temDesconto && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{desconto}%</Badge>
                        )}
                        {produto.estoque === 0 && (
                          <Badge className="absolute top-2 right-2 bg-gray-500 text-white">Esgotado</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {produto.categoriaProduto || "Sem Categoria"}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{produto.titulo}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              R${" "}
                              {((produto.valorPromocional ?? produto.valorUnitario) || 0).toFixed(2).replace(".", ",")}
                            </span>
                            {produto.valorPromocional && produto.valorPromocional < produto.valorUnitario && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                R$ {produto.valorUnitario.toFixed(2).replace(".", ",")}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={produto.estoque === 0}
                          onClick={() => handleAddToCart(produto)}
                        >
                          {produto.estoque === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {!isLoading && !error && produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">{loja?.nomeLoja}</h3>
              <p className="mb-4">{loja?.descricao || "Sua loja online com os melhores produtos."}</p>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2">
                {categorias.slice(1, 5).map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{loja?.lojista?.nomeCompleto || "Lojista"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{loja?.lojista?.telefone || "(11) 9999-9999"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{loja?.lojista?.email || "contato@minhaloja.com"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 {loja?.nomeLoja}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  )
}
