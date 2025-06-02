import { iProduct } from "../Product/type";

type iSazonal = {
  id: string;
  campaignName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  shopId: string;
  products: iProduct[];
};

export type { iSazonal };
