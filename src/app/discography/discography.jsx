import Image from "next/image";
import dataAlbums from "@/src/albums.json";
import AlbumList from "@/src/components/AlbumList";
import S from "@/styles/discography.module.scss";
import Discog_SVG from "@/public/svgs/h1-discography.svg";

export default function Discography() {
  const { liveAlbums, studioAlbums } = dataAlbums;

  return (
    <>
      <section className={S.discography}>
        <h1 className="hide_text">Discography</h1>
        <Image
          src={Discog_SVG}
          alt="Discography"
          className={S.h1_discography + " next-img"}
          draggable={false}
          priority={true}
        />
      </section>
      <section className={S.discography_content}>
        <h2>Studio Albums</h2>
        <AlbumList container={S.studioalbum_container} albums={studioAlbums} />
      </section>
      <section className={S.discography_content}>
        <h2>Live Albums</h2>
        <AlbumList container={S.livealbum_container} albums={liveAlbums} />
      </section>
    </>
  );
}
