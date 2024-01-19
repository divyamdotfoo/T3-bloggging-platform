import { notFound } from "next/navigation";
import { DraftLink } from ".";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
export async function Drafts() {
  noStore();
  const session = await getServerAuthSession();
  if (!session) return;
  try {
    const drafts = await db.draft.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return (
      <div className="flex flex-col items-start">
        {drafts?.map((d) => (
          <DraftLink d={d} key={d.id} />
        ))}
      </div>
    );
  } catch (e) {
    notFound();
  }
}
