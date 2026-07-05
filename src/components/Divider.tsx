export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="h-px bg-border my-4" />;
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
