"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
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

  // Função para pegar o subdomínio da URL
  const getSubdominio = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("subdominio") || "";
  };

  // Carregar o carrinho do localStorage com base no subdomínio
  useEffect(() => {
    const subdominio = getSubdominio();
    const cartKey = `cart_${subdominio}`; // A chave agora depende do subdomínio
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => {
          setCart(parsedCart);
        }, 0);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Salvar o carrinho no localStorage com base no subdomínio
  useEffect(() => {
    const subdominio = getSubdominio();
    const cartKey = `cart_${subdominio}`; // A chave agora depende do subdomínio
    localStorage.setItem(cartKey, JSON.stringify(cart)); // Salvando o carrinho com a chave personalizada
  }, [cart]);

  // Calcular Totais
  const calculateTotals = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => {
      const price = item.valorPromocional || item.valorUnitario;
      return sum + price * item.quantidade;
    }, 0);

    const itemCount = items.reduce((sum, item) => sum + item.quantidade, 0);

    return { items, total, itemCount };
  };

    // Adicionar ao carrinho
  const addToCart = useCallback((newItem: Omit<CartItem, "quantidade">) => {
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
  }, [toast]);

  // Remover do carrinho
  const removeFromCart = useCallback((itemId: string) => {
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
  }, [toast]);

  // Atualizar quantidade
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

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
  }, [removeFromCart]);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
    toast({
      title: "Carrinho limpo",
      description: "Todos os produtos foram removidos do carrinho",
    });
  }, [toast]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo(() => ({
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    itemCount: cart.itemCount,
  }), [cart, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart]);

  return (
    <CartContext.Provider value={value}>
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
