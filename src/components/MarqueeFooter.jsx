"use client";

import React from "react";
import { motion } from "motion/react";
export default function MarqueeFooter() {
  return (
    <a href="https://www.johnmayer.com/" className="marquee_container">
      <motion.div
        className="marquee"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
      </motion.div>
      <motion.div
        className="marquee"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
        <span>Visit the Official John Mayer Website</span>
      </motion.div>
    </a>
  );
}
