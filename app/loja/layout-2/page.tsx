"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Menu, ArrowRight, Zap, Award, Users, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
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

export default function Layout2Page() {
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

    if (subdominio) {
      async function fetchLojaData() {
        setIsLoading(true)
        setError(null)
        try {
          const response = await axios.get(`${API_BASE_URL}/vitrine/${subdominio}`)
          if (response.data.lojaRequest) {
            setLoja(response.data.lojaRequest)
            setProdutos(response.data.lojaRequest.produtos || [])
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 text-gray-700 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {loja?.lojista?.telefone || "(11) 9999-9999"}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {loja?.lojista?.email || "contato@minhaloja.com"}
            </span>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-light tracking-wide">{loja?.nomeLoja || "MINHA LOJA"}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-0 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              <Button variant="ghost" size="sm" className="p-2">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="p-2 relative" onClick={() => setIsCartModalOpen(true)}>
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              </Button>

              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gray-100 text-gray-800 hover:bg-gray-100">Produtos de Qualidade</Badge>
              <h2 className="text-5xl lg:text-6xl font-light mb-6 leading-tight">
                Produtos que
                <span className="block font-normal">inspiram</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                Descubra uma seleção especial de produtos com qualidade excepcional e design diferenciado.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                {/* <Image
                  src="/modern-product-showcase.png"
                  alt="Produto em destaque"
                  className="w-4/5 h-4/5 object-contain"
                  width={500}
                  height={500}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Uma seleção cuidadosa dos melhores produtos para você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtosEmDestaque.map((produto) => (
              <Card key={produto.id} className="group border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-gray-50 aspect-square mb-6">
                    <Image
                      src={produto.imagemUrl || "/placeholder.svg"}
                      alt={produto.titulo}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      width={500}
                      height={300}
                    />
                  </div>

                  <div className="px-2">
                    <div className="text-sm text-gray-500 font-light mb-2">{produto.categoriaProduto}</div>
                    <h3 className="font-light text-lg mb-3 group-hover:text-gray-600 transition-colors">
                      {produto.titulo}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                                            <span className="text-xl font-light">
                        R$ {((produto.valorPromocional ?? produto.valorUnitario) || 0).toFixed(2).replace(".", ",")}
                      </span>
                      {produto.estoque === 0 ? (
                        <Badge variant="outline" className="rounded-none">Esgotado</Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                          onClick={() => handleAddToCart(produto)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Todos os Produtos</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">Explore todos os nossos produtos por categoria</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={selectedCategory === categoria ? "default" : "outline"}
                onClick={() => setSelectedCategory(categoria)}
                className={selectedCategory === categoria ? "bg-black hover:bg-gray-800" : "hover:bg-gray-100"}
                size="sm"
              >
                {categoria}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map((produto) => (
              <Card key={produto.id} className="group border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-gray-50 aspect-square mb-6">
                    <Image
                      src={produto.imagemUrl || "/placeholder.svg"}
                      alt={produto.titulo}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      width={500}
                      height={300}
                    />
                  </div>

                  <div className="px-2">
                    <div className="text-sm text-gray-500 font-light mb-2">{produto.categoriaProduto}</div>
                    <h3 className="font-light text-lg mb-3 group-hover:text-gray-600 transition-colors">
                      {produto.titulo}
                    </h3>
                    <div className="flex items-center justify-between">
                                            <span className="text-xl font-light">
                        R$ {((produto.valorPromocional ?? produto.valorUnitario) || 0).toFixed(2).replace(".", ",")}
                      </span>
                      {produto.estoque === 0 ? (
                        <Badge variant="outline" className="rounded-none">Esgotado</Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                          onClick={() => handleAddToCart(produto)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 font-light">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Entrega Rápida</h3>
              <p className="text-gray-600 font-light">Receba seus produtos com agilidade e segurança</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Qualidade Garantida</h3>
              <p className="text-gray-600 font-light">Todos os produtos com garantia e suporte especializado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Suporte 24/7</h3>
              <p className="text-gray-600 font-light">Atendimento disponível todos os dias da semana</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-light mb-6">{loja?.nomeLoja || "MINHA LOJA"}</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                {loja?.descricao || "Sua loja online com os melhores produtos e atendimento excepcional."}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-600 font-light">
                {categorias.slice(1, 5).map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contato</h4>
              <div className="space-y-2 text-gray-600 font-light">
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

          <div className="border-t border-gray-100 mt-12 pt-8 text-center">
            <p className="text-gray-600 font-light">
              &copy; 2025 {loja?.nomeLoja || "Minha Loja"}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  )
}
