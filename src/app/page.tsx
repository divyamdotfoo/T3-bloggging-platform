"use client";

import { api } from "@/server/react";

export default function Page() {
  const users = api.user.getMany.useQuery({ take: 2 });
  return (
    <div>
      {users.data?.map((d) => (
        <p key={d.name}>{d.name}</p>
      ))}
    </div>
  );
}
