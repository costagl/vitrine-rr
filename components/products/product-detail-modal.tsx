"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
  DollarSign,
  Ruler,
  Weight,
} from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryNameById } from "@/data/categories";
import Image from "next/image";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
}

export function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onEdit,
  onDelete,
}: ProductDetailModalProps) {
  if (!product) return null;

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Produto</span>
            <Badge variant={product.ativo === 1 ? "default" : "secondary"}>
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
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Imagem do produto */}
          <div className="md:col-span-1">
            <div className="aspect-square rounded-md border overflow-hidden">
              <Image
                src={product.imagem || "/placeholder.svg?height=300&width=300"}
                alt={product.titulo}
                className="w-full h-full object-cover"
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
          </div>

          {/* Informações do produto */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{product.titulo}</h3>
              <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
              <p className="text-gray-500 text-sm">
                {getCategoryNameById(product.idCategoriaProduto)}
              </p>
            </div>

            <p className="text-gray-700">{product.descricao}</p>

            {/* Preços */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Valor Unitário</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(product.valorUnitario)}
                  </p>
                </div>
              </div>

              {product.valorPromocional && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Valor Promocional</p>
                    <p className="font-semibold text-lg text-red-600">
                      {formatCurrency(product.valorPromocional)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Estoque */}
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Estoque</p>
                <p
                  className={`font-semibold ${
                    product.estoque > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.estoque} unidades
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Dimensões e Peso */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Dimensões e Peso
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Peso</p>
                <p className="font-semibold">{product.peso} kg</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Altura</p>
              <p className="font-semibold">{product.altura} cm</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Largura</p>
              <p className="font-semibold">{product.largura} cm</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Profundidade</p>
              <p className="font-semibold">{product.profundidade} cm</p>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>

          <div className="flex gap-2">
            {onDelete && (
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:border-red-300"
                onClick={() => {
                  onDelete(product.id);
                  onClose();
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            )}

            {onEdit && (
              <Button
                onClick={() => {
                  onEdit(product);
                  onClose();
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
