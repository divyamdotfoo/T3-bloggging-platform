import { TagContainer, UserContainer } from "@/app/_components/explore";
import { PrimaryColorBtn } from "@/app/_components/navigation/btns";
import { db } from "@/server/db";

export default async function ExplorePage() {
  const tags = await db.tag.findMany({ take: 6 });
  const users = await db.user.findMany({
    take: 8,
    orderBy: { followersNo: "desc" },
  });
  return (
    <div>
      <TagContainer tags={tags} isFollowed={false}>
        <div className=" flex items-center gap-4">
          <p className=" text-xl font-bold">Trending Tags</p>
          <PrimaryColorBtn path="/explore/tags">See all tags</PrimaryColorBtn>
        </div>
      </TagContainer>
      <UserContainer users={users}>
        <div className=" flex items-center gap-4">
          <p className=" text-xl font-bold">Trending Users</p>
          <PrimaryColorBtn path="/explore/users">See more</PrimaryColorBtn>
        </div>
      </UserContainer>
    </div>
  );
}
