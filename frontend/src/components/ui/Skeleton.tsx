// Component Skeleton loading placeholder
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 pb-3 border-b border-gray-200">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-20" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6 text-center max-w-md">{description}</p>}
      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <a
            href={actionHref}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {actionLabel}
          </a>
        ) : (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
