import { procedure, router } from "../trpc";
import { z } from "zod";
export const helloRouter = router({
  hi: procedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      await new Promise((r) => setTimeout(r, 100));
      return `Hello ${input.name}, lets pull this off.`;
    }),
});
