import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { api } from "@/server/react";
// should i use zustand to make the user state more accessible to all the components??
export function CommentInput() {
  const session = useSession();
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const [showPopover, setShowPopover] = useState(true);
  const handler = () => {
    if (session.status === "unauthenticated") {
      setShowPopover(true);
    }
  };
  return (
    <AnimatePresence>
      {!active && (
        <div
          className=" flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-900 p-2 shadow focus:border-2 focus:border-primary"
          onClick={() => setActive((p) => !p)}
        >
          <Avatar className=" flex items-center justify-center border border-gray-800">
            {session.data?.user ? (
              <>
                <AvatarFallback>
                  {session.data?.user.name
                    ? session.data.user.name[0]?.toUpperCase()
                    : ""}
                </AvatarFallback>
                <AvatarImage src={session.data?.user.avatar ?? ""} />
              </>
            ) : (
              <User />
            )}
          </Avatar>
          <p className=" text-xs text-muted-foreground">
            Add a thoughtful comment
          </p>
        </div>
      )}
      {active && (
        <motion.div
          className=" w-full rounded-xl border border-border p-4 shadow focus:border-primary"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
        >
          <textarea
            value={text}
            autoFocus={true}
            onChange={(e) => setText(e.target.value)}
            className=" bg-red h-full  w-full resize-none border-none bg-background p-2 outline-none focus:border-none focus:outline-none"
            spellCheck={false}
            placeholder="Add a thoughtfull comment ...."
          />
          <div className=" flex items-center justify-between">
            <Button variant={"link"}>Code of conduct</Button>
            <div className=" flex items-center gap-2">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setActive(false);
                  setText("");
                }}
              >
                Cancel
              </Button>
              <Button variant={text.trim().length ? "default" : "destructive"}>
                Comment
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
