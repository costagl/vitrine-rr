"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Eye, EyeOff, Package, Tag } from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryTitleById } from "@/hooks/use-categories";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onOpenDetail?: (product: Product) => void;
  isDeleting?: boolean;
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  onOpenDetail,
  isDeleting = false,
}: ProductListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Estado para armazenar os títulos das categorias
  const [categoryTitles, setCategoryTitles] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    // Busca e armazena os títulos das categorias ao carregar os produtos
    const fetchCategoryTitles = async () => {
      const titles: { [key: string]: string } = {};

      for (const product of products) {
        const title = await getCategoryTitleById(product.idCategoriaProduto);
        titles[product.idCategoriaProduto] = title;
      }

      setCategoryTitles(titles);
    };

    fetchCategoryTitles();
  }, [products]); // Recarrega quando a lista de produtos mudar

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <Package className="mx-auto h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-gray-500">
          Comece adicionando produtos à sua loja ou ajuste os filtros de
          pesquisa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Imagem do Produto */}
              <div className="flex-shrink-0">
                <Image
                  src={product.imagem || "/placeholder.svg?height=80&width=80"}
                  alt={product.titulo}
                  className="h-20 w-20 object-cover rounded-md border"
                  width={500} // Defina a largura diretamente
                  height={300} // Defina a altura diretamente
                  sizes="(max-width: 640px) 80px, 500px" // Defina um valor adequado para o "sizes"
                />
              </div>

              {/* Informações do Produto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {product.titulo}
                      </h3>
                      <Badge
                        variant={product.ativo === 1 ? "default" : "secondary"}
                      >
                        {product.ativo === 1 ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" /> Ativo
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" /> Inativo
                          </>
                        )}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.descricao}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-green-600">
                          {formatCurrency(product.valorUnitario)}
                        </span>
                        {product.valorPromocional && (
                          <span className="text-xs text-red-600">
                            (Promo: {formatCurrency(product.valorPromocional)})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>
                          {categoryTitles[product.idCategoriaProduto] ||
                            "Carregando..."}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span
                          className={
                            product.estoque > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          Estoque: {product.estoque}
                        </span>
                      </div>

                      <div className="text-xs">
                        <span>SKU: {product.sku}</span>
                      </div>
                    </div>

                    {/* Dimensões e Peso */}
                    <div className="text-xs text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <span>Peso: {product.peso}kg</span>
                      <span>Alt: {product.altura}cm</span>
                      <span>Larg: {product.largura}cm</span>
                      <span>Prof: {product.profundidade}cm</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 ml-4">
                    {onOpenDetail && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenDetail(product)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1"
                      disabled={isDeleting}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:border-red-300"
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
