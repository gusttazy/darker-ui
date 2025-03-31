"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Atualizações", href: "#atualizacoes" },
    { label: "Ajuda", href: "#ajuda" },
    { label: "Clientes", href: "#clientes" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/10 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="px-4 max-w-7xl mx-auto">
        <div className="py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-xl font-bold"
          >
            Darker
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="hidden md:flex items-center justify-center gap-6"
          >
            <nav className="gap-6 items-center flex">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={item.href}
                  className="text-opacity-70 text-white hover:text-opacity-100 transition-colors duration-200 relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
              className="bg-white py-2 px-6 rounded-lg font-bold transition-all duration-300 ease-in-out hover:bg-opacity-90 active:scale-95 hover:shadow-lg hover:shadow-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Adquira já!
            </motion.button>
          </motion.div>

          <motion.button
            className="md:hidden relative z-50 text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white mb-1.5"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white mb-1.5"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white"
              />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden fixed top-0 right-0 h-screen w-72 bg-black/95 backdrop-blur-sm p-8 shadow-xl"
              >
                <div className="flex flex-col gap-8 mt-20">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      variants={itemVariants}
                      href={item.href}
                      className="text-white text-xl hover:text-opacity-80 transition-colors border-b border-white/10 pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.button
                    variants={itemVariants}
                    className="bg-white py-3 px-8 rounded-lg font-bold transition-all duration-300 ease-in-out hover:bg-opacity-90 active:scale-95 hover:shadow-lg hover:shadow-white/20 mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Adquira já!
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
