import { iProduct } from "../Product/type";
import { SeasonalCampaign } from "../SeasonalCampaign/type";

type Shop = {
  id: string;
  name: string;
  email: string;
  whatsApp: string;
  ownerId: string;
  products: iProduct[];
  seasonalCampaigns: SeasonalCampaign[];
};

interface iCreateShopData {
  name: string;
  email: string;
  whatsApp: string;
};

type ShopContextType = {
  shops: Shop[];
  selectedShop: Shop | null;
  getShops: () => Promise<void>;
  getShopByName: (name: string) => Promise<void>;
  createShop: (data: iCreateShopData) => Promise<void>;
  updateShop: (id: string, data: iCreateShopData) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  clearSelectedShop: () => void;
  getShopByUserId: (userId: string) => Promise<void>;
};

export type { Shop, ShopContextType, iCreateShopData };
