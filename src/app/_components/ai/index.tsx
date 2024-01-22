"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { nanoid } from "nanoid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { api } from "@/server/react";
import { Message, useAiHelp } from "@/store";
import { Loader, SendHorizonalIcon, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useEditor } from "@/store/editorContext";
import { arrayToSchema, schemaToArray } from "@/lib/schemaParser";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

export function AskAiBtn() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" bg-primary/20 border-primary font-bold flex items-center gap-2 hover:bg-primary/15">
          <Sparkles className=" w-4 h-4 text-primary" />
          ask AI
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" flex items-start flex-col w-96">
        <p className="font-semibold pb-1">How may I assist you?</p>
        <p className=" text-muted-foreground text-xs mb-2">
          The ai has full context to your blog content and you can ask question
          directly related to it.
        </p>
        <Chat />
      </PopoverContent>
    </Popover>
  );
}

export function Chat() {
  return (
    <div className="flex flex-col justify-between w-full gap-3">
      <MessageBox />
      <SendChat />
    </div>
  );
}

export function MessageBox() {
  const messages = useAiHelp((s) => s.messages);
  const messageContainer = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="w-full h-56 bg-accent/20 rounded-md  ">
      <div
        className="w-full h-56 p-2 flex flex-col gap-2 mb-2"
        ref={messageContainer}
      >
        {messages.map((m) => (
          <ChatMessage message={m} key={m.id} />
        ))}
      </div>
      <div ref={endRef} className=" mb-2">
        {" "}
      </div>
    </ScrollArea>
  );
}

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "max-w-56 w-fit px-4 py-2 rounded-md ",
        message.type === "ai"
          ? " bg-primary/25 self-start"
          : " bg-primary/10 self-end"
      )}
    >
      {message.content}
    </div>
  );
}

export function SendChat() {
  const { setMessages } = useAiHelp();
  const { editorData, editorRef } = useEditor();
  const [query, setQuery] = useState("");

  const sendAi = api.ai.chat.useMutation({
    onSuccess: (data) => {
      if (data) {
        const parsedData = JSON.parse(data as string);
        const outputData = arrayToSchema({
          arr: parsedData,
          version: editorData.version,
        });
        console.log("ai", outputData);
        if (editorRef.current) {
          editorRef.current?.blocks.render(outputData);
        }
      }
    },
  });

  const handleSendPrompt = () => {
    if (!query) return;
    setMessages({
      content: query,
      id: nanoid(),
      type: "user",
    });
    sendAi.mutate(
      { message: query, data: schemaToArray(editorData).arr },
      {
        onError: (e) => {
          setQuery("");
          console.log(e);
        },
      }
    );
    setQuery("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
    }
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaheight = (
    textarea: EventTarget & HTMLTextAreaElement
  ) => {
    const max = 100;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, max) + "px";
  };
  return (
    <div className=" flex items-center justify-between w-full">
      <textarea
        ref={textAreaRef}
        spellCheck={false}
        className=" placeholder:text-sm opacity-80 w-full p-2 rounded-md bg-primary/10 outline-none border-none focus:outline-none focus:border-none resize-none h-10 overflow-y-hidden"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleTextAreaheight(e.target);
        }}
        placeholder="Ask about your blog..."
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        className=" hover:bg-background"
        onClick={handleSendPrompt}
      >
        {sendAi.isPending ? (
          <Loader className=" animate-spin w-4 h-4" />
        ) : (
          <SendHorizonalIcon className=" text-primary w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
