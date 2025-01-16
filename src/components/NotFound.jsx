import S from "@/styles/notfound.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={S.notfound_container}>
      <h1 className={S.notfound_heading}>You are lost</h1>
      <Link href="/" className={S.home_link}>
        Return Home
      </Link>
      <a
        href="https://www.youtube.com/watch?v=gui8D572lzY&list=PLyPJH8P_5tYrNrnvUV-F4CYP0TQP4JX9c&index=22"
        target="_blank"
        className={S.music_link}
      >
        Tracing
      </a>
    </section>
  );
}
