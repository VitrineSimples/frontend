"use client";

import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useShop } from "@/context/Shop/ShopContext";

const createShopSchema = z.object({
  name: z.string().min(2, "Nome da loja deve ter no mínimo 2 caracteres"),
});

type CreateShopFormData = z.infer<typeof createShopSchema>;

export default function CreateShopModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShopFormData>({
    resolver: zodResolver(createShopSchema),
    mode: "onChange",
  });

  const { isLoading } = useLoading();
  const { createShop } = useShop();

  const onSubmit = async (data: CreateShopFormData) => {
    await createShop(data.name);
    toggleModal();
  };

  return (
    <section className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <Input
            label="Nome da loja"
            id="name"
            type="text"
            placeholder="Ex: Sushihana"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.name.message}
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
            Criar Loja
          </button>
        )}
      </form>
    </section>
  );
}
