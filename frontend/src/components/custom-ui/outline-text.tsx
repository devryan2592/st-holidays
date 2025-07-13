import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface OutlineTextProps {
  fontSize?: string;
  strokeWidth?: number;
  strokeColor?: string;
  children: ReactNode;
  className?: string;
}
const OutlineText = ({
  children,
  fontSize = "text-7xl",
  strokeWidth = 1,
  strokeColor = "var(--foreground)",
  className,
}: OutlineTextProps) => {
  return (
    <span
      className={cn("uppercase text-transparent", fontSize, className)}
      style={{
        WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
};

export default OutlineText;
