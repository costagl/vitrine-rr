"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductFilters } from "@/components/layout-1/product-filters";
import { CartModal } from "@/components/layout-1/cart-modal";
import { useCart } from "@/contexts/cart-context";
import { ShoppingCart, Star, ChevronLeft, Package } from "lucide-react";
import Image from "next/image";
import { getApiBaseUrl } from "@/config/api-url";
import { API_ENDPOINTS } from "@/config/api";
import type { ProductFilters as Filters, CartItem } from "@/types/cart";

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

export default function ProdutosLayout1Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<
    { idCategoriaProduto: number; tituloCategoriaProduto: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    genero: "todos",
    tipoRoupa: "todos",
    ordemClassificacao: "lancamentos",
    pesquisaConsulta: "",
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idLoja = urlParams.get("idLoja");
    const subdominio = urlParams.get("subdominio");
    const lojaRequestString = localStorage.getItem(`${subdominio}`);

    if (lojaRequestString == null) {
      console.log("lojaRequest é nulo.");
    } else {
      const lojaRequest = JSON.parse(lojaRequestString);

      console.log("lojaRequest:", lojaRequest);
      console.log("Produtos:", lojaRequest.produtos);
      console.log("Categorias:", lojaRequest.categoriasProduto);

      setProducts(lojaRequest.produtos || []);
      setCategories(lojaRequest.categoriasProduto || []);
      setLoading(false);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.ativo);

    if (filters.pesquisaConsulta) {
      const searchLower = filters.pesquisaConsulta.toLowerCase();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(searchLower) ||
          p.descricao.toLowerCase().includes(searchLower) ||
          p.categoriaProduto.toLowerCase().includes(searchLower)
      );
    }

    // Filtrando por categoria (gênero ou tipo de roupa)
    if (filters.genero && filters.genero !== "todos") {
      result = result.filter((p) =>
        p.categoriaProduto.toLowerCase().includes(filters.genero.toLowerCase())
      );
    }

    switch (filters.ordemClassificacao) {
      case "menor-preco":
        result.sort(
          (a, b) =>
            (a.valorPromocional || a.valorUnitario) -
            (b.valorPromocional || b.valorUnitario)
        );
        break;
      case "maior-preco":
        result.sort(
          (a, b) =>
            (b.valorPromocional || b.valorUnitario) -
            (a.valorPromocional || a.valorUnitario)
        );
        break;
      case "mais-vendidos":
        result.sort(() => Math.random() - 0.5);
        break;
      case "lancamentos":
      default:
        break;
    }

    return result;
  }, [products, filters]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const calculateDiscount = (original: number, promotional: number) => {
    return Math.round(((original - promotional) / original) * 100);
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
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/loja/layout-1">
              <Button>Voltar para Loja</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/loja/layout-1">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Produtos</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="relative bg-transparent"
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {cart.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cart.itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/loja/layout-1" className="hover:text-gray-900">
            Minha Loja
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Produtos</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                {loading
                  ? "Carregando produtos..."
                  : `${filteredProducts.length} produto${
                      filteredProducts.length !== 1 ? "s" : ""
                    } encontrado${filteredProducts.length !== 1 ? "s" : ""}`}
              </p>
            </div>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <Skeleton className="w-full h-48 mb-4" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Tente ajustar os filtros ou buscar por outros termos
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        genero: "todos",
                        tipoRoupa: "todos",
                        ordemClassificacao: "lancamentos",
                        pesquisaConsulta: "",
                      })
                    }
                  >
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            )}

            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const hasDiscount =
                    product.valorPromocional &&
                    product.valorPromocional < product.valorUnitario;
                  const price =
                    product.valorPromocional || product.valorUnitario;

                  return (
                    <Card
                      key={product.id}
                      className="flex flex-col justify-between h-full overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative w-full h-64 bg-gray-100">
                        <Image
                          src={product.imagemUrl || "/placeholder.svg"}
                          alt={product.titulo}
                          className="object-cover w-full h-full"
                          width={500}
                          height={300}
                        />
                        {hasDiscount && (
                          <Badge
                            variant="destructive"
                            className="absolute top-2 right-2"
                          >
                            -
                            {calculateDiscount(
                              product.valorUnitario,
                              product.valorPromocional!
                            )}
                            %
                          </Badge>
                        )}
                      </div>

                      <CardContent className="flex flex-col justify-between p-4 h-full">
                        <Badge
                          variant="secondary"
                          className="w-fit inline-block px-3 py-1 rounded-full mb-2"
                        >
                          {product.categoriaProduto}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {product.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.descricao}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            (128)
                          </span>
                        </div>
                        <div className="mb-4 flex flex-col justify-between flex-grow">
                          {hasDiscount && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(product.valorUnitario)}
                            </p>
                          )}
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(price)}
                          </p>
                          {product.estoque < 10 && product.estoque > 0 && (
                            <p className="text-sm text-orange-600">
                              Últimas {product.estoque} unidades!
                            </p>
                          )}
                          {product.estoque === 0 && (
                            <p className="text-sm text-red-600 font-medium">
                              Esgotado
                            </p>
                          )}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.estoque === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.estoque === 0
                            ? "Esgotado"
                            : "Adicionar ao Carrinho"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
      <CartModal open={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </div>
  );
}
