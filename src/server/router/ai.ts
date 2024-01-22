import { createTRPCRouter, publicProcedure } from "../trpc";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { OutputData } from "@editorjs/editorjs";
import { z } from "zod";
import { nanoid } from "nanoid";
import { Message } from "@/store";
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You have to generate a json data for a blog application as user demands",
  ],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel);
export const aiRouter = createTRPCRouter({
  chat: publicProcedure
    .input(z.object({ message: z.string(), data: z.any() }))
    .mutation(async ({ ctx, input }) => {
      console.log("input", input.message);
      console.log("data", input.data);
      // try {
      //   const aiRes = await chain.invoke({
      //     input: input.message,
      //   });
      //   const obj: Message = {
      //     content: aiRes.content as unknown as string,
      //     id: nanoid(6),
      //     type: "ai",
      //   };
      //   console.log("ai response", aiRes.content);
      //   return obj;
      // } catch (e) {
      //   console.log(e);
      // }
      return null;
    }),
});
