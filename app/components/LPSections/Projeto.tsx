import Image from "next/image";
import projetoImage from "@/public/LP_Projeto.webp";

export default function Projeto() {
  return (
    <section id="projeto" className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-brand-200 mb-6">
              Tema do Projeto
            </h2>
            <p className="md:text-lg text-gray-600 leading-relaxed mb-4">
              Nosso grupo está desenvolvendo um{" "}
              <strong>sistema de gerenciamento de vitrines digitais</strong>,
              voltado para lojistas que desejam organizar, destacar e atualizar
              seus produtos de forma prática e atrativa.
            </p>
            <p className="md:text-lg text-gray-600 leading-relaxed mb-4">
              A solução contará com recursos como exibição por categorias,
              destaque de promoções e um painel administrativo amigável, que
              permite atualizações em tempo real.
            </p>
            <p className="md:text-lg text-gray-600 leading-relaxed">
              O objetivo é oferecer uma plataforma acessível, com foco em
              usabilidade e impacto visual, contribuindo para aumentar a conexão
              com os clientes e potencializar as vendas no ambiente digital.
            </p>
          </div>
          <div data-aos="fade-left">
            <Image
              src={projetoImage}
              alt="vitrine digital"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
