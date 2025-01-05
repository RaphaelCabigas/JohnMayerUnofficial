"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import testing from "@/public/images/home-hero.jpg";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      // replace is use so that whenever the user goes back it just replaces with the dashboard
      router.replace("/dashboard");
    }
    // Dependency array which basicall runs the use effect whenever these values change
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        // Prevent automatic redirect and pass the email and password to NextAuth
        redirect: false,
        email,
        password,
      });

      // Checks if there's an error in the response
      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      }
      // Checks if there's an url in the response
      if (res?.url) {
        router.replace("/dashboard");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return null;
  }

  return (
    sessionStatus !== "authenticated" && (
      <section className={S.account_container}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={S.account_form}
        >
          <h1>Log In</h1>
          <div className="form_item">
            <label htmlFor="email" className="hide_text">
              Email
            </label>
            <input
              placeholder="Your Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
              required
            />
          </div>
          <div className="form_item">
            <label htmlFor="password" className="hide_text">
              Password
            </label>
            <input
              placeholder="Your Password"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Logging in Account..." : "Log In"}
          </button>
          {error && <p className="account_error">{error}</p>}
          <div>
            <h2>OR</h2>
            <p>
              Don't have an account?{" "}
              <Link href="/register" className={S.account_link}>
                Create an Account
              </Link>
            </p>
          </div>
        </form>
        <Image
          src={testing}
          alt="John Mayer closed up shot black and white"
          className={S.account_img + " next_img"}
          priority
        />
      </section>
    )
  );
}
