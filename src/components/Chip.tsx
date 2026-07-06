export function Chip({ label }: { label: string }) {
  return (
    <span className="bg-white/85 backdrop-blur-sm text-foreground text-[11px] px-2 py-0.5 rounded-full font-medium border border-white/40">
      {label}
    </span>
  );
}
