import { TagContainer } from "@/app/_components/explore";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { unstable_noStore } from "next/cache";

export default async function Page() {
  unstable_noStore();
  const session = await getServerAuthSession();
  if (!session) return;
  const tags = await db.tag.findMany({
    where: {
      users: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  return (
    <TagContainer tags={tags} isFollowed={true}>
      <p className=" text-xl font-bold">Amazing tags you follow</p>
    </TagContainer>
  );
}
