"use client";

import { useProduct } from "@/context/Product/ProductContext";

export default function DeleteProductModal({
  productId,
  toggleModal,
}: {
  productId: string;
  toggleModal: () => void;
}) {
  const { deleteProduct } = useProduct();

  return (
    <div className="h-full flex flex-col">
      <h4 className="text-brand-200 text-xl">Deletar Produto</h4>
      <div className="flex w-full items-center justify-center flex-col h-[350px] gap-4">
        <p className="text-xl text-gray-600">
          Você deseja realmente esse produto?
        </p>
        <button
          onClick={async () => {
            await deleteProduct(productId);
            toggleModal();
          }}
          className="text-red-600 border border-red-600 hover:text-white hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400 disabled:hover:bg-white disabled:hover:text-gray-400"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
