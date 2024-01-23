import React from "react";
import { Footer } from "../_components/navigation/footer";
import Navbar from "../_components/navigation/navbar";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <Footer />
      {children}
    </div>
  );
}
