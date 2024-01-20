"use client";

import { api } from "@/server/react";
import { FeedCard } from "./feed-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostProps } from "@/types";
import { FeedSkeleton } from "./feed-skeleton";
import { mergeBetween } from "@/lib/utils";
import { RecommendedUsers } from "./recommend";
import { CommentInput } from "../comments/input";
import { Comment } from "../comments/comment";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function AllFeeds() {
  const { toast } = useToast();
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Under development",
        description: "Please sign in to test editor",
      });
    }, 1000);
  }, []);
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetching } =
    api.post.getMany.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        staleTime: 10 * 60 * 1000,
      }
    );
  if (isPending)
    return (
      <div>
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  if (isError) return;
  //  @ts-ignore
  const posts: PostProps[] = data?.pages.flatMap((d) => d?.posts);
  return (
    <div className="">
      <InfiniteScroll
        next={fetchNextPage}
        dataLength={data?.pages.length ?? 0}
        hasMore={hasNextPage ?? false}
        loader={
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        }
      >
        <div className="flex w-full flex-col gap-3">
          {mergeBetween(
            // @ts-ignore
            posts?.map((p) => (
              <FeedCard
                key={p?.id}
                post={p}
                showBookmarkIcon={true}
                showIntro={true}
              />
            )),
            <RecommendedUsers />,
            4
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export function AllDiscussions() {
  const { data, isPending, isFetching, error, fetchNextPage, hasNextPage } =
    api.post.getManyWithDiscussion.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        staleTime: 10 * 1000 * 60,
      }
    );
  if (isPending)
    return (
      <div>
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );

  if (!data) return null;
  const posts = data.pages.flatMap((d) => d?.posts);
  return (
    <div className="">
      <InfiniteScroll
        next={fetchNextPage}
        dataLength={data?.pages.length ?? 0}
        hasMore={hasNextPage ?? false}
        loader={
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        }
      >
        <div className=" flex w-full flex-col gap-3">
          {posts.map((p) => (
            // @ts-ignore
            <FeedCard post={p} key={p.id}>
              <CommentInput />
              <div className=" flex w-full flex-col items-start gap-2 pt-4">
                {p?.comments.map((c) => (
                  <Comment comment={c} user={c.user} key={c.id} />
                ))}
              </div>
            </FeedCard>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
