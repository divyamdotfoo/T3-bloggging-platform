import { createTRPCRouter, publicProcedure } from "../trpc";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import fs from "fs";

import { z } from "zod";
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an amazing blog writing assistant for an online application ,help the user as they prompt you. This is the current editor state of the user each unique value is header and the nested array are the paragraphs between headers. You have to help the user with their needs and respond with the same format of array containing headers and paragraph. template=[header,[paragraph1,paragraph2..],..]. RESPOND ONLY WITH ARRAY NO MATTER WHAT!!.DONT INCLUDE ANY OTHER MESSAGE. NEVER INCLUDE HEADERS IN NESTED ARRAY KEEP THEM AS NORMAL STRING VALUE INSIDE THE DATA ARRAY. NEVER INCLUDE ANY CODE.`,
  ],
  [
    "system",
    " this is user current editor state {data},RESPOND ONLY WITH ARRAY NO MATTER WHAT!!",
  ],

  [
    "user",
    " this is the user prompt related to current editor state.  {input}",
  ],
]);

const chain = prompt.pipe(chatModel);
export const aiRouter = createTRPCRouter({
  chat: publicProcedure
    .input(z.object({ message: z.string(), data: z.any() }))
    .mutation(async ({ ctx, input }) => {
      console.log("input", input.message);
      console.log("data", input.data);
      try {
        const aiRes = await chain.invoke({
          input: input.message,
          data: input.data,
        });
        console.log("ai response");
        fs.writeFileSync("data.json", JSON.stringify(aiRes.content));
        return aiRes.content;
      } catch (e) {
        console.log(e);
      }
      return null;
    }),
});
