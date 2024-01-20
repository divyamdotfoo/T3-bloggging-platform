import { Skeleton } from "@/components/ui/skeleton";

export function SearchSkeleton() {
  return (
    <div className=" flex items-start justify-between w-full p-4">
      <div className=" flex flex-col items-start gap-2">
        <Skeleton className=" w-96 h-6" />
        <Skeleton className=" w-80 h-4" />
        <Skeleton className=" w-64 h-3" />
      </div>
      <Skeleton className=" w-24 h-16" />
    </div>
  );
}
