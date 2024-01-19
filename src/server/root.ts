import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";
export const AppRouter = createTRPCRouter({
  user: userRouter,
});

export type AppRouter = typeof AppRouter;
