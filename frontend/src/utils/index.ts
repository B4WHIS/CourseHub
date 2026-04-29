// Hàm tiện ích cn (classNames) cho Tailwind CSS
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Định dạng giá tiền VND
export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ';
}

// Chuyển cấp độ khóa học sang tiếng Việt
export function getLevelLabel(level: string): string {
  if (level === 'beginner') return 'Cơ bản';
  if (level === 'intermediate') return 'Trung cấp';
  if (level === 'advanced') return 'Nâng cao';
  return level;
}

// Lấy màu badge theo cấp độ
export function getLevelColor(level: string): string {
  if (level === 'beginner') return 'success';
  if (level === 'intermediate') return 'warning';
  if (level === 'advanced') return 'error';
  return 'default';
}
