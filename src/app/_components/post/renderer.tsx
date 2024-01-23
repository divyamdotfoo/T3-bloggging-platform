import { OutputData } from "@editorjs/editorjs";
import { Dot } from "lucide-react";
export function Renderer({ content }: { content: OutputData }) {
  if (!Array.isArray(content.blocks)) return;
  return (
    <div>
      {content.blocks.map((x) => {
        if (x.type === "paragraph") {
          return (
            <p className=" pb-4" key={x.id}>
              {x.data.text}
            </p>
          );
        } else if (x.type === "header") {
          if (Number(x.data.level) === 2) {
            return (
              <p key={x.id} className=" font-semibold text-2xl py-4 opacity-95">
                {x.data.text}
              </p>
            );
          } else if (Number(x.data.level) === 3) {
            return (
              <p key={x.id} className=" font-semibold text-xl py-4 opacity-95">
                {x.data.text}
              </p>
            );
          } else if (Number(x.data.level) === 4) {
            return (
              <p key={x.id} className=" font-semiboll text-lg py-4 opacity-95">
                {x.data.text}
              </p>
            );
          }
        } else if (x.type === "list") {
          if (x.data.style === "unordered") {
            return x.data.items.map((_: string, i: number) => (
              <p
                key={_.slice(0, 5) + i}
                className={`flex items-center gap-1 ${
                  i === x.data.items.length - 1 ? "pb-4" : "pb-1"
                }`}
              >
                <Dot className=" opacity-60" />
                {_}
              </p>
            ));
          } else if (x.data.style === "ordered") {
            return x.data.items.map((_: string, i: number) => (
              <p
                key={_.slice(0, 5) + i}
                className={`flex items-center gap-1 ${
                  i === x.data.items.length - 1 ? "pb-4" : "pb-1"
                }`}
              >
                <span className=" font-light text-sm opacity-60">{i + 1}.</span>
                {_}
              </p>
            ));
          }
        } else return null;
      })}
    </div>
  );
}
