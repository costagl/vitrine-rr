"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  PawPrint,
  CreditCard,
  MapPin,
  Package,
  CheckCircle2,
  Truck,
  Dog,
  Cat,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

export default function Layout4CheckoutPage() {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ração Premium Cães Adultos",
      price: 149.9,
      quantity: 2,
      image: "/dog-food-variety.png",
      pet: "dog",
    },
    {
      id: 2,
      name: "Arranhador para Gatos",
      price: 89.9,
      quantity: 1,
      image: "/cat-scratching-post.png",
      pet: "cat",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const total = subtotal + shipping;

  const steps = [
    { number: 1, title: "Entrega", icon: MapPin },
    { number: 2, title: "Pagamento", icon: CreditCard },
    { number: 3, title: "Confirmação", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-full">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                PetShop Amigo
              </span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isCompleted = step > s.number;
              return (
                <div
                  key={s.number}
                  className="flex flex-col items-center relative"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-gradient-to-br from-orange-400 to-pink-500"
                        : isActive
                        ? "bg-gradient-to-br from-orange-400 to-pink-500"
                        : "bg-gray-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : (
                      <Icon
                        className={`h-6 w-6 ${
                          isActive || isCompleted
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isActive || isCompleted
                        ? "text-orange-600"
                        : "text-gray-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="h-6 w-6 text-orange-600" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone</Label>
                      <Input placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>CEP</Label>
                    <Input placeholder="00000-000" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label>Endereço</Label>
                      <Input placeholder="Rua, avenida..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Número</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Complemento</Label>
                      <Input placeholder="Apto, bloco..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Bairro</Label>
                      <Input placeholder="Seu bairro" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade</Label>
                      <Input placeholder="Sua cidade" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      Opções de Entrega
                    </Label>
                    <RadioGroup defaultValue="standard">
                      <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-orange-300 cursor-pointer">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label
                          htmlFor="standard"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Truck className="h-5 w-5 text-orange-600" />
                              <div>
                                <p className="font-semibold">Entrega Padrão</p>
                                <p className="text-sm text-gray-600">
                                  5-7 dias úteis
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-orange-600">
                              R$ 15,00
                            </span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-orange-300 cursor-pointer mt-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label
                          htmlFor="express"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Package className="h-5 w-5 text-orange-600" />
                              <div>
                                <p className="font-semibold">
                                  Entrega Expressa
                                </p>
                                <p className="text-sm text-gray-600">
                                  2-3 dias úteis
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-orange-600">
                              R$ 25,00
                            </span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg py-6"
                  >
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <RadioGroup defaultValue="credit">
                    <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-orange-300 cursor-pointer">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                          <span className="font-semibold">
                            Cartão de Crédito
                          </span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label>Número do Cartão</Label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>

                    <div className="space-y-2">
                      <Label>Nome no Cartão</Label>
                      <Input placeholder="Nome como está no cartão" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Validade</Label>
                        <Input placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input
                          placeholder="000"
                          type="password"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Parcelas</Label>
                      <select className="w-full p-2 border-2 rounded-md">
                        <option>1x de R$ {total.toFixed(2)} sem juros</option>
                        <option>
                          2x de R$ {(total / 2).toFixed(2)} sem juros
                        </option>
                        <option>
                          3x de R$ {(total / 3).toFixed(2)} sem juros
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-2 border-green-200">
                <CardContent className="p-8 text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Pedido Confirmado! 🎉
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Seu pedido #12345 foi realizado com sucesso!
                  </p>
                  <p className="text-gray-600 mb-8">
                    Enviamos um e-mail com os detalhes da sua compra.
                  </p>
                  <div className="bg-orange-50 p-6 rounded-lg mb-8">
                    <p className="text-sm text-gray-600 mb-2">
                      Previsão de entrega
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      5-7 dias úteis
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() =>
                        (window.location.href = "/minha-loja/layout-4")
                      }
                    >
                      Voltar à Loja
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                      Acompanhar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-orange-200 sticky top-4">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          width={500}
                          height={300}
                        />
                        <div
                          className={`absolute -top-2 -right-2 p-1 rounded-full ${
                            item.pet === "dog"
                              ? "bg-orange-100"
                              : "bg-purple-100"
                          }`}
                        >
                          {item.pet === "dog" ? (
                            <Dog className="h-4 w-4 text-orange-600" />
                          ) : (
                            <Cat className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm font-bold text-orange-600 mt-1">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
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
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <PawPrint className="h-5 w-5" />
                    <span className="font-semibold">Frete Grátis</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Em compras acima de R$ 199,00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
