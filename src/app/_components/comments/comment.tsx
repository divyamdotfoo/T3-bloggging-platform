import { type User, type Comment } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getShortDate } from "@/lib/utils";
interface Props {
  user: User;
  comment: Comment;
}
import {
  DotsHorizontalIcon,
  HeartIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Flag } from "lucide-react";
import Link from "next/link";
export function Comment({ user, comment }: Props) {
  return (
    <div className=" flex w-full items-start gap-3">
      <Avatar className=" h-8 w-8">
        <AvatarFallback>{user.name[0]?.toUpperCase()}</AvatarFallback>
        <AvatarImage src={user.avatar ?? ""} />
      </Avatar>
      <div className="flex w-full flex-col items-start gap-1">
        <div className=" flex w-full items-center justify-between">
          <div className=" flex flex-col items-start">
            <Link href={`/${user.username}`} className=" text-xs font-bold">
              {user.name}
            </Link>
            <p className="  text-xs text-muted-foreground">
              {getShortDate(comment.date)}
            </p>
          </div>
          <Popover>
            <PopoverTrigger>
              <Button className="" variant={"ghost"}>
                <DotsHorizontalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-42 py-1">
              <button className=" flex w-full items-center justify-center gap-2 p-4 text-red-600 hover:bg-accent">
                <Flag className="h-3 w-3" color="red" /> <span>Report</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-muted-foreground">{comment.content}</p>
        <div className=" flex items-center gap-2">
          <button>
            <HeartFilledIcon
              className=" h-3 w-3 translate-y-[0.5px]"
              color="red"
            />
          </button>
          <p className=" text-xs">{comment.likes} likes</p>
          <Button variant={"link"} size={"sm"}>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
