"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import S from "@/styles/aboutgallery.module.scss";
import John1 from "@/public/images/john-1.jpg";
import John2 from "@/public/images/john-2.jpg";
import John3 from "@/public/images/john-3.jpg";
import John4 from "@/public/images/john-4.jpg";
import John5 from "@/public/images/john-5.jpg";

const gallery = [
  {
    src: John1,
    title: "Black and white portrait of John Mayer playing an electric guitar",
  },
  { src: John2, title: "John Mayer playing an electric guitar while singing" },
  {
    src: John3,
    title: "John Mayer playing an acoustic guitar on his Solo Tour",
  },
  { src: John4, title: "John Mayer playing an piano on his Solo Tour" },
  {
    src: John5,
    title: "John Mayer close up wearing a maroon coat and a red polo",
  },
];

// A function that receives an array of aboutImages' destructured data
export default function AboutGallery() {
  // useState returns imageIndex in the gallery and a function to setImageIndex
  const [imageIndex, setImageIndex] = useState(0);
  // A function to handle the click event on the image buttons
  const handleImageClick = (i) => {
    setImageIndex(i);
  };
  useEffect(() => {
    // Start a timer that changes the image every 3 seconds
    const interval = setInterval(() => {
      // from the previous image index add 1 and modulate the imageIndex to the gallery length
      setImageIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    }, 3000);
    // Clear the interval when the image is displayed
    return () => clearInterval(interval);
  }, [gallery.length]);

  return (
    <div className={S.about_gallery}>
      <div className={S.gallery_imgs}>
        {gallery.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            // set opacity to 1 if the image is selected and for the others set opacity to 0
            animate={{ opacity: imageIndex === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={image.src}
              alt={image.title}
              className={S.current_img + " next_img"}
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
      <div className={S.gallery_btns}>
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={S.gallery_btn}
          >
            <Image
              src={image.src}
              alt={image.title}
              className={S.current_btn_img + " next_img"}
              draggable={false}
              // set scale to 1.2 if the image is selected and filter brightness to 0
              // and for the others set the corresponding values
              style={{
                transform: imageIndex === index ? "scale(1.2)" : "scale(1)",
                filter: imageIndex === index ? "none" : "brightness(0.5)",
                transition: "transform 0.3s ease, filter 0.3s ease",
              }}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
