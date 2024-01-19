"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "./root";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import React, { useState } from "react";
import { getUrl, transformer } from "./utils";
export const api = createTRPCReact<AppRouter>();

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
      transformer: transformer,
    })
  );
  return (
    <api.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
