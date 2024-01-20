import React from "react";
import Navbar from "../_components/navigation/navbar";
import { Footer } from "../_components/navigation/footer";

export default function UserLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Footer />
      {props.children}
    </div>
  );
}
