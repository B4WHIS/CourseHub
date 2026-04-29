// Component DataTable hiển thị dữ liệu dạng bảng
import { cn } from '@/utils/cn';
import { Skeleton } from './Skeleton';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data found',
  onRowClick,
}: DataTableProps<T>) {
  // Hiển thị loading skeleton
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex gap-4 pb-3 border-b border-gray-200">
          {columns.map((col) => (
            <Skeleton key={col.key} className="h-4 flex-1" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 py-2">
            {columns.map((col) => (
              <Skeleton key={col.key} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Hiển thị thông báo khi không có dữ liệu
  if (data.length === 0) {
    return <div className="py-12 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-semibold text-gray-700',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'border-b border-gray-100 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-gray-50'
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn('px-4 py-3 text-sm text-gray-900', column.className)}
                >
                  {column.render
                    ? column.render(item)
                    : ((item as Record<string, unknown>)[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
