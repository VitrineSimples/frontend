import { products } from "@/data";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Produtos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6 duration-300">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center gap-4 w-full sm:max-w-sm md:max-w-md"
        >
          <div className="relative w-full">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-56 object-cover rounded-xl"
            />
            <button
              title="Favoritar"
              className="absolute cursor-pointer top-2 right-2 bg-gray-100/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-red-100 transition"
            >
              <Heart className="w-5 h-5 text-contrast" />
            </button>
          </div>
          <div className="text-center px-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
          </div>
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-contrast font-bold text-lg sm:text-xl">
              R$ {product.price.toFixed(2)}
            </span>
            <button
              title="Adicionar ao carrinho"
              className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 " />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
            <button className="flex-1 cursor-pointer bg-gray-200 text-brand-200 py-2 rounded-xl hover:bg-gray-300 hover:text-brand-100 transition font-medium text-sm sm:text-base">
              Detalhes
            </button>
            <button className="flex-1 cursor-pointer bg-contrast/95 text-gray-100 py-2 rounded-xl hover:bg-contrast transition font-medium text-sm sm:text-base">
              Comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
