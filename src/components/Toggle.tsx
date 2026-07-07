import { toast } from "sonner";
import { useThemeStore } from "../store/themeStore";
import { cn } from "./utils";

export function Toggle() {
  const { theme, toggleTheme } = useThemeStore();
  const darkMode = theme === "dark";
  return (
    <button
      onClick={() => {
        toggleTheme();

        toast(darkMode ? "Modo claro ativado" : "Modo escuro ativado", {
          icon: darkMode ? "☀️" : "🌙",
        });
      }}
      className="h-6 w-11 rounded-full bg-muted relative"
    >
      <div
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
          darkMode && "translate-x-5",
        )}
      />
    </button>
  );
}
