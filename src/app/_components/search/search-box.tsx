"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/debounce";
import { api } from "@/server/react";
import { useEffect, useState } from "react";
import { SearchContent, SearchFeedCard } from "./content";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedCard } from "../feeds/feed-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const { debouncedData: debouncedQuery } = useDebounce(query, 300);
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    refetch,
    fetchNextPage,
    isFetching,
  } = api.post.getMany.useInfiniteQuery(
    { limit: 3, query: debouncedQuery },
    {
      enabled: false,
      getNextPageParam: (data) => data?.nextCursor,
    }
  );
  useEffect(() => {
    refetch();
  }, [debouncedQuery]);
  const posts = data?.pages
    .flatMap((d) => d?.posts)
    .filter((p) => p !== undefined);
  console.log(posts);
  return (
    <div className=" w-full">
      <div className=" p-8">
        <Input
          className=" w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing to search"
        />
      </div>
      <SearchContent
        isFetching={isFetching}
        isError={isError}
        isQuery={!!query}
      >
        <InfiniteScroll
          hasMore={hasNextPage}
          loader={<p>loading ...</p>}
          dataLength={data?.pages.length ?? 0}
          next={fetchNextPage}
        >
          <ScrollArea className=" w-full h-[250px]">
            <div className=" flex flex-col items-start gap-3">
              {posts?.length &&
                posts.map((p) => (
                  // @ts-ignore
                  <SearchFeedCard post={p} key={p.id ?? "id"} />
                ))}
            </div>
          </ScrollArea>
        </InfiniteScroll>
      </SearchContent>
    </div>
  );
}
