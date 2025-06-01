type Shop = {
  id: string;
  name: string;
  ownerId: string
  productIds: string[];
};

type ShopContextType = {
  shops: Shop[];
  selectedShop: Shop | null;
  getShops: () => Promise<void>;
  getShopByName: (name: string) => Promise<void>;
  createShop: (data: Omit<Shop, "id" | "productIds">) => Promise<void>;
  updateShop: (
    id: string,
    data: Omit<Shop, "id" | "productIds">
  ) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  clearSelectedShop: () => void;
};

export type { Shop, ShopContextType };
