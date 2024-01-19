"use client";

import { api } from "@/server/react";

export default function Page() {
  const { data } = api.hello.hi.useQuery({ name: "divyam" });
  return (
    <div>
      {data?.map((d) => (
        <p key={d.name}>{d.name}</p>
      ))}
    </div>
  );
}
