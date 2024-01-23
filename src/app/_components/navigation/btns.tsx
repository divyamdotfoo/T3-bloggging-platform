"use client";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  MagicWandIcon,
  BellIcon,
  FileTextIcon,
  BookmarkFilledIcon,
  GearIcon,
  PinLeftIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchBox } from "@/app/_components/search/search-box";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationContent } from "@/app/_components/notifications/content";
import { capitalize, cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { api } from "@/server/react";
import {
  BookMarkedIcon,
  BookmarkCheck,
  Database,
  Loader,
  Settings,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export function SearchBtn({ asFooter }: { asFooter: boolean }) {
  const router = useRouter();
  if (asFooter)
    return (
      <Button
        className=" flex items-center justify-center rounded-full"
        variant={"ghost"}
        size={"icon"}
        onClick={() => router.push("/search")}
      >
        <MagnifyingGlassIcon className=" h-6 w-6" color="#6d28d9" />
      </Button>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "hidden items-center justify-center rounded-full md:flex"
          )}
          variant={"ghost"}
          size={"icon"}
        >
          <MagnifyingGlassIcon className=" h-6 w-6" color="#6d28d9" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-3xl">
        <SearchBox />
      </DialogContent>
    </Dialog>
  );
}

export function Login() {
  return (
    <Button className=" flex items-center gap-2 rounded-2xl font-bold">
      <span className="">Get Started</span>
    </Button>
  );
}

export function Write() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { refetch } = api.draft.checkDraft.useQuery({
    enabled: false,
  });
  const createDraft = api.draft.createDraft.useMutation();
  const handler = async () => {
    if (session.status === "unauthenticated") {
      router.push("/drafts/user");
      return;
    }
    setLoading(true);
    const { data } = await refetch();
    setLoading(false);
    if (data) {
      router.push(`/drafts/${data.id}`);
      return;
    }
    createDraft.mutate(
      {},
      {
        onSuccess: (data) => {
          if (data) router.push(`/drafts/${data.id}`);
          return;
        },
      }
    );
  };
  return (
    <Button
      className=" flex items-center gap-2 rounded-2xl font-semibold"
      onClick={handler}
    >
      {createDraft.isPending || loading ? (
        <Loader className=" h-4 w-4 animate-spin" />
      ) : (
        <MagicWandIcon />
      )}
      <span className=" text-sm">Write</span>
    </Button>
  );
}

export function Notification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"} className=" rounded-full">
          <BellIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NotificationContent />
      </PopoverContent>
    </Popover>
  );
}

export function User({
  avatar,
  id,
  username,
  name,
}: {
  avatar: string;
  id: string;
  username: string;
  name: string;
}) {
  const data = [
    { name: "Profile", href: `/${username ?? id}`, icon: UserCircle2Icon },
    {
      name: "My Drafts",
      href: "/drafts",
      icon: Database,
    },
    {
      name: "Bookmarks",
      href: "/bookmarks",
      icon: BookmarkCheck,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className=" border-2 border-primary">
          <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
          <AvatarImage src={avatar} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className=" p-0 flex flex-col items-start max-w-52 mx-2">
        {data.map((d) => (
          <AvatarLink key={d.name} name={d.name} path={d.href}>
            <d.icon className=" w-5 h-5 text-primary" />
          </AvatarLink>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function AvatarLink({
  path,
  name,
  children,
}: {
  path: string;
  name: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Link
        href={path}
        className=" flex items-center gap-4 w-full px-4 py-2 bg-primary/10 hover:bg-primary/15 transition-all"
      >
        {children}

        <p>{name}</p>
      </Link>
      <Separator />
    </>
  );
}

export function GetStarted() {
  const router = useRouter();
  return (
    <Button
      className=" rounded-2xl"
      onClick={() => router.push("/api/auth/signin")}
    >
      Get started
    </Button>
  );
}

export function PrimaryColorBtn({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(path)}
      variant={"outline"}
      className=" border-primary font-semibold text-primary hover:bg-primary/20"
    >
      {children}
    </Button>
  );
}
