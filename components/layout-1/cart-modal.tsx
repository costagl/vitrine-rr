"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleIncrement = (
    itemId: string,
    currentQuantity: number,
    maxStock: number
  ) => {
    if (currentQuantity < maxStock) {
      updateQuantity(itemId, currentQuantity + 1);
    }
  };

  const handleDecrement = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrinho de Compras
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Adicione produtos ao carrinho para continuar comprando
            </p>
            <Button onClick={closeCart}>Continuar Comprando</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <div className="space-y-4">
                {cart.items.map((item) => {
                  const price = item.valorPromocional || item.valorUnitario;
                  const hasDiscount =
                    item.valorPromocional &&
                    item.valorPromocional < item.valorUnitario;

                  return (
                    <div key={item.id} className="flex gap-4 py-4 border-b">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.imagemUrl ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={item.titulo}
                          fill
                          className="object-cover"
                          layout="responsive"
                          width={500}
                          height={300}
                        />
                        {hasDiscount && (
                          <Badge
                            variant="destructive"
                            className="absolute top-1 right-1 text-xs px-1"
                          >
                            {Math.round(
                              ((item.valorUnitario - item.valorPromocional!) /
                                item.valorUnitario) *
                                100
                            )}
                            %
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.titulo}
                        </h4>
                        {item.categoria && (
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.categoria}
                          </Badge>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            {hasDiscount && (
                              <span className="text-xs text-muted-foreground line-through mr-2">
                                {formatPrice(item.valorUnitario)}
                              </span>
                            )}
                            <span className="font-semibold text-sm">
                              {formatPrice(price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 bg-transparent"
                              onClick={() =>
                                handleDecrement(item.id, item.quantidade)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantidade}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 bg-transparent"
                              onClick={() =>
                                handleIncrement(
                                  item.id,
                                  item.quantidade,
                                  item.estoque
                                )
                              }
                              disabled={item.quantidade >= item.estoque}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {item.quantidade >= item.estoque && (
                          <p className="text-xs text-orange-600 mt-1">
                            Estoque máximo atingido
                          </p>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Link
                  href="/loja/layout-1/checkout"
                  className="w-full"
                  onClick={closeCart}
                >
                  <Button className="w-full" size="lg">
                    Finalizar Compra
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={closeCart}
                >
                  Continuar Comprando
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
