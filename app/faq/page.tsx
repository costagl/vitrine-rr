"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Store,
  CreditCard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

const categoriasFAQ = [
  { id: "geral", nome: "Geral", icone: HelpCircle, cor: "bg-blue-100 text-blue-600" },
  { id: "loja", nome: "Loja", icone: Store, cor: "bg-green-100 text-green-600" },
  { id: "pagamentos", nome: "Pagamentos", icone: CreditCard, cor: "bg-purple-100 text-purple-600" },
  { id: "pedidos", nome: "Pedidos", icone: ShoppingCart, cor: "bg-orange-100 text-orange-600" },
  { id: "conta", nome: "Conta", icone: Settings, cor: "bg-gray-100 text-gray-600" },
  { id: "suporte", nome: "Suporte", icone: Users, cor: "bg-red-100 text-red-600" },
]

const perguntasFrequentes = [
  {
    categoria: "geral",
    pergunta: "O que é a Vitrine?",
    resposta:
      "A Vitrine é uma plataforma completa para criação de lojas online. Oferecemos todas as ferramentas necessárias para você criar, personalizar e gerenciar sua loja virtual de forma simples e profissional.",
  },
  {
    categoria: "geral",
    pergunta: "Quanto custa para usar a Vitrine?",
    resposta:
      "Oferecemos diferentes planos para atender suas necessidades. Temos um plano gratuito para começar e planos pagos com recursos avançados. Confira nossa página de planos para mais detalhes.",
  },
  {
    categoria: "loja",
    pergunta: "Como criar minha primeira loja?",
    resposta:
      "É muito simples! Após se cadastrar, você será guiado através de um processo passo a passo para configurar sua loja, adicionar produtos e personalizar o visual. Todo o processo leva apenas alguns minutos.",
  },
  {
    categoria: "loja",
    pergunta: "Posso personalizar o visual da minha loja?",
    resposta:
      "Sim! Oferecemos diversos temas profissionais e ferramentas de personalização. Você pode alterar cores, fontes, layout e adicionar sua marca para criar uma identidade única.",
  },
  {
    categoria: "loja",
    pergunta: "Quantos produtos posso adicionar?",
    resposta:
      "O número de produtos varia conforme o plano escolhido. No plano gratuito você pode adicionar até 50 produtos, e nos planos pagos o limite é muito maior ou ilimitado.",
  },
  {
    categoria: "pagamentos",
    pergunta: "Quais meios de pagamento posso aceitar?",
    resposta:
      "Você pode aceitar cartões de crédito, débito, PIX, boleto bancário e carteiras digitais. Trabalhamos com os principais gateways de pagamento do Brasil para garantir segurança e praticidade.",
  },
  {
    categoria: "pagamentos",
    pergunta: "Quando recebo o dinheiro das vendas?",
    resposta:
      "O prazo de recebimento varia conforme o meio de pagamento: PIX é imediato, cartão de débito em 1 dia útil, cartão de crédito em até 30 dias, e boleto após a compensação.",
  },
  {
    categoria: "pagamentos",
    pergunta: "Há taxas sobre as vendas?",
    resposta:
      "Sim, cobramos uma pequena taxa sobre as vendas realizadas. As taxas variam conforme o plano e meio de pagamento. Consulte nossa tabela de preços para valores detalhados.",
  },
  {
    categoria: "pedidos",
    pergunta: "Como gerencio os pedidos da minha loja?",
    resposta:
      "Através do painel administrativo você pode visualizar todos os pedidos, alterar status, enviar códigos de rastreamento e se comunicar com os clientes. Tudo de forma centralizada e organizada.",
  },
  {
    categoria: "pedidos",
    pergunta: "Como funciona o cálculo de frete?",
    resposta:
      "Integramos com os Correios e transportadoras para calcular o frete automaticamente. Você pode configurar frete grátis, frete fixo ou usar nossa calculadora integrada.",
  },
  {
    categoria: "conta",
    pergunta: "Como altero os dados da minha conta?",
    resposta:
      "Acesse o menu 'Minha Conta' no painel administrativo. Lá você pode alterar dados pessoais, senha, informações de pagamento e configurações da conta.",
  },
  {
    categoria: "conta",
    pergunta: "Posso ter mais de uma loja?",
    resposta:
      "Sim! Dependendo do seu plano, você pode criar múltiplas lojas com a mesma conta. Cada loja terá seu próprio domínio e configurações independentes.",
  },
  {
    categoria: "suporte",
    pergunta: "Como entro em contato com o suporte?",
    resposta:
      "Oferecemos suporte via chat online, email, telefone e WhatsApp. Nosso horário de atendimento é de segunda a sexta das 8h às 18h, e sábados das 9h às 14h.",
  },
  {
    categoria: "suporte",
    pergunta: "Vocês oferecem treinamento?",
    resposta:
      "Sim! Temos uma central de ajuda completa com tutoriais, vídeos e guias passo a passo. Também oferecemos webinars gratuitos e suporte personalizado para clientes dos planos premium.",
  },
]

export default function FAQPage() {
  const [termoBusca, setTermoBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas")
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null)

  const perguntasFiltradas = perguntasFrequentes.filter((item) => {
    const matchBusca =
      termoBusca === "" ||
      item.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.resposta.toLowerCase().includes(termoBusca.toLowerCase())

    const matchCategoria = categoriaAtiva === "todas" || item.categoria === categoriaAtiva

    return matchBusca && matchCategoria
  })

  const togglePergunta = (index: number) => {
    setPerguntaAberta(perguntaAberta === index ? null : index)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas rápidas para as dúvidas mais comuns sobre a Vitrine
          </p>
        </div>

        {/* Barra de Busca */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Busque por uma pergunta ou palavra-chave..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filtros por Categoria */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={categoriaAtiva === "todas" ? "default" : "outline"}
              onClick={() => setCategoriaAtiva("todas")}
              size="sm"
            >
              Todas
            </Button>
            {categoriasFAQ.map((categoria) => {
              const IconeComponente = categoria.icone
              return (
                <Button
                  key={categoria.id}
                  variant={categoriaAtiva === categoria.id ? "default" : "outline"}
                  onClick={() => setCategoriaAtiva(categoria.id)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <IconeComponente className="h-4 w-4" />
                  {categoria.nome}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Lista de Perguntas */}
        <div className="max-w-4xl mx-auto">
          {perguntasFiltradas.length > 0 ? (
            <div className="space-y-4">
              {perguntasFiltradas.map((item, index) => {
                const categoria = categoriasFAQ.find((cat) => cat.id === item.categoria)
                const IconeCategoria = categoria?.icone || HelpCircle

                return (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => togglePergunta(index)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${categoria?.cor}`}
                            >
                              <IconeCategoria className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.pergunta}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {categoria?.nome}
                              </Badge>
                            </div>
                          </div>
                          {perguntaAberta === index ? (
                            <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>

                      {perguntaAberta === index && (
                        <div className="px-6 pb-6">
                          <div className="pl-11">
                            <p className="text-gray-700 leading-relaxed">{item.resposta}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pergunta encontrada</h3>
                <p className="text-gray-600 mb-6">
                  Não encontramos perguntas que correspondam à sua busca. Tente usar outras palavras-chave.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTermoBusca("")
                    setCategoriaAtiva("todas")
                  }}
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Entrar em Contato</Button>
              <Button variant="outline" size="lg">
                Central de Ajuda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
