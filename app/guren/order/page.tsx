"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrder } from "@/context/Order/OrderContext";
import { useEffect } from "react";

const orderSchema = z.object({
  orderId: z.string().min(35, "ID da ordem inválida!"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function GetOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const router = useRouter();
  const { currentOrder, getOrderById, setCurrentOrder } = useOrder();

  const onSubmit = async (data: OrderFormData) => {
    await getOrderById(data.orderId);
    if (currentOrder?.id == data.orderId)
      router.push(`/guren/order/${data.orderId}`);
  };

  useEffect(() => {
    setCurrentOrder(null);
  }, []);

  return (
    <div className="min-h-screen bg-brand-100/15 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-brand-200">
        Consultar Pedido
      </h1>
      <p className="text-lg mb-6 text-brand-200">
        Insira o código do seu pedido abaixo para consultar os detalhes.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <input
          type="text"
          placeholder="Ex: 123456ABC"
          {...register("orderId")}
          className="w-full px-4 py-2 rounded-lg border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-200 text-brand-200 bg-white"
        />
        {errors.orderId && (
          <p className="text-sm text-red-500">{errors.orderId.message}</p>
        )}

        <button
          type="submit"
          className="w-full cursor-pointer bg-brand-100 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-brand-200 transition"
        >
          Ver Pedido
        </button>
      </form>

      <p className="mt-6 text-sm text-brand-200/80">
        Ainda perdido?{" "}
        <Link
          href="/guren"
          className="underline hover:text-brand-300 transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}
