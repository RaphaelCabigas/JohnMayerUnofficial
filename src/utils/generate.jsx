import path from "path";

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
    console.error("Image directory not found");
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
