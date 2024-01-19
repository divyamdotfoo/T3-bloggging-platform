"use client";

import { api } from "@/server/react";

export default function Page() {
  const { data } = api.hello.hi.useQuery({ name: "divyam" });
  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
