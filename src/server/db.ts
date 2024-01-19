import { PrismaClient } from "@prisma/client";

const globalThisForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const db =
  globalThisForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThisForPrisma.prisma = db;
