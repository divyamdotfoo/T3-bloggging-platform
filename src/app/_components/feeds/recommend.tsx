"use client";
import { api } from "@/server/react";
import { RecommendedUserSkeleton } from "./feed-skeleton";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SmallUserCard } from "../others/user";
export function RecommendedUsers() {
  // TODO
  const { data, isPending, isError } = api.user.getMany.useQuery({ take: 4 });
  if (isPending) return <RecommendedUserSkeleton />;
  return (
    <div className="mx-auto rounded-xl border bg-card p-4 text-accent-foreground shadow sm:w-[600px] md:w-[650px]">
      <div className=" flex items-center justify-between pb-4">
        <p className="text-base font-semibold">Trending users this week</p>
        <Link
          href={`/explore/users`}
          className="flex items-center gap-2 hover:underline"
        >
          Browse more <ArrowRightIcon className=" h-4 w-4 translate-y-[2px]" />
        </Link>
      </div>
      <div className=" grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {data?.map((u) => (
          <SmallUserCard u={u} key={u.id} />
        ))}
      </div>
    </div>
  );
}
