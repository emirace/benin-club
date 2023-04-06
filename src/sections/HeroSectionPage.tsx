"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  headingVariants,
  heroVariants,
  paragraphVariants,
} from "@/utils/motion";

interface HeroSectionPageProps {
  name: string;
  desc: string;
}

const HeroSectionPage: React.FC<HeroSectionPageProps> = ({ name, desc }) => {
  return (
    <motion.div
      className="relative h-72 md:h-96 w-full overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image */}
      <Image
        src="/images/hero.webp"
        alt="Hero background image"
        fill
        className="object-cover"
        quality={100}
      />

      <motion.div
        className="absolute  top-0 left-0 h-full w-full  bg-opacity-75 bg-black flex items-end py-4 md:py-20 px-4 md:px-20 "
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className=" -mt-40 md:mt-0 px-4 md:w-3/5"
          variants={headingVariants}
        >
          <h1 className="text-4xl md:text-6xl font-black text-red tracking-wide mb-2 md:mb-4 uppercase">
            {name}
          </h1>
          <motion.p
            variants={paragraphVariants}
            className="text-lg md:text-2xl text-white mb-4"
          >
            {desc}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionPage;
