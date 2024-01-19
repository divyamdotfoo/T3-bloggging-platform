"use client";

import { api } from "@/server/react";

export default function Page() {
  const users = api.user.getMany.useQuery({ take: 2 });
  const draft = api.user.checkDraft.useQuery({});
  return (
    <div>
      {users.data?.map((d) => (
        <p key={d.name}>{d.name}</p>
      ))}
      <p>{draft.isError ? "error" : "why not error"}</p>
    </div>
  );
}
