"use client";

import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import S from "@/styles/dashboard.module.scss";
export default function Dashboard() {
  // store the session data
  const { data: session } = useSession();
  // if there is no session return to the login page in case the user manually access the dashboard
  if (!session) {
    redirect("/login");
  }
  return (
    <section className={S.dashboard_container}>
      <div>
        <h1>User Information</h1>
        <h2>
          Name: <span className={S.user_details}>{session.user.name}</span>
        </h2>
        <h2>
          Email: <span className={S.user_details}>{session.user.email}</span>
        </h2>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={S.logout}
      >
        Log Out
      </button>
    </section>
  );
}
