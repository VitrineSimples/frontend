"use client";

import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useShop } from "@/context/Shop/ShopContext";
import { useState, useEffect } from "react";
import { useSeasonalCampaign } from "@/context/SeasonalCampaign/SeasonalCampaingContext";

const createCampaignSchema = z.object({
  campaignName: z.string().min(3, "Nome da campanha muito curto"),
  description: z.string().min(5, "Descrição muito curta"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de início inválida",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de término inválida",
  }),
  productIds: z.array(z.string()).min(1, "Selecione pelo menos um produto"),
});

type CreateCampaignFormData = z.infer<typeof createCampaignSchema>;

export default function CreateSeasonalCampaignModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCampaignFormData>({
    resolver: zodResolver(createCampaignSchema),
    mode: "onChange",
  });

  const { createCampaign } = useSeasonalCampaign();
  const { selectedShop } = useShop();
  const { isLoading } = useLoading();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    setValue("productIds", selectedProductIds);
  }, [selectedProductIds, setValue]);

  const onSubmit = async (data: CreateCampaignFormData) => {
    await createCampaign({
      ...data,
      shopId: selectedShop!.id,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    });
    toggleModal();
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  if (!selectedShop || selectedShop.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
        <p className="text-contrast px-2">
          Loja não encontrada ou loja sem produtos cadastrados.
        </p>
        <button
          onClick={toggleModal}
          className="hover:text-white hover:border-white border-contrast border text-contrast hover:bg-contrast bg-white p-2 rounded-sm transition-colors duration-300 cursor-pointer"
        >
          Fechar
        </button>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          type="text"
          placeholder="Ex: Campanha de Verão"
          label="Nome da campanha"
          id="campaignName"
          {...register("campaignName")}
        />
        {errors.campaignName && (
          <p className="text-contrast text-sm px-2">
            {errors.campaignName.message}
          </p>
        )}

        <Input
          type="text"
          placeholder="Ex: Aproveite nossas ofertas de verão!"
          label="Descrição"
          id="description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-contrast text-sm px-2">
            {errors.description.message}
          </p>
        )}

        <Input
          placeholder="AAAA-MM-DD"
          label="Data de início"
          id="startDate"
          type="date"
          {...register("startDate")}
        />
        {errors.startDate && (
          <p className="text-contrast text-sm px-2">
            {errors.startDate.message}
          </p>
        )}

        <Input
          placeholder="AAAA-MM-DD"
          label="Data de término"
          id="endDate"
          type="date"
          {...register("endDate")}
        />
        {errors.endDate && (
          <p className="text-contrast text-sm px-2">
            {errors.endDate.message}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Produtos da campanha:
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded-md">
            {selectedShop.products.map((product) => (
              <label key={product.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedProductIds.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                  className="accent-brand-200"
                />
                <span>{product.name}</span>
              </label>
            ))}
          </div>
          {errors.productIds && (
            <p className="text-contrast text-sm px-2 mt-1">
              {errors.productIds.message}
            </p>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="mt-4 w-full border hover:border-white border-brand-200 hover:bg-brand-200 hover:text-white py-2 rounded-lg bg-white text-brand-200 transition-colors cursor-pointer duration-300"
          >
            Criar Campanha
          </button>
        )}
      </form>
    </section>
  );
}
