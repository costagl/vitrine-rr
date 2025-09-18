import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, User, Menu, ArrowRight, Play, Zap, Award, Users } from "lucide-react"

export default function Layout2Page() {
  const produtos = [
    {
      id: 1,
      nome: "Smartphone Pro Max",
      preco: 2499.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Eletrônicos",
      novo: true,
    },
    {
      id: 2,
      nome: "Fones Wireless Premium",
      preco: 399.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Áudio",
      destaque: true,
    },
    {
      id: 3,
      nome: "Notebook Ultra Slim",
      preco: 3299.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Computadores",
    },
    {
      id: 4,
      nome: "Smartwatch Fitness",
      preco: 899.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Wearables",
      novo: true,
    },
    {
      id: 5,
      nome: "Câmera Digital 4K",
      preco: 1899.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Fotografia",
    },
    {
      id: 6,
      nome: 'Tablet Pro 12"',
      preco: 1599.9,
      imagem: "/placeholder.svg?height=400&width=400",
      categoria: "Tablets",
      destaque: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Minimalista */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-light tracking-wide">TECH STORE</h1>

              {/* Menu Desktop */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="#" className="text-gray-600 hover:text-black transition-colors font-light">
                  Produtos
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black transition-colors font-light">
                  Categorias
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black transition-colors font-light">
                  Sobre
                </Link>
                <Link href="#" className="text-gray-600 hover:text-black transition-colors font-light">
                  Contato
                </Link>
              </nav>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar..."
                  className="pl-10 w-64 border-0 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              <Button variant="ghost" size="sm" className="p-2">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="p-2 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>

              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Minimalista */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gray-100 text-gray-800 hover:bg-gray-100">Nova Coleção 2024</Badge>
              <h2 className="text-5xl lg:text-6xl font-light mb-6 leading-tight">
                Tecnologia que
                <span className="block font-normal">inspira</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                Descubra os produtos mais inovadores do mercado com design excepcional e performance incomparável.
              </p>
              <div className="flex items-center gap-4">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-none">
                  Explorar Produtos
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 font-light">
                  <Play className="h-4 w-4" />
                  Ver Vídeo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Produto em destaque"
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-light mb-2">50k+</div>
              <div className="text-gray-600 font-light">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">1000+</div>
              <div className="text-gray-600 font-light">Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">99%</div>
              <div className="text-gray-600 font-light">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">24/7</div>
              <div className="text-gray-600 font-light">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Grid Minimalista */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Uma seleção cuidadosa dos melhores produtos de tecnologia para você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <Card key={produto.id} className="group border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-gray-50 aspect-square mb-6">
                    <img
                      src={produto.imagem || "/placeholder.svg"}
                      alt={produto.nome}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    {produto.novo && (
                      <Badge className="absolute top-4 left-4 bg-black text-white rounded-none">NOVO</Badge>
                    )}
                    {produto.destaque && (
                      <Badge className="absolute top-4 left-4 bg-yellow-400 text-black rounded-none">DESTAQUE</Badge>
                    )}
                  </div>

                  <div className="px-2">
                    <div className="text-sm text-gray-500 font-light mb-2">{produto.categoria}</div>
                    <h3 className="font-light text-lg mb-3 group-hover:text-gray-600 transition-colors">
                      {produto.nome}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light">R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Entrega Rápida</h3>
              <p className="text-gray-600 font-light">
                Receba seus produtos em até 24h em São Paulo e região metropolitana
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Garantia Premium</h3>
              <p className="text-gray-600 font-light">
                Todos os produtos com garantia estendida e suporte técnico especializado
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">Suporte 24/7</h3>
              <p className="text-gray-600 font-light">Atendimento especializado disponível todos os dias da semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Minimalista */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-4">Fique por dentro</h2>
          <p className="text-gray-400 font-light mb-8 max-w-md mx-auto">
            Receba as últimas novidades e ofertas exclusivas
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <Input
                placeholder="Seu email"
                className="flex-1 bg-transparent border-gray-600 border-r-0 rounded-r-none focus:border-white"
              />
              <Button className="bg-white text-black hover:bg-gray-100 rounded-l-none px-8">Inscrever</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-light mb-6">TECH STORE</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Sua loja de tecnologia com os melhores produtos e atendimento excepcional.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-600 font-light">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Notebooks
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Acessórios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Wearables
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-600 font-light">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Garantia
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-600 font-light">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Imprensa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Investidores
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 text-center">
            <p className="text-gray-600 font-light">&copy; 2024 Tech Store. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
