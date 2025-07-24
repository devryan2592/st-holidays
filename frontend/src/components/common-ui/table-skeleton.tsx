import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 10,
  columns = 6,
  className,
}: TableSkeletonProps) {
  return (
    <div className={className}>
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-4 w-full" />
          ))}
        </div>
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-12 gap-4 p-4 ">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className="h-4 w-full bg-muted-foreground"
                  style={{
                    // Make first column slightly wider
                    width: colIndex === 0 ? '80%' : '100%',
                    // Make last column shorter
                    maxWidth: colIndex === columns - 1 ? '50%' : '100%',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
