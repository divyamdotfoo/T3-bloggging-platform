"use client";
import {
  MagnifyingGlassIcon,
  ReaderIcon,
  GlobeIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBtn } from "./btns";
export function Footer() {
  const currentPath = usePathname();
  return (
    <div className="fixed bottom-0 left-0  right-0 z-40 flex w-full items-center justify-between border-t border-t-border bg-card px-6 py-2 md:hidden ">
      <Link href={"/"}>
        {currentPath == "/" ? (
          <ReaderIcon className=" h-6 w-6" color="#7c3aed" />
        ) : (
          <ReaderIcon className=" h-6 w-6" />
        )}
      </Link>
      <Link href={"/explore"}>
        {currentPath == "/explore" ? (
          <GlobeIcon className=" h-6 w-6" color="#7c3aed" />
        ) : (
          <GlobeIcon className=" h-6 w-6" />
        )}
      </Link>
      <SearchBtn asFooter={true} />
      <Link href={"/bookmarks"}>
        {currentPath == "/bookmarks" ? (
          <BookmarkFilledIcon className=" h-6 w-6" color="#7c3aed" />
        ) : (
          <BookmarkFilledIcon className=" h-6 w-6" />
        )}
      </Link>
    </div>
  );
}
