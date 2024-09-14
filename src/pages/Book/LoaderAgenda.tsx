import { Skeleton } from "@/components/ui/skeleton";

export function AgendaSkeleton() {
  const columns = 3;
  const rows = 12;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        <Skeleton className="h-8 w-48" />
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(columns)].map((_, colIndex) => (
          <div key={colIndex} className="space-y-4">
            <Skeleton className="h-6 w-24 mb-2" /> {/* Column header */}
            {[...Array(rows)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" /> {/* Time slot */}
                <Skeleton className="h-12 w-full rounded-md" />{" "}
                {/* Event slot */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
