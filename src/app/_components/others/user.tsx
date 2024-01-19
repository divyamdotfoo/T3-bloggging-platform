"use client";

import { User } from "@prisma/client";
import { Check, UserPlus2Icon } from "lucide-react";
import millify from "millify";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SmallUserCard({ u }: { u: User }) {
  const [isFollowed, setFollowed] = useState(false);
  const session = useSession();
  const followHandler = () => {
    if ((session.status = "unauthenticated")) {
      redirect("/api/auth/signin");
    }
    console.log("fjjdsf");
    setFollowed((p) => !p);
  };
  return (
    <div
      className=" flex items-center justify-between gap-2 rounded-md bg-primary/10 p-2"
      key={u.id}
    >
      <div className=" flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{u.name[0]}</AvatarFallback>
          <AvatarImage src={u.avatar ?? ""} />
        </Avatar>
        <div>
          <p className=" font-semibold">{u.name}</p>
          <p className=" text-sm font-medium text-muted-foreground">
            {millify(u.followersNo || 4389).toLowerCase()} followers
          </p>
        </div>
      </div>
      <button
        className=" flex items-center justify-center rounded-full bg-background p-2"
        onClick={followHandler}
      >
        {!isFollowed && <UserPlus2Icon className="text-primary" />}
        {isFollowed && <Check className=" text-primary" />}
      </button>
    </div>
  );
}
