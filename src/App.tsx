import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
dayjs.locale("pt-br");

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </>
  );
}

export default App;
