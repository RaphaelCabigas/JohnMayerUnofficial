"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  // basically helps with knowing the user's login status throughout the entire application
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
