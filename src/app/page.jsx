"use client";

import About from "../components/AboutGallery";
import Hero from "@/public/images/home-hero.jpg";
import John_SVG from "@/public/svgs/JOHN.svg";
import Mayer_SVG from "@/public/svgs/MAYER.svg";
import { SiAmazonmusic } from "react-icons/si";
import { PiSpotifyLogoFill } from "react-icons/pi";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram, FaItunes } from "react-icons/fa6";
import S from "@/styles/index.module.scss";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll({
    // start the animation when the top of the element meets the top of the viewport
    // end the animation when the center of the element meets the center of the viewport
    offset: ["start start", "center center"],
  });
  return (
    <>
      <HeroSection scrollProgress={scrollYProgress} />
      <AboutSection scrollProgress={scrollYProgress} />
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
        priority
      />
      <div className={S.hero_content}>
        <ul className={S.social_container}>
          <li>
            <a href="https://www.youtube.com/channel/UCi1mYtUWs0JRkPl6bNVRL_Q">
              <FaYoutubeSquare title="John Mayer Youtube" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/johnmayer/">
              <FaFacebookSquare title="John Mayer Facebook" />
            </a>
          </li>
          <li>
            <a href="https://x.com/JohnMayer?prefetchTimestamp=1734254517078">
              <FaSquareXTwitter title="John Mayer Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/johnmayer/">
              <FaSquareInstagram title="John Mayer Instagram" />
            </a>
          </li>
          <li>
            <a href="https://music.apple.com/us/artist/john-mayer/472054">
              <FaItunes title="John Mayer Apple Music" />
            </a>
          </li>
          <li>
            <a href="https://open.spotify.com/artist/0hEurMDQu99nJRq8pTxO14">
              <PiSpotifyLogoFill title="John Mayer Spotify" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@johnmayer">
              <AiFillTikTok title="John Mayer Tiktok" />
            </a>
          </li>
        </ul>
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
              priority
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
              priority
            />
          </motion.span>
        </h1>
      </div>
    </motion.section>
  );
};

const AboutSection = ({ scrollProgress }) => {
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
// try {
//   const conn =await connect()
//   console.log(conn)
//   // Here you would typically fetch data from your database
//   // const data = await YourModel.find()

//   return (
//     <section>
//       <h1>Connected to Database</h1>
//       {/* Render your data here */}
//     </section>
//   );
// } catch (error) {
//   console.error('Failed to connect to the database:', error)
//   return (
//     <section>
//       <h1>Error</h1>
//       <p>Failed to connect to the database. Please try again later.</p>
//     </section>
//   );
// }
