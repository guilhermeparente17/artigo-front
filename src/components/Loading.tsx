import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Carregando..." }: LoadingProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle size={40} className="animate-spin text-primary" />

        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
