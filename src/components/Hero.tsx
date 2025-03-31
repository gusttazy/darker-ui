"use client";

import {
  motion,
  useScroll,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";

interface StatItem {
  value: string;
  label: string;
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats: StatItem[] = [
    { value: "500+", label: "Projetos Entregues" },
    { value: "98%", label: "Clientes Satisfeitos" },
    { value: "24/7", label: "Suporte" },
  ];

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900/95 to-gray-900/90"
    >
      <motion.div
        style={{ y, opacity } as HTMLMotionProps<"div">["style"]}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <span className="text-white/80 text-sm font-medium">
              Bem-vindo ao Futuro Digital
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            Transforme sua ideia em
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text block mt-2">
              realidade digital
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            Desenvolvemos soluções digitais inovadoras que impulsionam seu
            negócio para o próximo nível.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:shadow-white/20"
            >
              Comece Agora
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/10"
            >
              Saiba Mais
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
