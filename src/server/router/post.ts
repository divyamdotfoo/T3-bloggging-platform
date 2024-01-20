import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";
import { z } from "zod";
import { randomize } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { error } from "console";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ id: z.string().min(5) }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: {
            select: {
              username: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      if (!post) {
        throw error();
      }
      return post;
    }),
  getMany: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        query: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.post.findMany({
        skip: 1,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        take: input.limit ? input.limit : 4,
        where: input.query
          ? {
              OR: [
                {
                  title: {
                    startsWith: input.query,
                  },
                },
                {
                  intro: {
                    contains: input.query,
                  },
                },
              ],
            }
          : undefined,
        include: {
          user: {
            select: {
              username: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      if (!data.length) return;
      const posts = data;
      if (data.length) {
        return {
          posts: randomize(posts),
          nextCursor: posts[posts.length - 1]?.id,
        };
      }
    }),

  getManyWithDiscussion: publicProcedure
    .input(z.object({ cursor: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        take: 4,
        skip: 1,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        include: {
          user: true,
          comments: {
            take: 2,
            include: {
              user: true,
            },
          },
        },
      });
      if (posts.length) {
        return {
          posts: posts,
          nextCursor: posts[posts.length - 1]?.id,
        };
      }
    }),
  // getting fake posts to show for some component
  getRandom: publicProcedure
    .input(z.object({ take: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        take: input.take,
        where: {
          likes: {
            gt: 20,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
      });
    }),
  addPost: protectedProcedure
    .input(
      z.object({
        post: z.object({
          title: z.string(),
          content: z.any(),
          thumbnail: z.string().optional(),
          blurDataUrl: z.string().optional(),
          intro: z.string(),
          tags: z.array(z.string()),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { post } = input;
      const newPost = await ctx.db.post.create({
        data: {
          title: post.title,
          content: post.content as unknown as Prisma.InputJsonValue,
          thumbnail: post.thumbnail,
          blurDataUrl: post.blurDataUrl,
          intro: post.intro,
          userId: ctx.session.user.id,
          tags: {
            connect: post.tags.map((tagId) => ({ id: tagId })),
          },
        },
      });
      return newPost;
    }),
  deletePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const isExist = await ctx.db.post.findFirst({
        where: {
          id: input.postId,
          userId: userId,
        },
      });
      if (!isExist) return;
      await ctx.db.post.delete({
        where: {
          id: input.postId,
          userId: userId,
        },
      });
    }),

  incrementLike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }),

  decrementLike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.postId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });
    }),
});
