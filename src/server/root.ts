import { aiRouter } from "./router/ai";
import { draftRouter } from "./router/draft";
import { postRouter } from "./router/post";
import { tagRouter } from "./router/tags";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";
export const AppRouter = createTRPCRouter({
  user: userRouter,
  draft: draftRouter,
  tag: tagRouter,
  post: postRouter,
  ai: aiRouter,
});

export type AppRouter = typeof AppRouter;
