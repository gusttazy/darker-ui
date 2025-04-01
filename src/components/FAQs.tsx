"use client";

import PlusIcon from "../assets/icons/plus.svg";
import React, { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";

const items = [
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer: "Aceitamos cartões de crédito, débito e PIX.",
  },
  {
    question: "Como funciona o preço para empresas?",
    answer: "O preço é escalonado conforme o número de usuários.",
  },
  {
    question: "Posso cancelar meu plano a hora que quiser?",
    answer: "Sim, você pode cancelar a qualquer momento.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Utilizamos criptografia avançada para proteger seus dados.",
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      className="py-4 border-b border-white/20"
      initial="collapsed"
      animate={isOpen ? "expanded" : "collapsed"}
      exit="collapsed"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left focus:outline-none px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10"
      >
        <span className="flex-1 text-lg font-semibold text-white">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlusIcon className="h-5 w-5 text-white fill-current" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden text-gray-300 px-4"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-800/90 via-gray-900/95 to-black"
    >
      <motion.div
        style={{ y, opacity } as HTMLMotionProps<"div">["style"]}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Perguntas{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            frequentes
          </span>
        </motion.h2>

        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {items.map(({ question, answer }, index) => (
            <AccordionItem key={index} question={question} answer={answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
