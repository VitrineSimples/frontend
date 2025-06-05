"use client";

import api from "@/lib/api";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Shop, ShopContextType } from "./types";
import { useAuth } from "../Auth/AuthContext";
import { useLoading } from "../Loading/LoadingContext";
import { toast } from "react-toastify";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const { setIsLoading } = useLoading();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      await getShops();
    })();
  }, []);

  const isOwnerShop = async (shopName: string): Promise<boolean> => {
    await getShopByName(shopName);
    return selectedShop?.ownerId === user?.id || false;
  };

  const getShops = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("api/Shops");
      setShops(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getShopByName = async (name: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`api/Shops/${name}`);
      setSelectedShop(response.data);
    } catch (error) {
      console.error(`Erro ao buscar loja com id ${name}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const createShop = async (data: string) => {
    try {
      setIsLoading(true);
      await api.post("api/Shops", {
        userId: user!.id,
        products: [],
        name: data,
      });
      await getShops();
      toast.success("Loja criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar loja:", error);
      toast.error("Erro ao criar loja. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateShop = async (id: string, data: string) => {
    try {
      setIsLoading(true);
      if (!(await isOwnerShop(id))) throw new Error("Sem permissão!");
      await api.put(`api/Shops/${id}`, { userId: user!.id, name: data });
      toast.success("Loja editada com sucesso!");
      await getShops();
      await getShopByUserId(user!.id);
    } catch (error) {
      console.error(`Erro ao atualizar loja com id ${id}:`, error);
      toast.error("Erro ao editar loja. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteShop = async (id: string) => {
    try {
      setIsLoading(true);
      if (!(await isOwnerShop(id))) throw new Error("Sem permissão!");
      await api.delete(`api/Shops/${id}`);
      await getShops();
      setSelectedShop(null);
      toast.success("Loja deletada com sucesso!");
    } catch (error) {
      console.error(`Erro ao deletar loja com id ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const getShopByUserId = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`api/Shops/user/${userId}`);
      setSelectedShop(response.data);
    } catch (error) {
      console.error(`Erro ao buscar loja do usuário com id ${userId}:`, error);
    } finally {
      setIsLoading(false);
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
        getShopByUserId,
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
