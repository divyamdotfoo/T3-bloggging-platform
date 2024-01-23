import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { AuthorOptionHoverCard, PostActionBtns } from ".";

export async function AuthorOptions({ id }: { id: string }) {
  const session = await getServerAuthSession();
  if (!session?.user) return;
  const isAuthor = await db.post.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });
  if (!isAuthor) return;
  return (
    <PostActionBtns id={id}>
      <AuthorOptionHoverCard post={isAuthor} />
    </PostActionBtns>
  );
}
