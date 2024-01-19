import { initTRPC } from "@trpc/server";
import { transformer } from "./utils";
import { db } from "./db";
export const createContext = async (opts: {}) => {
  return {
    db,
    ...opts,
  };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer,
});
export const router = t.router;
export const procedure = t.procedure;
