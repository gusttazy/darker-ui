"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductImage from "../assets/images/app-screen.png";

export const ProductShowcase = () => {
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: false, amount: 0.3 });
  const textControls = useAnimation();

  useEffect(() => {
    if (isTextInView) {
      textControls.start("visible");
    } else {
      textControls.start("hidden");
    }
  }, [isTextInView, textControls]);

  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: false, amount: 0.3 });
  const imageControls = useAnimation();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isImageInView) {
      imageControls.start("visible");
      setHasBeenVisible(true);
    } else if (!hasBeenVisible) {
      imageControls.start("hidden");
    }
  }, [isImageInView, imageControls, hasBeenVisible]);

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.6,
        scale: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900/95 to-black text-white py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="container relative z-10" ref={textRef}>
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={textControls}
          className="text-center text-5xl sm:text-6xl font-bold tracking-tighter"
        >
          Interface intuitiva
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={textControls}
            className="text-lg text-center text-white/70 mt-5"
          >
            Desfrute de uma experiência fluida e sem complicações com uma
            interface pensada para você.
          </motion.p>
        </div>
        <div className="flex justify-center items-center">
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate={imageControls}
            whileHover="hover"
            className="mt-14 cursor-pointer"
          >
            <Image
              src={ProductImage}
              alt="Imagem do produto"
              className="rounded-lg shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
