"use client";

import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  Cake,
  Sparkles,
  Gift,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Clock,
  Award,
  Package,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Layout5() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Topo de Bolo Unicórnio",
      price: 45.9,
      image: "/placeholder.svg?height=300&width=300&text=Unicórnio+Biscuit",
      category: "Topo de Bolo",
      rating: 5,
      sales: 127,
      icon: "🦄",
    },
    {
      id: 2,
      name: "Bolo Cenográfico Princesa",
      price: 89.9,
      image: "/placeholder.svg?height=300&width=300&text=Princesa+Bolo",
      category: "Bolo Cenográfico",
      rating: 5,
      sales: 98,
      icon: "👑",
    },
    {
      id: 3,
      name: "Porta Recado Ursinho",
      price: 32.9,
      image: "/placeholder.svg?height=300&width=300&text=Ursinho+Porta+Recado",
      category: "Porta Recado",
      rating: 5,
      sales: 156,
      icon: "🧸",
    },
    {
      id: 4,
      name: "Cofre Porquinho Personalizado",
      price: 55.9,
      image: "/placeholder.svg?height=300&width=300&text=Cofre+Porquinho",
      category: "Cofre",
      rating: 5,
      sales: 84,
      icon: "🐷",
    },
    {
      id: 5,
      name: "Topo Safari Bichinhos",
      price: 52.9,
      image: "/placeholder.svg?height=300&width=300&text=Safari+Biscuit",
      category: "Topo de Bolo",
      rating: 5,
      sales: 143,
      icon: "🦁",
    },
    {
      id: 6,
      name: "Bolo Fake Baby Shark",
      price: 95.9,
      image: "/placeholder.svg?height=300&width=300&text=Baby+Shark+Bolo",
      category: "Bolo Cenográfico",
      rating: 5,
      sales: 67,
      icon: "🦈",
    },
  ];

  const categories = [
    { name: "Topo de Bolo", icon: "🎂", count: 45 },
    { name: "Bolo Cenográfico", icon: "🍰", count: 32 },
    { name: "Porta Recado", icon: "💌", count: 28 },
    { name: "Cofres", icon: "🐷", count: 19 },
    { name: "Lembrancinhas", icon: "🎁", count: 56 },
    { name: "Personalizados", icon: "✨", count: 78 },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      avatar: "👩",
      rating: 5,
      text: "Perfeito! O topo de bolo ficou LINDO, muito delicado e bem feito. Minha filha amou! ❤️",
      product: "Topo Unicórnio",
    },
    {
      name: "Ana Costa",
      avatar: "👱‍♀️",
      rating: 5,
      text: "Que amor de trabalho! O bolo cenográfico foi o destaque da festa. Todos pediram o contato! 🥰",
      product: "Bolo Princesa",
    },
    {
      name: "Juliana Lima",
      avatar: "👩‍🦰",
      rating: 5,
      text: "Recebemos com muito carinho! Embalagem linda e produto impecável. Super recomendo! 💕",
      product: "Porta Recado",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Top Bar Fofo */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Frete Grátis acima de R$150
              </span>
              <span className="hidden md:flex items-center gap-1">
                <Gift className="h-3 w-3" />
                5% OFF no PIX
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
              <Facebook className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Header Fofo */}
      <header className="bg-white shadow-lg border-b-4 border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-2xl shadow-lg transform hover:rotate-12 transition-transform">
                <Cake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Doce Encanto
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">
                  Biscuit & Bolos Cenográficos ✨
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Busque por topos, bolos, temas... 🔍"
                  className="pl-10 pr-4 py-6 rounded-full border-2 border-pink-200 focus:border-pink-400 bg-pink-50/50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-pink-50 rounded-full"
              >
                <Heart className="h-5 w-5 text-pink-400" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50 rounded-full"
              >
                <ShoppingBag className="h-5 w-5 text-purple-400" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos... 🔍"
                className="pl-10 pr-4 py-5 rounded-full border-2 border-pink-200 focus:border-pink-400 bg-pink-50/50"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="bg-white border-b-2 border-pink-100 shadow-sm sticky top-[88px] md:top-[80px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full border-2 border-pink-200 hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white hover:border-transparent whitespace-nowrap transition-all bg-transparent"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <Badge
                  variant="secondary"
                  className="ml-2 bg-pink-100 text-pink-600"
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section Ultra Fofo */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-20 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "3.5s" }}
          />
          <div className="absolute top-1/2 right-1/3 text-6xl opacity-10 animate-pulse">
            🎂
          </div>
          <div
            className="absolute bottom-1/4 left-1/3 text-5xl opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            🧁
          </div>
          <div
            className="absolute top-1/3 left-10 text-4xl opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            ✨
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <Badge className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 text-sm rounded-full shadow-lg animate-pulse">
                ✨ Novidades toda semana! ✨
              </Badge>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Transformando Momentos em
              <br />
              Doces Lembranças 💕
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Peças artesanais em biscuit e bolos cenográficos feitos com muito
              amor e carinho para tornar sua festa inesquecível! 🎉
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Ver Produtos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-pink-300 hover:bg-pink-50 bg-transparent"
              >
                <Gift className="mr-2 h-5 w-5" />
                Encomende Já!
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white rounded-2xl shadow-md border-2 border-pink-100">
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Clientes Felizes 😊</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-md border-2 border-purple-100">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-1">
                  1000+
                </div>
                <div className="text-sm text-gray-600">Peças Criadas 🎨</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-md border-2 border-blue-100">
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-1">
                  100%
                </div>
                <div className="text-sm text-gray-600">Amor & Dedicação 💖</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Produtos em Destaque 🌟
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Criações únicas e especiais, feitas sob medida para deixar sua
              festa ainda mais encantadora!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-2 border-pink-100 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-3xl"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={500}
                      height={300}
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Mais Vendido
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-4xl animate-bounce">
                      {product.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Badge
                      variant="outline"
                      className="mb-3 border-pink-200 text-pink-600"
                    >
                      {product.category}
                    </Badge>

                    <h4 className="font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.sales} vendas)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-pink-500">
                          R$ {product.price.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          ou 3x sem juros
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg"
                        onClick={() => setCartCount(cartCount + 1)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-2 border-pink-300 hover:bg-pink-50 bg-transparent"
            >
              Ver Todos os Produtos
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Por que nos escolher? 💝
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all rounded-3xl">
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Qualidade Premium</h4>
              <p className="text-sm text-gray-600">
                Materiais de primeira linha e acabamento impecável em cada peça
              </p>
            </Card>

            <Card className="text-center p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all rounded-3xl">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">100% Personalizado</h4>
              <p className="text-sm text-gray-600">
                Criamos exatamente do jeito que você sonhou para sua festa
              </p>
            </Card>

            <Card className="text-center p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all rounded-3xl">
              <div className="bg-gradient-to-br from-blue-400 to-purple-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Embalagem Especial</h4>
              <p className="text-sm text-gray-600">
                Cada produto é embalado com muito carinho e cuidado
              </p>
            </Card>

            <Card className="text-center p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all rounded-3xl">
              <div className="bg-gradient-to-br from-pink-400 to-blue-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Entrega Rápida</h4>
              <p className="text-sm text-gray-600">
                Enviamos para todo Brasil com segurança e agilidade
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              O que nossas clientes dizem 🥰
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A felicidade de vocês é nossa maior recompensa!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all rounded-3xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl bg-gradient-to-br from-pink-200 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{testimonial.text}</p>
                  <Badge
                    variant="outline"
                    className="border-pink-200 text-pink-600"
                  >
                    Comprou: {testimonial.product}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">
            🎂
          </div>
          <div
            className="absolute bottom-10 right-10 text-6xl animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            🧁
          </div>
          <div className="absolute top-1/2 left-1/4 text-5xl animate-pulse">
            ✨
          </div>
          <div
            className="absolute top-1/3 right-1/4 text-5xl animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            💕
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Receba Novidades e Promoções! 🎁
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Cadastre-se e ganhe <strong>10% OFF</strong> na primeira compra +
              frete grátis!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                placeholder="Seu melhor e-mail 💌"
                className="flex-1 bg-white text-gray-900 rounded-full px-6 py-6 border-0"
              />
              <Button
                size="lg"
                className="bg-white text-pink-500 hover:bg-pink-50 rounded-full px-8 shadow-lg"
              >
                <Gift className="mr-2 h-5 w-5" />
                Quero Desconto!
              </Button>
            </div>

            <p className="text-sm mt-4 opacity-75">
              Não enviamos spam! Apenas novidades fofas e promoções especiais 💕
            </p>
          </div>
        </div>
      </section>

      {/* Footer Fofo */}
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-2xl">
                  <Cake className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">Doce Encanto</h4>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Criando momentos mágicos com biscuit e bolos cenográficos feitos
                com muito amor! 💕
              </p>
              <div className="flex gap-3">
                <div className="bg-pink-500/20 hover:bg-pink-500/30 p-2 rounded-full cursor-pointer transition-colors">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="bg-purple-500/20 hover:bg-purple-500/30 p-2 rounded-full cursor-pointer transition-colors">
                  <Facebook className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-pink-300">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300 hover:text-pink-300 cursor-pointer transition-colors">
                  Sobre Nós
                </li>
                <li className="text-gray-300 hover:text-pink-300 cursor-pointer transition-colors">
                  Produtos
                </li>
                <li className="text-gray-300 hover:text-pink-300 cursor-pointer transition-colors">
                  Como Encomendar
                </li>
                <li className="text-gray-300 hover:text-pink-300 cursor-pointer transition-colors">
                  Galeria de Fotos
                </li>
                <li className="text-gray-300 hover:text-pink-300 cursor-pointer transition-colors">
                  Depoimentos
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4 text-purple-300">Categorias</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors">
                  🎂 Topo de Bolo
                </li>
                <li className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors">
                  🍰 Bolo Cenográfico
                </li>
                <li className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors">
                  💌 Porta Recado
                </li>
                <li className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors">
                  🐷 Cofres
                </li>
                <li className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors">
                  🎁 Lembrancinhas
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-blue-300">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-gray-300">
                  <Phone className="h-4 w-4 mt-0.5 text-pink-400 flex-shrink-0" />
                  <span>(11) 98765-4321</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Mail className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                  <span>contato@doceencanto.com.br</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <MapPin className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>São Paulo, SP</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Clock className="h-4 w-4 mt-0.5 text-pink-400 flex-shrink-0" />
                  <span>
                    Seg-Sex: 9h às 18h
                    <br />
                    Sáb: 9h às 13h
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 Doce Encanto - Biscuit & Bolos Cenográficos. Todos os
              direitos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              Feito com muito 💕 e dedicação | CNPJ: 12.345.678/0001-90
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
