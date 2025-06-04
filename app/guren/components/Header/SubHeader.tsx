import ThemeToggle from "@/app/components/ThemeToggle/ThemeToggle";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";

const SubHeader = () => {
  return (
    <div id="subHeader" className="bg-contrast w-full h-10">
        <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-12">
          <div id="subHeader-contact" className="flex gap-4 text-gray-50">
            <a href="mailto:guren@shop.com" className="flex gap-2">
              <IconMail className="w-7 h-7 md:w-6 md:h-6" />
              <span className="hidden md:flex hover:underline">
                allter@shop.com
              </span>
            </a>
            <a href="callto:+551434914434" className="flex gap-2">
              <IconBrandWhatsapp className="w-7 h-7 md:w-6 md:h-6" />
              <span className="hidden md:flex hover:underline">
                +55 14 34914432
              </span>
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
  );
};

export default SubHeader;
