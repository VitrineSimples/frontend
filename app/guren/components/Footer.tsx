import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-contrast text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">ALLter</h3>
          <p className="text-sm">Moda para todos, com estilo e conforto.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Atendimento</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />{" "}
              <a href="mailto:allter@shop.com" className="hover:underline">
                allter@shop.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />{" "}
              <a href="https://wa.me/551434914432" className="hover:underline">
                +55 14 3491-4432
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} />{" "}
              <a href="#" className="hover:underline">
                Suporte
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Redes Sociais</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="hover:text-gray-300">
              <IconBrandInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-gray-300">
              <IconBrandFacebook />
            </a>
            <a
              href="https://wa.me/551434914432"
              aria-label="WhatsApp"
              className="hover:text-gray-300"
            >
              <MessageCircle />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-white/80 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} ALLter. Todos os direitos reservados.
        Desenvolvimento GUREN
      </div>
    </footer>
  );
}
