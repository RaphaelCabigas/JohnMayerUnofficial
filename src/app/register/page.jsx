"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import testing from "@/public/images/home-hero.jpg";
import { useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
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
    // Dependency array which basically runs the use effect whenever these values change
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.status === 400) {
        setError("User already exists. Use a different email.");
        return;
      }

      if (res.status === 201) {
        // After successful registration, navigate to login page
        router.push("/login");
      }
    } catch (error) {
      console.error("User registration failed.", error);
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
        <Image
          src={testing}
          alt="John Mayer closed up shot black and white"
          className={S.account_img + " next_img"}
          draggable={false}
          priority
        />
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={S.account_form}
        >
          <h1>Register an Account</h1>
          <div className="form_item">
            <label htmlFor="name" className="hide_text">
              Full Name
            </label>
            <input
              placeholder="Full Name"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="form_item">
            <label htmlFor="email" className="hide_text">
              Email
            </label>
            <input
              placeholder="Your Email"
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create an Account"}
          </button>
          {error && <p className="account_error">{error}</p>}
          <div>
            <h2>OR</h2>
            <p>
              Do you have an account?{" "}
              <Link href="/login" className={S.account_link}>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    )
  );
}
