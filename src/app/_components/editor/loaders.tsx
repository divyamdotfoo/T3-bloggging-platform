import { Skeleton } from "@/components/ui/skeleton";

export function EditorLoader() {
  return (
    <div className=" mx-auto my-4 flex w-full flex-col gap-4 md:w-3/4 lg:w-2/3 ">
      <Skeleton className=" h-72 w-full rounded-md" />
      <Skeleton className=" h-7 w-full rounded-sm" />
      <div className=" flex flex-col gap-2">
        <Skeleton className=" h-5 w-2/3" />
        <Skeleton className=" h-5 w-3/4" />
        <Skeleton className=" h-5 w-1/3" />
      </div>
    </div>
  );
}

export function SidebarLoader() {
  return (
    <div className=" flex h-full flex-col gap-3 lg:w-[250px]">
      <Skeleton className=" mx-auto w-3/4" />
      <Skeleton className=" mx-auto w-3/4" />
      <Skeleton className=" mx-auto w-3/4" />
      <Skeleton className=" mx-auto w-3/4" />
    </div>
  );
}
