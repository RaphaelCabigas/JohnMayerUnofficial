"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Logo_SVG from "@/public/svgs/logo.svg";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  // useSession gets the user authentication info
  const { status: sessionStatus } = useSession();
  // if session is authenticated
  const isLoggedIn = sessionStatus === "authenticated";
  // useScroll gets the current scroll position and stores in scrollY
  const { scrollY } = useScroll();
  const [menuHidden, setMenuHidden] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  // useMotionValueEvent listens to any changes in scrollY value and do the callback
  useMotionValueEvent(scrollY, "change", (latest) => {
    // getPrevious returns the previous value of scrollY and if it doesn't return anything make it 0
    const previous = scrollY.getPrevious() ?? 0;
    // if latest is greater than previous and greater than 100 set hidden to true else false to hide the header
    setHeaderHidden(latest > previous);
  });

  // Function to close the menu when clicking a link
  const handleLinkClick = () => {
    setMenuHidden(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuHidden ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuHidden]);

  const topVariants = {
    show: { y: "0" },
    hide: { y: "-100%", top: "-10px" },
  };

  return (
    <>
      <motion.header
        // if hidden is true then hide the header else show the header
        variants={topVariants}
        animate={headerHidden ? "hide" : "show"}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <Link href="/" className="logo" onClick={handleLinkClick}>
          <span className="hide_text">Home</span>
        </Link>
        <nav className="main_nav_container">
          <ul className="main_nav">
            <li>
              <Link href="/biography" onClick={handleLinkClick}>
                BIOGRAPHY
              </Link>
            </li>
            <li>
              <Link href="/discography" onClick={handleLinkClick}>
                DISCOGRAPHY
              </Link>
            </li>
            <li>
              <Link href="/" onClick={handleLinkClick}>
                TOUR
              </Link>
            </li>
            <li>
              <a href="https://johnmayerstore.com/" onClick={handleLinkClick}>
                STORE
              </a>
            </li>
          </ul>
        </nav>
        <ul className="main_nav_actions">
          <li>
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="account"
              onClick={handleLinkClick}
            >
              {isLoggedIn && <span className="active_account"></span>}
              <FaUser title={isLoggedIn ? "Dashboard" : "Login"} />
            </Link>
          </li>
          <li>
            <button
              className="main_btn"
              onClick={() => setMenuHidden(!menuHidden)}
            >
              Menu
            </button>
          </li>
        </ul>
      </motion.header>
      <motion.nav
        className="mobile_nav_container"
        variants={{
          open: {
            width: "100%",
            height: "100%",
            borderRadius: "0",
            x: "0px",
            y: "0px",
            top: "0px",
          },
          close: {
            width: "70px",
            height: "50px",
            borderRadius: "15px",
            x: "-20px",
            top: "15px",
          },
          ...topVariants,
        }}
        initial="close"
        animate={[
          menuHidden ? "open" : "close",
          headerHidden ? "hide" : "show",
        ]}
        transition={{ duration: 0.5, ease: "circInOut" }}
      >
        <motion.ul
          className="mobile_nav"
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
            <Link href="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/biography" onClick={handleLinkClick}>
              BIOGRAPHY
            </Link>
          </li>
          <li>
            <Link href="/discography" onClick={handleLinkClick}>
              DISCOGRAPHY
            </Link>
          </li>
          <li>
            <Link href="/" onClick={handleLinkClick}>
              TOUR
            </Link>
          </li>
          <li>
            <a href="https://johnmayerstore.com/" onClick={handleLinkClick}>
              STORE
            </a>
          </li>
        </motion.ul>
      </motion.nav>
    </>
  );
}
