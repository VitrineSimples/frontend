"use client";

import { useCart } from "@/context/Cart/CartContext";
import { useLoading } from "@/context/Loading/LoadingContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartPage() {
  const { isLoading } = useLoading();
  const { cart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      console.log("Fetching cart...");
    };
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 text-lg font-medium">
        <p>Carregando carrinho...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 text-lg font-medium">
        <p>Seu carrinho está vazio.</p>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={"/guren"} className="text-contrast/90 hover:text-contrast transition text-lg">
        Voltar
        </Link>
        <p className="text-gray-700">{cart.items.length} item(s) no carrinho</p>
      </div>

      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {item.productImage && (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-sm text-gray-600">
                  {item.productName || "Sem descrição"}
                </p>
                <p className="mt-1 text-base font-medium text-green-600">
                  R$ {item.productPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-16 px-2 py-1 rounded text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => alert("Remover item")}
                className="text-contrast/90 hover:text-contrast cursor-pointer transition text-xl"
                title="Remover item"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <p className="text-xl font-bold">
          Total: R$ {total.toFixed(2).replace(".", ",")}
        </p>
        <button
          onClick={() => alert("Compra finalizada!")}
          className="bg-contrast/90 text-white px-6 py-3 rounded hover:bg-contrast transition cursor-pointer"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
