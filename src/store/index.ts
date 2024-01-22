import { OutputData } from "@editorjs/editorjs";
import { boolean } from "zod";
import { create } from "zustand";

interface Sidebar {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useEditorSidebar = create<Sidebar>((set) => ({
  open: true,
  setOpen: (val) => set((s) => ({ open: val })),
}));

interface SaveStatus {
  saving: boolean;
  setSaving: (boo: boolean) => void;
}

export const useSaveStatus = create<SaveStatus>((set) => ({
  saving: false,
  setSaving: (boo) => set((s) => ({ saving: boo })),
}));

interface BannerImage {
  openUpload: boolean;
  setOpenUpload: (boo: boolean) => void;
}
export const useBannerImage = create<BannerImage>((set) => ({
  openUpload: false,
  setOpenUpload: (boo) => set((s) => ({ openUpload: boo })),
}));

export interface Message {
  type: "ai" | "user";
  content: string;
  id: string;
}

interface AiHelp {
  messages: Message[];
  setMessages: (mess: Message) => void;
}

export const useAiHelp = create<AiHelp>((set) => ({
  messages: [
    {
      content: "Hey, bring it on!",
      id: "first-message",
      type: "ai",
    },
  ],
  setMessages: (m) => set((s) => ({ messages: [...s.messages, m] })),
}));
