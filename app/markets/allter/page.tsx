import { NavBar } from "@/app/components/NavBar/NavBar";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Carousel from "../components/Carousel/Carousel";
import Benefits from "../components/Benefits";
import Sazonal from "../components/Sazonal";
import Produtos from "../components/Produtos";
import Footer from "../components/Footer";

export default function Allter() {
  return (
    <>
      <SubHeader />
      <Header />
      <NavBar />
      <Carousel />
      <Benefits />
      <Sazonal />
      <div className="w-18 h-3 bg-contrast mx-auto my-12 rounded-xl"/>
      <h2 className="text-center uppercase text-2xl text-contrast font-bold my-2">Produtos</h2>
      <Produtos />
      <div className="w-18 h-3 bg-contrast mx-auto my-12 rounded-xl"/>
      <Footer />
    </>
  );
}
