"use client";

import { SeasonalCampaign } from "@/context/SeasonalCampaign/type";
import ProductCard from "./ProductCard";
import { useSeasonalCampaign } from "@/context/SeasonalCampaign/SeasonalCampaingContext";
import { useEffect } from "react";
import { useShop } from "@/context/Shop/ShopContext";

export default function Sazonal({
  shopId,
  shopName,
  isOwner,
}: {
  shopId: string;
  shopName: string;
  isOwner: boolean;
}) {
  const { campaigns, getCampaignsByShopId } = useSeasonalCampaign();
  const { selectedShop } = useShop();

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (shopId) {
        await getCampaignsByShopId(shopId);
      }
    };
    fetchCampaigns();
  }, [shopId, selectedShop]);

  if (!campaigns || campaigns.length === 0 || !campaigns) {
    return null;
  }

  const isValidCampaign = (campaign: SeasonalCampaign) => {
    const currentDate = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    return (
      campaign &&
      campaign.products &&
      campaign.products.length > 0 &&
      currentDate >= startDate &&
      currentDate <= endDate
    );
  };

  return campaigns.map(
    (c) =>
      isValidCampaign(c) && (
        <SeasonalCampaignSection
          key={c.id}
          SeasonalCampaign={c}
          shopName={shopName}
          isOwner={isOwner}
        />
      )
  );
}

function SeasonalCampaignSection({
  SeasonalCampaign,
  shopName,
  isOwner,
}: {
  SeasonalCampaign: SeasonalCampaign;
  shopName: string;
  isOwner: boolean;
}) {
  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-3xl shadow-inner">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-contrast">
          {SeasonalCampaign.campaignName}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {SeasonalCampaign.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {SeasonalCampaign.products.map((product) => (
          <ProductCard
            product={product}
            shopName={shopName}
            isOwner={isOwner}
            key={product.id}
          />
        ))}
      </div>
    </section>
  );
}
