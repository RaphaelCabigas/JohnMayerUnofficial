import Image from "next/image";
import dataAlbums from "@/public/albums.json";
import AlbumList from "@/src/components/AlbumList";
import S from "@/styles/discography.module.scss";
import Hero from "@/public/images/disco-hero.jpg";
import Discog_SVG from "@/public/svgs/h1-discography.svg";

export default function Discography() {
  const { liveAlbums, studioAlbums } = dataAlbums;

  return (
    <>
      <section className={S.discography}>
        <Image
          src={Hero}
          alt="John Mayer Collage Concert"
          className={S.hero_img + " next_img"}
          draggable={false}
          priority
        />
        <h1 className={S.h1_discography}>
          <span className="hide_text">Discography</span>
          <span>
            <Image
              src={Discog_SVG}
              alt="Discography"
              className={S.h1_discography + " next-img"}
              draggable={false}
              priority={true}
            />
          </span>
        </h1>
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
