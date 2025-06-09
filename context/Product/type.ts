interface iProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  shopId: string;
  shopWhatsApp: string;
}

type ProductContextType = {
  products: iProduct[];
  selectedProduct: iProduct | null;
  getProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  createProduct: (data: Omit<iProduct, "id">) => Promise<void>;
  updateProduct: (
    id: string,
    data: Omit<iProduct, "id" | "shopId">
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearSelectedProduct: () => void;
};

export type { iProduct, ProductContextType };
