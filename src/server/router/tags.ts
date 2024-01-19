import { randomize } from "@/lib/utils";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
export const tagRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(z.object({ take: z.number() }))
    .query(async ({ ctx, input }) => {
      const tags = await ctx.db.tag.findMany({
        take: input.take,
        orderBy: {
          followers: "desc",
        },
      });
      return randomize(tags);
    }),

  // implement infinte fetching here with cursor...
  getPostsByTag: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.tag.findFirst({
        where: {
          id: input.id,
        },
        select: {
          post: true,
        },
      });
    }),
  // TODO
  followTag: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      // return ctx.db.
    }),
});
