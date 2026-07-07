export const SummaryCardsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-5 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="w-8 h-8 rounded-lg bg-muted" />
          </div>

          <div className="h-8 w-16 rounded bg-muted" />
        </div>
      ))}
    </>
  );
};
