import { Skeleton } from "@/components/ui/skeleton";

export function LoaderReservations({ count = 5 }: { count?: number }) {
  const reservations = Array.from({ length: count });
  return reservations.map(() => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
}
