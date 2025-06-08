"use client";
import { useCart } from "@/context/Cart/CartContext";
import { IconBuildingStore } from "@tabler/icons-react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Header = ({ shopName }: { shopName: string }) => {
  const { cart, getCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      await getCart();
    };
    fetchCart();
  }, []);

  return (
    <div
      id="header"
      className="w-full h-32 bg-gray-100 border-b border-b-gray-600/20"
    >
      <div className="container flex-wrap mx-auto px-4 md:px-12 flex justify-between items-center h-full">
        <Link href={`/guren/${shopName}`} className="order-1 md:order-0">
          <h1 className="flex items-center text-contrast">
            <IconBuildingStore className="w-9 h-9 md:w-10 md:h-10 mr-2" />{" "}
            <span className="font-logo-1 font-bold text-2xl md:text-3xl">
              {shopName}
            </span>
          </h1>
        </Link>
        <div
          id="header-buttons"
          className="order-2 md:order-0 flex gap-2 text-contrast"
        >
          <Link href="/guren/me/cart" className="relative">
            <ShoppingCart className="w-7 h-7 md:w-8 md:h-8" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-contrast text-xs text-white">
              {cart?.items.length || 0}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
