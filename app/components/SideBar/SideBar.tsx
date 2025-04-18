"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconGrain,
  IconSettings,
  IconCurrencyDollar,
  IconUser,
  IconHeadset,
  IconHistory,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import imagem from "@/public/tree-736885_1280.jpg";
import logo from "@/public/logo.svg";
import { SideBarBody, SideBarLink, SideBar } from "./ConfigSideBar";

export function SideBarComponent() {
  const links = [
    {
      label: "Página Principal",
      href: "#",
      icon: <IconGrain className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Minha Conta",
      href: "#",
      icon: <IconUser className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Cupons e Descontos",
      href: "#",
      icon: (
        <IconCurrencyDollar className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Suporte e Ajuda",
      href: "#",
      icon: <IconHeadset className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Histórico de Compras",
      href: "#",
      icon: <IconHistory className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Cofigurações",
      href: "#",
      icon: <IconSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Sair",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <SideBar open={open} setOpen={setOpen} animate={true}>
      <SideBarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SideBarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SideBarLink
            link={{
              label: "User Example",
              href: "#",
              icon: (
                <Image
                  src={imagem}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SideBarBody>
    </SideBar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <Image className="h-8 w-8 flex-shrink-0" src={logo} alt="Logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre"
      >
        <b className="font-logo-1 font-bold text-brand-100 text-xl">Intra</b>
        <span className="font-logo-2 font-light text-brand-200 text-lg">
          Vibe
        </span>
      </motion.span>
    </Link>
  );
};
