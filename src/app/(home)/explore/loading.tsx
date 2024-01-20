import { Skeleton } from "@/components/ui/skeleton";
export default function LoadingFallback() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <Skeleton className=" h-12" />
      <Skeleton className=" h-12" />
      <Skeleton className=" h-12" />
      <Skeleton className=" h-12" />
      <Skeleton className=" h-12" />
      <Skeleton className=" h-12" />
    </div>
  );
}
