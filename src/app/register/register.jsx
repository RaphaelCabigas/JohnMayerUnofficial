"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import testing from "@/public/images/home-hero.jpg";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // prevent the default form submission behavior
    e.preventDefault();
    // creates a form targeting the registration form
    const formData = new FormData(e.target);
    // get the values by their name attribute
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    setIsLoading(true);
    setError("");

    // Check if all fields are filled out then display error message
    if (!name || !email || !password) {
      setIsLoading(false);
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        // tell the server the data is in JSON format
        headers: {
          "Content-Type": "application/json",
        },
        // send the data to the server
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        // After successful registration, navigate to login page
        router.push("/login");
      } else if (res.status === 401) {
        // When user exists
        setError("User already exists. Use a different email.");
      } else if (res.status === 500) {
        // Display error message
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      // If any other error occurs in signIn, display the error message
      setError("Something went wrong. Please try again later.");
    } finally {
      // whether or not it was successful
      setIsLoading(false);
    }
  };

  return (
    <section className={S.form_container}>
      <Image
        src={testing}
        alt="John Mayer closed up shot black and white"
        className={S.form_img + " next_img"}
        draggable={false}
        priority={true}
      />
      <form onSubmit={handleSubmit} autoComplete="off" className={S.form_form}>
        <h1>Create an Account</h1>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            placeholder="Full Name"
            type="text"
            name="name"
            id="name"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Your Email"
            type="email"
            name="email"
            autoComplete="off"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Your Password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className={S.form_button} disabled={isLoading}>
          {/* If registration is processing display the loading skeleton */}
          {isLoading ? "Creating Account..." : "Create an Account"}
        </button>
        {/* If there's an error message display the error*/}
        {error && <p className={S.form_error}>{error}</p>}
        <div>
          <h2>OR</h2>
          <p>
            Do you have an account?
            <Link href="/login" className={S.form_link}>
              Log In
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
