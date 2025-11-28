"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Sparkles,
  Palette,
  Brush,
  Camera,
  Gift,
  Zap,
  Crown,
  Gem,
} from "lucide-react";
import axios from "axios";
import { useCart } from "@/contexts/cart-context";
import { CartModal } from "@/components/layouts/cart-modal";
import { API_BASE_URL, LOCAL_BASE_URL } from "@/config/api-url";

interface Product {
  id: string;
  titulo: string;
  descricao: string;
  valorUnitario: number;
  valorPromocional: number;
  estoque: number;
  ativo: number;
  imagemUrl: string;
  peso: number;
  altura: number;
  largura: number;
  profundidade: number;
  valorCusto: number;
  categoriaProduto: string;
  idCategoriaProduto: number;
  idLoja: number;
}

export default function Layout3Page() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loja, setLoja] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subdominio = urlParams.get("subdominio");

    if (subdominio) {
      async function fetchLojaData() {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `${API_BASE_URL}/vitrine/${subdominio}`
          );
          if (response.data.lojaRequest) {
            setLoja(response.data.lojaRequest);
            setProdutos(response.data.lojaRequest.produtos || []);
          } else {
            throw new Error("Loja não encontrada");
          }
        } catch (err: any) {
          setError(err.message || "Erro ao carregar dados da loja");
        } finally {
          setIsLoading(false);
        }
      }
      fetchLojaData();
    }
  }, []);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => p.ativo === 1);
  }, [produtos]);

  const handleAddToCart = (produto: Product) => {
    addToCart({
      id: produto.id.toString(),
      titulo: produto.titulo,
      valorUnitario: produto.valorUnitario,
      valorPromocional: produto.valorPromocional,
      estoque: produto.estoque,
      imagemUrl: produto.imagemUrl,
      categoriaProduto: produto.categoriaProduto || "Sem Categoria",
      ativo: produto.ativo,
      descricao: produto.descricao,
      peso: produto.peso,
      altura: produto.altura,
      largura: produto.largura,
      profundidade: produto.profundidade,
      valorCusto: produto.valorCusto,
      idCategoriaProduto: produto.idCategoriaProduto,
      idLoja: produto.idLoja,
    });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header Criativo */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Criativo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Arte & Criação
              </h1>
            </div>

            {/* Menu Criativo */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                Produtos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                Inspiração
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                Tutoriais
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                Comunidade
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Ações Criativas */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Buscar inspiração..."
                  className="pl-10 w-64 border-purple-200 focus:border-purple-400 bg-white/50"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-purple-100 rounded-full"
              >
                <Heart className="h-5 w-5 text-purple-600" />
              </Button>

                            <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-purple-100 rounded-full relative"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="h-5 w-5 text-purple-600" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Criativo */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                Novidade
              </Badge>
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>

            <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Desperte
              </span>
              <br />
              <span className="text-gray-800">sua criatividade</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubra materiais de arte premium que transformam suas ideias em
              obras-primas. Cada pincelada conta uma história única.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg">
                <Brush className="h-4 w-4 mr-2" />
                Começar a Criar
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full bg-transparent"
              >
                <Camera className="h-4 w-4 mr-2" />
                Ver Galeria
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute -top-10 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -top-5 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute top-5 left-1/3 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25 animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Criativas */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-100 to-pink-100">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brush className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Pincéis</h3>
                <p className="text-sm text-gray-600 mt-1">Premium</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-100 to-cyan-100">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Tintas</h3>
                <p className="text-sm text-gray-600 mt-1">Vibrantes</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-100 to-emerald-100">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Gem className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Telas</h3>
                <p className="text-sm text-gray-600 mt-1">Profissionais</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-100 to-indigo-100">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Kits</h3>
                <p className="text-sm text-gray-600 mt-1">Completos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Produtos Criativos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-yellow-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Produtos Especiais
              </h2>
              <Crown className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma seleção especial dos nossos melhores produtos para artistas
              exigentes
            </p>
          </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtosFiltrados.map((produto) => (
              <Card
                key={produto.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={produto.imagemUrl || "/placeholder.svg"}
                      alt={produto.titulo}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={500}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-3 bg-purple-100 text-purple-700"
                    >
                      {produto.categoriaProduto}
                    </Badge>

                    <h3 className="font-bold text-lg mb-3 group-hover:text-purple-600 transition-colors">
                      {produto.titulo}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        R$ {produto.valorUnitario.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handleAddToCart(produto)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Criativa */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-8 w-8" />
              <h2 className="text-4xl font-bold">Inspire-se Diariamente</h2>
              <Sparkles className="h-8 w-8" />
            </div>

            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Receba dicas exclusivas, tutoriais e ofertas especiais direto no
              seu email
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  placeholder="Seu email criativo"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                />
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 font-bold">
                  <Gift className="h-4 w-4 mr-2" />
                  Inscrever
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Criativo */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Arte & Criação
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transformando ideias em arte há mais de 10 anos. Sua
                criatividade é nossa inspiração.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-purple-400">Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pincéis Premium
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tintas Acrílicas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Telas Profissionais
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kits Completos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-pink-400">Comunidade</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Galeria de Arte
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tutoriais
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Concursos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-orange-400">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Arte & Criação. Feito com
              <Heart className="h-4 w-4 text-red-500 inline mx-1" />
              para artistas apaixonados.
            </p>
          </div>
                </div>
      </footer>
      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  );
}
