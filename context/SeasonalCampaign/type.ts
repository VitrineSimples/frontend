import { iProduct } from "../Product/type";

interface SeasonalCampaign {
  id: string;
  campaignName: string;
  description: string;
  startDate: string;
  endDate: string;
  shopId: string;
  products: iProduct[];
}

interface SeasonalCampaignDTO {
  id: string;
  campaignName: string;
  description: string;
  startDate: string;
  endDate: string;
  shopId: string;
  productIds: string[];
}

interface SeasonalCampaignPostDTO {
  campaignName: string;
  description: string;
  startDate: string;
  endDate: string;
  shopId: string;
  productIds: string[];
}

interface SeasonalCampaignContextType {
  campaigns: SeasonalCampaign[];
  getCampaignById: (id: string) => Promise<SeasonalCampaign | null>;
  createCampaign: (dto: SeasonalCampaignPostDTO) => Promise<void>;
  updateCampaign: (id: string, dto: SeasonalCampaignDTO) => Promise<void>;
  deleteCampaign: (id: string, shopId: string) => Promise<void>;
  getCampaignsByShopId: (shopId: string) => Promise<void>;
}

export type {
  SeasonalCampaign,
  SeasonalCampaignDTO,
  SeasonalCampaignPostDTO,
  SeasonalCampaignContextType,
};
