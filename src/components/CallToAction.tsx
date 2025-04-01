"use client";

import PaperPlane from "../assets/icons/paper-plane.svg";
import {
  motion,
  useScroll,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
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
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Entre em{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              contato
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            Preencha o formulário abaixo para entrar em contato conosco.
          </motion.p>

          <motion.form
            variants={containerVariants}
            className="flex flex-col gap-4 max-w-md mx-auto sm:flex-row"
          >
            <motion.input
              variants={itemVariants}
              type="email"
              placeholder="seu@email.com"
              className="h-14 bg-white/5 backdrop-blur-sm rounded-xl px-6 font-medium text-white placeholder:text-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
            />
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-x-2 hover:bg-opacity-90 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              <PaperPlane className="h-5 w-5 text-black fill-current" />
              <span>Enviar</span>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
