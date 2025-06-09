"use client";

import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useShop } from "@/context/Shop/ShopContext";
import { Shop } from "@/context/Shop/types";

const editShopSchema = z.object({
  name: z.string().min(2, "Nome da loja deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  whatsApp: z
    .string()
    .min(8, "WhatsApp deve ter no mínimo 8 dígitos")
    .max(15, "WhatsApp muito longo"),
});

type EditShopFormData = z.infer<typeof editShopSchema>;

export default function EditShopModal({
  toggleModal,
  currentShop,
  currentId,
}: {
  toggleModal: () => void;
  currentShop: Shop;
  currentId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditShopFormData>({
    resolver: zodResolver(editShopSchema),
    mode: "onSubmit",
    defaultValues: {
      name: currentShop.name,
      email: currentShop.email,
      whatsApp: currentShop.whatsApp,
    },
  });

  const { isLoading } = useLoading();
  const { updateShop } = useShop();

  const onSubmit = async (data: EditShopFormData) => {
    await updateShop(currentId, data);
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
            placeholder="Digite o novo nome"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Digite o novo email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="WhatsApp"
            id="whatsapp"
            type="tel"
            placeholder="Digite o novo número"
            {...register("whatsApp")}
          />
          {errors.whatsApp && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.whatsApp.message}
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
            Salvar
          </button>
        )}
      </form>
    </section>
  );
}
