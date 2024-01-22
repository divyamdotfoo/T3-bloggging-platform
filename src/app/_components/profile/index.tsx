"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getMonthYear, sortActivities } from "@/lib/utils";
import { api } from "@/server/react";
import { Comment, Post } from "@prisma/client";
import {
  CalendarDays,
  Check,
  Linkedin,
  Plus,
  PlusCircle,
  Share,
  Twitter,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { date } from "zod";

export function ProfileContainer(props: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-card md:p-4 px-8 py-4  border-gray-900 md:border max-w-5xl mx-auto md:mt-2 ">
      <div className="w-full md:w-5/6 mx-auto flex flex-col items-start gap-5">
        {props.children}
      </div>
    </div>
  );
}

export function ProfileHeader(props: { children: React.ReactNode }) {
  return (
    <div className=" w-full flex flex-col md:flex-row items-start justify-between gap-4">
      {props.children}
    </div>
  );
}

export function ShareProfileBtn({ username }: { username: string }) {
  const generateTwitterIntent = () => {
    const text = encodeURIComponent(
      `Checkout ${username}'s profile on @blogging. ${
        window ? window.location.origin : null
      }/${username}`
    );
    return `https://twitter.com/intent/tweet?text=${text}`;
  };
  const linkedIn = () => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${
      window ? window.location.origin : null
    }/${username}`;
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} size={"icon"}>
          <Share className=" w-5 h-5 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 max-w-36">
        <Link
          href={generateTwitterIntent()}
          target="_blank"
          className=" flex items-center gap-3 p-2 w-full hover:bg-primary/10"
        >
          <Twitter className=" w-4 h-4 text-primary font-bold" />
          <span className=" font-semibold">Twitter</span>
        </Link>
        <Link
          href={linkedIn()}
          target="_blank"
          className=" flex items-center gap-3 p-2 w-full hover:bg-primary/10"
        >
          <Linkedin className=" w-4 h-4 text-primary font-bold" />
          <span className=" font-semibold">Linkedin</span>
        </Link>
      </PopoverContent>
    </Popover>
  );
}

export function Follow({
  followed,
  userId,
}: {
  followed: boolean;
  userId: string;
}) {
  const [isFollowed, setFollowed] = useState(followed);
  const session = useSession();
  if (session.data?.user.id === userId) return;

  return (
    <div>
      {isFollowed ? (
        <FollowingBtn setFollowed={setFollowed} userId={userId} />
      ) : (
        <FollowBtn setFollowed={setFollowed} userId={userId} />
      )}
    </div>
  );
}

export function FollowBtn({
  setFollowed,
  userId,
}: {
  userId: string;
  setFollowed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const session = useSession();
  const router = useRouter();
  const follow = api.user.follow.useMutation();
  const handler = () => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    setFollowed(true);
    follow.mutate({
      toFollowId: userId,
    });
  };
  return (
    <Button className=" bg-primary flex items-center gap-1" onClick={handler}>
      <Plus className=" w-6 h-6" />
      <span className=" font-semibold text-lg">Follow</span>
    </Button>
  );
}

export function FollowingBtn({
  setFollowed,
  userId,
}: {
  userId: string;
  setFollowed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const sessionn = useSession();
  const router = useRouter();
  const unFollow = api.user.unFollow.useMutation();
  const handler = () => {
    if (sessionn.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    setFollowed(true);
    unFollow.mutate({
      toUnFollowId: userId,
    });
  };
  return (
    <Button
      className=" bg-primary/10 flex items-center gap-1"
      variant={"outline"}
      onClick={handler}
    >
      <Check className=" w-6 h-6" />
      <span className=" font-semibold text-lg">Following</span>
    </Button>
  );
}

export function MemberSince(props: { date: Date }) {
  return (
    <div className=" w-full rounded-md p-2 border border-gray-900 text-muted-foreground font-medium flex items-center justify-center">
      <div className=" flex items-center gap-2">
        <CalendarDays className=" w-5 h-5" />
        <p>Member since {getMonthYear(props.date)}</p>
      </div>
    </div>
  );
}

export function About(props: { about: string }) {
  return (
    <div className=" p-4 bg-primary/10 w-full rounded-md">
      <p className=" text-lg font-bold pb-2">About me</p>
      <ScrollArea className=" w-full min-h-24 max-h-96">
        <p>{props.about}</p>
        {!props.about.length && (
          <p className=" text-muted-foreground font-semibold text-center p-4">
            No about to show.
          </p>
        )}
      </ScrollArea>
    </div>
  );
}
export function TechStack(props: { txt: string }) {
  return (
    <div className=" p-4 bg-primary/10 w-full rounded-md">
      <p className=" text-lg font-bold pb-2">Tech stack</p>
      <ScrollArea className="w-full min-h-24 max-h-96">
        <p>{props.txt}</p>
        {!props.txt.length && (
          <p className=" text-muted-foreground font-semibold text-center p-4">
            No tech stacks to show.
          </p>
        )}
      </ScrollArea>
    </div>
  );
}

export function Available(props: { txt: string }) {
  return (
    <div className=" p-4 bg-primary/10 w-full rounded-md">
      <p className=" text-lg font-bold pb-2">Available for:</p>
      <ScrollArea className=" w-full min-h-24 max-h-96">
        <p>{props.txt}</p>
        {!props.txt.length && (
          <p className=" text-muted-foreground font-semibold text-center p-4">
            No data to display.
          </p>
        )}
      </ScrollArea>
    </div>
  );
}
export type Activity = {
  id: string;
  date: Date;
  title: string;
  type: "post" | "comment";
};
export function RecentActivity(props: {
  posts: Activity[];
  comments: Activity[];
}) {
  const activities = sortActivities(props.posts, props.comments);
  return (
    <div className=" w-full p-4 flex flex-col items-start gap-3">
      {activities.map((a) => (
        <Activity key={a.id} activity={a} />
      ))}
    </div>
  );
}

export function Activity({ activity }: { activity: Activity }) {
  return (
    <>
      <div className=" flex items-start gap-2">
        <p>{getMonthYear(activity.date)}</p>
        <div className=" flex flex-col items-start gap-2">
          {activity.type === "post" ? (
            <p>Wrote an article</p>
          ) : (
            <p>Commented</p>
          )}
          <Link
            className=" font-semibold opacity-80 hover:opacity-100"
            href={`/post/${activity.id}`}
          >
            {activity.title}
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
}
