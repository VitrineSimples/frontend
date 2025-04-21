import Image from "next/image";
import Link from "next/link";
import FlipWords from "./components/FlipWords/FlipWords";
import leftDraw from "@/public/left_draw_gif.svg";
import rightDraw from "@/public/right_draw_gif.svg";
import { IconMail, IconBrandWhatsapp } from "@tabler/icons-react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import NavList from "./components/HeaderNav/NavList";
import logo from "@/public/logo.svg";
import Projeto from "./components/LPSections/Projeto";
import Empresa from "./components/LPSections/Empresa";
import Disciplinas from "./components/LPSections/Disciplinas";
import userStockImage from "@/public/userStockImage.jpg";

const navValues = [
  { label: "Home", href: "#home" },
  { label: "Projeto", href: "#projeto" },
  { label: "Disciplina", href: "#disciplina" },
  { label: "Empresa", href: "#empresa" },
  { label: "Membros", href: "#membros" },
];

export default function Home() {
  return (
    <>
      <div id="subHeader" className="bg-brand-200 w-full h-10">
        <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-12">
          <div id="subHeader-contact" className="flex gap-4 text-gray-50">
            <a href="mailto:guren@shop.com" className="flex gap-2">
              <IconMail className="w-7 h-7 md:w-6 md:h-6" />
              <span className="hidden md:flex hover:underline">
                guren@shop.com
              </span>
            </a>
            <a href="callto:+551434914434" className="flex gap-2">
              <IconBrandWhatsapp className="w-7 h-7 md:w-6 md:h-6" />
              <span className="hidden md:flex hover:underline">
                +55 14 34914434
              </span>
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <header className="shadow-blue min-h-[60px] md:min-h-[80px] flex items-center sticky top-0 bg-gray-200 z-[999]">
        <div className="container mx-auto h-full flex flex-row items-center justify-between px-4 md:px-0 relative">
          <a
            href="#"
            className="flex justify-center items-center gap-1 md:gap-4 text-brand-200 uppercase text-xl md:text-2xl my-4 md:my-0 font-semibold font-logo-2 tracking-widest"
          >
            <Image src={logo} alt="logo do projeto" className="w-9 h-9" />
            guren
          </a>
          <NavList navLinks={navValues} />
        </div>
      </header>
      <div
        id="home"
        className="flex flex-col justify-end gap-2 h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] relative"
      >
        <div className="absolute flex flex-col gap-6 items-center justify-center top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <Image
            src={logo}
            alt="logo da empresa"
            className="w-20 h-20 md:w-28 md:h-28"
            data-aos="fade-down"
            data-aos-delay="800"
          />
          <FlipWords
            text="Oferecendo um serviço"
            textAfter="para seu negócio!"
            words={["confiável", "inteligente", "eficiente", "inovador"]}
          />
          <Link
            href="#"
            className="bg-brand-200 text-white px-6 py-3 rounded-md cursor-pointer w-fit hover:bg-brand-100 transition duration-300"
            data-aos="fade-down"
            data-aos-delay="1550"
          >
            Solicitar uma demonstração
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-10 md:pb-4">
          <Image
            src={leftDraw}
            alt="desenho de uma loja"
            className="w-full max-w-[460px] 2xl:max-w-[720px]"
          />
          <Image
            src={rightDraw}
            alt="desenho de uma loja"
            className="justify-self-end w-full max-w-[460px] 2xl:max-w-[720px]"
          />
        </div>
      </div>
      <Projeto />
      <Empresa />
      <Disciplinas />
      <section id="membros" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black-700">
            Membros do Grupo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 ml-auto">
            <div className="group bg-white rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-500 shadow-md hover:scale-105 hover:bg-[#495057]">
              <Image
                src={userStockImage}
                alt="Foto Membro 1"
                className="w-24 h-24 mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black group-hover:text-white transition-colors duration-300">
                Guilherme Dorce de Britto
              </h3>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                Desenvolvedor / Designer
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-500 shadow-md hover:scale-105 hover:bg-[#495057]">
              <Image
                src={userStockImage}
                alt="Foto Membro 2"
                className="w-24 h-24 mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Rodrigo Shinji Yamashita
              </h3>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                Scrum Master
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-500 shadow-md hover:scale-105 hover:bg-[#495057]">
              <Image
                src={userStockImage}
                alt="Foto Membro 3"
                className="w-24 h-24 mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Thiago Tsuyoshi Okada Aoki
              </h3>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                Desenvolvedor / Designer
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-500 shadow-md hover:scale-105 hover:bg-[#495057]">
              <Image
                src={userStockImage}
                alt="Foto Membro 4"
                className="w-24 h-24 mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Vanessa Kaori Kurauchi
              </h3>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                Desenvolvedora/ Supervisora de Qualidade
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-all duration-500 shadow-md hover:scale-105 hover:bg-[#495057]">
              <Image
                src={userStockImage}
                alt="Foto Membro 5"
                className="w-24 h-24 mx-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Estevão Alves
              </h3>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-white transition-colors duration-300">
                Product Owner
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
