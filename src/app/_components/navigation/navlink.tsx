"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export interface NavlinkProps {
  name: string;
  path: string;
}
export function Navlink({ name, path }: NavlinkProps) {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={cn(
        "hidden rounded-2xl  border border-transparent px-4 py-2 text-sm font-semibold transition-all hover:border-border md:block ",
        path == currentPath ? "text-primary" : ""
      )}
    >
      {name}
    </Link>
  );
}
