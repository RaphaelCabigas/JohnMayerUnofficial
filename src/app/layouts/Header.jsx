"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  // useScroll gets the current scroll position and stores in scrollY
  const { scrollY } = useScroll();
  // useState returns a hidden false value and a function setHidden
  const [hidden, setHidden] = useState(false);
  // useMotionValueEvent listens to any changes in scrollY value and do the callback
  useMotionValueEvent(scrollY, "change", (latest) => {
    // getPrevious returns the previous value of scrollY and if it doesn't return anything make it 0
    const previous = scrollY.getPrevious() ?? 0;
    // if latest is greater than previous and greater than 100 set hidden to true else false to hide the header
    setHidden(latest > previous);
  });

  const isLoggedIn = session !== null;

  // useState returns a hidden false value and a function setHidden
  const [menuHidden, setMenuHidden] = useState(false);

  const topVariants = {
    // variants stores animation states
    show: { y: "0" },
    hide: { y: "-100%", top: "-10px" },
  };

  return (
    <>
      <motion.header
        // if hidden is true then hide the header else show the header
        variants={topVariants}
        animate={hidden ? "hide" : "show"}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <Link href="/" className="logo">
          JM
        </Link>
        <nav className="main-nav-container">
          <ul className="main-nav">
            <li>
              <Link href="/biography">BIOGRAPHY</Link>
            </li>
            <li>
              <Link href="/discography">DISCOGRAPHY</Link>
            </li>
            <li>
              <Link href="/">TOUR</Link>
            </li>
            <li>
              <Link href="/">MERCH</Link>
            </li>
          </ul>
        </nav>
        <ul className="main-nav-actions">
          <li>
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="account"
            >
              {isLoggedIn && <div className="active-account"></div>}
              <FaUser />
            </Link>
          </li>
          <li>
            <button
              className="main-btn"
              onClick={() => setMenuHidden(!menuHidden)}
            >
              Menu
            </button>
          </li>
        </ul>
      </motion.header>
      <motion.nav
        className="mobile-nav-container"
        variants={{
          open: {
            width: "100vw",
            height: "100vh",
            borderRadius: "0",
            x: "0",
            y: "0",
            top: "0px",
          },
          close: {
            width: "70px",
            height: "50px",
            borderRadius: "15px",
            x: "-20px",
            top: "8px",
          },
          ...topVariants,
        }}
        initial="close"
        animate={[menuHidden ? "open" : "close", hidden ? "hide" : "show"]}
        transition={{ duration: 0.5, ease: "circInOut" }}
      >
        <motion.ul
          className="mobile-nav"
          variants={{
            open: { y: "0px" },
            close: {
              x: "10px",
            },
          }}
          initial="close"
          animate={menuHidden ? "open" : "close"}
          transition={{ duration: 0.5, ease: "circInOut" }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/biography">BIOGRAPHY</Link>
          </li>
          <li>
            <Link href="/discography">DISCOGRAPHY</Link>
          </li>
          <li>
            <Link href="/">TOUR</Link>
          </li>
          <li>
            <Link href="/">MERCH</Link>
          </li>
        </motion.ul>
      </motion.nav>
    </>
  );
}
