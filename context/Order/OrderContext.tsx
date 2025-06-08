"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/AuthContext";
import { useLoading } from "../Loading/LoadingContext";
import { OrderContextType, Order } from "./types";
import { useCart } from "../Cart/CartContext";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user, token } = useAuth();
  const { setIsLoading } = useLoading();
  const { getCart, clearCart } = useCart();

  const fetchOrders = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await api.get<Order[]>("api/Orders/user");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (productIds: string[]) => {
    try {
      setIsLoading(true);
      await api.post("api/Orders", { productIds });
      toast.success("Pedido criado com sucesso!");
      await fetchOrders();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao criar pedido.");
    } finally {
      setIsLoading(false);
    }
  };

  const createOrderFromCart = async () => {
    try {
      setIsLoading(true);
      await api.post("api/Orders/fromcart", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Pedido criado a partir do carrinho!");
      await fetchOrders();
      clearCart();
      await getCart();
    } catch (error) {
      console.error("Erro ao criar pedido do carrinho:", error);
      toast.error("Erro ao criar pedido do carrinho.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <OrderContext.Provider
      value={{ orders, fetchOrders, createOrder, createOrderFromCart }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
