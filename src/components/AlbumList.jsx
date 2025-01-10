import Image from "next/image";
import S from "@/styles/discography.module.scss";
import Link from "next/link";
export default function AlbumList({ container, albums }) {
  return (
    // Specify which album class container
    <section className={container}>
      {albums.map((album) => {
        return (
          <div key={album.id} className={S.album_item}>
            <Link className={S.album_btn} href={`discography/${album.id}`}>
              <Image
                src={`/images/${album.src}.jpg`}
                className={S.album_img + " next_img"}
                alt={album.alt}
                draggable={false}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </Link>
            <div className="album_btn_content">
              <h3>{album.alt}</h3>
              <p>Number of Tracks: {album.trackCount}</p>
              <p>Release Date: {album.releaseDate}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
