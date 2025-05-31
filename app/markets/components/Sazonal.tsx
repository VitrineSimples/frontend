import { iProduct } from "@/data";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Sazonal() {
  type iSazonal = {
    id: string;
    name: string;
    produtos: iProduct[];
    description: string;
    start_date: Date;
    end_date: Date;
  };

  const sazonal: iSazonal = {
    id: "sazonal",
    name: "Inverno",
    produtos: [
      {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        name: "Camiseta Básica",
        price: 29.99,
        description: "Camiseta confortável de algodão",
        image:
          "https://www.tedcamisas.com.br/image/cache/data/lisas/branca-redonda-926x926.jpg",
        is_promo: false,
        created_at: "2025-03-04T09:00:00Z",
      },
      {
        id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        name: "Calça Jeans Slim",
        price: 89.99,
        description: "Calça jeans modelo slim fit",
        image:
          "https://www.revanche.com.br/media/catalog/product/cache/8e5872966dd88cc0e998d2d2c4eec43a/c/a/cal_a-jeans-slim-barra-normal-atacado-masculina-revanche-espolla104409-_1_.jpg",
        is_promo: false,
        created_at: "2025-03-04T09:30:00Z",
      },
      {
        id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
        nome: "Tênis Casual",
        preco: 149.99,
        description: "Tênis casual para o dia a dia",
        image:
          "https://bellindashoes.com.br/cdn/shop/files/2_7bdfd4fb-9e9f-4b73-aacb-702c1d8002d3.png?v=1718081671",
        is_promo: true,
        created_at: "2025-03-04T10:00:00Z",
      },
    ] as iProduct[],
    description:
      "Aproveite nossas ofertas de inverno exclusivas por tempo limitado!",
    start_date: new Date("2025-05-12"),
    end_date: new Date("2025-05-20"),
  };

  if (sazonal.start_date > new Date() || sazonal.end_date < new Date()) {
    return null;
  }

  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 rounded-3xl shadow-inner">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-contrast">
          {sazonal.name}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {sazonal.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {sazonal.produtos.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center gap-4 w-full sm:max-w-sm md:max-w-md"
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
              <p className="text-sm text-gray-500 mt-1">
                {product.description}
              </p>
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
