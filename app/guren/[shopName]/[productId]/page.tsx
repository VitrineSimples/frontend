"use client";

import { useAuth } from "@/context/Auth/AuthContext";
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

        {selectedProduct.name && (
          <p className="text-gray-700 text-base">{selectedProduct.name}</p>
        )}

        <div className="text-sm text-gray-500">
          Loja vinculada:{" "}
          <span className="font-medium text-contrast">
            {selectedProduct.shopId}
          </span>
        </div>
        {selectedProduct.shopId !== user.shop.id && (
          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                console.log("Adicionar ao carrinho", selectedProduct)
              }
              className="px-6 py-3 bg-contrast/90 hover:bg-contrast cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
            >
              Adicionar ao Carrinho
            </button>
            <button
              onClick={() => console.log("Comprar agora", selectedProduct)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
