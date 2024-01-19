import { helloRouter } from "./router/hello";
import { router } from "./trpc";

export const AppRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof AppRouter;
