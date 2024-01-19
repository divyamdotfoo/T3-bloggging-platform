import { TRPCError, initTRPC } from "@trpc/server";
import { transformer } from "./utils";
import { db } from "./db";
import { getServerAuthSession } from "./auth";
export const createContext = async (opts: {}) => {
  const session = await getServerAuthSession();
  return {
    db,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer,
});
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});
