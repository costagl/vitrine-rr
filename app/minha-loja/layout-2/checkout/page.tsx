"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, Minus, Plus, X } from "lucide-react"

export default function Layout2CheckoutPage() {
  const [step, setStep] = useState(1)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 1,
    "2": 1,
    "3": 1,
  })

  const produtos = [
    {
      id: "1",
      nome: "Smartphone Pro Max",
      preco: 2499.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Preto",
      memoria: "256GB",
    },
    {
      id: "2",
      nome: "Fones Wireless Premium",
      preco: 399.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Branco",
      modelo: "Over-ear",
    },
    {
      id: "3",
      nome: "Smartwatch Fitness",
      preco: 899.9,
      imagem: "/placeholder.svg?height=80&width=80",
      cor: "Preto",
      tamanho: "44mm",
    },
  ]

  const subtotal = produtos.reduce((acc, produto) => acc + produto.preco * quantities[produto.id], 0)
  const frete = 0 // Frete grátis para eletrônicos
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
      {/* Header Minimalista */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/layout-2" className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-light">TECH STORE</span>
            </Link>
            <h1 className="text-2xl font-light tracking-wide">Checkout</h1>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-light text-gray-600">Secure</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-3 space-y-8">
            {/* Progress Minimalista */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-8">
                <div className={`flex flex-col items-center ${step >= 1 ? "text-black" : "text-gray-300"}`}>
                  <div
                    className={`w-2 h-2 rounded-full mb-2 ${step >= 1 ? "bg-black" : "bg-gray-300"} transition-colors`}
                  ></div>
                  <span className="text-xs font-light tracking-wide">SHIPPING</span>
                </div>
                <div className={`w-16 h-px ${step >= 2 ? "bg-black" : "bg-gray-200"} transition-colors`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? "text-black" : "text-gray-300"}`}>
                  <div
                    className={`w-2 h-2 rounded-full mb-2 ${step >= 2 ? "bg-black" : "bg-gray-300"} transition-colors`}
                  ></div>
                  <span className="text-xs font-light tracking-wide">PAYMENT</span>
                </div>
                <div className={`w-16 h-px ${step >= 3 ? "bg-black" : "bg-gray-200"} transition-colors`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? "text-black" : "text-gray-300"}`}>
                  <div
                    className={`w-2 h-2 rounded-full mb-2 ${step >= 3 ? "bg-black" : "bg-gray-300"} transition-colors`}
                  ></div>
                  <span className="text-xs font-light tracking-wide">CONFIRM</span>
                </div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light mb-8">Shipping Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-light text-gray-600">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-light text-gray-600">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-light text-gray-600">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-sm font-light text-gray-600">
                        Address
                      </Label>
                      <Input
                        id="address"
                        className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city" className="text-sm font-light text-gray-600">
                          City
                        </Label>
                        <Input
                          id="city"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-light text-gray-600">
                          State
                        </Label>
                        <Select>
                          <SelectTrigger className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent">
                            <SelectValue placeholder="SP" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sp">SP</SelectItem>
                            <SelectItem value="rj">RJ</SelectItem>
                            <SelectItem value="mg">MG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-sm font-light text-gray-600">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="01234-567"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-none py-3 font-light tracking-wide"
                >
                  CONTINUE TO PAYMENT
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light mb-8">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="border-2 border-black bg-gray-50 p-6 cursor-pointer">
                      <CreditCard className="h-6 w-6 mb-3" />
                      <p className="font-light">Credit Card</p>
                      <p className="text-xs text-gray-500">Visa, Mastercard</p>
                    </div>
                    <div className="border border-gray-200 p-6 cursor-pointer hover:border-gray-400 transition-colors">
                      <div className="w-6 h-6 bg-green-600 rounded mb-3 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">PIX</span>
                      </div>
                      <p className="font-light">PIX</p>
                      <p className="text-xs text-gray-500">Instant payment</p>
                    </div>
                    <div className="border border-gray-200 p-6 cursor-pointer hover:border-gray-400 transition-colors">
                      <div className="w-6 h-6 bg-orange-600 rounded mb-3"></div>
                      <p className="font-light">Bank Transfer</p>
                      <p className="text-xs text-gray-500">2-3 business days</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm font-light text-gray-600">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="expiry" className="text-sm font-light text-gray-600">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm font-light text-gray-600">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-sm font-light text-gray-600">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardName"
                        className="border-0 border-b border-gray-300 rounded-none focus:border-black bg-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-gray-300 rounded-none py-3 font-light tracking-wide bg-transparent"
                  >
                    BACK
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none py-3 font-light tracking-wide"
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-black mx-auto mb-6" />
                <h2 className="text-4xl font-light mb-4">Order Confirmed</h2>
                <p className="text-gray-600 font-light mb-6">Your order #TEC-12345 has been placed successfully.</p>
                <Badge className="bg-gray-100 text-gray-800 mb-8 font-light">Payment Processed</Badge>
                <div className="space-y-2 text-sm text-gray-600 font-light mb-8">
                  <p>You will receive a confirmation email shortly.</p>
                  <p>Estimated delivery: 1-2 business days</p>
                </div>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Button variant="outline" className="flex-1 rounded-none font-light tracking-wide bg-transparent">
                    TRACK ORDER
                  </Button>
                  <Link href="/layout-2" className="flex-1">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-none font-light tracking-wide">
                      CONTINUE SHOPPING
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sticky top-4">
              <h3 className="text-xl font-light mb-6 tracking-wide">Order Summary</h3>
              <div className="space-y-6">
                {produtos
                  .filter((produto) => quantities[produto.id])
                  .map((produto) => (
                    <div key={produto.id} className="flex items-center gap-4 pb-6 border-b border-gray-100">
                      <div className="relative">
                        <img
                          src={produto.imagem || "/placeholder.svg"}
                          alt={produto.nome}
                          className="w-20 h-20 object-cover bg-gray-50"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light">{produto.nome}</h4>
                        <p className="text-sm text-gray-500 font-light">
                          {produto.cor} • {produto.memoria || produto.modelo || produto.tamanho}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-gray-100"
                            onClick={() => updateQuantity(produto.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-light">{quantities[produto.id]}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-gray-100"
                            onClick={() => updateQuantity(produto.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-auto text-gray-400 hover:text-red-500"
                            onClick={() => removeItem(produto.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-light">R$ {(produto.preco * quantities[produto.id]).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                <div className="space-y-3 pt-4">
                  <div className="flex justify-between font-light">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Shipping
                    </span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-light">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 mt-6">
                  <div className="flex items-center gap-2 text-gray-700 text-sm font-light">
                    <Shield className="h-4 w-4" />
                    <span>Secure Checkout</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-light">Your payment information is encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
