"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import S from "@/styles/dashboard.module.scss";
import Image from "next/image";

export default function Dashboard() {
  const { data: session } = useSession();
  // ?. checks when value is not defined so while the session gets loaded it will not throw an error
  const user = session?.user;
  return (
    <section className={S.dashboard_container}>
      {user?.image && (
        <div className={S.user_profile}>
          <Image
            src={user?.image}
            alt={user?.name}
            className="next_img"
            draggable={false}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={"eager"}
            priority={true}
          />
        </div>
      )}
      <div>
        <h1>User Information</h1>
        <h2 className={S.user_details}>{user?.name}</h2>
        <h2 className={S.user_details}>{user?.email}</h2>
      </div>
      <button onClick={() => signOut()} className={S.logout}>
        Log Out
      </button>
    </section>
  );
}
