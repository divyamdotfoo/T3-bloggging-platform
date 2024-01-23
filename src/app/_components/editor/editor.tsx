"use client";
import { AddCoverBtn, BannerImage, ImageUploader, TitleTextArea } from ".";
import EditorJs, { OutputData } from "@editorjs/editorjs";
import { Draft } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/server/react";
import { useSaveStatus } from "@/store";
import { useDebounce } from "@/lib/hooks/debounce";
import { tools } from "./tools.mjs";
import { useEditor } from "@/store/editorContext";

export default function Editor({ draft }: { draft: Draft }) {
  const session = useSession();
  const { editorData: data, setEditorData: setData, editorRef } = useEditor();

  const { debouncedData } = useDebounce<OutputData>(data, 800);
  const updateDraft = api.draft.updateDraftContent.useMutation({
    onMutate: () => setSaving(true),
    onSuccess: () => setSaving(false),
  });
  const setSaving = useSaveStatus((s) => s.setSaving);
  useEffect(() => {
    if (editorRef.current) return;
    const editor = new EditorJs({
      holder: "editorjs",
      data: data,
      tools: tools,
      placeholder: "Press tab to open menu",
      onChange: async () => {
        const data = await editorRef.current?.saver.save();
        if (data) setData(data);
        console.log("data changed", data);
      },
    });
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    const save = () => {
      if (!session.data?.user) {
        localStorage.setItem("data", JSON.stringify(debouncedData));
        return;
      } else {
        updateDraft.mutate({ id: draft.id, content: debouncedData });
      }
    };
    save();
  }, [debouncedData]);
  return (
    <div className=" mx-auto w-full px-4 py-6 md:w-2/3  md:px-0 ">
      {draft.bannerImg ? (
        <BannerImage url={draft.bannerImg} draftId={draft.id} />
      ) : (
        <AddCoverBtn />
      )}
      <ImageUploader draftId={draft.id} />
      <TitleTextArea draftId={draft.id} />
      <div id="editorjs" className=""></div>
    </div>
  );
}
