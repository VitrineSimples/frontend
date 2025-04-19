"use client";

import { tv } from "tailwind-variants";

interface iHamburguer {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const Hamburguer = ({ open, setOpen }: iHamburguer) => {
  const button_tv = tv({
    base: "w-10 z-10 md:hidden h-[20px] border-t-2 border-brand-100 relative before:-translate-y-[3px] after:absolute after:content-[''] after:bottom-0 after:right-0 after:left-0 after:border-b-2 after:border-brand-100 after:transition-transform after:duration-[.3s] before:content-[''] before:absolute before:left-0 before:right-0 before:top-[10px] before:border-b-2 before:border-brand-100 before:transition-transform before:duration-[.3s]",
    variants: {
      open: {
        true: "after:rotate-[45deg] after:-translate-y-[12px] before:rotate-[135deg] before:-translate-y-[4px] border-none",
      },
    },
    defaultVariants: {
      open: false,
    },
  });

  return (
    <button
      onClick={() => {
        setOpen((value) => !value);
      }}
      className={button_tv({ open })}
    />
  );
};

export default Hamburguer;