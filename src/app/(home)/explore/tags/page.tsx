import { Tag, TagContainer } from "@/app/_components/explore";
import { db } from "@/server/db";

export default async function Page() {
  const tags = await db.tag.findMany({
    take: 16,
    orderBy: { followers: "desc" },
  });

  return (
    <TagContainer tags={tags}>
      <p className=" text-xl font-bold">Trending Tags</p>
      <p className=" font-semibold text-muted-foreground">
        Tags with most number of followers
      </p>
    </TagContainer>
  );
}
