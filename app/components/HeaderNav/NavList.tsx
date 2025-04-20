"use client";

import { useState } from "react";
import Hamburguer from "./Hamburguer";
import { tv } from "tailwind-variants";
import Link from "next/link";

interface iNavList {
  navLinks: {
    label: string;
    href: string;
  }[];
}

const NavList = ({ navLinks }: iNavList) => {
  const [open, setOpen] = useState(false);

  const list_tv = tv({
    base: "absolute invisible flex z-[999] md:static right-0 left-0 opacity-0 top-16 bg-brand-200 flex-col md:opacity-100 md:bg-transparent md:text-brand-200 md:visible md:flex-row items-center justify-center gap-2 py-2 md:gap-0 md:space-x-8 text-gray-100 text-lg transition-all duration-300",
    variants: {
      open: {
        true: "opacity-100 visible",
      },
    },
    defaultVariants: {
      open: false,
    },
  });

  return (
    <nav className="flex w-max items-center justify-between text-2xl text-brand-100 md:text-3xl">
      <Hamburguer open={open} setOpen={setOpen} />
      <ul className={list_tv({ open })}>
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="cursor-pointer hover:text-brand-100 transition-colors duration-300"
          >
            <Link href={link.href} onClick={() => setOpen(!open)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
