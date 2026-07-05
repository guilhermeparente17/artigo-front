import { cn } from "./utils";

export function Btn({
  className,
  variant = "default",
  size = "md",
  fullWidth,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger";
  size?: "sm" | "md";
  fullWidth?: boolean;
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        size === "sm"
          ? "text-xs px-2.5 py-1.5 rounded"
          : "text-sm px-4 py-2.5 rounded-md",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:opacity-90 active:scale-[.98]",
        variant === "outline" &&
          "border border-border bg-transparent hover:bg-muted text-foreground",
        variant === "ghost" &&
          "hover:bg-muted text-muted-foreground hover:text-foreground",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        fullWidth && "w-full",
        className,
      )}
    />
  );
}
