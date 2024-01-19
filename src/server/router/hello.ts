import { procedure, router } from "../trpc";
import { z } from "zod";
import { db } from "../db";
export const helloRouter = router({
  hi: procedure.input(z.object({})).query(async ({ input }) => {
    const users = await db.user.findMany({ take: 2, where: {} });
    return users;
  }),
});
