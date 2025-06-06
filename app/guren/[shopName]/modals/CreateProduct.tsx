"use client";

import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useProduct } from "@/context/Product/ProductContext"; // você deve ter esse contexto
import { useShop } from "@/context/Shop/ShopContext";

const createProductSchema = z.object({
  name: z.string().min(2, "Nome do produto deve ter no mínimo 2 caracteres"),
  price: z.coerce
    .number()
    .positive("O preço deve ser um número positivo")
    .min(0.01, "O preço mínimo é R$0,01"),
  imageURL: z.string().url("Informe uma URL válida para a imagem"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export default function CreateProductModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
  });

  const { isLoading } = useLoading();
  const { createProduct } = useProduct();
  const { selectedShop } = useShop();

  const onSubmit = async (data: CreateProductFormData) => {
    await createProduct({ ...data, shopId: selectedShop!.id });
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
            label="Nome do produto"
            id="name"
            type="text"
            placeholder="Ex: Temaki"
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
            label="Preço"
            id="price"
            type="number"
            step="0.01"
            placeholder="Ex: 19.90"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="URL da imagem"
            id="imageURL"
            type="url"
            placeholder="https://..."
            {...register("imageURL")}
          />
          {errors.imageURL && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.imageURL.message}
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
            Criar Produto
          </button>
        )}
      </form>
    </section>
  );
}
