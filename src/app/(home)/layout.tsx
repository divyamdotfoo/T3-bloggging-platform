import React from "react";
import Navbar from "@/app/_components/navigation/navbar";
import { Footer } from "@/app/_components/navigation/footer";
import { Container } from "@/app/_components/home/container";
import { TrendingPosts } from "@/app/_components/feeds/side";
import { Me } from "../_components/others";
interface PageProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: PageProps) {
  return (
    <>
      <Me />
      <Navbar />
      <Footer />
      <Container>
        <div className="w-full md:w-[600px] lg:w-[650px]">{children}</div>
        <div className="hidden h-fit flex-col gap-3 lg:flex lg:w-[450px]">
          <TrendingPosts />
        </div>
      </Container>
    </>
  );
}
