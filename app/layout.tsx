"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
  );

  const signUp = () => {
    supabase.auth.signUp({
      email: "jon@supabase.com",
      password: "sup3rs3cur3",
    });
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: "jon@supabase.com",
      password: "sup3rs3cur3",
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
        {children}
      </body>
    </html>
  );
}
