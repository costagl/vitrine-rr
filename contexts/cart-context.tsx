"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Cart, CartItem, CartContextType } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Carregar o carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Aguardar o próximo ciclo de renderização antes de atualizar o estado
        setTimeout(() => {
          setCart(parsedCart);
        }, 0);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Salvar o carrinho para o localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // CalcularTotais
  const calculateTotals = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => {
      const price = item.valorPromocional || item.valorUnitario;
      return sum + price * item.quantidade;
    }, 0);

    const itemCount = items.reduce((sum, item) => sum + item.quantidade, 0);

    return { items, total, itemCount };
  };

  // Adicionar ao carrinho
  const addToCart = (newItem: Omit<CartItem, "quantidade">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.id === newItem.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        if (existingItem.quantidade >= newItem.estoque) {
          toast({
            title: "Estoque insuficiente",
            description: "Quantidade máxima já adicionada ao carrinho",
            variant: "destructive",
          });
          return prevCart;
        }
        newItems = prevCart.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
        toast({
          title: "Quantidade atualizada",
          description: `${newItem.titulo} - Quantidade: ${
            existingItem.quantidade + 1
          }`,
        });
      } else {
        newItems = [...prevCart.items, { ...newItem, quantidade: 1 }];
        toast({
          title: "Produto adicionado",
          description: `${newItem.titulo} foi adicionado ao carrinho`,
        });
      }

      return calculateTotals(newItems);
    });
  };

  // Remover do carrinho
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.id === itemId);
      const newItems = prevCart.items.filter((item) => item.id !== itemId);

      if (item) {
        toast({
          title: "Produto removido",
          description: `${item.titulo} foi removido do carrinho`,
        });
      }

      return calculateTotals(newItems);
    });
  };

  // Atualizar quantidade
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    // Atualiza a quantidade respeitando o estoque
    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.min(quantity, item.estoque);
          return { ...item, quantidade: newQuantity };
        }
        return item;
      });

      return calculateTotals(newItems);
    });
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
    toast({
      title: "Carrinho limpo",
      description: "Todos os produtos foram removidos do carrinho",
    });
  };

  // Abrir/Fechar carrinho
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        itemCount: cart.itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
