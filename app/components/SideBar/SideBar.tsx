"use client";

import React, { useState } from "react";
import {
  IconArrowLeft,
  IconGrain,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import imagem from "@/public/userStockImage.jpg";
import logo from "@/public/logo.svg";
import { SideBarBody, SideBarLink, SideBar } from "./ConfigSideBar";
import { useAuth } from "@/context/Auth/AuthContext";

export function SideBarComponent() {
  const links = [
    {
      label: "Lista de Lojas",
      href: "/guren",
      icon: <IconGrain className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Minha Conta",
      href: "/guren/me",
      icon: <IconUser className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      isLogoutButton: true,
      href: "#",
      label: "Sair",
      icon: (
        <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  return (
    <SideBar open={open} setOpen={setOpen} animate={true}>
      <SideBarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SideBarLink
                key={idx}
                link={link}
                isLogoutButton={link.isLogoutButton}
              />
            ))}
          </div>
        </div>
        <div>
          <SideBarLink
            link={{
              label: user?.name || "Usuário",
              href: "/guren/me",
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
      href="/guren"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <Image className="h-8 w-8 flex-shrink-0" src={logo} alt="Logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-logo-2 uppercase tracking-widest font-bold text-brand-100 text-xl"
      >
        Guren
      </motion.span>
    </Link>
  );
};
