"use client";

import { useOrder } from "@/context/Order/OrderContext";
import { use, useEffect } from "react";
import Image from "next/image";
import {
  PackageCheck,
  User,
  CalendarDays,
  ShoppingCart,
  BadgeDollarSign,
} from "lucide-react";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderPage({ params }: PageProps) {
  const { orderId } = use(params);
  const { getOrderById, currentOrder } = useOrder();

  useEffect(() => {
    const fetchOrder = async () => {
      await getOrderById(orderId);
    };
    fetchOrder();
  }, [orderId]);

  if (!currentOrder) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Carregando pedido...
      </div>
    );
  }

  const { id, date, totalValue, items, user } = currentOrder;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl my-10 border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-contrast">
        <PackageCheck className="w-6 h-6" />
        Pedido #{id}
      </h1>

      <p className="flex items-center gap-2 text-sm mb-1 text-contrast">
        <User className="w-4 h-4" />
        Cliente: <span className="font-semibold">{user.name}</span>
      </p>

      <p className="flex items-center gap-2 text-sm mb-1 text-contrast">
        <CalendarDays className="w-4 h-4" />
        Criado em:{" "}
        {new Date(date).toLocaleDateString("pt-BR", {
          dateStyle: "long",
        })}
      </p>

      <p className="flex items-center gap-2 text-sm mb-4 text-contrast font-semibold">
        <BadgeDollarSign className="w-4 h-4" />
        Total: R$ {totalValue.toFixed(2)}
      </p>

      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-contrast">
        <ShoppingCart className="w-5 h-5" />
        Itens do Pedido:
      </h2>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-4 border-b pb-2">
            <Image
              src={item.product.imageURL}
              alt={item.product.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-contrast">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                R$ {item.product.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
