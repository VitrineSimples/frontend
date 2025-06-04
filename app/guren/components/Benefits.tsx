"use client";

import {
  IconCreditCard,
  IconDiscount2,
  IconShieldCheck,
  IconBrandWhatsapp,
  IconCash,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const benefits = [
  {
    icon: <IconCash className="w-10 h-10 text-contrast" />,
    title: "Pague com PIX",
    description: "Pague com PIX à vista e ganhe 10% de desconto. Nunca foi tão fácil.",
  },
  {
    icon: <IconShieldCheck className="w-10 h-10 text-contrast" />,
    title: "Qualidade e Segurança",
    description: "Loja 100% segura com certificado digital. Compre com tranquilidade.",
  },
  {
    icon: <IconDiscount2 className="w-10 h-10 text-contrast" />,
    title: "Promoções | até 20% off",
    description: "Vários produtos com até 20% de desconto em nossas categorias.",
  },
  {
    icon: <IconBrandWhatsapp className="w-10 h-10 text-contrast" />,
    title: "Atendimento Humanizado",
    description: "Fale diretamente com nossos atendentes, sem burocracia!",
  },
  {
    icon: <IconCreditCard className="w-10 h-10 text-contrast" />,
    title: "Pague com Cartão",
    description: "Divida suas compras em até 10x sem juros em seu cartão preferido!",
  },
];

const BenefitsMobile = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % benefits.length);
  };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + benefits.length) % benefits.length);
//   };

  // Troca automática (opcional)
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative h-60">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="bg-gray-100 p-4 rounded-full mb-3">
                {benefits[current].icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefits[current].title}
              </h3>
              <p className="text-sm text-gray-600">{benefits[current].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegação por dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {benefits.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition border border-gray-400 ${
                index === current ? "bg-contrtext-contrast" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitsDesktop = () => {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {benefits.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-3">
                <div className="bg-white rounded-full p-4 shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

const Benefits = () => 
<>
    <div className="hidden md:block">
        <BenefitsDesktop />
    </div>
    <div className="block md:hidden">
        <BenefitsMobile />
    </div>
</>

export default Benefits;