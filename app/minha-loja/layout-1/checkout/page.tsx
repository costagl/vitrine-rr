"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, CheckCircle, Minus, Plus, X } from "lucide-react"

export default function Layout1CheckoutPage() {
  const [step, setStep] = useState(1)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 2,
    "2": 1,
    "3": 1,
  })

  const produtos = [
    {
      id: "1",
      nome: "Camiseta Básica Premium",
      preco: 49.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Azul",
      tamanho: "M",
    },
    {
      id: "2",
      nome: "Calça Jeans Skinny",
      preco: 89.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Azul Escuro",
      tamanho: "38",
    },
    {
      id: "3",
      nome: "Tênis Casual Confort",
      preco: 159.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Branco",
      tamanho: "42",
    },
  ]

  const subtotal = produtos.reduce((acc, produto) => acc + produto.preco * quantities[produto.id], 0)
  const frete = subtotal > 99 ? 0 : 15.9
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/layout-1" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar à loja</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Compra Segura</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-2 font-medium">Entrega</span>
                </div>
                <div className={`w-8 h-0.5 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <div className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-2 font-medium">Pagamento</span>
                </div>
                <div className={`w-8 h-0.5 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <div className={`flex items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-2 font-medium">Confirmação</span>
                </div>
              </div>
            </div>

            {/* Step 1: Dados de Entrega */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Dados de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(11) 99999-9999" />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input id="endereco" placeholder="Rua, número" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input id="bairro" placeholder="Seu bairro" />
                    </div>
                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="Sua cidade" />
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">SP</SelectItem>
                          <SelectItem value="rj">RJ</SelectItem>
                          <SelectItem value="mg">MG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700">
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Pagamento */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="cursor-pointer border-2 border-blue-600 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-medium">Cartão</p>
                        <p className="text-sm text-gray-600">12x sem juros</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer border-2 hover:border-blue-300">
                      <CardContent className="p-4 text-center">
                        <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PIX</span>
                        </div>
                        <p className="font-medium">PIX</p>
                        <p className="text-sm text-gray-600">5% desconto</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer border-2 hover:border-blue-300">
                      <CardContent className="p-4 text-center">
                        <div className="w-8 h-8 bg-orange-600 rounded mx-auto mb-2"></div>
                        <p className="font-medium">Boleto</p>
                        <p className="text-sm text-gray-600">3 dias úteis</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="numero-cartao">Número do Cartão</Label>
                      <Input id="numero-cartao" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="validade">Validade</Label>
                        <Input id="validade" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="000" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nome-cartao">Nome no Cartão</Label>
                      <Input id="nome-cartao" placeholder="Nome como está no cartão" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Voltar
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmação */}
            {step === 3 && (
              <Card className="text-center">
                <CardContent className="p-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
                  <p className="text-gray-600 mb-4">Seu pedido #12345 foi realizado com sucesso.</p>
                  <Badge className="bg-green-100 text-green-800 mb-6">Pagamento Aprovado</Badge>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <p>Você receberá um email de confirmação em breve.</p>
                    <p>Prazo de entrega: 3-5 dias úteis</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Acompanhar Pedido
                    </Button>
                    <Link href="/layout-1" className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Continuar Comprando</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {produtos
                  .filter((produto) => quantities[produto.id])
                  .map((produto) => (
                    <div key={produto.id} className="flex items-center gap-3 pb-3 border-b">
                      <img
                        src={produto.imagem || "/placeholder.svg"}
                        alt={produto.nome}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{produto.nome}</h4>
                        <p className="text-xs text-gray-500">
                          {produto.cor} • {produto.tamanho}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(produto.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{quantities[produto.id]}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(produto.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-auto text-red-500 hover:text-red-700"
                            onClick={() => removeItem(produto.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {(produto.preco * quantities[produto.id]).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      Frete
                    </span>
                    <span className={frete === 0 ? "text-green-600 font-medium" : ""}>
                      {frete === 0 ? "GRÁTIS" : `R$ ${frete.toFixed(2)}`}
                    </span>
                  </div>
                  {frete === 0 && <p className="text-xs text-green-600">Frete grátis em compras acima de R$ 99</p>}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">R$ {total.toFixed(2)}</span>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 text-sm">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Compra 100% Segura</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Seus dados estão protegidos com certificado SSL</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
