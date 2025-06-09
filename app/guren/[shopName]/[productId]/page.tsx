"use client";

import { useAuth } from "@/context/Auth/AuthContext";
import { useCart } from "@/context/Cart/CartContext";
import { useOrder } from "@/context/Order/OrderContext";
import { useProduct } from "@/context/Product/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect } from "react";

interface PageProps {
  params: Promise<{ productId: string; shopName: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const { productId, shopName } = use(params);
  const { getProductById, selectedProduct } = useProduct();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { createOrderFromCart } = useOrder();

  const addToCartAndFinishOrder = async () => {
    await addToCart(
      { productId: selectedProduct!.id, quantity: 1 },
      selectedProduct!.shopId
    );
    await createOrderFromCart(selectedProduct!.shopWhatsApp);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await getProductById(productId);
    };
    fetchProduct();
  }, [productId]);

  if (!selectedProduct || !user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Carregando produto...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl my-10 border border-gray-100 relative">
      <Link
        href={`/guren/${shopName}`}
        className="text-white hover:text-gray-200 text-lg border border-contrast p-2 rounded-md backdrop-blur-sm bg-white/30 mb-4 inline-block absolute top-12 left-12"
      >
        Voltar
      </Link>
      <Image
        src={selectedProduct.imageURL}
        alt={selectedProduct.name}
        width={700}
        height={400}
        className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
      />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-contrast">
          {selectedProduct.name}
        </h1>

        <p className="text-2xl font-semibold text-gray-800">
          R$ {selectedProduct.price.toFixed(2).replace(".", ",")}
        </p>

        <p className="text-gray-700 text-base">{selectedProduct.description}</p>

        <div className="text-sm text-gray-500">
          Loja vinculada:{" "}
          <span className="font-medium text-contrast">{shopName}</span>
        </div>
        {(user.shop && selectedProduct.shopId !== user.shop.id) ||
          (user.shop === null && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={() =>
                  addToCart(
                    { productId: selectedProduct.id, quantity: 1 },
                    selectedProduct.shopId
                  )
                }
                className="px-6 py-3 bg-contrast/90 hover:bg-contrast cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
              >
                Adicionar ao Carrinho
              </button>
              <button
                onClick={() => addToCartAndFinishOrder()}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
              >
                Comprar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
