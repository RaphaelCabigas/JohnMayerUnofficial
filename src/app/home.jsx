"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import AboutGallery from "../components/AboutGallery";
import SocialLinks from "../components/SocialLinks";
import S from "@/styles/index.module.scss";
import Hero from "@/public/images/home-hero.jpg";
import John_SVG from "@/public/svgs/JOHN.svg";
import Mayer_SVG from "@/public/svgs/MAYER.svg";
import Tour_SVG from "@/public/svgs/TOUR.svg";
import SobRock from "@/public/images/sr.jpg";
import SiriusXM_1 from "@/public/images/siriusxm.jpg";
import SilverSky from "@/public/images/prs.jpg";
import { FaYoutubeSquare, FaItunes } from "react-icons/fa";
import { PiSpotifyLogoFill } from "react-icons/pi";
import { SiAmazonmusic } from "react-icons/si";
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
      <LatestSection />
      <TourSection />
      <SiriusSection />
      <PrsSection />
      <HeartArmorSection />
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
      <AboutGallery />
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
      <div className={S.discography_images}>
        {albums.map((album) => {
          return (
            <motion.div
              key={album.id}
              className={S.disco_img}
              drag
              dragConstraints={constraints}
              whileHover={{ cursor: "grab" }}
              whileTap={{ cursor: "grabbing" }}
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
      </div>
      <p className={S.discography_notif}>click and drag the albums!</p>
      <div className={S.discography_content}>
        <h2>DISCOGRAPHY</h2>
        <Link href="/discography">View More</Link>
      </div>
    </motion.section>
  );
};

const LatestSection = () => {
  return (
    <section className={S.latest}>
      <Image
        src={SobRock}
        alt="Sob Rock Album Cover"
        className="next_img"
        draggable={false}
        loading="lazy"
      />
      <div className={S.latest_content}>
        <div>
          <span className="section_span">[ LATEST ALBUM ]</span>
          <h2>Sob Rock Out Now</h2>
        </div>
        <ul className={S.latest_links}>
          <li>
            <a href="">
              <span>Youtube</span>
              <FaYoutubeSquare />
            </a>
          </li>
          <li>
            <a href="">
              <span>Spotify</span>
              <PiSpotifyLogoFill />
            </a>
          </li>
          <li>
            <a href="">
              <span>Itunes</span>
              <FaItunes />
            </a>
          </li>
          <li>
            <a href="">
              <span>Amazon Music</span>
              <SiAmazonmusic />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

const TourSection = () => {
  return (
    <section className={S.tour}>
      <video className={S.tour_video} autoPlay muted loop>
        <source src="/videos/solovid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={S.tour_svg} draggable={false}>
        <Image
          src={Tour_SVG}
          alt="John Mayer Solo Tour"
          className="next_img"
          draggable={false}
          loading="lazy"
        />
      </div>
      <h2 className={S.tour_heading}>
        <span>[ SIRIUS XM ]</span>
        <span>John Mayer Solo Tour</span>
      </h2>
      <div className={S.tour_feature}>
        <h3>Featuring Artists:</h3>
        <ul className={S.tour_feature_list}>
          <li>
            <span>Lizzy Mcalpine</span>
          </li>
          <li>
            <span>Alec Benjamin</span>
          </li>
          <li>
            <span>Special Guest TBA</span>
          </li>
        </ul>
      </div>
      <div className={S.tour_content}>
        <div className={S.tour_paragraph}>
          <p>"I'm going on a solo arena tour."</p>
          <br />
          <div>
            <p>
              "I began my career on stage with only a guitar and a microphone. A
              lot has changed since then, but I knew one day I’d feel it in my
              heart to do an entire run of shows on my own again, just like
              those early days. It took a couple of decades, but I feel it now.
              I’ll be playing old songs. Newer songs. Songs you haven’t heard
              yet that I’ll be road testing - all on acoustic, electric, and
              piano. Hope to see you there..."
            </p>
            <p style={{ fontWeight: "bold", textAlign: "right" }}>- J.M</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SiriusSection = () => {
  return (
    <section className={S.sirius}>
      <div className={S.sirius_wide}>
        <Image
          src={SiriusXM_1}
          alt="Life with John Mayer"
          className="next_img"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className={S.sirius_video}>
        <video autoPlay muted loop>
          <source src="/videos/siriusvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className={S.sirius_content}>
        <h1>Life with John Mayer</h1>
        <p>
          A music experience hand-selected by John Mayer. The guitarist and
          songwriter finally realizes his dream of a radio station defined not
          by genre, but by the time of day, as well as the day of the week.
          Enter an ever-evolving world of music built from his classics,
          collaborations and never-before-heard material blended with the songs
          he loves. Don’t just tune into SiriusXM. Tune into life... with John
          Mayer.
        </p>
      </div>
    </section>
  );
};

const PrsSection = () => {
  return (
    <section className={S.prs}>
      <div className={S.prs_img} draggable={false}>
        <Image
          src={SilverSky}
          alt="SE Silver Sky Rosewood Guitar"
          className="next_img"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className={S.prs_h2}>
        <span className="section_span">[ PRS Guitars ]</span>
        <h2>SE Silver Sky Rosewood</h2>
      </div>
      <p>
        This guitar has a bright, clear tone with excellent sustain, and Mayer’s
        playing brings out the instrument's full potential, blending smooth
        bends, precise note articulation, and occasional bluesy licks.
      </p>
    </section>
  );
};

const HeartArmorSection = () => {
  return (
    <section className={S.har}>
      <h2 className={S.har_heading}>Heart and Armor Foundation</h2>
      <div className={S.har_paragraph}>
        <p>
          The Heart and Armor Foundation is the result of eight years of
          research, conversations with veterans, and pilot work. It’s dedicated
          to improving veterans' long-term health through a scientific,
          deliberate approach that makes a lasting impact. While Heart and Armor
          will do its part, I also hope it encourages us all to share the
          burden—by listening, engaging, and serving one another, even when it’s
          difficult. Together, we can help carry some of the weight that
          veterans have shouldered for us. I'm grateful to them and invite you
          to join in supporting their journey.
        </p>
        <div>
          <p>
            “This foundation is the culmination of eight years of research,
            conversations with veterans, and pilot work.”
          </p>
          <p style={{ fontWeight: "bold", textAlign: "right" }}>- J.M</p>
        </div>
      </div>
    </section>
  );
};
