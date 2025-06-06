"use client";

import { iProduct } from "@/context/Product/type";
import ProductCard from "./ProductCard";

export default function Produtos({
  products,
  isOwner,
  shopName,
}: {
  products: iProduct[];
  isOwner: boolean;
  shopName: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6 duration-300">
      {products.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-30">
          Nenhum produto encontrado.
        </div>
      )}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} isOwner={isOwner} shopName={shopName}/>
      ))}
    </div>
  );
}
