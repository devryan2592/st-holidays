import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  error: Error | string | null;
  className?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorDisplay({
  error,
  className,
  onRetry,
  retryText = "Try again",
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : error || "An unexpected error occurred";
  
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center",
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <h3 className="font-medium">Something went wrong</h3>
      </div>
      <p className="text-sm text-muted-foreground">{errorMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
