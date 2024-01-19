"use client";
import {
  BookPlusIcon,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  CloudIcon,
  EyeIcon,
  Image as ImageIcon,
  Loader,
  LoaderIcon,
  PanelLeftClose,
  PanelLeftOpenIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBannerImage, useEditorSidebar, useSaveStatus } from "@/store";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalize, cn } from "@/lib/utils";
import { Logo } from "../others";
import { Input } from "@/components/ui/input";
import { UploadButton } from "../others/uploadthing";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/server/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDebounce } from "@/lib/hooks/debounce";
import type { Draft } from "@prisma/client";
import Link from "next/link";
export function EditorNav() {
  return (
    <div className=" flex w-full items-center justify-between  px-1 md:px-4">
      <div>
        <ShowSidebar />
      </div>
      <div className=" flex items-center gap-2 md:gap-4">
        <Sync />
        <PreviewBtn />
        <PublishBtn />
      </div>
    </div>
  );
}

export function ShowSidebar() {
  const [hover, setHover] = useState(false);
  const { open, setOpen } = useEditorSidebar();
  if (open) return null;
  return (
    <button
      className=" flex items-center justify-center rounded-full p-2 transition-all hover:bg-primary/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setOpen(true)}
    >
      {hover ? (
        <PanelLeftOpenIcon className=" h-5 w-5 text-primary" />
      ) : (
        <ChevronRightSquareIcon className=" h-5 w-5 text-primary" />
      )}
    </button>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const open = useEditorSidebar((s) => s.open);
  if (!open) return null;
  return (
    <motion.div
      className=" hidden h-full border-r border-border p-4 md:block md:w-[250px]"
      // initial={{ width: 0 }}
      // animate={{ width: "250px" }}
    >
      {children}
    </motion.div>
  );
}

export function SidebarHeader() {
  const session = useSession();
  const user = session.data?.user;
  if (user) {
    return (
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Avatar className=" flex h-6 w-6 items-center justify-center border-primary">
            <AvatarFallback>
              {user.name ? user.name[0]?.toUpperCase() : ""}
            </AvatarFallback>
            <AvatarImage src={user.avatar} />
          </Avatar>
          <p className=" font-bold">{capitalize(user.name ?? "")}</p>
        </div>
        <HideSidebar />
      </div>
    );
  }
  return (
    <div className=" flex items-center justify-between">
      <div className=" flex items-center gap-2">
        <Logo />
        <p className=" font-bold">Blogging</p>
      </div>
      <HideSidebar />
    </div>
  );
}

export function DraftSearch() {
  return (
    <Input
      className=" my-4 w-full rounded-2xl text-sm opacity-80 placeholder:opacity-70"
      placeholder="🔍 Search drafts..."
    />
  );
}

export function NewDraftBtn() {
  const router = useRouter();
  const newDraft = api.draft.createDraft.useMutation({
    onSuccess: (data) => router.push(`/drafts/${data?.id}`),
  });
  return (
    <button
      className=" my-2 flex w-full items-center gap-2 px-2 py-2 hover:bg-primary/10"
      onClick={() => {
        newDraft.mutate({});
      }}
    >
      {newDraft.isPending ? (
        <Loader className=" h-4 w-4 animate-spin" />
      ) : (
        <BookPlusIcon className=" h-4 w-4 text-primary" />
      )}
      <span className=" text-sm font-bold opacity-80">New draft</span>
    </button>
  );
}

export function HideSidebar() {
  const [hover, setHover] = useState(false);
  const { open, setOpen } = useEditorSidebar();
  if (!open) return null;
  return (
    <button
      className=" flex items-center justify-center rounded-full p-2 transition-all hover:bg-primary/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setOpen(false)}
    >
      {hover ? (
        <PanelLeftClose className=" h-4 w-4 text-primary" />
      ) : (
        <ChevronLeftSquareIcon className=" h-4 w-4 text-primary" />
      )}
    </button>
  );
}

export function PreviewBtn() {
  return (
    <>
      <Button className="hidden md:block" variant={"outline"}>
        Preview
      </Button>
      <button className=" flex items-center justify-center p-2 hover:bg-primary/10 md:hidden">
        <EyeIcon className=" h-6 w-6 text-primary" />
      </button>
    </>
  );
}

export function PublishBtn() {
  return <Button className="">Publish</Button>;
}

export function Sync() {
  const isSaving = useSaveStatus((s) => s.saving);
  return (
    <div className=" flex items-center gap-2">
      {isSaving ? (
        <>
          <LoaderIcon className=" h-5 w-5 animate-spin text-yellow-500" />
          <p className=" hidden text-sm text-yellow-500 md:block">Saving</p>
        </>
      ) : (
        <>
          <CloudIcon className=" h-5 w-5 text-green-200" />
          <p className=" hidden text-sm text-green-200 md:block">Saved</p>
        </>
      )}
    </div>
  );
}

export function AddCoverBtn() {
  const { openUpload, setOpenUpload } = useBannerImage();
  if (!openUpload) {
    return (
      <button
        className=" flex items-center gap-2 rounded-2xl bg-background px-4 py-2 hover:bg-primary/20"
        onClick={() => setOpenUpload(true)}
      >
        <ImageIcon className=" h-4 w-4" />
        <span className=" text-sm font-semibold opacity-80">Add cover</span>
      </button>
    );
  }
}

export function BannerImage({
  url,
  draftId,
}: {
  url?: string;
  draftId: string;
}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const deleteImage = api.draft.deleteDraftImage.useMutation({
    onSuccess: () => router.refresh(),
  });
  if (url?.trim().length) {
    return (
      <div
        className=" relative h-48 w-full overflow-hidden rounded-md sm:h-60 md:h-72 lg:h-96"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && (
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" absolute right-0 top-0 z-40"
            onClick={() => {
              deleteImage.mutate({ id: draftId });
            }}
          >
            {deleteImage.isPending ? (
              <Loader className=" h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className=" h-4 w-4 text-red-500" />
            )}
          </Button>
        )}
        <AspectRatio ratio={16 / 9}>
          <Image
            src={url}
            width={1600}
            height={0}
            className=" h-full w-full rounded-md object-cover"
            objectFit="cover"
            objectPosition="center"
            alt="banner image for blog"
          />
        </AspectRatio>
      </div>
    );
  }
  return null;
}

