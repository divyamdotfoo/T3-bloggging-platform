import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";
import { z } from "zod";
export const userRouter = createTRPCRouter({
  getMeta: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getPublicProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
        include: {
          posts: true,
        },
      });
    }),

  checkDraft: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const draft = await ctx.db.draft.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return draft;
  }),

  createDraft: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx }) => {
      const draft = await ctx.db.draft.create({
        data: {
          userId: ctx.session.user.id,
          content: {},
        },
      });
      return draft;
    }),

  getMany: publicProcedure
    .input(z.object({ take: z.number().optional() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        take: input.take ?? 4,
        orderBy: {
          followersNo: "desc",
        },
      });
    }),

  editBio: protectedProcedure
    .input(z.object({ bio: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const update = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio: input.bio,
        },
      });
      return update;
    }),

  delete: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.db.user.delete({
        where: { id: ctx.session.user.id },
      });
      return deleted;
    }),
  follow: protectedProcedure
    .input(z.object({ toFollowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [following, followed] = await ctx.db.$transaction([
        ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            following: {
              connect: {
                id: input.toFollowId,
              },
            },
          },
        }),
        ctx.db.user.update({
          where: {
            id: input.toFollowId,
          },
          data: {
            followers: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        }),
      ]);
    }),
  unFollow: protectedProcedure
    .input(z.object({ toUnFollowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [unFollowing, unFollowed] = await ctx.db.$transaction([
        ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            following: {
              disconnect: {
                id: input.toUnFollowId,
              },
            },
          },
        }),
        ctx.db.user.update({
          where: {
            id: input.toUnFollowId,
          },
          data: {
            followers: {
              disconnect: {
                id: ctx.session.user.id,
              },
            },
          },
        }),
      ]);
    }),
});
