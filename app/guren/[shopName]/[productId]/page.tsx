"use client";

import { useProduct } from "@/context/Product/ProductContext";
import Image from "next/image";
import { use, useEffect } from "react";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const { productId } = use(params);
  const { getProductById, selectedProduct } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      await getProductById(productId);
    };
    fetchProduct();
  }, [productId]); // adicionado para evitar chamadas múltiplas

  if (!selectedProduct) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Carregando produto...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10 border border-gray-100">
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
      </div>
    </div>
  );
}
