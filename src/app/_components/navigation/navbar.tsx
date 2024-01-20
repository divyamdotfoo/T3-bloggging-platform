import Link from "next/link";
import { Navlink } from "./navlink";
import {
  GetStarted,
  Login,
  Notification,
  SearchBtn,
  User,
  Write,
} from "./btns";
import { Aside } from "./aside";
import { getServerAuthSession } from "@/server/auth";
import { Logo } from "../others";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <div className="border-b border-border">
      <div className=" mx-auto flex max-w-7xl items-center justify-between px-4 pb-3 pt-3">
        <div className=" flex items-center gap-2">
          <Aside />
          <Link
            href={"/"}
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <Logo />
            <span className=" hidden md:block">Blogging</span>
          </Link>
        </div>
        <div className=" flex items-center gap-2">
          <Navlink name={"My Feed"} path="/" />
          <Navlink name={"Discussions"} path="/discussions" />
          <Navlink name={"Explore"} path="/explore" />
        </div>
        <div className=" flex items-center gap-2">
          <SearchBtn asFooter={false} />
          <Write />
          {session && <Notification />}
          {session && (
            <User
              username={session.user.username}
              name={session.user.name!}
              avatar={session.user.avatar}
              id={session.user.id}
            />
          )}
          {!session && <GetStarted />}
        </div>
      </div>
    </div>
  );
}
