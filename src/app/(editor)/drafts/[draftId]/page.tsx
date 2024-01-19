import { notFound } from "next/navigation";
import dynamicImport from "next/dynamic";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const Editor = dynamicImport(() => import("@/app/_components/editor/editor"), {
  ssr: false,
});

interface PageProps {
  params: { draftId: string };
}
export default async function DraftPage({ params }: PageProps) {
  const session = await getServerAuthSession();
  const draftId = params.draftId;
  try {
    if (!session) throw new Error();
    const draft = await db.draft.findFirst({
      where: { id: draftId, userId: session.user.id },
    });

    if (!draft) return <p>we dont know what you are looking for </p>;
    return <Editor draft={draft} />;
  } catch (e) {
    console.log(e);
    notFound();
  }
}
