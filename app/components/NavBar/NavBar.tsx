"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ConfigNavBar";
import { cn } from "@/lib/utils";
import imageExample from "@/public/ProdutoExemplo2800x800.webp";

export function NavBar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "w-full relative mx-auto z-50 bg-contrast flex justify-center",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Moda Feminina">
          <div className="text-sm flex gap-10 p-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-xl text-contrast font-semibold">
                Moda Feminina
              </h6>
              <HoveredLink href="#">Blusas e Camisas</HoveredLink>
              <HoveredLink href="#">Vestidos</HoveredLink>
              <HoveredLink href="#">Shorts e Saias</HoveredLink>
              <HoveredLink href="#">Casacos e Jaquetas</HoveredLink>
            </div>
            <ProductItem
              title="Camiseta Feminina Floral Off-White"
              href="#"
              src={imageExample}
              price={89.9}
              promo
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Moda Masculina">
          <div className="text-sm flex gap-10 p-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-xl text-contrast font-semibold">
                Moda Masculina
              </h6>
              <HoveredLink href="#">Camisetas e Polos</HoveredLink>
              <HoveredLink href="#">Calças e Bermudas</HoveredLink>
              <HoveredLink href="#">Jaquetas e Moletons</HoveredLink>
              <HoveredLink href="#">Ternos e Blazers</HoveredLink>
            </div>
            <ProductItem
              title="T-Shirt Neutro Off-White"
              href="#"
              src={imageExample}
              price={119.9}
              promo
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Moda Infantil">
          <div className="text-sm flex gap-10 p-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-xl text-contrast font-semibold">
                Moda Infantil
              </h6>
              <HoveredLink href="#">Roupas Casuais</HoveredLink>
              <HoveredLink href="#">Pijamas</HoveredLink>
              <HoveredLink href="#">Fantasias</HoveredLink>
              <HoveredLink href="#">Conjuntos</HoveredLink>
            </div>
            <ProductItem
              title="Camiseta Leve-Opaco Azul Bebê"
              href="#"
              src={imageExample}
              price={56.9}
              promo
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Calçados">
          <div className="text-sm flex gap-10 p-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-xl text-contrast font-semibold">Calçados</h6>
              <HoveredLink href="#">Tênis</HoveredLink>
              <HoveredLink href="#">Sandálias</HoveredLink>
              <HoveredLink href="#">Botas</HoveredLink>
              <HoveredLink href="#">Chinelos</HoveredLink>
            </div>
            <ProductItem
              title="Tênis Branco MyShoes"
              href="#"
              src={imageExample}
              price={84.9}
              promo
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Fitness">
          <div className="text-sm flex gap-10 p-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-xl text-contrast font-semibold">Fitness</h6>
              <HoveredLink href="#">Roupas Leves</HoveredLink>
              <HoveredLink href="#">Tênis para corrida</HoveredLink>
              <HoveredLink href="#">Tops e Leggings</HoveredLink>
              <HoveredLink href="#">Shorts e Bermudas</HoveredLink>
            </div>
            <ProductItem
              title="Top + Shorts Conjunto Esmeralda"
              href="#"
              src={imageExample}
              price={154.9}
              promo
            />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
