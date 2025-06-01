"use client";

import api from "@/lib/api";
import { createContext, useContext, useState, ReactNode } from "react";
import { Shop, ShopContextType } from "./types";
import { useAuth } from "../Auth/AuthContext";
import { useLoading } from "../Loading/LoadingContext";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const { setIsLoading } = useLoading();
  const { user } = useAuth();

  const isOwnerShop = async (shopName: string): Promise<boolean> => {
    await getShopByName(shopName);
    return selectedShop?.ownerId === user?.id || false;
  };

  const getShops = async () => {
    try {
      setIsLoading(true)
      const response = await api.get("api/Shop");
      setShops(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const getShopByName = async (name: string) => {
    try {
      setIsLoading(true)
      const response = await api.get(`api/Shop/${name}`);
      setSelectedShop(response.data);
    } catch (error) {
      console.error(`Erro ao buscar loja com id ${name}:`, error);
    } finally {
      setIsLoading(false)
    }
  };

  const createShop = async (data: Omit<Shop, "id" | "productIds">) => {
    try {
      setIsLoading(true)
      await api.post("api/Shop", { ...data, userId: user!.id });
      await getShops();
    } catch (error) {
      console.error("Erro ao criar loja:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const updateShop = async (
    id: string,
    data: Omit<Shop, "id" | "productIds">
  ) => {
    try {
      setIsLoading(true)
      if (!(await isOwnerShop(id))) throw new Error("Sem permissão!");
      await api.put(`api/Shop/${id}`, { ...data, userId: user!.id });
      await getShops();
    } catch (error) {
      console.error(`Erro ao atualizar loja com id ${id}:`, error);
    } finally {
      setIsLoading(false)
    }
  };

  const deleteShop = async (id: string) => {
    try {
      setIsLoading(true)
      if (!(await isOwnerShop(id))) throw new Error("Sem permissão!");
      await api.delete(`api/Shop/${id}`);
      await getShops();
    } catch (error) {
      console.error(`Erro ao deletar loja com id ${id}:`, error);
    } finally {
      setIsLoading(false)
    }
  };

  const clearSelectedShop = () => {
    setSelectedShop(null);
  };

  return (
    <ShopContext.Provider
      value={{
        shops,
        selectedShop,
        getShops,
        getShopByName,
        createShop,
        updateShop,
        deleteShop,
        clearSelectedShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextType {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
