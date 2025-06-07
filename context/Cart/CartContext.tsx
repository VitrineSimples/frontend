"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/AuthContext";
import { useLoading } from "../Loading/LoadingContext";
import { iCartContext, Cart, AddCartItem } from "./types";

const CartContext = createContext<iCartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoading();

  const getCart = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await api.get<Cart>(`api/Cart/${user.id}`);
      setCart(response.data);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: AddCartItem) => {
    if (!user) return;
    try {
      await api.post(`api/Cart/${user.id}/add`, item);
      toast.success("Produto adicionado ao carrinho!");
      await getCart();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto ao carrinho.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      await api.delete(`api/Cart/${user.id}/remove/${productId}`);
      toast.success("Produto removido do carrinho.");
      await getCart();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  useEffect(() => {
    if (user) getCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, getCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
