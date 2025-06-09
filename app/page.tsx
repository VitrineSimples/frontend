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
import Integrantes from "./components/LPSections/Integrantes";

const navValues = [
  { label: "Home", href: "#home" },
  { label: "Projeto", href: "#projeto" },
  { label: "Empresa", href: "#empresa" },
  { label: "Disciplina", href: "#disciplina" },
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
            href="/register"
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
      <Integrantes />
      <footer className="bg-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Guren
          </p>
          <p className="text-gray-600">Desenvolvido por Guris.</p>
        </div>
      </footer>
    </>
  );
}
