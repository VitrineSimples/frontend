"use client";

import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useShop } from "@/context/Shop/ShopContext";

const editShopSchema = z.object({
  name: z.string().min(2, "Nome da loja deve ter no mínimo 2 caracteres"),
});

type EditShopFormData = z.infer<typeof editShopSchema>;

export default function EditShopModal({
  toggleModal,
  currentName,
  currentId,
}: {
  toggleModal: () => void;
  currentName: string;
  currentId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditShopFormData>({
    resolver: zodResolver(editShopSchema),
    mode: "onChange",
    defaultValues: {
      name: currentName,
    },
  });

  const { isLoading } = useLoading();
  const { updateShop } = useShop();

  const onSubmit = async (data: EditShopFormData) => {
    await updateShop(currentId, data.name);
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
