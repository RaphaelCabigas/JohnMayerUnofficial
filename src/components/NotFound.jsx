"use client";

import React, { useState } from "react";
import S from "@/styles/notfound.module.scss";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    router.push("/");
  };

  return (
    <section className={S.notfound_container}>
      <div className={S.back_container}>
        <h1>You are lost</h1>
        <motion.div className={S.home_link}>
          <AnimatePresence>
            <motion.div
              whileHover={{ opacity: 1 }}
              key={"home_img"}
              initial={{ opacity: 0 }}
              onClick={{ scale: 10 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => console.log("Animation Complete")}
            >
              <motion.img
                src={"/images/home-hero.jpg"}
                alt="Home image link"
                className={S.home_img + " next_img"}
              />
            </motion.div>
          </AnimatePresence>
          <span className={S.home_txt}> Return Home</span>
        </motion.div>
      </div>
      <a
        href="https://www.youtube.com/watch?v=gui8D572lzY&list=PLyPJH8P_5tYrNrnvUV-F4CYP0TQP4JX9c&index=22"
        target="_blank"
        className={S.music_link}
      >
        Taking On Water
      </a>
    </section>
  );
}
