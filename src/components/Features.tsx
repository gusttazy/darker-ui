"use client";

import {
  motion,
  useScroll,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";
import EcoIcon from "../assets/icons/plug.svg";
import DefIcon from "../assets/icons/check-square.svg";
import CryptoIcon from "../assets/icons/lock.svg";

interface Feature {
  title: string;
  description: string;
  icon: any;
}

const features: Feature[] = [
  {
    title: "Ecossistema de integração",
    description:
      "Aumente sua produtividade conectando-se com suas ferramentas favoritas, mantendo todos os seus itens essenciais em um só lugar.",
    icon: EcoIcon,
  },
  {
    title: "Definição e acompanhamento de metas",
    description:
      "Defina e acompanhe suas metas, dividindo objetivos em tarefas alcançáveis para manter seus alvos sempre em mente.",
    icon: DefIcon,
  },
  {
    title: "Criptografia de dados segura",
    description:
      "Com criptografia de ponta a ponta, seus dados são armazenados de forma segura e protegidos contra acessos não autorizados.",
    icon: CryptoIcon,
  },
];

export const Features = () => {
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
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900/90 via-gray-900/95 to-black"
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
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Temos tudo que você{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              precisa
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl mb-16 max-w-2xl mx-auto"
          >
            Acesse listas personalizáveis, ferramentas de colaboração e
            monitoramento inteligente em um único lugar.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex h-16 w-16 bg-white/20 justify-center items-center rounded-xl mb-6 group-hover:bg-white/30 transition-colors"
                >
                  <Icon className="h-8 w-8 text-white fill-current" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
