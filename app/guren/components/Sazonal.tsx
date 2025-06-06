import { iSazonal } from "@/context/SeasonalCampaign/type";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Sazonal({
  SeasonalCampaign,
}: {
  SeasonalCampaign: iSazonal;
}) {
  if (
    SeasonalCampaign.startDate > new Date() ||
    SeasonalCampaign.endDate < new Date()
  ) {
    return null;
  }

  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-3xl shadow-inner">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-contrast">
          {SeasonalCampaign.campaignName}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {SeasonalCampaign.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {SeasonalCampaign.products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center gap-4 w-full sm:max-w-sm md:max-w-md"
          >
            <div className="relative w-full">
              <Image
                src={product.imageURL}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-xl"
              />
            </div>
            <div className="text-center px-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{product.name}</p>
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
    </section>
  );
}
