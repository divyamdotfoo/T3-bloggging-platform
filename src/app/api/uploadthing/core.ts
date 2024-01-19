import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";
const f = createUploadthing();
export const uploadThingRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ draftId: z.string() }))
    .middleware(async ({ req, input }) => {
      const session = await getServerAuthSession();
      const draftId = input.draftId;
      const user = session?.user;
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id, draftId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      await db.draft.update({
        where: {
          id: metadata.draftId,
          userId: metadata.userId,
        },
        data: {
          bannerImg: file.url,
        },
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type uploadThingRouter = typeof uploadThingRouter;
