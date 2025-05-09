"use client";
import React from "react";
import { motion } from "motion/react";
import Link, { LinkProps } from "next/link";
import Image, { StaticImageData } from "next/image";
import { IconFlame } from "@tabler/icons-react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="md:relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-gray-50 hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-5/6 md:top-[calc(100%_+_1.2rem)] w-fit left-1/2 right-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="md:relative w-fit rounded-full shadow-input flex flex-wrap justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  price,
  href,
  src,
  promo
}: {
  title: string;
  price: number;
  href: string;
  src: StaticImageData;
  promo?: boolean
}) => {
  return (
    <Link href={href} className="hidden xl:flex flex-col items-center justify-center gap-4 space-x-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1 after:h-10 after:rounded-sm after:bg-contrast before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-1 before:h-10 before:rounded-sm before:bg-contrast">
      <Image
        src={src}
        width={240}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div className="w-full">
        <h4 className="text-xl font-bold mb-1 text-gray-800 text-center max-w-[200px] mx-auto">
          {title}
        </h4>
        <p className="text-contrast text-lg text-center">
          R$ {price.toFixed(2)}
        </p>
      </div>
      {promo && <div className="absolute content-[''] top-4 right-4 text-contrast"><IconFlame/></div>}
    </Link>
  );
};

interface HoveredLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 hover:text-black"
    >
      {children}
    </Link>
  );
};
