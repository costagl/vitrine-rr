"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  HelpCircle,
  Store,
  CreditCard,
  Settings,
  Users,
  ShoppingCart,
  ChevronRight,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const categorias = [
  {
    id: "primeiros-passos",
    titulo: "Primeiros Passos",
    icone: BookOpen,
    cor: "bg-blue-100 text-blue-600",
    artigos: [
      "Como criar minha primeira loja",
      "Configurações básicas da loja",
      "Adicionando meus primeiros produtos",
      "Personalizando o visual da loja",
    ],
  },
  {
    id: "gerenciar-loja",
    titulo: "Gerenciar Loja",
    icone: Store,
    cor: "bg-green-100 text-green-600",
    artigos: [
      "Como gerenciar produtos",
      "Organizando categorias",
      "Configurando frete e entrega",
      "Gerenciando estoque",
    ],
  },
  {
    id: "pagamentos",
    titulo: "Pagamentos",
    icone: CreditCard,
    cor: "bg-purple-100 text-purple-600",
    artigos: [
      "Configurando meios de pagamento",
      "PIX, cartão e boleto",
      "Taxas e tarifas",
      "Recebimento de pagamentos",
    ],
  },
  {
    id: "pedidos",
    titulo: "Pedidos",
    icone: ShoppingCart,
    cor: "bg-orange-100 text-orange-600",
    artigos: ["Gerenciando pedidos", "Status de pedidos", "Cancelamentos e devoluções", "Comunicação com clientes"],
  },
  {
    id: "configuracoes",
    titulo: "Configurações",
    icone: Settings,
    cor: "bg-gray-100 text-gray-600",
    artigos: ["Configurações da conta", "Domínio personalizado", "SEO e otimizações", "Integrações"],
  },
  {
    id: "suporte",
    titulo: "Suporte",
    icone: Users,
    cor: "bg-red-100 text-red-600",
    artigos: ["Como entrar em contato", "Horários de atendimento", "Canais de suporte", "Suporte técnico"],
  },
]

const artigosPopulares = [
  {
    titulo: "Como criar minha primeira loja online",
    categoria: "Primeiros Passos",
    visualizacoes: "15.2k",
  },
  {
    titulo: "Configurando meios de pagamento",
    categoria: "Pagamentos",
    visualizacoes: "12.8k",
  },
  {
    titulo: "Como adicionar produtos à minha loja",
    categoria: "Gerenciar Loja",
    visualizacoes: "11.5k",
  },
  {
    titulo: "Gerenciando pedidos e status",
    categoria: "Pedidos",
    visualizacoes: "9.3k",
  },
  {
    titulo: "Configurando frete e entrega",
    categoria: "Gerenciar Loja",
    visualizacoes: "8.7k",
  },
]

export default function CentralAjudaPage() {
  const [termoBusca, setTermoBusca] = useState("")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Central de Ajuda</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas e aprenda a usar todas as funcionalidades da Vitrine
          </p>
        </div>

        {/* Barra de Busca */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Busque por tutoriais, guias ou tire suas dúvidas..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Badge variant="secondary">Como criar loja</Badge>
              <Badge variant="secondary">Pagamentos</Badge>
              <Badge variant="secondary">Adicionar produtos</Badge>
              <Badge variant="secondary">Configurar frete</Badge>
              <Badge variant="secondary">Gerenciar pedidos</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Categorias de Ajuda */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Categorias de Ajuda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map((categoria) => {
              const IconeComponente = categoria.icone
              return (
                <Card key={categoria.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoria.cor}`}>
                        <IconeComponente className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{categoria.titulo}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoria.artigos.map((artigo, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2"
                        >
                          <span className="text-gray-700">{artigo}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Artigos Populares */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Artigos Mais Populares</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {artigosPopulares.map((artigo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{artigo.titulo}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {artigo.categoria}
                        </Badge>
                        <span>{artigo.visualizacoes} visualizações</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ainda precisa de ajuda?</h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida.
              </p>
              <Link href="/contato">
                <Button size="lg" className="w-full">
                  Entrar em Contato
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Perguntas Frequentes</h3>
              <p className="text-gray-600 mb-6">
                Confira as dúvidas mais comuns e suas respostas na nossa seção de FAQ.
              </p>
              <Link href="/faq">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Ver FAQ
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
