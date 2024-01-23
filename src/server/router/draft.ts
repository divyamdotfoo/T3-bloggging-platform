import { createTRPCRouter, protectedProcedure } from "../trpc";
import { boolean, z } from "zod";
import { Prisma } from "@prisma/client";
export const draftRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        return null;
      }
      const draft = await ctx.db.draft.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      return draft;
    }),
  getByUser: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.user) return null;
      const drafts = await ctx.db.draft.findMany({
        where: {
          userId: ctx.session?.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return drafts;
    }),
  createDraft: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) return null;
      const draft = await ctx.db.draft.create({
        data: {
          userId: ctx.session?.user.id,
          content: {},
        },
      });
      return draft;
    }),

  deleteDraft: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.draft.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  checkDraft: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) return null;
      const draft = await ctx.db.draft.findFirst({
        where: {
          userId: ctx.session?.user.id,
        },
        orderBy: { createdAt: "desc" },
      });
      return draft;
    }),
  updateDraftContent: protectedProcedure
    .input(z.object({ content: z.any(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.draft.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content as unknown as Prisma.InputJsonValue,
        },
      });
    }),
  updateDraftTitle: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.draft.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),
  deleteDraftImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.draft.update({
        where: {
          id: input.id,
        },
        data: {
          bannerImg: "",
        },
      });
    }),
  updateDraftStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.draft.update({
        where: {
          id: input.id,
        },
        data: {
          published: input.status,
        },
      });
    }),
});
