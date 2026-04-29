// Component ImageUpload để upload hình ảnh
import { useRef } from 'react';
import { cn } from '@/utils/cn';
import { Upload, X } from 'lucide-react';

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <div className="relative">
            <img src={value} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
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
            <p className="text-sm text-gray-500">Drag and drop an image, or click to browse</p>
            <p className="text-xs text-gray-400">JPEG, PNG, or WebP (max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
