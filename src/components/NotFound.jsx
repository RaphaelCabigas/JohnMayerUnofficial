import S from "@/styles/notfound.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={S.notfound_container}>
      <h1 className={S.notfound_heading}>You are lost</h1>
      <Link href="/" className={S.home_link}>
        Return Home
      </Link>
    </section>
  );
}
