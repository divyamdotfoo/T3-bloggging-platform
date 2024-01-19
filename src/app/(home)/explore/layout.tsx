import React from "react";
import { ExploreNav } from "@/app/_components/explore";
import { DiscussionHeader } from "@/app/_components/others";
import { getServerAuthSession } from "@/server/auth";

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  const pubLinks = [
    { name: "Trending", path: "explore" },
    { name: "Tags", path: "explore/tags" },
    { name: "Blogs", path: "explore/blogs" },
  ];
  const authLinks = [
    {
      name: "Tags You Follow",
      path: "explore/tags-you-follow",
    },
  ];
  return (
    <div className="mb-16 md:mb-4">
      <DiscussionHeader />
      <div className=" mt-4 w-full rounded-lg border border-gray-800 py-2 shadow">
        <ExploreNav
          links={session?.user ? [...pubLinks, ...authLinks] : pubLinks}
        />
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
