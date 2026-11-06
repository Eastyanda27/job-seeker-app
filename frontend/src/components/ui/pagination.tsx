import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((item, index) => {
        const previous = pages[index - 1];
        const needsGap = previous && item - previous > 1;
        return (
          <React.Fragment key={item}>
            {needsGap && <span className="px-1 text-gray-400">...</span>}
            <Button
              variant={item === page ? "primary" : "outline"}
              size="sm"
              onClick={() => onPageChange(item)}
              className="min-w-8"
            >
              {item}
            </Button>
          </React.Fragment>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

export default Pagination;