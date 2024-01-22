import { OutputData } from "@editorjs/editorjs";
import { nanoid } from "nanoid";

export const schemaToArray = (
  data: OutputData
): { arr: Array<string | string[]>; version: string | undefined } => {
  const blocks = data.blocks;
  const arr: Array<string | string[]> = [];
  let pIndex = 0;
  if (Array.isArray(blocks)) {
    for (const block of blocks) {
      if (block.type === "header") {
        arr.push(block.data.text);
        pIndex++;
      } else if (block.type === "paragraph") {
        if (Array.isArray(arr[pIndex])) {
          const z = arr[pIndex] as string[];
          z.push(block.data.text);
        } else {
          arr[pIndex] = [block.data.text];
        }
      }
    }
    return { arr, version: data.version };
  } else {
    return { arr, version: data.version };
  }
};

export const arrayToSchema = (data: ReturnType<typeof schemaToArray>) => {
  const { arr, version } = data;
  const outputData: OutputData = {
    time: new Date().getTime(),
    version,
    blocks: [],
  };
  for (const x of arr) {
    if (!Array.isArray(x)) {
      outputData.blocks.push({
        id: nanoid(10),
        type: "header",
        data: {
          text: x,
        },
      });
    } else {
      for (const p of x) {
        outputData.blocks.push({
          id: nanoid(10),
          type: "paragraph",
          data: { text: p },
        });
      }
    }
  }
  return outputData;
};

export const test = [
  "Introduction",
  [
    "In this blog post, we will be exploring the differences between Next.js and Astro, two popular frameworks used for building modern web applications. Both frameworks offer unique features and advantages, but understanding their strengths and weaknesses is crucial in choosing the right framework for your project. We will dive into various aspects such as performance, flexibility, developer experience, and deployment options to determine which framework suits your needs the best. So, let's dive in and compare Next.js and Astro!",
  ],
];
