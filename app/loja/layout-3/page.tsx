"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Heart,
  Sparkles,
  Zap,
  Store,
  Award,
  Phone,
  Mail,
  MapPin,
  Palette,
  Brush,
  Camera,
  Gift,
  Crown,
  Gem,
} from "lucide-react";
import axios from "axios";
import { useCart } from "@/contexts/cart-context";
import { CartModal } from "@/components/layouts/cart-modal";
import { API_BASE_URL } from "@/config/api-url";
import Link from "next/link";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
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

  const produtosEmDestaque = useMemo(() => {
    return produtos.filter((p) => p.ativo === 1).slice(0, 4);
  }, [produtos]);

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((p) => p.ativo === 1)
      .filter((p) => {
        if (selectedCategory !== "Todos" && p.categoriaProduto !== selectedCategory)
          return false;
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          p.titulo.toLowerCase().includes(query) ||
          p.descricao?.toLowerCase().includes(query) ||
          p.categoriaProduto.toLowerCase().includes(query)
        );
      });
  }, [produtos, searchQuery, selectedCategory]);

  const categorias = useMemo(() => {
    const cats = Array.from(
      new Set(produtos.filter((p) => p.ativo === 1).map((p) => p.categoriaProduto))
    );
    return ["Todos", ...cats];
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white/80 backdrop-blur-md text-gray-700 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {loja?.lojista?.telefone || "(11) 9999-9999"}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {loja?.lojista?.email || "contato@minhaloja.com"}
            </span>
          </div>
        </div>
      </div>

      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {loja?.nomeLoja || "Minha Loja"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-blue-200 focus:border-blue-400 bg-white/50"
                />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-blue-100 rounded-full"
              >
                <Heart className="h-5 w-5 text-blue-600" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-blue-100 rounded-full relative"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                Produtos de Qualidade
              </Badge>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Descubra produtos
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  incríveis
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explore nossa coleção especial de produtos selecionados com
                qualidade e estilo
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                {/* <Image
                  src={loja.imagemBannerUrl || "/colorful-products-display.jpg"}
                  alt="Produtos em destaque"
                  className="w-4/5 h-4/5 object-contain"
                  width={500}
                  height={500}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção especial de produtos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtosEmDestaque.map((produto) => (
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
                    {produto.estoque === 0 && (
                      <Badge className="absolute top-3 right-3 bg-gray-900/80 text-white">
                        Esgotado
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-3 bg-blue-100 text-blue-700"
                    >
                      {produto.categoriaProduto}
                    </Badge>

                    <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      {produto.titulo}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        R${" "}
                        {(
                          (produto.valorPromocional ?? produto.valorUnitario) || 0
                        )
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handleAddToCart(produto)}
                        disabled={produto.estoque === 0}
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

      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Todos os Produtos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore todos os nossos produtos por categoria
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={selectedCategory === categoria ? "default" : "outline"}
                onClick={() => setSelectedCategory(categoria)}
                className={
                  selectedCategory === categoria
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    : "hover:bg-blue-50"
                }
                size="sm"
              >
                {categoria}
              </Button>
            ))}
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
                    {produto.estoque === 0 && (
                      <Badge className="absolute top-3 right-3 bg-gray-900/80 text-white">
                        Esgotado
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-3 bg-blue-100 text-blue-700"
                    >
                      {produto.categoriaProduto}
                    </Badge>

                    <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      {produto.titulo}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        R${" "}
                        {(
                          (produto.valorPromocional ?? produto.valorUnitario) || 0
                        )
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handleAddToCart(produto)}
                        disabled={produto.estoque === 0}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Qualidade Premium</h3>
              <p className="text-gray-600">
                Produtos selecionados com os mais altos padrões de qualidade
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Entrega Rápida</h3>
              <p className="text-gray-600">
                Receba seus produtos com agilidade e segurança
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Suporte Dedicado</h3>
              <p className="text-gray-600">
                Atendimento especializado para ajudar você sempre que precisar
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {loja?.nomeLoja || "Minha Loja"}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                {loja?.descricao ||
                  "Sua loja online com produtos de qualidade e atendimento excepcional"}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                {categorias.slice(1, 5).map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{loja?.lojista?.nomeCompleto || "Lojista"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{loja?.lojista?.telefone || "(11) 9999-9999"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>
                    {loja?.lojista?.email || "contato@minhaloja.com"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 {loja?.nomeLoja || "Minha Loja"}. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  );
}