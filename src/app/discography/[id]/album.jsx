"use client";
import S from "@/styles/album.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Album({ album, albumImages, prevAlbum, nextAlbum }) {
  const gallery = useRef(null);
  const { scrollYProgress } = useScroll({ target: gallery });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);
  return (
    <>
      <section className={S.album}>
        <video autoPlay muted loop className={S.album_video}>
          <source src={`/videos/${album.vid}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={S.album_content}>
          <h1>{album.alt}</h1>
          <div className={S.album_details}>
            <p>{album.trackCount} tracks</p>
            <p>{album.releaseDate}</p>
          </div>
        </div>
      </section>
      <section className={S.album_description}>
        {album.desc && (
          <div className={S.album_desc_img}>
            <Image
              src={`/images/${album.desc}.jpg`}
              alt={album.alt}
              width={100}
              height={100}
              draggable={false}
              loading="lazy"
            />
          </div>
        )}
        <div className={S.album_desc_content}>
          <h2>Album Description</h2>
          <p>{album.description}</p>
        </div>
      </section>
      <motion.section
        className={S.album_gallery}
        ref={gallery}
        style={{ height: `${80 * albumImages.length}vh` }}
      >
        <h2>Album Artwork & Visuals</h2>
        <div className={S.albums_container}>
          <motion.div className={S.albums_wrapper} style={{ x }}>
            {albumImages.map((image, index) => {
              return (
                <div key={index} className={S.album_image}>
                  <Image
                    src={image}
                    alt={album.alt}
                    fill={true}
                    draggable={false}
                    sizes="(max-width: 500px) 300px, 500px" // Define sizes based on screen width
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
      {/* If background paragraph is available */}
      {album.background && (
        <section className={S.album_background}>
          <h2>Album Background</h2>
          <p>{album.background}</p>
        </section>
      )}
      {/* If tracks are available */}
      {album.tracks && (
        <section className={S.album_tracks}>
          <h2>Track Listing</h2>
          <ul className={S.tracks_container}>
            {album.tracks &&
              album.tracks.map((track) => (
                <li key={track.number}>
                  <span>{track.number}</span>
                  <span>{track.title}</span>
                  <span>{track.length}</span>
                </li>
              ))}
          </ul>
        </section>
      )}
      {/* If sets are available for the Where the Light Is Page */}
      {album.sets && (
        <section className={S.album_tracks}>
          {album.sets.map((set, index) => (
            <div key={index} className={S.tracks_container}>
              <h2>{set.setName}</h2>
              <ul className={S.track_order}>
                {set.tracks.map((track) => (
                  <li key={track.number} className={S.track_container}>
                    <span>{track.number}</span>
                    <span>
                      {track.title}
                      {track.writer && <span>track.writer</span>}
                    </span>
                    <span>{track.length}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
      <div className={S.album_navigation}>
        <Link href={`/discography/${prevAlbum.id}`}>
          <div>
            <p>Previous Album</p>
            <p>{prevAlbum.alt}</p>
          </div>
          <Image
            src={`/images/${prevAlbum.src}.jpg`}
            alt={prevAlbum.alt}
            width={50}
            height={50}
          />
        </Link>
        <Link href={`/discography/${nextAlbum.id}`}>
          <div>
            <p>Next Album</p>
            <p>{nextAlbum.alt}</p>
          </div>
          <Image
            src={`/images/${nextAlbum.src}.jpg`}
            alt={nextAlbum.alt}
            width={50}
            height={50}
          />
        </Link>
      </div>
    </>
  );
}
