"use client";

import { createContext, useContext, useState } from "react";
import api from "@/lib/api";
import { useLoading } from "../Loading/LoadingContext";
import { toast } from "react-toastify";
import {
  SeasonalCampaign,
  SeasonalCampaignPostDTO,
  SeasonalCampaignDTO,
  SeasonalCampaignContextType,
} from "./type";

const SeasonalCampaignContext = createContext<
  SeasonalCampaignContextType | undefined
>(undefined);

export const SeasonalCampaignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [campaigns, setCampaigns] = useState<SeasonalCampaign[]>([]);
  const { setIsLoading } = useLoading();

  const getCampaignById = async (
    id: string
  ): Promise<SeasonalCampaign | null> => {
    try {
      setIsLoading(true);
      const res = await api.get<SeasonalCampaign>(`api/SeasonalCampaign/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Erro ao buscar a campanha.");
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (dto: SeasonalCampaignPostDTO) => {
    try {
      setIsLoading(true);
      await api.post("api/SeasonalCampaign", dto);
      toast.success("Campanha criada com sucesso!");
      await getCampaignsByShopId(dto.shopId);
    } catch (error) {
      toast.error("Erro ao criar campanha.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCampaign = async (id: string, dto: SeasonalCampaignDTO) => {
    try {
      setIsLoading(true);
      await api.put(`api/SeasonalCampaign/${id}`, dto);
      toast.success("Campanha atualizada!");
      await getCampaignsByShopId(dto.shopId);
    } catch (error) {
      toast.error("Erro ao atualizar campanha.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCampaign = async (id: string, shopId: string) => {
    try {
      setIsLoading(true);
      await api.delete(`api/SeasonalCampaign/${id}`);
      toast.success("Campanha excluída!");
      await getCampaignsByShopId(shopId);
    } catch (error) {
      toast.error("Erro ao excluir campanha.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaignsByShopId = async (shopId: string): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await api.get<SeasonalCampaign[]>(
        `/api/SeasonalCampaign/shop/${shopId}`
      );
      setCampaigns(res.data);
    } catch (error) {
      toast.error("Erro ao buscar campanhas da loja.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SeasonalCampaignContext.Provider
      value={{
        campaigns,
        getCampaignById,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        getCampaignsByShopId,
      }}
    >
      {children}
    </SeasonalCampaignContext.Provider>
  );
};

export const useSeasonalCampaign = () => {
  const context = useContext(SeasonalCampaignContext);
  if (!context) {
    throw new Error(
      "useSeasonalCampaign deve ser usado dentro de um SeasonalCampaignProvider"
    );
  }
  return context;
};
