import { LayoutDashboard, Newspaper, Users } from "lucide-react";
import { cn } from "./utils";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const nav = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={15} />,
      key: "dashboard",
    },
    { label: "Usuários", icon: <Users size={15} />, key: "users" },
  ];
  return (
    <aside className="w-66 shrink-0 flex flex-col border-r border-border bg-card h-screen sticky top-0">
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <Newspaper size={13} className="text-primary-foreground" />
          </div>
          <span
            className="text-lg font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Artigo
          </span>
        </div>
      </div>

      <nav className="flex-1 p-2.5 space-y-3">
        {nav.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveItem(item.key)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeItem === item.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* {user && (
        <div className="p-2.5 border-t border-border space-y-0.5">
          <button
            onClick={() => setActive("profile")}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors",
              active === "profile"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <UAv user={user} size="xs" />
            <div className="flex-1 min-w-0 text-left">
              <div
                className={cn(
                  "text-xs font-semibold truncate",
                  active === "profile"
                    ? "text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {user.name.split(" ")[0]}
              </div>
              <div
                className={cn(
                  "text-[10px]",
                  active === "profile"
                    ? "text-primary-foreground/60"
                    : "text-muted-foreground",
                )}
              >
                {darkMode ? "🌙 Escuro" : "☀️ Claro"}
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              logout();
              toast.info("Sessão encerrada.");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
          >
            <LogOut size={13} /> Sair
          </button>
        </div>
      )} */}
    </aside>
  );
};

export default Sidebar;
