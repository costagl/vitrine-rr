"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Search,
  Star,
  Phone,
  MapPin,
  Clock,
  PawPrint,
  User,
  Menu,
  X,
  Facebook,
  Instagram,
  Mail,
  Bone,
  Dog,
  Cat,
  Scissors,
  Stethoscope,
  Home,
} from "lucide-react";

export default function Layout4Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    {
      id: 1,
      name: "Cachorros",
      icon: Dog,
      color: "bg-orange-100 text-orange-600",
    },
    { id: 2, name: "Gatos", icon: Cat, color: "bg-purple-100 text-purple-600" },
    {
      id: 3,
      name: "Banho e Tosa",
      icon: Scissors,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      name: "Veterinário",
      icon: Stethoscope,
      color: "bg-green-100 text-green-600",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Ração Premium Cães Adultos",
      category: "Alimentação",
      price: 149.9,
      oldPrice: 179.9,
      rating: 4.8,
      reviews: 234,
      image: "/dog-food-variety.png",
      badge: "Mais Vendido",
      pet: "dog",
    },
    {
      id: 2,
      name: "Arranhador para Gatos",
      category: "Acessórios",
      price: 89.9,
      rating: 4.9,
      reviews: 156,
      image: "/cat-scratching-post.png",
      badge: "Destaque",
      pet: "cat",
    },
    {
      id: 3,
      name: "Coleira com Guia",
      category: "Passeio",
      price: 45.9,
      rating: 4.7,
      reviews: 189,
      image: "/dog-leash.jpg",
      pet: "dog",
    },
    {
      id: 4,
      name: "Cama Ortopédica Premium",
      category: "Conforto",
      price: 199.9,
      oldPrice: 249.9,
      rating: 5.0,
      reviews: 98,
      image: "/cozy-pet-bed.png",
      badge: "Novo",
      pet: "dog",
    },
  ];

  const services = [
    {
      id: 1,
      name: "Banho Completo",
      description: "Banho, escovação e hidratação",
      price: "A partir de R$ 60",
      icon: Scissors,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      name: "Tosa Higiênica",
      description: "Tosa nas áreas sensíveis",
      price: "A partir de R$ 40",
      icon: Scissors,
      color: "bg-pink-50 text-pink-600",
    },
    {
      id: 3,
      name: "Consulta Veterinária",
      description: "Atendimento especializado",
      price: "A partir de R$ 120",
      icon: Stethoscope,
      color: "bg-green-50 text-green-600",
    },
    {
      id: 4,
      name: "Day Care",
      description: "Cuidados durante o dia",
      price: "A partir de R$ 80",
      icon: Home,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      pet: "Rex",
      petType: "Golden Retriever",
      comment:
        "Melhor petshop da região! Meu Rex adora vir aqui. A equipe é super atenciosa.",
      rating: 5,
      image: "/diverse-woman-avatar.png",
    },
    {
      id: 2,
      name: "João Santos",
      pet: "Mimi",
      petType: "Persa",
      comment:
        "Produtos de qualidade e preços justos. A Mimi ficou linda depois da tosa!",
      rating: 5,
      image: "/man-avatar.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 1234-5678</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Seg-Sáb: 8h-20h | Dom: 9h-18h</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="h-4 w-4 cursor-pointer hover:scale-110 transition" />
              <Instagram className="h-4 w-4 cursor-pointer hover:scale-110 transition" />
              <Mail className="h-4 w-4 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-full">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  PetShop Amigo
                </h1>
                <p className="text-xs text-gray-600">Cuidando com amor</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Buscar produtos, serviços..."
                  className="pl-10 pr-4 py-6 rounded-full border-2 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex relative"
              >
                <Heart className="h-6 w-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-6 w-6 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-10 rounded-full border-orange-200"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex items-center justify-center gap-8 py-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-orange-50 transition"
                  >
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-bounce">
            <Bone className="h-20 w-20 text-white rotate-45" />
          </div>
          <div className="absolute top-20 right-20 animate-bounce delay-100">
            <PawPrint className="h-16 w-16 text-white" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-bounce delay-200">
            <PawPrint className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🎉 Promoção de Inauguração
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Tudo para seu Pet em um só Lugar!
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Produtos premium, serviços especializados e muito carinho para seu
              melhor amigo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8"
              >
                Ver Produtos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                Agendar Serviço
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Categorias
          </h2>
          <p className="text-gray-600">Encontre tudo o que seu pet precisa</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="border-2 hover:border-orange-300 transition cursor-pointer group"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`mx-auto w-20 h-20 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600">Os favoritos dos nossos clientes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition overflow-hidden border-2 hover:border-orange-300"
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    width={500}
                    height={300}
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </Button>
                  <div
                    className={`absolute bottom-3 right-3 p-2 rounded-full ${
                      product.pet === "dog" ? "bg-orange-100" : "bg-purple-100"
                    }`}
                  >
                    {product.pet === "dog" ? (
                      <Dog
                        className={`h-5 w-5 ${
                          product.pet === "dog"
                            ? "text-orange-600"
                            : "text-purple-600"
                        }`}
                      />
                    ) : (
                      <Cat className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        R$ {product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              Ver Todos os Produtos
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-gray-600">Cuidados profissionais para seu pet</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition border-2 hover:border-orange-300"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <p className="font-semibold text-orange-600 mb-4">
                      {service.price}
                    </p>
                    <Button className="w-full bg-transparent" variant="outline">
                      Agendar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-gray-600">Depoimentos de tutores felizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-2 hover:border-orange-300 transition"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                      width={500}
                      height={300}
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        Tutor de {testimonial.pet} • {testimonial.petType}
                      </p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    &quot{testimonial.comment}&quot
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PawPrint className="absolute top-10 left-10 h-32 w-32 text-white animate-pulse" />
          <PawPrint className="absolute bottom-10 right-10 h-24 w-24 text-white animate-pulse delay-100" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Primeira Compra com 15% OFF!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Cadastre-se agora e ganhe desconto na primeira compra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="bg-white/90 border-none text-lg"
            />
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-full">
                  <PawPrint className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">PetShop Amigo</span>
              </div>
              <p className="text-gray-400 text-sm">
                Cuidando com amor do seu melhor amigo desde 2024.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Institucional</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Nossa Equipe
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Trabalhe Conosco
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Política de Troca
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Rastreamento
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Rua dos Pets, 123 - SP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 1234-5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@petshopamiho.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 PetShop Amigo. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
