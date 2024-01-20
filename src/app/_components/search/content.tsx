"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { SearchSkeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { PostQueryOutput } from "../feeds/feed-card";
import { getShortDate } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChatBubbleIcon, DotFilledIcon } from "@radix-ui/react-icons";

export function SearchContent({
  isFetching,
  children,
  isError,
  isQuery,
}: {
  isFetching: boolean;
  children: React.ReactNode;
  isError: boolean;
  isQuery: boolean;
}) {
  if (!isQuery)
    return (
      <p className=" text-muted-foreground text-center text-sm p-4">
        Search for tags, people, articles, and more
      </p>
    );
  return (
    <div className=" w-full h-64">
      {isFetching ? (
        <div className=" flex flex-col items-start gap-3 p-4">
          <SearchSkeleton />
          <SearchSkeleton />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export function SearchFeedCard({ post }: { post: PostQueryOutput }) {
  const router = useRouter();
  return (
    <div className=" flex items-start justify-between gap-5 px-8 py-4 w-full hover:bg-accent/20">
      <div className=" flex flex-col items-start gap-2">
        <div className=" flex items-center gap-2">
          <Avatar className="cursor-pointer border border-gray-500">
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            <AvatarImage src={post.user.avatar ?? ""} />
          </Avatar>
          <div className=" flex flex-col items-start gap-1">
            <Link
              href={`/${post?.user?.username}`}
              className="text-sm font-semibold leading-none tracking-tight hover:underline"
            >
              {post.user.name}
            </Link>
            <p className="text-sm text-muted-foreground opacity-70">
              {getShortDate(post.createdAt)}
            </p>
          </div>
        </div>
        <Link
          href={`/post/${post.id}`}
          className=" block cursor-pointer pb-2 font-semibold tracking-tight"
        >
          {post.title}
        </Link>
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
      </div>
      <div
        className="overflow-hidden rounded-md shadow-sm shadow-card w-[150px]"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        <Image
          src={post.thumbnail ?? ""}
          width={150}
          height={0}
          alt="thumbnail"
          className="cursor-pointer rounded-md h-[100px] w-[150px]"
          loading="lazy"
          placeholder="blur"
          objectFit="cover"
          objectPosition="center"
          blurDataURL={post.blurDataUrl ?? " "}
        />
      </div>
    </div>
  );
}
