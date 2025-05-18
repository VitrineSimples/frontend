import { NavBar } from "@/app/components/NavBar/NavBar";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Carousel from "../components/Carousel/Carousel";
import Benefits from "../components/Benefits";
import Sazonal from "../components/Sazonal";
import Produtos from "../components/Produtos";

export default function Allter() {
  return (
    <>
      <SubHeader />
      <Header />
      <NavBar />
      <Carousel />
      <Benefits />
      <Sazonal />
      <Produtos />
    </>
  );
}
