"use client";

import Image, { StaticImageData } from "next/image";
import Vanessa from "@/public/LP_Vanessa.jpg";
import Thiago from "@/public/LP_Thiago.jpg";
import Estevao from "@/public/LP_Estevao.jpeg";
import Rodrigo from "@/public/LP_Rodrigo.jpg";
import Guilherme from "@/public/LP_Guilherme.jpg";
import { Modal } from "../Modal/Modal";
import { useState } from "react";

interface iIntegrante {
  id: string;
  nome: string;
  cargo: string;
  imagem: StaticImageData;
  cargoDescricao: string;
}

const integrantes: iIntegrante[] = [
  {
    id: "guilhermedev",
    nome: "Guilherme Dorce de Britto",
    cargo: "Desenvolvedor / Designer",
    imagem: Guilherme,
    cargoDescricao:
      "Responsável por criar produtos digitais que unam funcionalidade e boa experiência visual. Como designer cuidou da aparência e usabilidade, garantindo uma interface clara e atrativa. Já como desenvolvedor transforma essas ideias em código, garantindo que tudo funcione de forma eficiente e segura, entregando soluções que são bonitas, intuitivas e funcionais.",
  },
  {
    id: "rodrigodev",
    nome: "Rodrigo Shinji Yamashita",
    cargo: "Scrum Master",
    imagem: Rodrigo,
    cargoDescricao:
      "O Scrum Master é o facilitador do time ágil. Ele ajuda a equipe a seguir os princípios do Scrum, remove impedimentos, promove a colaboração e garante que todos estejam alinhados com os objetivos do projeto. Seu foco é criar um ambiente produtivo, onde o time possa entregar valor de forma contínua e eficiente.",
  },
  {
    id: "thiagodev",
    nome: "Thiago Tsuyoshi Okada Aoki",
    cargo: "Desenvolvedor / Designer",
    imagem: Thiago,
    cargoDescricao:
      "Responsável por criar produtos digitais que unam funcionalidade e boa experiência visual. Como designer cuidou da aparência e usabilidade, garantindo uma interface clara e atrativa. Já como desenvolvedor transforma essas ideias em código, garantindo que tudo funcione de forma eficiente e segura, entregando soluções que são bonitas, intuitivas e funcionais.",
  },
  {
    id: "vanessadev",
    nome: "Vanessa Kaori Kurauchi",
    cargo: "Desenvolvedora / Supervisora de Qualidade",
    imagem: Vanessa,
    cargoDescricao:
      "Uma pessoa que atua como desenvolvedora, escrevendo código e implementando funcionalidades, e também como supervisora de qualidade, garantindo que o produto final esteja livre de erros e atenda aos padrões exigidos.",
  },
  {
    id: "estevaodev",
    nome: "Estevão Alves dos Santos",
    cargo: "Product Owner",
    imagem: Estevao,
    cargoDescricao:
      "O Product Owner é o responsável por definir a visão do produto e priorizar as funcionalidades. Ele atua como a ponte entre o time de desenvolvimento e os stakeholders, garantindo que o que está sendo desenvolvido entrega valor ao negócio e aos usuários. Seu foco é maximizar o retorno sobre o investimento e alinhar as expectativas de todos os envolvidos.",
  },
];

export default function Integrantes() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [currentModal, setCurrentModal] = useState(0);
  const handleModal = (index: number) => {
    setCurrentModal(index);
    setModal(true);
  };

  return (
    <>
      <section id="membros" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-200">
            Membros do Grupo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 ml-auto">
            {integrantes.map((integrante, index) => (
              <div
                data-aos="flip-left"
                data-aos-delay={`${index * 100}`}
                key={integrante.id}
                onClick={() => handleModal(index)}
                className="group bg-gray-200 rounded-2xl p-6 text-center overflow-hidden cursor-pointer transition-colors duration-300 shadow-md hover:bg-gray-300"
              >
                <Image
                  src={integrante.imagem}
                  alt={`Foto ${integrante.nome}`}
                  className="w-24 h-24 mx-auto rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-brand-100 group-hover:text-brand-200 transition-colors duration-300">
                  {integrante.nome}
                </h3>
                <p className="text-sm text-gray-600 mt-2 transition-colors duration-300">
                  {integrante.cargo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {modal && (
        <Modal toggleModal={toggleModal}>
          {ModalIntegrantes(integrantes[currentModal])}
        </Modal>
      )}
    </>
  );
}

function ModalIntegrantes(integrante: iIntegrante): React.ReactElement {
  const { nome, cargo, imagem, cargoDescricao } = integrante;
  return (
    <div className="bg-gray-100 rounded-xl p-6 max-w-lg w-full">
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-center text-brand-200">
        {cargo}
      </h3>
      <p className="text-gray-600 mb-4 text-sm md:text-base">
        {cargoDescricao}
      </p>
      <h3 className="mb-2 text-center flex flex-col">
        <span className="text-gray-600 font-light text-lg md:text-xl">
          Estudante
        </span>
        <span className="text-brand-200 font-bold text-xl md:text-2xl">
          {nome}
        </span>
      </h3>
      <div className="flex justify-center mt-4">
        <Image
          src={imagem}
          className="w-32 h-32 object-cover rounded-full shadow-md"
          alt="fabrica-projetos"
        />
      </div>
    </div>
  );
}
