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
    .input(z.object({ tagId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          followingTags: {
            connect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

  unfollowTag: protectedProcedure
    .input(z.object({ tagId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          followingTags: {
            disconnect: {
              id: input.tagId,
            },
          },
        },
      });
    }),

  tagYouFollow: protectedProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.db.tag.findMany({
      where: {
        users: {
          every: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
