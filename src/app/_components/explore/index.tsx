"use client";
import type { Tag, User } from "@prisma/client";
import { Check, PlusIcon, TagIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { capitalize } from "@/lib/utils";
import millify from "millify";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SmallUserCard } from "../others/user";

export function Tag({ tag, isFollowed }: { tag: Tag; isFollowed: boolean }) {
  const session = useSession();
  const [followed, setFollowed] = useState(isFollowed);
  const handler = () => {
    if (session.status === "unauthenticated") {
      redirect("/api/auth/signin");
    }
    setFollowed((p) => !p);
  };
  return (
    <div className=" flex items-center justify-between rounded-md bg-primary/10 p-2">
      <Link
        href={`/explore/tags/${tag.name}`}
        className=" flex items-center gap-4"
      >
        <TagIcon />
        <div>
          <p className=" text-lg font-semibold">{capitalize(tag.name)}</p>
          <p className=" font-medium text-muted-foreground">
            {millify(tag.followers).toLowerCase()} followers
          </p>
        </div>
      </Link>
      <button
        onClick={handler}
        className=" flex items-center justify-center rounded-full bg-background p-1"
      >
        {followed && <Check color="green" />}
        {!followed && <PlusIcon color="#6d28d9" />}
      </button>
    </div>
  );
}

export function TagContainer({
  tags,
  children,
}: {
  tags: Tag[];
  children: React.ReactNode;
}) {
  return (
    <div className=" p-4">
      {children}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {tags.map((t) => (
          <Tag key={t.id} tag={t} isFollowed={false} />
        ))}
      </div>
    </div>
  );
}

export function ExploreNav({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  return (
    <div className=" flex w-full items-center justify-center gap-2 border-b border-gray-800 ">
      {links.map((l) => (
        <ExploreLinks name={l.name} path={l.path} key={l.name} />
      ))}
    </div>
  );
}

export function ExploreLinks({ name, path }: { name: string; path: string }) {
  const currentPath = usePathname().split("/").pop();
  const givenPath = path.split("/").pop();
  console.log(currentPath);
  return (
    <Link
      href={`/${path}`}
      className={cn(
        " rounded-tl-sm rounded-tr-sm px-2 py-2 font-bold opacity-75 hover:bg-accent",
        currentPath == givenPath ? "text-primary" : ""
      )}
    >
      {name}
    </Link>
  );
}

export function UserContainer({
  users,
  children,
}: {
  users: User[];
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      {children}
      <div className=" mt-4 grid grid-cols-1  gap-4 md:grid-cols-2">
        {users.map((u) => (
          <SmallUserCard key={u.id} u={u} />
        ))}
      </div>
    </div>
  );
}
