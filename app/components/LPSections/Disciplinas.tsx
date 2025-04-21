"use client";

import Image, { StaticImageData } from "next/image";

import LP_Claudinei from "@/public/LP_Claudinei.jpg";
import LP_Valdir from "@/public/LP_Valdir.jpg";
import LP_Cristovam from "@/public/LP_Cristovam.jpg";
import LP_DesSoftware from "@/public/LP_DesSoftware.png";
import LP_FrontEnd from "@/public/LP_FrontEnd.png";
import LP_FabProjetos from "@/public/LP_FabProjetos.jpg";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

interface iDisciplina {
  nomeDisciplina: string;
  professor: string;
  imagem: StaticImageData;
  descricao: string;
}

const disciplinas: iDisciplina[] = [
  {
    nomeDisciplina: "Fábrica de Projetos",
    professor: "Cristovam",
    imagem: LP_Cristovam,
    descricao:
      "A disciplina de Fábrica de Projetos tem como objetivo proporcionar aos alunos uma experiência prática no desenvolvimento de projetos reais. Os alunos trabalham em equipe, aplicando os conhecimentos adquiridos em sala de aula para criar soluções inovadoras e funcionais.",
  },
  {
    nomeDisciplina: "Tecnologias Front-end",
    professor: "Valdir Amancio Pereira Junior",
    imagem: LP_Valdir,
    descricao:
      "A disciplina de Tecnologias de Frontend ensina os fundamentos para criar interfaces modernas e responsivas. Nela, aprendemos a utilizar HTML, CSS e JavaScript, além de frameworks como React e Tailwind CSS, para desenvolver aplicações web focadas na experiência do usuário.",
  },
  {
    nomeDisciplina: "Plataforma de Desenvolvimento de Software",
    professor: "Claudinei",
    imagem: LP_Claudinei,
    descricao:
      "A disciplina de Plataforma de Desenvolvimento de Software aborda as principais ferramentas e metodologias utilizadas no desenvolvimento de software. Os alunos aprendem sobre controle de versão, integração contínua, testes automatizados e práticas ágeis, preparando-os para o mercado de trabalho.",
  },
];

export default function Disciplinas() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [currentModal, setCurrentModal] = useState(0);
  const handleModal = (index: number) => {
    setCurrentModal(index);
    setModal(true);
  };

  return (
    <>
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-200">
            Disciplinas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              onClick={() => handleModal(0)}
              className="bg-gray-300 shadow-md rounded-2xl overflow-hidden cursor-pointer border-2 border-brand-200 hover:border-brand-100 transform-border duration-300"
            >
              <Image
                src={LP_FabProjetos}
                className="w-full h-48 object-cover"
                alt="fabrica-projetos"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-600">
                  Fábrica de Projetos
                </h3>
              </div>
            </div>
            <div
              onClick={() => handleModal(1)}
              className="bg-gray-300 shadow-md rounded-2xl overflow-hidden cursor-pointer border-2 border-brand-200 hover:border-brand-100 transform-border duration-300"
            >
              <Image
                src={LP_FrontEnd}
                className="w-full h-48 object-cover"
                alt="tec-front"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-600">
                  Tecnologias Front-end
                </h3>
              </div>
            </div>
            <div
              onClick={() => handleModal(2)}
              className="bg-gray-300 shadow-md rounded-2xl overflow-hidden cursor-pointer border-2 border-brand-200 hover:border-brand-100 transform-border duration-300"
            >
              <Image
                src={LP_DesSoftware}
                className="w-full h-48 object-cover"
                alt="plat-soft"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-600">
                  Plataforma de Desenvolvimento de Software
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <Modal toggleModal={toggleModal}>
          {ModalDisciplina(disciplinas[currentModal])}
        </Modal>
      )}
    </>
  );
}

function ModalDisciplina(disciplina: iDisciplina): React.ReactElement {
  const { nomeDisciplina, professor, imagem, descricao } = disciplina;
  return (
    <div className="bg-gray-100 rounded-xl p-6 max-w-lg w-full">
      <h3 className="text-2xl font-bold mb-2 text-center text-brand-200">{nomeDisciplina}</h3>
      <p className="text-gray-600 mb-4">{descricao}</p>
      <h3 className="text-2xl font-bold mb-2 text-center flex flex-col gap-2">
        <span className="text-gray-600 font-light">Docente</span>
        <span className="text-brand-200">{professor}</span>
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
