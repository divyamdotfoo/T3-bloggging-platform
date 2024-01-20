"use client";
import type { Tag, User } from "@prisma/client";
import { Check, FolderOpen, PlusIcon, TagIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { capitalize } from "@/lib/utils";
import millify from "millify";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SmallUserCard } from "../others/user";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { api } from "@/server/react";

export function Tag({ tag, isFollowed }: { tag: Tag; isFollowed: boolean }) {
  const router = useRouter();
  const session = useSession();
  const followTag = api.tag.followTag.useMutation();
  const unFollowTag = api.tag.unfollowTag.useMutation();
  const [followed, setFollowed] = useState(isFollowed);
  const handler = () => {
    if (session.status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }
    if (!followed) {
      followTag.mutate({ tagId: tag.id });
      setFollowed(true);
      router.refresh();
      return;
    }
    unFollowTag.mutate({ tagId: tag.id });
    setFollowed(false);
    router.refresh();
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
  isFollowed,
}: {
  tags: Tag[];
  children: React.ReactNode;
  isFollowed: boolean;
}) {
  return (
    <div className=" p-4">
      {children}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {tags.map((t) => (
          <Tag key={t.id} tag={t} isFollowed={isFollowed} />
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
    <ScrollArea className=" sm:p-2 md:p-0">
      <div className="flex whitespace-nowrap items-center justify-center gap-2 border-b border-gray-800">
        {links.map((l) => (
          <ExploreLinks name={l.name} path={l.path} key={l.name} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" className=" hidden" />
    </ScrollArea>
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
        " rounded-tl-sm rounded-tr-sm px-2 py-2 font-bold opacity-75 hover:bg-accent text-nowrap whitespace-nowrap",
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
