import React, { Suspense } from "react";
import {
  DraftSearch,
  EditorNav,
  NewDraftBtn,
  Sidebar,
  SidebarHeader,
} from "@/app/_components/editor";
import { Drafts } from "@/app/_components/editor/drafts";
import { EditorLoader, SidebarLoader } from "@/app/_components/editor/loaders";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Sidebar>
        <SidebarHeader />
        <DraftSearch />
        <NewDraftBtn />
        <Drafts />
      </Sidebar>
      <div className=" w-full p-4">
        <EditorNav />
        <Suspense fallback={<EditorLoader />}>{children}</Suspense>
      </div>
    </Container>
  );
}
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className=" mx-auto flex h-full  max-w-6xl  border-x border-border">
      {children}
    </div>
  );
}
