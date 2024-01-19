import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}
export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto flex h-fit max-w-6xl items-center justify-center gap-10  px-4 lg:items-start ">
      {children}
    </div>
  );
}
