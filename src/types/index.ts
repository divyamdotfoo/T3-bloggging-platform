import type {
  inferRouterOutputs,
  inferRouterInputs,
  inferRouterError,
} from "@trpc/server";
import { type AppRouter } from "@/server/root";

export type PostProps = Required<
  inferRouterOutputs<AppRouter>["post"]["getPostById"]
>;

export type DiscussionFeedProps = Required<
  inferRouterOutputs<AppRouter>["post"]["getManyWithDiscussion"]
>;
