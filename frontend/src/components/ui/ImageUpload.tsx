// Component ImageUpload để upload hình ảnh
import { useRef } from 'react';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { showToast } from '@/context/useUIStore';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Xử lý khi chọn file
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra loại file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Chỉ hỗ trợ file JPG, PNG hoặc WebP!', 'error');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Kiểm tra kích thước file (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast('File quá lớn! Kích thước tối đa là 5MB.', 'error');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Đọc file và chuyển thành base64
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      showToast('Upload ảnh thành công!', 'success');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
          'border-gray-300 hover:border-blue-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />

        {value ? (
          // Hiển thị preview hình ảnh
          <div className="relative w-full h-48">
            <Image src={value} alt="Preview" fill sizes="100vw" className="object-cover rounded-lg" loading="lazy" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Hiển thị placeholder upload
          <div className="space-y-2">
            <Upload className="w-10 h-10 mx-auto text-gray-400" />
            <p className="text-sm text-gray-500">Nhấn để chọn hình ảnh</p>
            <p className="text-xs text-gray-400">JPEG, PNG, hoặc WebP (tối đa 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
