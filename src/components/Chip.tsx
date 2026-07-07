export function Chip({ label }: { label: string }) {
  return (
    <span className="bg-background backdrop-blur-sm text-foreground text-[11px] px-2 py-0.5 rounded-full font-medium border border-white/40">
      {label}
    </span>
  );
}
