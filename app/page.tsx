import Link from "next/link";
import FlipWords from "./components/FlipWords/FlipWords";
import leftDraw from "@/public/left_draw_gif.svg";
import rightDraw from "@/public/right_draw_gif.svg";
import Image from "next/image";
import { IconMail, IconBrandWhatsapp } from "@tabler/icons-react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import NavList from "./components/HeaderNav/NavList";

const navValues = [
  { label: "Home", href: "#" },
  { label: "Disciplina", href: "#disciplina" },
  { label: "Empresa", href: "#empresa" },
  { label: "Projeto", href: "#projeto" },
  { label: "Membros", href: "#membros" },
  { label: "Descobrir", href: "#" },
];

export default function Home() {
  return (
    <>
      <div className="bg-brand-200 w-full h-10">
        <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-0">
          <div id="subHeader-contact" className="flex gap-4 text-gray-100">
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
      <header className="shadow-blue min-h-[80px] flex items-center relative">
        <div className="container mx-auto h-full flex flex-row items-center justify-between px-4 md:px-0">
          <a
            href="#"
            className="text-brand-100 uppercase text-xl md:text-2xl my-4 md:my-0 font-medium font-logo-1"
          >
            guren <b className="text-brand-200 font-bold font-logo-2">Lojas</b>
          </a>
          <NavList navLinks={navValues} />
        </div>
      </header>
      <div id="home" className="flex flex-col gap-2 h-[calc(100vh-120px)]">
        <div className="flex flex-col gap-6 items-center justify-center xl:justify-end flex-1">
          <FlipWords
            text="O caminho para uma loja"
            textAfter="começa aqui!"
            words={["bonita", "segura", "simples", "moderna"]}
          />
          <Link
            href="#"
            className="bg-brand-100 text-white px-6 py-3 rounded-md cursor-pointer w-fit hover:bg-brand-200 transition duration-300"
          >
            Solicitar uma demonstração
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-10 md:pb-4">
          <Image
            src={leftDraw}
            alt="desenho de uma loja"
            className="w-full max-w-[720px]"
          />
          <Image
            src={rightDraw}
            alt="desenho de uma loja"
            className="justify-self-end w-full max-w-[720px]"
          />
        </div>
      </div>
    </>
  );
}
