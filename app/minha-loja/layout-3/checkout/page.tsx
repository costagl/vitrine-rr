"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  Minus,
  Plus,
  X,
  Sparkles,
  Heart,
  Palette,
  Gift,
} from "lucide-react"

export default function Layout3CheckoutPage() {
  const [step, setStep] = useState(1)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 1,
    "2": 2,
    "3": 1,
  })

  const produtos = [
    {
      id: "1",
      nome: "Conjunto Artístico Premium",
      preco: 189.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cores: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      tipo: "Kit Completo",
    },
    {
      id: "2",
      nome: "Tinta Acrílica Vibrante",
      preco: 45.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cores: ["#FF1493", "#00CED1", "#FFD700"],
      tipo: "60ml",
    },
    {
      id: "3",
      nome: "Pincéis Profissionais",
      preco: 89.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cores: ["#8B4513", "#D2691E"],
      tipo: "Set 12 pcs",
    },
  ]

  const subtotal = produtos.reduce((acc, produto) => acc + produto.preco * quantities[produto.id], 0)
  const frete = subtotal > 150 ? 0 : 12.9
  const total = subtotal + frete

  const updateQuantity = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + change),
    }))
  }

  const removeItem = (id: string) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev }
      delete newQuantities[id]
      return newQuantities
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header Criativo */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/layout-3"
              className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Arte & Criação
                </span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Finalizar Compra
            </h1>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-purple-600 font-medium">Seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Criativo */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-6">
                <div className={`flex flex-col items-center ${step >= 1 ? "text-purple-600" : "text-gray-400"}`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= 1
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Gift className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide">ENTREGA</span>
                </div>
                <div
                  className={`w-12 h-1 rounded-full ${
                    step >= 2 ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"
                  } transition-all`}
                ></div>
                <div className={`flex flex-col items-center ${step >= 2 ? "text-purple-600" : "text-gray-400"}`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= 2
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide">PAGAMENTO</span>
                </div>
                <div
                  className={`w-12 h-1 rounded-full ${
                    step >= 3 ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"
                  } transition-all`}
                ></div>
                <div className={`flex flex-col items-center ${step >= 3 ? "text-purple-600" : "text-gray-400"}`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= 3
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide">SUCESSO</span>
                </div>
              </div>
            </div>

            {/* Step 1: Dados de Entrega */}
            {step === 1 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Dados de Entrega
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nome" className="text-purple-700 font-medium">
                          Nome Completo
                        </Label>
                        <Input
                          id="nome"
                          placeholder="Seu nome artístico"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-purple-700 font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="artista@email.com"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="telefone" className="text-purple-700 font-medium">
                          Telefone
                        </Label>
                        <Input
                          id="telefone"
                          placeholder="(11) 99999-9999"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf" className="text-purple-700 font-medium">
                          CPF
                        </Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="endereco" className="text-purple-700 font-medium">
                        Endereço Completo
                      </Label>
                      <Input
                        id="endereco"
                        placeholder="Rua dos Artistas, 123"
                        className="border-purple-200 focus:border-purple-400 bg-white/50"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="cidade" className="text-purple-700 font-medium">
                          Cidade
                        </Label>
                        <Input
                          id="cidade"
                          placeholder="São Paulo"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="estado" className="text-purple-700 font-medium">
                          Estado
                        </Label>
                        <Select>
                          <SelectTrigger className="border-purple-200 focus:border-purple-400 bg-white/50">
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sp">SP</SelectItem>
                            <SelectItem value="rj">RJ</SelectItem>
                            <SelectItem value="mg">MG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cep" className="text-purple-700 font-medium">
                          CEP
                        </Label>
                        <Input
                          id="cep"
                          placeholder="01234-567"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-3 shadow-lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Pagamento */}
            {step === 2 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Forma de Pagamento
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="cursor-pointer border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
                      <CardContent className="p-6 text-center">
                        <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                        <p className="font-bold text-purple-700">Cartão</p>
                        <p className="text-sm text-purple-500">12x sem juros</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PIX</span>
                        </div>
                        <p className="font-bold">PIX</p>
                        <p className="text-sm text-green-600">10% desconto</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="w-8 h-8 bg-orange-600 rounded-full mx-auto mb-3"></div>
                        <p className="font-bold">Boleto</p>
                        <p className="text-sm text-orange-600">5% desconto</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="numeroCartao" className="text-purple-700 font-medium">
                        Número do Cartão
                      </Label>
                      <Input
                        id="numeroCartao"
                        placeholder="0000 0000 0000 0000"
                        className="border-purple-200 focus:border-purple-400 bg-white/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="validade" className="text-purple-700 font-medium">
                          Validade
                        </Label>
                        <Input
                          id="validade"
                          placeholder="MM/AA"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-purple-700 font-medium">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="000"
                          className="border-purple-200 focus:border-purple-400 bg-white/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nomeCartao" className="text-purple-700 font-medium">
                        Nome no Cartão
                      </Label>
                      <Input
                        id="nomeCartao"
                        placeholder="Nome como está no cartão"
                        className="border-purple-200 focus:border-purple-400 bg-white/50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full py-3"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-3 shadow-lg"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmação */}
            {step === 3 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl text-center">
                <CardContent className="p-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Pedido Confirmado!
                  </h2>
                  <p className="text-gray-600 mb-4">Seu pedido #ART-12345 foi realizado com sucesso.</p>
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 mb-6">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Pagamento Aprovado
                  </Badge>
                  <div className="space-y-2 text-sm text-gray-600 mb-8">
                    <p>Você receberá um email de confirmação em breve.</p>
                    <p>Seus materiais de arte chegarão em 2-4 dias úteis</p>
                    <p className="text-purple-600 font-medium">✨ Prepare-se para criar obras incríveis!</p>
                  </div>
                  <div className="flex gap-4 max-w-md mx-auto">
                    <Button
                      variant="outline"
                      className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full bg-transparent"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Acompanhar Pedido
                    </Button>
                    <Link href="/layout-3" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full">
                        <Palette className="h-4 w-4 mr-2" />
                        Continuar Criando
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Resumo do Pedido
                </h3>
                <div className="space-y-4">
                  {produtos
                    .filter((produto) => quantities[produto.id])
                    .map((produto) => (
                      <div key={produto.id} className="flex items-center gap-3 pb-4 border-b border-purple-100">
                        <div className="relative">
                          <img
                            src={produto.imagem || "/placeholder.svg"}
                            alt={produto.nome}
                            className="w-16 h-16 object-cover rounded-lg border-2 border-purple-100"
                          />
                          <div className="absolute -top-1 -right-1 flex gap-1">
                            {produto.cores.slice(0, 3).map((cor, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-white shadow-sm"
                                style={{ backgroundColor: cor }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-800">{produto.nome}</h4>
                          <p className="text-xs text-purple-600">{produto.tipo}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-purple-100 rounded-full"
                              onClick={() => updateQuantity(produto.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-bold text-purple-600">{quantities[produto.id]}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-purple-100 rounded-full"
                              onClick={() => updateQuantity(produto.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 ml-auto text-gray-400 hover:text-red-500 rounded-full"
                              onClick={() => removeItem(produto.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">
                            R$ {(produto.preco * quantities[produto.id]).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}

                  <Separator className="bg-purple-100" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Truck className="h-4 w-4" />
                        Frete
                      </span>
                      <span className={frete === 0 ? "text-green-600 font-bold" : "font-medium"}>
                        {frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}
                      </span>
                    </div>
                    {frete === 0 && (
                      <p className="text-xs text-green-600 font-medium">
                        <Sparkles className="h-3 w-3 inline mr-1" />
                        Frete grátis em compras acima de R$ 150
                      </p>
                    )}
                  </div>

                  <Separator className="bg-purple-100" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100 mt-6">
                    <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
                      <Shield className="h-4 w-4" />
                      <span>Compra 100% Segura</span>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">
                      Seus dados estão protegidos e sua criatividade garantida
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100 mt-4">
                    <div className="flex items-center gap-2 text-orange-700 text-sm font-medium">
                      <Gift className="h-4 w-4" />
                      <span>Brinde Especial</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">
                      Ganhe um kit de pincéis extras em compras acima de R$ 200
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
