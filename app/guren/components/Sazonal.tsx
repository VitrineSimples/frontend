"use client";

import { SeasonalCampaign } from "@/context/SeasonalCampaign/type";
import ProductCard from "./ProductCard";
import { useSeasonalCampaign } from "@/context/SeasonalCampaign/SeasonalCampaingContext";
import { useEffect, useState } from "react";
import { useShop } from "@/context/Shop/ShopContext";
import { Modal } from "@/app/components/Modal/Modal";
import EditSeasonalCampaignModal from "../[shopName]/modals/SeasonalCampaign/EditSeasonalCampaign";
import { Edit2 } from "lucide-react";

export default function Sazonal({
  shopId,
  shopName,
  shopWhatsApp,
  isOwner,
}: {
  shopId: string;
  shopName: string;
  shopWhatsApp: string;
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
          shopWhatsApp={shopWhatsApp}
        />
      )
  );
}

function SeasonalCampaignSection({
  SeasonalCampaign,
  shopName,
  shopWhatsApp,
  isOwner,
}: {
  SeasonalCampaign: SeasonalCampaign;
  shopName: string;
  isOwner: boolean;
  shopWhatsApp: string;
}) {
  const [editCampaignModal, setEditCampaignModal] = useState(false);
  const toggleEditCampaignModal = () =>
    setEditCampaignModal(!editCampaignModal);

  function getDaysRemaining(endDate: string): string {
    const today = new Date();
    const end = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Campanha encerrada";
    if (diffDays === 0) return "Último dia da campanha!";
    if (diffDays === 1) return "Falta 1 dia para acabar";
    return `Faltam ${diffDays} dias para acabar`;
  }

  return (
    <>
      <section className="w-full py-10 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-3xl shadow-inner">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="flex justify-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-contrast">
              {SeasonalCampaign.campaignName}
            </h2>
            {isOwner && (
              <button
                onClick={() => toggleEditCampaignModal()}
                className="text-contrast/70 cursor-pointer hover:text-contrast"
              >
                <Edit2 />
              </button>
            )}
          </div>
          <div className="text-gray-600 mt-2 text-sm sm:text-base space-y-1">
            <p>{SeasonalCampaign.description}</p>
            <p className="text-contrast font-medium">
              {getDaysRemaining(SeasonalCampaign.endDate)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {SeasonalCampaign.products.map((product) => (
            <ProductCard
              product={product}
              shopName={shopName}
              isOwner={isOwner}
              key={product.id}
              shopWhatsApp={shopWhatsApp}
            />
          ))}
        </div>
      </section>
      {editCampaignModal && (
        <Modal toggleModal={toggleEditCampaignModal}>
          <EditSeasonalCampaignModal
            toggleModal={toggleEditCampaignModal}
            campaign={SeasonalCampaign}
          />
        </Modal>
      )}
    </>
  );
}
