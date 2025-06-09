import ThemeToggle from "@/app/components/ThemeToggle/ThemeToggle";
import { Shop } from "@/context/Shop/types";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";

const SubHeader = ({ shop }: { shop: Shop }) => {
  return (
    <div id="subHeader" className="bg-contrast w-full h-10">
      <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-12">
        <div id="subHeader-contact" className="flex gap-4 text-gray-50">
          <a href={`mailto:${shop.email}`} className="flex gap-2">
            <IconMail className="w-7 h-7 md:w-6 md:h-6" />
            <span className="hidden md:flex hover:underline">{shop.email}</span>
          </a>
          <a href={`callto:${shop.whatsApp}`} className="flex gap-2">
            <IconBrandWhatsapp className="w-7 h-7 md:w-6 md:h-6" />
            <span className="hidden md:flex hover:underline">
              {shop.whatsApp}
            </span>
          </a>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SubHeader;
