import { schemaToArray } from "@/lib/schemaParser";
import { NextResponse } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

interface AiReq {
  input: string;
  data: ReturnType<typeof schemaToArray>["arr"];
}
export const runtime = "edge";

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_KEY,
  temperature: 0.8,
  modelName: "gpt-3.5-turbo",
  streaming: false,
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

export async function POST(req: Request) {
  const data: AiReq = await req.json();
  try {
    const aiRes = await chain.invoke({
      input: data.input,
      data: data.data,
    });
    return NextResponse.json({ data: aiRes.content });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {},
      { status: 500, statusText: "something went wrong on the server" }
    );
  }
}
