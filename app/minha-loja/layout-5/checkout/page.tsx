"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Check,
  Heart,
  Cake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Layout5Checkout() {
  const [step, setStep] = useState(1);

  const cartItems = [
    {
      id: 1,
      name: "Topo de Bolo Unicórnio",
      price: 45.9,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Unicórnio",
      icon: "🦄",
    },
    {
      id: 2,
      name: "Porta Recado Ursinho",
      price: 32.9,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80&text=Ursinho",
      icon: "🧸",
    },
  ];

  const [orderNumber, setOrderNumber] = useState<string>("");
  const orderNumberRef = useRef<string>("");

  useEffect(() => {
    const generateOrderNumber = () => {
      // Só gera o número da ordem se ainda não tiver sido gerado
      if (!orderNumberRef.current) {
        const randomOrderNumber = `DE-${Math.floor(Math.random() * 10000)}`;
        orderNumberRef.current = randomOrderNumber; // Armazena o número da ordem em 'useRef'

        // Atualiza o estado de forma assíncrona fora do useEffect
        setOrderNumber(randomOrderNumber);
      }
    };

    generateOrderNumber(); // Chama a função para gerar o número da ordem
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-pink-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/minha-loja/layout-5">
              <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-2 rounded-xl">
                <Cake className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Checkout Fofo
              </h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b-2 border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            {[
              { num: 1, label: "Entrega", icon: MapPin },
              { num: 2, label: "Pagamento", icon: CreditCard },
              { num: 3, label: "Confirmação", icon: Package },
            ].map((s, index) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${
                        step >= s.num
                          ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg"
                          : "bg-gray-200 text-gray-400"
                      }
                    `}
                    >
                      {step > s.num ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        step >= s.num ? "text-pink-500" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-20 h-1 mx-2 rounded-full transition-colors ${
                        step > s.num
                          ? "bg-gradient-to-r from-pink-400 to-purple-400"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery */}
            {step === 1 && (
              <Card className="border-2 border-pink-200 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Informações de Entrega 💌
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome *</Label>
                        <Input
                          id="firstName"
                          placeholder="Maria"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome *</Label>
                        <Input
                          id="lastName"
                          placeholder="Silva"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="maria@example.com"
                        className="rounded-xl border-pink-200 focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 98765-4321"
                        className="rounded-xl border-pink-200 focus:border-pink-400"
                      />
                    </div>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="address">Endereço *</Label>
                        <Input
                          id="address"
                          placeholder="Rua das Flores"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apto 45"
                        className="rounded-xl border-pink-200 focus:border-pink-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Centro"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          placeholder="São Paulo"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          placeholder="SP"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipcode">CEP *</Label>
                        <Input
                          id="zipcode"
                          placeholder="01234-567"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full py-6 shadow-lg text-lg"
                    >
                      Continuar para Pagamento 💳
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="border-2 border-pink-200 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-xl">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Forma de Pagamento 💳
                    </h2>
                  </div>

                  <RadioGroup defaultValue="credit" className="space-y-4">
                    <Card className="border-2 border-pink-200 hover:border-pink-400 cursor-pointer transition-all rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label
                            htmlFor="credit"
                            className="flex-1 cursor-pointer font-medium"
                          >
                            💳 Cartão de Crédito
                            <span className="block text-xs text-gray-500 mt-1">
                              Parcele em até 3x sem juros
                            </span>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-pink-200 hover:border-pink-400 cursor-pointer transition-all rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label
                            htmlFor="pix"
                            className="flex-1 cursor-pointer font-medium"
                          >
                            📱 PIX
                            <span className="block text-xs text-green-600 mt-1">
                              5% de desconto no PIX!
                            </span>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-pink-200 hover:border-pink-400 cursor-pointer transition-all rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="boleto" id="boleto" />
                          <Label
                            htmlFor="boleto"
                            className="flex-1 cursor-pointer font-medium"
                          >
                            🧾 Boleto Bancário
                            <span className="block text-xs text-gray-500 mt-1">
                              Vencimento em 3 dias úteis
                            </span>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="rounded-xl border-pink-200 focus:border-pink-400"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="MARIA SILVA"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="installments">Parcelas</Label>
                        <Input
                          id="installments"
                          placeholder="1x"
                          className="rounded-xl border-pink-200 focus:border-pink-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 rounded-full py-6 border-2 border-pink-300 hover:bg-pink-50 text-lg"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full py-6 shadow-lg text-lg"
                    >
                      Finalizar Pedido 🎉
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="border-2 border-pink-200 rounded-3xl shadow-lg text-center">
                <CardContent className="p-12">
                  <div className="bg-gradient-to-br from-pink-400 to-purple-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                    <Check className="h-12 w-12 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Pedido Confirmado! 🎉
                  </h2>

                  <p className="text-gray-600 mb-6 text-lg">
                    Obrigada por comprar na Doce Encanto! 💕
                    <br />
                    Seu pedido será preparado com muito carinho!
                  </p>

                  <div className="bg-pink-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Número do Pedido
                    </p>
                    <p className="text-2xl font-bold text-pink-500">
                      {orderNumber}
                    </p>
                  </div>

                  <div className="space-y-3 text-left bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📦</div>
                      <div>
                        <p className="font-medium">Preparação do Pedido</p>
                        <p className="text-sm text-gray-600">1-2 dias úteis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🚚</div>
                      <div>
                        <p className="font-medium">Envio</p>
                        <p className="text-sm text-gray-600">5-7 dias úteis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💌</div>
                      <div>
                        <p className="font-medium">Acompanhamento</p>
                        <p className="text-sm text-gray-600">
                          Enviamos o código de rastreio por e-mail
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full py-6 shadow-lg text-lg"
                  >
                    <Link href="/minha-loja/layout-5">
                      Continuar Comprando 🛍️
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-pink-200 rounded-3xl shadow-lg sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-2 rounded-xl">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Resumo do Pedido
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-pink-50 rounded-2xl border border-pink-100"
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                          layout="responsive"
                          width={500}
                          height={300}
                        />
                        <div className="absolute -bottom-1 -right-1 text-xl bg-white rounded-full p-1 shadow-md">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          Qtd: {item.quantity}
                        </p>
                        <p className="font-bold text-pink-500">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      R$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium">
                      R$ {shipping.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 border-2 border-pink-200">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm mb-1">
                        Pagamento 100% Seguro
                      </p>
                      <p className="text-xs text-gray-600">
                        Seus dados estão protegidos e criptografados
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
