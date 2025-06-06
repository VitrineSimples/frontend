"use client";

import api from "@/lib/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { useLoading } from "../Loading/LoadingContext";
import { iProduct, ProductContextType } from "./type";
import { useShop } from "../Shop/ShopContext";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<iProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<iProduct | null>(null);

  const { setIsLoading } = useLoading();
  const { selectedShop, getShopByName } = useShop();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("api/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`api/Products/${id}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error(`Erro ao buscar produto com id ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: Omit<iProduct, "id">) => {
    try {
      setIsLoading(true);
      await api.post("api/Products", data);
      await getProducts();
      await getShopByName(selectedShop!.name);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, data: Partial<iProduct>) => {
    try {
      setIsLoading(true);
      await api.put(`api/Products/${id}`, {
        ...data,
        shopId: selectedShop!.id,
      });
      await getProducts();
      await getShopByName(selectedShop!.name);
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error(`Erro ao atualizar produto com id ${id}:`, error);
      toast.error("Erro ao atualizar produto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await api.delete(`api/Products/${id}`);
      await getProducts();
      await getShopByName(selectedShop!.name);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error(`Erro ao deletar produto com id ${id}:`, error);
      toast.error("Erro ao deletar produto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelectedProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        clearSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
