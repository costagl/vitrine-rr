import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  Truck,
  Shield,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"

export default function Layout1Page() {
  const produtos = [
    {
      id: 1,
      nome: "Camiseta Básica Premium",
      preco: 49.9,
      precoOriginal: 69.9,
      imagem: "/placeholder.svg?height=300&width=300",
      categoria: "Roupas",
      rating: 4.5,
      avaliacoes: 128,
      desconto: 30,
    },
    {
      id: 2,
      nome: "Calça Jeans Skinny",
      preco: 89.9,
      imagem: "/placeholder.svg?height=300&width=300",
      categoria: "Roupas",
      rating: 4.8,
      avaliacoes: 95,
    },
    {
      id: 3,
      nome: "Tênis Casual Confort",
      preco: 159.9,
      precoOriginal: 199.9,
      imagem: "/placeholder.svg?height=300&width=300",
      categoria: "Calçados",
      rating: 4.7,
      avaliacoes: 203,
      desconto: 20,
    },
    {
      id: 4,
      nome: "Jaqueta de Couro",
      preco: 299.9,
      imagem: "/placeholder.svg?height=300&width=300",
      categoria: "Roupas",
      rating: 4.9,
      avaliacoes: 67,
    },
  ]

  const categorias = ["Roupas Masculinas", "Roupas Femininas", "Calçados", "Acessórios", "Bolsas", "Relógios"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Superior */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (11) 9999-9999
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              contato@minhaloja.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Frete grátis acima de R$ 99</span>
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
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Minha Loja</h1>
            </div>

            {/* Barra de Busca */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Ações do Usuário */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:block">Minha Conta</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="hidden md:block">Favoritos</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:block">Carrinho</span>
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">3</Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu de Navegação */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3">
            {categorias.map((categoria, index) => (
              <Link key={index} href="#" className="hover:text-blue-200 transition-colors font-medium">
                {categoria}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Banner Principal */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Coleção Verão 2024</h2>
          <p className="text-xl mb-8 opacity-90">Descubra as últimas tendências da moda com até 50% de desconto</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            Ver Coleção
          </Button>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Em compras acima de R$ 99 para todo o Brasil</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">Seus dados protegidos com certificado SSL</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Parcelamento</h3>
              <p className="text-gray-600">Em até 12x sem juros no cartão de crédito</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtos.map((produto) => (
              <Card key={produto.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={produto.imagem || "/placeholder.svg"}
                      alt={produto.nome}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {produto.desconto && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{produto.desconto}%</Badge>
                    )}
                    <Button
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      variant="secondary"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {produto.categoria}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{produto.nome}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(produto.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({produto.avaliacoes})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          R$ {produto.preco.toFixed(2).replace(".", ",")}
                        </span>
                        {produto.precoOriginal && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            R$ {produto.precoOriginal.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Adicionar ao Carrinho</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Receba Nossas Ofertas</h2>
          <p className="text-xl mb-8 opacity-90">Cadastre-se e seja o primeiro a saber sobre promoções exclusivas</p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Seu melhor email" className="flex-1 bg-white text-gray-900" />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6">Cadastrar</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Minha Loja</h3>
              <p className="mb-4">Sua loja de moda online com as melhores tendências e preços incríveis.</p>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Roupas Masculinas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Roupas Femininas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Calçados
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Acessórios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Rastrear Pedido
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@minhaloja.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Minha Loja. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
