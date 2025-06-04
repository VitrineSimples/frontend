"use client";

import { NavBar } from "@/app/components/NavBar/NavBar";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Carousel from "../components/Carousel/Carousel";
import Benefits from "../components/Benefits";
// import Sazonal from "../../components/Sazonal";
import Produtos from "../components/Produtos";
import Footer from "../components/Footer";
import { useShop } from "@/context/Shop/ShopContext";
import { use, useEffect } from "react";
import ShopNotFound from "../components/ShopNotFound";
// import { iSazonal } from "@/context/SeasonalCampaign/type";

interface PageProps {
  params: Promise<{ shopName: string }>;
}

export default function MarketPage({ params }: PageProps) {
  const { getShopByName, selectedShop } = useShop();
  const { shopName } = use(params);

  useEffect(() => {
    const fetch = async () => {
      await getShopByName(shopName);
    };
    fetch();
  }, [shopName]);

  if (!selectedShop) return <ShopNotFound />;

  return (
    <>
      <SubHeader />
      <Header shopName={selectedShop.name} />
      <NavBar />
      <Carousel />
      <Benefits />
      {/* <Sazonal SeasonalCampaign={{} as iSazonal} /> */}
      <div className="w-18 h-3 bg-contrast mx-auto my-12 rounded-xl" />
      <h2 className="text-center uppercase text-2xl text-contrast font-bold my-2">
        Produtos
      </h2>
      <Produtos products={selectedShop.products} />
      <div className="w-18 h-3 bg-contrast mx-auto my-12 rounded-xl" />
      <Footer />
    </>
  );
}
