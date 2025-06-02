"use client";

import { useShop } from "@/context/Shop/ShopContext";
import Image from "next/image";
import Link from "next/link";

export default function ShopsPage() {
  const { shops } = useShop();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-brand-200">Explorar Lojas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <Link
            href={`markets/${shop.name}`}
            key={shop.id}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              {shop.name}
            </h2>
            {shop.products.length > 0 ? (
              <Image
                src={shop.products[0].imageURL}
                alt={shop.products[0].name}
                width={400}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Sem imagem
              </div>
            )}
            <p className="text-gray-600 mt-2">
              {shop.products.length} produto(s)
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
