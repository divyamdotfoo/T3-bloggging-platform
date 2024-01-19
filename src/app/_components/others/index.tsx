import Link from "next/link";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { TorusIcon } from "lucide-react";
export function DiscussionHeader() {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="relative flex w-full items-center justify-center ">
        <p className="text-xl font-bold md:text-3xl md:tracking-wide">
          Discover the Digital Universe
        </p>
        <div className=" absolute bottom-0 left-0 right-0 top-0 bg-primary opacity-20 blur-2xl"></div>
      </div>
      <p className=" px-4 text-base font-medium opacity-80">
        Embark on a journey through cutting-edge tech blogs and trending tags.
        Dive into a dynamic collection curated by the brightest minds in the
        tech sphere, constantly evolving just for you. Welcome to the pulse of
        innovation!
      </p>
    </div>
  );
}

export function Me() {
  return (
    <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-start gap-3 lg:flex">
      <Link href={"https://github.com/divyamdotfoo"}>
        <GitHubLogoIcon className=" block h-6 w-6" color="#6d28d9" />
      </Link>
      <Link href={"https://x.com/divyamdotfoo"}>
        <TwitterLogoIcon className=" block h-6 w-6" color="#6d28d9" />
      </Link>
    </div>
  );
}

export function Logo() {
  return (
    <TorusIcon className=" h-8 w-8" color="#6d28d9" strokeWidth={"2.8px"} />
  );
}
