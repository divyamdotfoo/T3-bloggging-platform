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

interface EditorContext {
  editorData: OutputData;
  setEditorData: React.Dispatch<React.SetStateAction<OutputData>>;
  editorRef: MutableRefObject<EditorJs | null>;
}

export const EditorContext = createContext<EditorContext | null>(null);

export function EditorProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: OutputData;
}) {
  const [editorData, setEditorData] = useState<OutputData>(value);
  const editorRef = useRef<EditorJs | null>(null);
  const val = {
    editorData,
    setEditorData,
    editorRef,
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
