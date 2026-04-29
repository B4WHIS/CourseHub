// Component Pagination điều hướng trang
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Không hiển thị nếu chỉ có 1 trang
  if (totalPages <= 1) return null;

  // Tạo danh sách các trang cần hiển thị
  const getPages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)}>
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'hover:bg-gray-100',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Danh sách trang */}
      <div className="flex items-center gap-1">
        {getPages().map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'w-10 h-10 rounded-lg text-sm font-medium transition-colors',
                currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'hover:bg-gray-100',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
