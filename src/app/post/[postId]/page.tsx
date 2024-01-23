import { Renderer } from "@/app/_components/post/renderer";
import {
  AuthorOptionHoverCard,
  PostBannerImage,
  UserData,
} from "@/app/_components/post";
import { getShortDate } from "@/lib/utils";
import { db } from "@/server/db";
import { OutputData } from "@editorjs/editorjs";
import { notFound } from "next/navigation";
import { AuthorOptions } from "@/app/_components/post/authorOptions";

interface PageProps {
  params: { postId: string };
}
export default async function PostPage({ params }: PageProps) {
  try {
    const post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: { user: true },
    });
    if (!post) {
      notFound();
    }
    return (
      <div className=" md:max-w-4xl mx-auto p-2 w-full flex flex-col gap-4">
        <PostBannerImage url={post.thumbnail} dUrl={post.blurDataUrl} />
        <UserData user={post.user} date={getShortDate(post.createdAt)} />
        <Renderer content={post.content as unknown as OutputData} />
        <AuthorOptions id={post.id} />
      </div>
    );
  } catch (e) {
    notFound();
  }
}
