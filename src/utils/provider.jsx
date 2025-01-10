"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

// A wrapper for the children/content that helps with
// knowing the user's login status throughout the entire application
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
