import { Shop } from "@/context/Shop/types";
import { IconGrain, IconUser } from "@tabler/icons-react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer({ shop }: { shop: Shop }) {
  return (
    <footer className="bg-contrast text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">{shop.name}</h3>
          <p className="text-sm">Website focado para cliente GUREN.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Atendimento</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />{" "}
              <a href={`mailto:${shop.email}`} className="hover:underline">
                {shop.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />{" "}
              <a
                href={`https://wa.me/${shop.whatsApp}`}
                className="hover:underline"
              >
                {shop.whatsApp}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Páginas</h4>
          <div className="flex space-x-4">
            <Link href={"guren"} className="hover:text-gray-300">
              <IconGrain />
            </Link>
            <Link href={"guren/me"} className="hover:text-gray-300">
              <IconUser />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-white/80 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} {shop.name}. Todos os direitos reservados.
        Desenvolvimento GUREN
      </div>
    </footer>
  );
}
