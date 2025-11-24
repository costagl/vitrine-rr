"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, User, ShoppingBag, CreditCard, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Endereco {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

interface ItemPedido {
  idProduto: number
  quantidade: number
  precoUnitario: number
  precoTotal: number
}

interface Pedido {
  idLoja: number
  idEnderecoEntrega: number
  freteValor: number
}

interface ClienteEnderecoPedidoVM {
  cpf: string
  nomeCompleto: string
  email: string
  telefone: string
  enderecosEntrega: Endereco[]
  pedidos: Pedido[]
  itensPedido: ItemPedido[]
}

const Checkout = () => {
  const [formData, setFormData] = useState<ClienteEnderecoPedidoVM>({
    cpf: "",
    nomeCompleto: "",
    email: "",
    telefone: "",
    enderecosEntrega: [
      {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
    ],
    pedidos: [
      {
        idLoja: 4,
        idEnderecoEntrega: 1,
        freteValor: 20.0,
      },
    ],
    itensPedido: [
      {
        idProduto: 3,
        quantidade: 2,
        precoUnitario: 50.0,
        precoTotal: 100.0,
      },
    ],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedEndereco = { ...formData.enderecosEntrega[0], [name]: value } // Modificando apenas o primeiro endereço
    setFormData({
      ...formData,
      enderecosEntrega: [updatedEndereco], // Garantindo que apenas o primeiro endereço será atualizado
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://localhost:7083/pedido/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log(data.message)
      console.log(data.error)

      if (!response.ok) {
        throw new Error("Erro ao cadastrar o pedido")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with progress indicator */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Finalizar Pedido</h1>
          <p className="text-muted-foreground">Complete as informações abaixo para finalizar sua compra</p>

          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium">Informações</span>
            </div>
            <div className="h-[2px] w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm text-muted-foreground">Pagamento</span>
            </div>
            <div className="h-[2px] w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm text-muted-foreground">Confirmação</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>Dados do cliente</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeCompleto">Nome Completo</Label>
                    <Input
                      type="text"
                      id="nomeCompleto"
                      name="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleChange}
                      required
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle>Endereço de Entrega</CardTitle>
                      <CardDescription>Para onde enviaremos seu pedido</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="logradouro">Logradouro</Label>
                      <Input
                        type="text"
                        id="logradouro"
                        name="logradouro"
                        value={formData.enderecosEntrega[0].logradouro}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.enderecosEntrega[0].numero}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formData.enderecosEntrega[0].complemento}
                        onChange={handleEnderecoChange}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={formData.enderecosEntrega[0].bairro}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Nome do bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        type="text"
                        id="cep"
                        name="cep"
                        value={formData.enderecosEntrega[0].cep}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.enderecosEntrega[0].cidade}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        type="text"
                        id="estado"
                        name="estado"
                        value={formData.enderecosEntrega[0].estado}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product items */}
                  <div className="space-y-3">
                    {formData.itensPedido.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">Produto {item.idProduto}</p>
                          <p className="text-muted-foreground">Qtd: {item.quantidade}</p>
                        </div>
                        <p className="font-medium">R$ {item.precoTotal.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        R$ {formData.itensPedido.reduce((acc, item) => acc + item.precoTotal, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="font-medium">R$ {formData.pedidos[0].freteValor.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      R${" "}
                      {(
                        formData.itensPedido.reduce((acc, item) => acc + item.precoTotal, 0) +
                        formData.pedidos[0].freteValor
                      ).toFixed(2)}
                    </span>
                  </div>

                  {/* Security badge */}
                  <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">Compra 100% segura e protegida</span>
                  </div>

                  {/* Submit button */}
                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Finalizar Pedido
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
