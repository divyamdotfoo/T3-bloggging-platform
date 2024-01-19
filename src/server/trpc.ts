import { initTRPC } from "@trpc/server";
import { transformer } from "./utils";

const t = initTRPC.create({
  transformer,
});
export const router = t.router;
export const procedure = t.procedure;
