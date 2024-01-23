// Context for Draft page so that both the editor and the editor nav can access the draft data
"use client";
import { OutputData } from "@editorjs/editorjs";
import React, {
  MutableRefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import EditorJs from "@editorjs/editorjs";
import { Draft } from "@prisma/client";

interface EditorContext {
  editorData: OutputData;
  title: string;
  setEditorData: React.Dispatch<React.SetStateAction<OutputData>>;
  editorRef: MutableRefObject<EditorJs | null>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  draft: Draft;
}

export const EditorContext = createContext<EditorContext | null>(null);

export function EditorProvider({
  children,
  value,
  title,
  draft,
}: {
  children: React.ReactNode;
  value: OutputData;
  title: string;
  draft: Draft;
}) {
  const [editorData, setEditorData] = useState<OutputData>(value);
  const [t, sT] = useState(title);
  const editorRef = useRef<EditorJs | null>(null);
  const val: EditorContext = {
    editorData,
    setEditorData,
    editorRef,
    title: t,
    setTitle: sT,
    draft,
  };

  return (
    <EditorContext.Provider value={val}>{children}</EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error("use Editor must be used inside EditorProvider");
  return context;
};
