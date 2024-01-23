"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/server/react";
import { Post, User } from "@prisma/client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Bookmark,
  BookmarkCheck,
  Heart,
  Loader,
  MessageCircleMoreIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function PostBannerImage({
  url,
  dUrl,
}: {
  url: string | null | undefined;
  dUrl: string | null | undefined;
}) {
  if (!url) return null;
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src={url}
        width={1600}
        height={0}
        className="h-full w-full rounded-md object-cover"
        objectFit="cover"
        objectPosition="center"
        alt="banner image for blog"
        blurDataURL={dUrl ?? "data:ksdfkdsjfkjsdklfjkdsjfk"}
        loading="lazy"
        placeholder="blur"
      />
    </AspectRatio>
  );
}

export function UserData({ user, date }: { user: User; date: string }) {
  return (
    <div className=" flex items-center gap-8 mx-auto">
      <Avatar className=" w-14 h-14 rounded-full border border-primary overflow-hidden">
        <AvatarFallback>{user.name[0]}</AvatarFallback>
        <AvatarImage src={user.avatar ?? user.image ?? ""} />
      </Avatar>
      <Link
        href={`/${user.username ?? user.id}`}
        className=" text-lg font-semibold"
      >
        {user.name}
      </Link>
      <p className=" text-lg text-muted-foreground font-semibold">{date}</p>
    </div>
  );
}

export function AuthorOptionHoverCard({ post }: { post: Post }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="">
          <DotsVerticalIcon className=" w-8 h-8 text-primary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 flex flex-col items-start max-w-32 my-2">
        <Link
          href={`/drafts/${""}`}
          className=" p-2 w-full hover:bg-primary/10 transition-all flex items-center gap-4"
        >
          <Pencil className=" w-5 h-5 text-primary" />
          <p>Edit</p>
        </Link>
        <DeleteModal id={post.id} />
      </PopoverContent>
    </Popover>
  );
}

function DeleteModal({ id }: { id: string }) {
  const router = useRouter();
  const delPost = api.post.deletePost.useMutation({
    onSuccess: () => {
      router.back();
    },
  });
  const deleteHandler = () => {
    if (!id) return;
    delPost.mutate({ postId: id });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" p-2 hover:bg-primary/10 transition-all w-full flex items-center gap-4">
          <Trash2 className=" w-5 h-5 text-rose-500" /> <span>Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent className=" max-w-72">
        <DialogHeader className=" text-xl font-semibold">
          Deleting Post
        </DialogHeader>
        <DialogDescription className="">
          Are you sure you want to delete this post?
        </DialogDescription>
        <div className="flex items-center justify-between pt-3">
          <DialogClose>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={deleteHandler} variant={"destructive"}>
              Yes,sure
              {delPost.isPending ? (
                <Loader className=" w-4 h-4 animate-spin" />
              ) : null}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PostActionBtns({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className=" flex items-center rounded-3xl gap-3 fixed px-4 py-2 bottom-16 left-1/2 -translate-x-1/2 z-40 bg-accent shadow">
      <LikeBtn id={id} />
      <CommentBtn id={id} />
      <BookmarkBtn id={id} />
      {children}
    </div>
  );
}

function LikeBtn({ id }: { id: string }) {
  const session = useSession();
  const likePost = api.post.incrementLike.useMutation({});
  const router = useRouter();
  const handler = () => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    likePost.mutate({ postId: id });
  };
  return (
    <button className="transition-all">
      <Heart className=" w-8 h-8 text-primary hover:text-red-800" />
    </button>
  );
}
function CommentBtn({ id }: { id: string }) {
  const session = useSession();
  // TODO make route for comments.
  const router = useRouter();
  const handler = () => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    // likePost.mutate({ postId: id });
  };
  return (
    <button className=" transition-all">
      <MessageCircleMoreIcon className=" w-8 h-8 text-primary" />
    </button>
  );
}
function BookmarkBtn({ id }: { id: string }) {
  const session = useSession();
  // TODO make route for bookmark.
  const router = useRouter();
  const handler = () => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    // likePost.mutate({ postId: id });
  };
  return (
    <button className=" transition-all">
      <Bookmark className=" w-8 h-8 text-primary" />
    </button>
  );
}
