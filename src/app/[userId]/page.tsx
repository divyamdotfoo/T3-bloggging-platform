import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  About,
  Available,
  Follow,
  FollowBtn,
  MemberSince,
  ProfileContainer,
  ProfileHeader,
  RecentActivity,
  ShareProfileBtn,
  TechStack,
} from "../_components/profile";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerAuthSession();
  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          id: params.userId,
        },
        {
          username: params.userId,
        },
      ],
    },
    include: {
      posts: {
        select: {
          title: true,
          id: true,
          createdAt: true,
        },
      },
      comments: {
        select: {
          date: true,
          post: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      },
      followers: {
        where: {
          id: session?.user.id ?? "",
        },
      },
    },
  });
  if (!user) {
    notFound();
  }
  return (
    <ProfileContainer>
      <ProfileHeader>
        <div className=" flex flex-col md:flex-row items-start gap-6 ">
          <Avatar className=" md:w-32 md:h-32 w-24 h-24 rounded-full border border-border bg-primary/5">
            <AvatarFallback>{user.name[0]}</AvatarFallback>
            <AvatarImage src={user.avatar ?? user.image ?? ""} />
          </Avatar>
          <div className=" flex flex-col items-start gap-2">
            <p className=" font-bold md:text-2xl text-lg">{user.name}</p>
            <p className=" text-opacity-80">{user.bio}</p>
            <div className=" flex items-center gap-3 mt-2">
              <Link
                href={`/${user.username ?? user.id}/followers`}
                className=" hover:underline hover:text-primary text-muted-foreground font-semibold hover:opacity-100"
              >
                Followers {user.followersNo || ""}
              </Link>
              <Link
                href={`/${user.username ?? user.id}/following`}
                className=" hover:underline hover:text-primary text-muted-foreground font-semibold hover:opacity-100"
              >
                Following {user.followingNo || ""}
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-3">
          <ShareProfileBtn username={user.username ?? user.id} />
          <Follow
            userId={user.id}
            followed={user.followers.length ? true : false}
          />
        </div>
      </ProfileHeader>
      <MemberSince date={user.createdAt} />
      <div className=" grid gap-2 lg:grid-cols-3 grid-cols-1 w-full justify-between">
        <About about={""} />
        <TechStack txt={""} />
        <Available txt="" />
      </div>
      <RecentActivity
        posts={user.posts.map((p) => ({
          date: p.createdAt,
          id: p.id,
          title: p.title,
          type: "post",
        }))}
        comments={user.comments.map((c) => ({
          date: c.date,
          id: c.post.id,
          title: c.post.title,
          type: "comment",
        }))}
      />
    </ProfileContainer>
  );
}
