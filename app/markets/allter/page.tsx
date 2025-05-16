import { NavBar } from "@/app/components/NavBar/NavBar";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import produtoExemplo from "@/public/ProdutoExemplo2800x800.webp";
import Image from "next/image";
import Carousel from "../components/Carousel/Carousel";
import Benefits from "../components/Benefits";

export default function MarketOne() {
  const products = [
    {
      id: 1,
      name: "Vestido Floral",
      price: 149.9,
      image: produtoExemplo,
      description: "Leve, elegante e perfeito para o verão.",
    },
    {
      id: 2,
      name: "Tênis Branco",
      price: 219.9,
      image: produtoExemplo,
      description: "Confortável e estiloso para o dia a dia.",
    },
    {
      id: 3,
      name: "Camisa Polo Masculina",
      price: 129.9,
      image: produtoExemplo,
      description: "Ideal para ocasiões casuais e formais.",
    },
    {
      id: 4,
      name: "Conjunto Infantil",
      price: 99.9,
      image: produtoExemplo,
      description: "Conforto e diversão para os pequenos.",
    },
  ];

  return (
    <>
      <SubHeader />
      <Header />
      <NavBar />
      <Carousel />
      <Benefits />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-3 text-center">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {product.description}
            </p>
            <span className="text-red-600 font-bold text-lg mt-2">
              R$ {product.price.toFixed(2)}
            </span>
            <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
