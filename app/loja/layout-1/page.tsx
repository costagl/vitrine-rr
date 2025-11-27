"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  Truck,
  Shield,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import axios from "axios";
import { useCart } from "@/contexts/cart-context";
import { CartModal } from "@/components/layout-1/cart-modal";

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

let todasCategoriasProduto: string[] = ["Ver Todos os Produtos"];

export default function Layout1Page() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loja, setLoja] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idLoja = urlParams.get("idLoja");
    const subdominio = urlParams.get("subdominio");
    const parametrosLocalStorage = {
      idLoja,
      subdominio,
    };
    localStorage.setItem("urlParams", JSON.stringify(parametrosLocalStorage));

    if (subdominio) {
      async function fetchLojaData() {
        setIsLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `https://vitrineapi.duckdns.org/vitrine/${subdominio}`
          );

          if (response.data.lojaRequest) {
            setLoja(response.data.lojaRequest);
            setProdutos(response.data.lojaRequest.produtos || []);
            localStorage.setItem(
              `${subdominio}`,
              JSON.stringify(response.data.lojaRequest)
            );
            todasCategoriasProduto =
              response.data.lojaRequest.categoriasProduto.map(
                (categoria: { tituloCategoriaProduto: string }) =>
                  categoria.tituloCategoriaProduto
              );
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
    return produtos
      .filter((p) => p.ativo === 1)
      .filter((p) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          p.titulo.toLowerCase().includes(query) ||
          p.descricao?.toLowerCase().includes(query) ||
          p.categoriaProduto.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [produtos, searchQuery]);

  const getProductRating = (id: string) => {
    const idInt = parseInt(id);
    const ratings = [2, 5, 3, 4, 1, 4, 3, 5];
    return ratings[idInt % ratings.length];
  };

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

    console.log("produto:", produtos[0]);
    console.log("cartItem", cart.items[0]);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Superior */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
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
          <div className="flex items-center gap-4">
            {/* <span>Frete grátis acima de R$ 99</span> */}
            <div className="flex gap-2">
              <Facebook className="h-4 w-4 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-4 w-4 hover:text-pink-400 cursor-pointer" />
              <Twitter className="h-4 w-4 hover:text-blue-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {loja?.nomeLoja}
              </h1>
            </div>

            {/* Barra de Busca */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Ações do Usuário */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block">Contato</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Heart className="h-5 w-5" />
                <span className="hidden md:block">Favoritos</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 relative"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:block">Carrinho</span>
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  {cart.itemCount}
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu de Navegação */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3">
            {todasCategoriasProduto.map((categoria, index) => (
              <Link
                key={index}
                href={`http://localhost:3000/loja/layout-1/produtos/?subdominio=${loja.subdominio}&idLoja=${loja.id}`}
                className="hover:text-blue-200 transition-colors font-medium"
              >
                {categoria}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Banner Principal */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Coleção Verão 2024</h2>
          <p className="text-xl mb-8 opacity-90">
            Descubra as últimas tendências da moda com até 50% de desconto
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
          >
            Ver Coleção
          </Button>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frete Grátis (Apenas layout, ainda não configurável e nem funcional.)</h3>
              <p className="text-gray-600">
                Em compras acima de R$ 99 para todo o Brasil
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">
                Seus dados protegidos com certificado SSL
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Parcelamento</h3>
              <p className="text-gray-600">
                Em até 12x sem juros no cartão de crédito
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Produtos em Destaque
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-64" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">
                Erro ao carregar produtos: {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-2">
                {searchQuery
                  ? "Nenhum produto encontrado para sua busca."
                  : "Nenhum produto disponível no momento."}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && produtosFiltrados.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {produtosFiltrados.map((produto) => {
                const rating = getProductRating(produto.id);
                const temDesconto =
                  produto.valorPromocional &&
                  produto.valorPromocional < produto.valorUnitario;
                const desconto = temDesconto
                  ? Math.round(
                      ((produto.valorUnitario - produto.valorPromocional!) /
                        produto.valorUnitario) *
                        100
                    )
                  : 0;

                return (
                  <Card
                    key={produto.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gray-100">
                        {produto.imagemUrl ? (
                          <Image
                            src={produto.imagemUrl || "/placeholder.svg"}
                            alt={produto.titulo}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            width={500}
                            height={300}
                          />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">Sem imagem</span>
                          </div>
                        )}
                        {temDesconto && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            -{desconto}%
                          </Badge>
                        )}
                        {produto.estoque === 0 && (
                          <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                            Esgotado
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {produto.categoriaProduto || "Sem Categoria"}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {produto.titulo}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              R${" "}
                              {(
                                (produto.valorPromocional ??
                                  produto.valorUnitario) ||
                                0
                              )
                                .toFixed(2)
                                .replace(".", ",")}
                            </span>
                            {produto.valorPromocional &&
                              produto.valorPromocional <
                                produto.valorUnitario && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  R${" "}
                                  {produto.valorUnitario
                                    .toFixed(2)
                                    .replace(".", ",")}
                                </span>
                              )}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={produto.estoque === 0}
                          onClick={() => handleAddToCart(produto)}
                        >
                          {produto.estoque === 0
                            ? "Esgotado"
                            : "Adicionar ao Carrinho"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Receba Nossas Ofertas</h2>
          <p className="text-xl mb-8 opacity-90">
            Cadastre-se e seja o primeiro a saber sobre promoções exclusivas
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              placeholder="Seu melhor email"
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6">
              Cadastrar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Minha Loja</h3>
              <p className="mb-4">
                Sua loja de moda online com as melhores tendências e preços
                incríveis.
              </p>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Roupas Masculinas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Roupas Femininas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Calçados
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Acessórios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Rastrear Pedido
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{loja?.lojista?.telefone || "(11) 9999-9999"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{loja?.lojista?.email || "contato@minhaloja.com"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 Minha Loja. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  );
}
