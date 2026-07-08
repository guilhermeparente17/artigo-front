import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all duration-200 hover:bg-accent hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const currentPage = i + 1;

        return (
          <button
            key={currentPage}
            onClick={() => goToPage(currentPage)}
            className={`h-10 min-w-10 rounded-lg border text-sm font-semibold transition-all duration-200 ${
              Number(currentPage) === Number(page)
                ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                : "border-border bg-card hover:bg-accent hover:scale-105"
            }`}
          >
            {currentPage}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(Number(page) + 1)}
        disabled={page >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all duration-200 hover:bg-accent hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
