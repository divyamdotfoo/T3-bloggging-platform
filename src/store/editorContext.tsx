// Context for Draft page so that both the editor and the editor nav can access the draft data

import { OutputData } from "@editorjs/editorjs";
import React, { createContext, useContext, useState } from "react";

interface EditorContext {
  editorData: OutputData;
  setEditorData: React.Dispatch<React.SetStateAction<OutputData>>;
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
  const val = {
    editorData,
    setEditorData,
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
