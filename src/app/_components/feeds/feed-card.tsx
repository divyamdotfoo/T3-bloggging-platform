"use client";
import {
  ChatBubbleIcon,
  DotFilledIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/root";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getShortDate } from "@/lib/utils";

type PostQueryOutput = Required<
  inferRouterOutputs<AppRouter>["post"]["getPostById"]
>;
interface CardProps {
  post: PostQueryOutput;
  children?: React.ReactNode;
}

export function FeedCard({ post, children }: CardProps) {
  const [bmrk, setBmrk] = useState(false);
  const router = useRouter();
  const date = getShortDate(post.createdAt);

  const bookmarkHandler = () => {
    setBmrk((p) => !p);
  };
  if (!post) return;

  return (
    <div className="mx-auto w-full rounded-xl border bg-card p-4 text-card-foreground shadow sm:w-[600px] md:w-[650px]">
      <div className="flex items-center gap-3 pb-2">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="cursor-pointer border border-gray-500">
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              <AvatarImage src={post.user.avatar ?? ""} />
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <UserMeta post={post} />
          </HoverCardContent>
        </HoverCard>
        <div className=" flex flex-col items-start">
          <Link
            href={`/${post?.user?.username}`}
            className="text-sm font-semibold leading-none tracking-tight hover:underline"
          >
            {post.user.name}
          </Link>
          <p className="text-sm text-muted-foreground opacity-70">{date}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 items-center gap-4 pb-3 md:grid-cols-[auto_150px]">
        <div>
          <Link
            href={`/post/${post.id}`}
            className=" block cursor-pointer pb-2 text-lg font-bold tracking-tight"
          >
            {post.title}
          </Link>
          <p className=" hidden text-sm opacity-75 md:block">{post.intro}</p>
        </div>
        <div
          className=" w-full overflow-hidden rounded-md shadow-sm shadow-card md:w-[150px]"
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <Image
            src={post.thumbnail ?? ""}
            width={180}
            height={0}
            alt="thumbnail"
            className="h-64 w-full cursor-pointer rounded-md md:h-auto md:w-44"
            loading="lazy"
            placeholder="blur"
            objectFit="cover"
            objectPosition="center"
            blurDataURL={post.blurDataUrl ?? " "}
          />
        </div>
      </div>
      <div className=" flex items-center justify-between opacity-80">
        <div className=" flex items-center gap-1">
          <Link
            href={`/discussions/${post.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <ChatBubbleIcon className=" translate-y-[1px]" />
            <p className=" text-sm font-semibold">Discuss</p>
          </Link>
          {post.likes > 0 && (
            <div className=" flex items-center gap-1">
              <DotFilledIcon className=" translate-y-[2px] opacity-80" />
              <p className=" text-sm">{post.likes} likes</p>
              <DotFilledIcon className=" translate-y-[2px] opacity-80" />
            </div>
          )}
          {post.views > 0 && <p className=" text-sm">{post.views} reads</p>}
        </div>
        <div>
          <button onClick={bookmarkHandler}>
            {bmrk ? (
              <BookmarkFilledIcon className="h-5 w-5" />
            ) : (
              <BookmarkIcon className=" h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className=" pt-2">{children}</div>
    </div>
  );
}

function UserMeta({ post }: { post: PostQueryOutput }) {
  return <p>user data</p>;
}
