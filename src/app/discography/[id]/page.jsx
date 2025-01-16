import dataAlbums from "@/public/albums.json";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Album from "./album";

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

// https://github.com/vercel/next.js/discussions/34644
// A function that gets all the album images from the corresponding folder through the path id
export async function getAlbumImages(id) {
  // joins that public folder with the corresponding id
  const imageFolder = path.join(process.cwd(), "public", id);

  try {
    // Get all the images in the folder
    const imageFiles = await fs.readdir(imageFolder);
    // map every image within the folder
    return imageFiles.map((file) => `/${id}/${file}`);
  } catch (error) {
    // console.error("No linked album images found");
    // just return empty
    return [];
  }
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
  };
}

export default async function AlbumPage({ params }) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;
  const albumImages = await getAlbumImages(id);
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
      <Album
        album={album}
        albumImages={albumImages}
        prevAlbum={prevAlbum}
        nextAlbum={nextAlbum}
      />
    </>
  );
}
