import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "./utils";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card rounded-xl shadow-2xl p-6 max-h-[92vh] overflow-y-auto",
            wide ? "w-170 max-w-[95vw]" : "w-115 max-w-[95vw]",
          )}
        >
          {title && (
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="text-base font-semibold text-foreground">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted">
                  <X size={16} />
                </button>
              </Dialog.Close>
            </div>
          )}
          {!title && (
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted z-10">
                <X size={16} />
              </button>
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
