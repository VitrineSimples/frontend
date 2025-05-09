import {
  IconBuildingStore,
  IconSearch,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";

const Header = () => {
  return (
    <div
      id="header"
      className="w-full h-32 bg-gray-100 border-b border-b-gray-600/20"
    >
      <div className="container flex-wrap mx-auto px-4 md:px-12 flex justify-between items-center h-full">
        <Link href={"/"} className="order-1 md:order-0">
          <h1 className="flex items-center text-contrast">
            <IconBuildingStore className="w-9 h-9 md:w-10 md:h-10 mr-2" />{" "}
            <span className="font-logo-1 font-bold text-2xl md:text-3xl">
              ALL
            </span>{" "}
            <span className="font-logo-2 text-xl md:text-2xl font-medium">
              ter
            </span>
          </h1>
        </Link>
        <div
          id="seach-input"
          className="w-full md:w-fit order-3 md:order-0 text-contrast flex flex-row-reverse justify-center items-center border border-contrast/25 rounded-lg"
        >
          <button className="cursor-pointer md:w-full md:h-full p-2">
            <IconSearch />
          </button>
          <input
            id="search"
            type="text"
            className="grow p-2 outline-none md:text-lg placeholder:font-light"
            placeholder="O que deseja?"
          />
        </div>
        <div
          id="header-buttons"
          className="order-2 md:order-0 flex gap-2 text-contrast"
        >
          <a href="#">
            <IconHeart className="w-7 h-7 md:w-8 md:h-8" />
          </a>
          <a href="#">
            <IconShoppingCart className="w-7 h-7 md:w-8 md:h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