export function ImageUploader({ draftId }: { draftId: string }) {
  const { openUpload, setOpenUpload } = useBannerImage();
  const router = useRouter();
  if (openUpload) {
    return (
      <motion.div
        className="relative flex h-48 w-full items-center justify-center rounded-md bg-primary/10 sm:h-60 md:h-72 lg:h-80"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <UploadButton
          input={{ draftId: draftId }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setOpenUpload(false);
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
          appearance={{
            allowedContent: "hidden",
            container: " block -translate-x-6 w-fit",
            button: " bg-background border-none outline-none text-primary",
          }}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          className=" absolute right-2 top-2"
          onClick={() => setOpenUpload(false)}
        >
          <XCircle className=" h-5 w-5 text-red-500" />
        </Button>
      </motion.div>
    );
  }
}

export function TitleTextArea({ draftId }: { draftId: string }) {
  const [text, setText] = useState("");
  const router = useRouter();
  const setSaving = useSaveStatus((s) => s.setSaving);
  const { debouncedData } = useDebounce<string>(text, 500);
  const changetTitle = api.draft.updateDraftTitle.useMutation({
    onMutate: () => setSaving(true),
    onSuccess: () => {
      router.refresh();
      setSaving(false);
    },
  });
  useEffect(() => {
    changetTitle.mutate({ title: debouncedData, id: draftId });
  }, [debouncedData]);
  return (
    <textarea
      spellCheck={false}
      className=" mt-8 w-full resize-none border-none bg-background p-2 text-xl font-bold outline-none  placeholder:opacity-75 focus:outline-none md:text-3xl"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Title goes here ..."
      autoFocus={true}
    />
  );
}

export function DeleteDraft({ id }: { id: string }) {
  const router = useRouter();
  const deleteDraft = api.draft.deleteDraft.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => deleteDraft.mutate({ id: id })}
    >
      {deleteDraft.isPending ? (
        <Loader className=" h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className=" h-4 w-4 hover:text-red-400" />
      )}
    </Button>
  );
}

export function DraftLink({ d }: { d: Draft }) {
  const path = usePathname().split("/").pop();
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between p-2 hover:bg-primary/10",
        path === d.id ? "bg-primary/10" : ""
      )}
    >
      <Link
        className="block hover:text-primary hover:underline"
        href={`/drafts/${d.id}`}
        key={d.id}
      >
        {d.title ? d.title.slice(0, 20) + "..." : "Untitled"}
      </Link>
      <DeleteDraft id={d.id} />
    </div>
  );
}
