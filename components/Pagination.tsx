import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className="flex items-center justify-center gap-2 mt-8 pt-6 border-t"
      style={{ borderColor: 'var(--folder-border-light)' }}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        style={{
          backgroundColor: currentPage === 1 ? 'transparent' : 'var(--folder-bg-light)',
          color: 'var(--folder-text-medium)',
          border: '1px solid var(--folder-border-light)',
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${page}`}
                className="px-3 py-2 text-sm"
                style={{ color: 'var(--folder-text-light)' }}
              >
                •••
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              type="button"
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className="relative px-4 py-2 rounded-md transition-all hover:scale-105"
              style={{
                backgroundColor: isActive
                  ? 'var(--folder-turquoise-dark)'
                  : 'var(--folder-bg-light)',
                color: isActive ? 'var(--folder-white)' : 'var(--folder-text-medium)',
                border: '1px solid',
                borderColor: isActive
                  ? 'var(--folder-turquoise-dark)'
                  : 'var(--folder-border-light)',
                minWidth: '40px',
              }}
            >
              <span className="text-sm">{pageNum}</span>

              {/* Hand-drawn underline for active page */}
              {isActive && (
                <svg
                  className="absolute left-1/2 bottom-1 opacity-50"
                  style={{ transform: 'translateX(-50%)' }}
                  width="24"
                  height="2"
                  viewBox="0 0 24 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Active page indicator</title>
                  <path
                    d="M 0 1 Q 6 0.5, 12 1 T 24 1"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    style={{ color: 'var(--folder-white)' }}
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        style={{
          backgroundColor: currentPage === totalPages ? 'transparent' : 'var(--folder-bg-light)',
          color: 'var(--folder-text-medium)',
          border: '1px solid var(--folder-border-light)',
        }}
      >
        <span className="text-sm">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
