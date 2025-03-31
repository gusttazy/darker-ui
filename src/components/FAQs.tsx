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
    answer:
      "O preço para empresas é escalonado conforme o número de usuários, com descontos progressivos para mais integrantes.",
  },
  {
    question: "Posso cancelar meu plano a hora que quiser?",
    answer:
      "Sim, você pode cancelar ou alterar o seu plano a qualquer momento diretamente na sua conta.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim, utilizamos criptografia avançada e seguimos rigorosos protocolos de segurança para proteger seus dados.",
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-4 border-b border-white/30"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-left focus:outline-none"
      >
        <span className="flex-1 text-lg font-semibold text-white">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <PlusIcon className="h-4 w-4 text-white fill-current" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mt-2 overflow-hidden text-gray-300"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900/95 to-black"
    >
      <motion.div
        style={{ y, opacity } as HTMLMotionProps<"div">["style"]}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
          >
            Perguntas{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              frequentes
            </span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8"
          >
            {items.map(({ question, answer }, index) => (
              <AccordionItem key={index} question={question} answer={answer} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};