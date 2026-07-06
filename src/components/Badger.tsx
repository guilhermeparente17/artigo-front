import { cn } from "./utils";

export function Badge({
  children,
  red,
  className,
}: {
  children: React.ReactNode;
  red?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        red ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
