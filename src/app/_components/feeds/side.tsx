import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { db } from "@/server/db";
import Link from "next/link";
export async function TrendingPosts() {
  const posts = await db.post.findMany({
    take: 4,
    where: {},
    include: { user: true },
  });
  if (!posts.length) return null;
  return (
    <Card className=" relative bg-gradient-to-br from-background to-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className=" flex items-center gap-2">
          <span className=" text-lg">Trending Posts</span>{" "}
          <TrendingUpIcon className="h-4 w-4" />{" "}
        </CardTitle>
        <CardDescription>Most popular posts of this week.</CardDescription>
      </CardHeader>
      <CardContent className=" pt-0">
        <div className=" flex flex-col items-start gap-2">
          {posts.map((p) => (
            <div key={p.id}>
              <Link
                href={`/post/${p.id}`}
                className="text-sm font-semibold opacity-80 transition-all hover:opacity-100"
              >
                {p.title}
              </Link>
              <div className=" flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <Link
                  href={`/${p.user.username}`}
                  className=" font-medium opacity-85 hover:opacity-100"
                >
                  {p.user.name}
                </Link>
                <DotFilledIcon className="h-2 w-2" />
                <p>{`${p.views} reads`}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
