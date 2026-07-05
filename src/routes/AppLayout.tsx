import { Newspaper } from "lucide-react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex w-105 shrink-0 flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-primary-foreground/10 rounded flex items-center justify-center">
            <Newspaper size={15} className="text-primary-foreground" />
          </div>
          <span
            className="text-xl font-bold text-primary-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Artigo
          </span>
        </div>

        <div className="relative z-10">
          <blockquote
            className="text-primary-foreground/85 text-2xl leading-snug mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A escrita é a pintura da voz."
          </blockquote>
          <p className="text-primary-foreground/40 text-sm">— Voltaire</p>
          <p className="text-primary-foreground/40 text-xs mt-8">
            Plataforma editorial para quem escreve com intenção.
          </p>
        </div>

        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/4" />
        <div className="absolute top-32 -left-16 w-48 h-48 rounded-full bg-white/3" />
        <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/5" />
      </div>

      <div className="w-full h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
