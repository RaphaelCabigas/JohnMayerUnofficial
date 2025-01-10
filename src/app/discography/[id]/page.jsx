import dataAlbums from "@/src/albums.json";
import S from "@/styles/album.module.scss";
import testing from "@/public/images/home-hero.jpg";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// Code Ryan Guide for Dynamic Routes: https://youtu.be/ec3OEG8DXJM?si=S1gqrBFCLGTUERTH
// This generates static pages for each album page using just one single page
// rather than hardcoding the urls
export async function generateStaticParams() {
  // Get the albums from the JSON file
  const { liveAlbums, studioAlbums } = dataAlbums;
  // Get all the albums from the JSON file and combine them into one array
  const albums = [...liveAlbums, ...studioAlbums];
  // Map over all the albums and generate an object with each id as the key
  return albums.map((album) => ({ id: album.id }));
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const { liveAlbums, studioAlbums } = dataAlbums;
  // Access all the albums
  const albums = [...liveAlbums, ...studioAlbums];
  // find the current album based on the url from the params object
  const album = albums.find((current) => current.id === id);
  // If album is not found set the metadata
  if (!album) {
    return {
      title: "Album Not Found",
      description: "The album you are looking for does not exist.",
    };
  }
  // Metadata for the corresponding albums
  return {
    title: album.alt,
    description: album.description,
    image: `/images/${album.src}.jpg`,
  };
}

export default async function Album({ params }) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;
  const { liveAlbums, studioAlbums } = dataAlbums;
  const albums = [...liveAlbums, ...studioAlbums];
  // find the album by id
  const album = albums.find((current) => current.id === id);
  // https://nextjs.org/docs/app/api-reference/functions/not-found

  // If album is not found call the notfound function which redirects them to the not found page
  if (!album) {
    notFound();
  }

  // find the index of the album by id
  const albumNumber = albums.findIndex((current) => current.id === id);
  // get the current id and subtract by 1 which gets the previous and vice versa
  // finds the previous and next albums
  // when it's the very first album in the json file which would be a live album
  // we get the total number of albums and subtract by 1 so that we can get the last studio album
  const prevAlbum = albums[albumNumber - 1] || albums[albums.length - 1];
  // when it's the very last album in the json file which would be a studio album
  // we the first album index which would be a live album
  const nextAlbum = albums[albumNumber + 1] || albums[0];
  return (
    <>
      <section className={S.album}>
        <h1>{album.alt}</h1>
        <div className={S.album_details}>
          <p>{album.trackCount} tracks</p>
          <p>{album.releaseDate}</p>
        </div>
      </section>
      <section className={S.album_description}>
        <h2>Album Description</h2>
        <p>{album.description}</p>
      </section>
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
