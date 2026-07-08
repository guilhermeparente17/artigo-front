import type { User } from "../store/authSotre";
import { cn } from "./utils";

export function UAv({
  user,
  size = "md",
}: {
  user: User | null;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const cls = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-14 h-14 text-lg",
  }[size];

  const initials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white shrink-0 select-none bg-black",
        cls,
      )}
    >
      {initials}
    </div>
  );
}
