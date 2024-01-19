import { Skeleton } from "@/components/ui/skeleton";

export function FeedSkeleton() {
  return (
    <div className=" mx-auto mb-4 mt-2 w-full rounded-xl border border-gray-900 p-4 shadow sm:w-[600px] md:w-[650px]">
      <div className=" mb-4 flex w-full items-center gap-2">
        <Skeleton className=" h-12 w-12 rounded-full" />
        <div className=" mb-2 flex flex-col items-start gap-2">
          <Skeleton className=" h-4 w-48" />
          <Skeleton className=" h-3 w-24" />
        </div>
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-5  md:grid-cols-[auto_200px]">
        <div className=" flex flex-col items-start gap-3">
          <Skeleton className="h-5 w-full" />
          <div className=" hidden flex-col items-start gap-2 md:flex">
            <Skeleton className=" h-3 w-[280px]" />
            <Skeleton className=" h-3 w-[295px]" />
            <Skeleton className=" h-3 w-[275px]" />
          </div>
        </div>
        <Skeleton className="h-64 w-full md:h-24 md:w-[200px]" />
      </div>
      <div className=" flex w-full items-center justify-start gap-3">
        <Skeleton className=" h-2 w-6" />
        <Skeleton className=" h-2 w-6" />
        <Skeleton className=" h-2 w-6" />
      </div>
    </div>
  );
}

export function RecommendedUserSkeleton() {
  return (
    <div className="mx-auto rounded-xl border bg-card p-4 shadow sm:w-[600px] md:w-[650px]">
      <Skeleton className=" mb-4 h-4 w-[200px]" />
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((_) => (
          <div key={_} className=" flex items-center gap-4">
            <Skeleton className=" h-8 w-8 rounded-full" />
            <Skeleton className=" h-4 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
