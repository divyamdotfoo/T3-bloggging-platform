//@ts-nocheck
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";

export const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  checklist: {
    class: Checklist,
  },
};
