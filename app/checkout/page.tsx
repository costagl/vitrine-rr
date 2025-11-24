"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, FileText, Shield, Check, ArrowLeft } from "lucide-react"
import { Suspense } from "react"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

const plans: Record<string, Plan> = {
  basico: {
    id: "basico",
    name: "Básico",
    price: 0,
    description: "Ideal para iniciantes",
    features: ["Até 5 produtos", "Análises básicas", "Suporte por email", "1GB de armazenamento"],
  },
  profissional: {
    id: "profissional",
    name: "Profissional",
    price: 79,
    description: "Perfeito para negócios em crescimento",
    features: ["Até 50 produtos", "Análises avançadas", "Suporte prioritário", "10GB de armazenamento"],
  },
  empresarial: {
    id: "empresarial",
    name: "Empresarial",
    price: 199,
    description: "Para grandes empresas",
    features: ["Produtos ilimitados", "Análises em tempo real", "Suporte 24/7", "100GB de armazenamento"],
  },
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plano") || "basico"
  const selectedPlan = plans[planId] || plans.basico

  const [paymentMethod, setPaymentMethod] = useState("cartao")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  if (!planId || !plans[planId]) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Plano não encontrado</CardTitle>
            <CardDescription>
              O plano selecionado não foi encontrado. Por favor, volte à página de planos e selecione um plano válido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/planos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar aos Planos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Pagamento processado com sucesso!")
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 -ml-2">
            <Link href="/planos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos planos
            </Link>
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Finalizar Compra</h1>
              <p className="text-muted-foreground">
                Complete seus dados para ativar o plano{" "}
                <span className="font-semibold text-foreground">{selectedPlan.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold ${
                    step <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Dados Pessoais
            </span>
            <span className={currentStep >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Pagamento
            </span>
            <span className={currentStep >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Confirmação
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <Card className="border-2">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                    <div>
                      <CardTitle>Dados Pessoais</CardTitle>
                      <CardDescription>Informações para sua conta</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input id="nome" placeholder="Seu nome completo" className="h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" className="h-11" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input id="telefone" placeholder="(11) 99999-9999" className="h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input id="cpf" placeholder="000.000.000-00" className="h-11" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados da Empresa */}
              <Card className="border-2">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-base">Dados da Empresa (Opcional)</CardTitle>
                  <CardDescription>Informações para emissão de nota fiscal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Nome da empresa</Label>
                      <Input id="empresa" placeholder="Nome da sua empresa" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" className="h-11" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                    <div>
                      <CardTitle>Método de Pagamento</CardTitle>
                      <CardDescription>Escolha como deseja pagar</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div
                      className={`relative flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        paymentMethod === "cartao" ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      <RadioGroupItem value="cartao" id="cartao" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                          <span className="block font-semibold">Cartão de Crédito</span>
                          <span className="block text-sm text-muted-foreground">Visa, Mastercard, Elo</span>
                        </Label>
                      </div>
                      {paymentMethod === "cartao" && (
                        <Badge variant="default" className="absolute top-3 right-3">
                          Selecionado
                        </Badge>
                      )}
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      <RadioGroupItem value="pix" id="pix" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <span className="block font-semibold">PIX</span>
                          <span className="block text-sm text-muted-foreground">Pagamento instantâneo</span>
                        </Label>
                      </div>
                      {paymentMethod === "pix" && (
                        <Badge variant="default" className="absolute top-3 right-3">
                          Selecionado
                        </Badge>
                      )}
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        paymentMethod === "boleto" ? "border-primary bg-primary/5" : "border-muted"
                      }`}
                    >
                      <RadioGroupItem value="boleto" id="boleto" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <FileText className="h-5 w-5" />
                        </div>
                        <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                          <span className="block font-semibold">Boleto Bancário</span>
                          <span className="block text-sm text-muted-foreground">Vencimento em 3 dias úteis</span>
                        </Label>
                      </div>
                      {paymentMethod === "boleto" && (
                        <Badge variant="default" className="absolute top-3 right-3">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                  </RadioGroup>

                  {/* Formulário do Cartão */}
                  {paymentMethod === "cartao" && (
                    <div className="mt-6 p-4 border-2 border-dashed rounded-lg space-y-4 bg-muted/30">
                      <h4 className="font-semibold text-sm">Detalhes do Cartão</h4>
                      <div className="space-y-2">
                        <Label htmlFor="numero-cartao">Número do cartão *</Label>
                        <Input id="numero-cartao" placeholder="0000 0000 0000 0000" className="h-11" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="validade">Validade *</Label>
                          <Input id="validade" placeholder="MM/AA" className="h-11" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input id="cvv" placeholder="000" className="h-11" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nome-cartao">Nome no cartão *</Label>
                        <Input id="nome-cartao" placeholder="Nome como está no cartão" className="h-11" required />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-14 text-lg font-semibold" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processando pagamento..." : `Confirmar Pagamento - R$ ${selectedPlan.price}/mês`}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Seus dados estão protegidos e criptografados</span>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2">
              <CardHeader className="bg-muted/50">
                <CardTitle>Resumo do Pedido</CardTitle>
                <CardDescription>Revise seu plano selecionado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedPlan.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      Mensal
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-3xl font-bold">R$ {selectedPlan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Recursos inclusos
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impostos e taxas</span>
                    <span className="font-medium">Inclusos</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">R$ {selectedPlan.price}</div>
                      <div className="text-xs text-muted-foreground">por mês</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pagamento Seguro</p>
                    <p className="text-xs text-muted-foreground">Protegido por criptografia SSL</p>
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
