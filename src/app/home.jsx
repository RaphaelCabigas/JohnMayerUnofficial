"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import About from "../components/AboutGallery";
import SocialLinks from "../components/SocialLinks";
import S from "@/styles/index.module.scss";
import Hero from "@/public/images/home-hero.jpg";
import John_SVG from "@/public/svgs/JOHN.svg";
import Mayer_SVG from "@/public/svgs/MAYER.svg";
import dataAlbums from "@/src/albums.json";
import { useRef } from "react";
import Link from "next/link";
export default function Home() {
  const { scrollYProgress } = useScroll({
    // start the animation when the top of the element meets the top of the viewport
    // end the animation when the center of the element meets the center of the viewport
    offset: ["start start", "center center"],
  });
  return (
    <>
      <HeroSection scrollProgress={scrollYProgress} />
      <AboutSection />
      <DiscographySection />
    </>
  );
}

const HeroSection = ({ scrollProgress }) => {
  const blurVariants = {
    start: { filter: "blur(20px)", opacity: 0, y: 100 },
    end: { filter: "blur(0px)", opacity: 1, y: 0 },
  };
  const rotate = useTransform(scrollProgress, [0, 0.8], [0, -5]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.8]);
  return (
    <motion.section className={S.hero} style={{ scale, rotate }}>
      <Image
        src={Hero}
        alt="John Mayer closed up shot black and white"
        className={S.hero_img + " next_img"}
        draggable={false}
        priority
      />
      <div className={S.hero_content}>
        <SocialLinks socialContainer={S.hero_social} />
        <h1 className={S.h1_container}>
          <span className="hide_text">John Mayer</span>
          <motion.span
            variants={blurVariants}
            initial="start"
            animate="end"
            transition={{ duration: 0.4, delay: 0.05, ease: "easeIn" }}
          >
            <Image
              src={John_SVG}
              alt="John"
              className={S.h1_svgs + " next_img"}
              draggable={false}
              priority={true}
            />
          </motion.span>
          <motion.span
            variants={blurVariants}
            initial="start"
            animate="end"
            transition={{ duration: 0.4, delay: 0.1, ease: "easeIn" }}
          >
            <Image
              src={Mayer_SVG}
              alt="Mayer"
              className={S.h1_svgs + " next_img"}
              draggable={false}
              priority={true}
            />
          </motion.span>
        </h1>
      </div>
    </motion.section>
  );
};

const AboutSection = () => {
  return (
    <section className={S.about}>
      <About />
      <div className={S.about_content}>
        <div>
          <span className="section_span">[ ABOUT ]</span>
          <h2>JOHN CLAYTON MAYER</h2>
        </div>
        <div className="p-container">
          <p>
            an American singer-songwriter, guitarist, and producer known for his
            blend of blues, rock, and pop. With a smooth voice and virtuoso
            guitar skills, he rose to fame in the early 2000s with hits like
            "Your Body Is a Wonderland" and "Gravity."
          </p>
          <br />
          <p>
            Throughout his career, Mayer has earned multiple Grammy Awards and
            critical acclaim for his soulful sound and insightful songwriting.
            His work spans a variety of genres, from acoustic ballads to
            blues-infused rock, solidifying him as one of the most versatile and
            influential musicians of his generation.
          </p>
        </div>
      </div>
    </section>
  );
};

const DiscographySection = () => {
  const { liveAlbums, studioAlbums } = dataAlbums;
  const albums = [...liveAlbums, ...studioAlbums];
  const constraints = useRef(null);
  return (
    <motion.section className={S.discography} ref={constraints}>
      {albums.map((album) => {
        return (
          <motion.div
            key={album.id}
            className={S.disco_img}
            drag
            dragConstraints={constraints}
            dragElastic={0.5}
            whileHover={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          >
            <Image
              src={`/images/${album.src}.jpg`}
              alt={album.alt}
              className="next_img"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        );
      })}

      <div className={S.discography_content}>
        <h2>DISCOGRAPHY</h2>
        <Link href="/discography">View More</Link>
      </div>
    </motion.section>
  );
};
