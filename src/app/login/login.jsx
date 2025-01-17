"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import Hero from "@/public/images/login-hero.jpg";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Characters be min 5 to max 40 characters only allowing letters upper and lower cases, hyphens, underscores and numbers
  // https://stackoverflow.com/questions/22951369/regex-to-match-a-period
  // https://ihateregex.io/expr/username
  const emailValidation = /^[a-zA-Z0-9_-]{5,40}@jm\.unofficial$/;
  const passwordValidation = /^[a-zA-Z0-9_-]{5,40}$/;

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
    setEmailError("");
    setPasswordError("");

    let errorFields = false;

    // Check if all fields are filled out then display error message
    if (!email || !password) {
      setError("All fields are required.");
      errorFields = true;
    }

    if (!emailValidation.test(email)) {
      setEmailError(
        "Email must be between 5 and 40 characters long, EXCLUDING @jm.unofficial, and end with @jm.unofficial."
      );
      errorFields = true;
    }

    if (!passwordValidation.test(password)) {
      setPasswordError("Password must be between 5 and 40 characters long");
      errorFields = true;
    }

    if (errorFields) {
      setIsLoading(false);
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
        <p className={S.form_heading_2}>Log In to your account</p>
        <div className={S.form_content}>
          <div className={S.form_fields}>
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
            <button
              type="submit"
              className={S.form_button}
              disabled={isLoading}
            >
              {isLoading ? "Logging in Account..." : "Log In"}
            </button>
          </div>
          <ul className={S.form_errors}>
            <li>
              <p className={S.form_message}>
                * fields can only contain letters, numbers, underscores, and
                hyphens.
              </p>
            </li>
            <li>{error && <p className={S.form_error}>{error}</p>} </li>
            <li>
              {emailError && <p className={S.form_error}>{emailError}</p>}
            </li>
            <li>
              {passwordError && <p className={S.form_error}>{passwordError}</p>}
            </li>
          </ul>
          <h2>OR</h2>
          <div>
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
          </div>
          <p className={S.link}>
            <span>Don't have an account yet? </span>
            <Link href="/register" className={S.form_link}>
              Create an Account
            </Link>
          </p>
        </div>
      </form>
      <Image
        src={Hero}
        alt="Behind of John Mayer jumped in the air playing the guitar on stage"
        className={S.form_img + " next_img"}
        draggable={false}
        priority={true}
      />
    </section>
  );
}
