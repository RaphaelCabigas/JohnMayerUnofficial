"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import S from "@/styles/account.module.scss";
import Hero from "@/public/images/register-hero.jpg";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Characters be min 5 to max 40 characters only allowing letters upper and lower cases, hyphens, underscores and numbers
  const emailValidation = /^[a-zA-Z0-9_-]{5,40}@jm\.unofficial$/;
  const nameValidation = /^[a-zA-Z0-9_-]{5,40}$/;
  const passwordValidation = /^[a-zA-Z0-9_-]{5,40}$/;

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
    setEmailError("");
    setNameError("");
    setPasswordError("");

    let errorFields = false;

    // Check if all fields are filled out then display error message
    if (!name || !email || !password) {
      setError("All fields are required.");
      errorFields = true;
    }

    if (!emailValidation.test(email)) {
      setEmailError(
        "Please enter a valid email address that ends with @jm.unofficial."
      );
      errorFields = true;
    }

    if (!nameValidation.test(name)) {
      setNameError("Username must be between 5 and 40 characters long");
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
        src={Hero}
        alt="John Mayer black and white playing an acoustic guitar"
        className={S.form_img + " next_img"}
        draggable={false}
        priority={true}
      />
      <form onSubmit={handleSubmit} autoComplete="off" className={S.form_form}>
        <h1>Welcome Aboard!</h1>
        <p className={S.form_heading_2}>Sign up to get started</p>
        <div className={S.form_content}>
          <div className={S.form_fields}>
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
            <button
              type="submit"
              className={S.form_button}
              disabled={isLoading}
            >
              {/* If registration is processing display the loading skeleton */}
              {isLoading ? "Creating Account..." : "Create an Account"}
            </button>
          </div>
          <ul className={S.form_errors}>
            <li>
              <p className={S.form_message}>
                * fields can only contain letters, numbers, underscores, and
                hyphens.
              </p>
            </li>
            <li> {error && <p className={S.form_error}>{error}</p>} </li>
            <li>{nameError && <p className={S.form_error}>{nameError}</p>}</li>
            <li>
              {emailError && <p className={S.form_error}>{emailError}</p>}
            </li>
            <li>
              {passwordError && <p className={S.form_error}>{passwordError}</p>}
            </li>
          </ul>
          <h2>OR</h2>
          <div>
            <p className={S.link}>
              <span>Already have an account? </span>
              <Link href="/login" className={S.form_link}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
