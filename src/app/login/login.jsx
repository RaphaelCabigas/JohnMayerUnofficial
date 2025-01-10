"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import testing from "@/public/images/home-hero.jpg";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // prevent the default form submission behavior
    e.preventDefault();
    // creates a form targeting the registration form
    const formData = new FormData(e.target);
    // get the values by their name attribute
    const email = formData.get("email");
    const password = formData.get("password");
    setIsLoading(true);
    setError("");

    // Check if all fields are filled out then display error message
    if (!email || !password) {
      setIsLoading(false);
      setError("All fields are required.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect and pass the email and password to NextAuth
        email,
        password,
      });
      // If signin was successful
      if (res.ok) {
        // Redirect to the dashboard
        router.push("/dashboard");
      } else if (res.error === "MongoDB Connection Error") {
        // If the thrown error from authorize method is a MongoDB Connection Error
        setError("Something went wrong. Please try again later.");
      } else if (res.status === 401) {
        // Since it will always return 401 error from the callback credentials
        // Display error message
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      // If any other error occurs in signIn, display the error message
      setError("Something went wrong. Please try again later.");
    } finally {
      // whether or not it was successful
      setIsLoading(false);
    }
  };

  // Handle loading state for the auth providers
  const handleAuthProvider = (provider) => {
    if (provider === "google") {
      setIsGoogleLoading(true);
    } else if (provider === "github") {
      setIsGithubLoading(true);
    }
    signIn(provider);
  };

  return (
    <section className={S.form_container}>
      <form onSubmit={handleSubmit} autoComplete="off" className={S.form_form}>
        <h1>Welcome Back!</h1>
        <p>Log In to your account</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Your Email"
            type="email"
            name="email"
            id="email"
            className={S.form_input}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Your Password"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
          />
        </div>
        <button type="submit" className={S.form_button} disabled={isLoading}>
          {isLoading ? "Logging in Account..." : "Log In"}
        </button>
        {error && <p className={S.form_error}>{error}</p>}
        <div>
          <h2>OR</h2>
          <div className={S.form_options}>
            <button
              onClick={() => handleAuthProvider("google")}
              disabled={isGoogleLoading}
            >
              <FcGoogle />
              <span>
                {isGoogleLoading
                  ? "Logging in Google..."
                  : "Continue with Google"}
              </span>
            </button>
            <button
              onClick={() => handleAuthProvider("github")}
              disabled={isGithubLoading}
            >
              <FaGithub />
              <span>
                {isGithubLoading
                  ? "Logging in Github..."
                  : "Continue with Github"}
              </span>
            </button>
          </div>
          <p>
            Don't have an account?
            <Link href="/register" className={S.form_link}>
              Create an Account
            </Link>
          </p>
        </div>
      </form>
      <Image
        src={testing}
        alt="John Mayer closed up shot black and white"
        className={S.form_img + " next_img"}
        draggable={false}
        priority={true}
      />
    </section>
  );
}
