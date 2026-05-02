// Component form thêm/sửa khóa học
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { showToast } from '@/context/useUIStore';

// Zod schema cho form khóa học
const courseSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  price: z.coerce.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  duration: z.string().min(1, 'Vui lòng nhập thời lượng'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.string().min(1, 'Vui lòng chọn danh mục'),
  instructor: z.string().min(2, 'Tên giảng viên phải có ít nhất 2 ký tự'),
  published: z.boolean(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CourseFormData) => void;
  editingCourse: CourseFormData | null;
  formData?: CourseFormData;
  onFormChange?: (data: CourseFormData) => void;
}

export default function CourseForm({
  isOpen,
  onClose,
  onSave,
  editingCourse,
}: CourseFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      duration: '',
      level: 'beginner',
      category: 'Lập trình Web',
      instructor: '',
      published: false,
    },
  });

  // Khi mở modal hoặc đổi khóa học đang sửa, reset form với dữ liệu mới
  useEffect(() => {
    if (isOpen) {
      if (editingCourse) {
        reset(editingCourse);
      } else {
        reset({
          title: '',
          description: '',
          price: 0,
          duration: '',
          level: 'beginner',
          category: 'Lập trình Web',
          instructor: '',
          published: false,
        });
      }
    }
  }, [isOpen, editingCourse, reset]);

  const onSubmit = handleSubmit((data) => {
    onSave(data);
    showToast(editingCourse ? 'Đã cập nhật khóa học!' : 'Đã thêm khóa học mới!', 'success');
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCourse ? 'Sửa khóa học' : 'Thêm khóa học mới'}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
            {...register('title')}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Nhập mô tả khóa học"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Giá (VNĐ)"
              placeholder="499000"
              type="number"
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Thời lượng"
              placeholder="12 giờ"
              {...register('duration')}
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('level')}
            >
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
            {errors.level && (
              <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('category')}
            >
              <option value="Lập trình Web">Lập trình Web</option>
              <option value="Backend">Backend</option>
              <option value="Khoa học dữ liệu">Khoa học dữ liệu</option>
              <option value="DevOps">DevOps</option>
              <option value="Thiết kế">Thiết kế</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            label="Giảng viên"
            placeholder="Tên giảng viên"
            {...register('instructor')}
          />
          {errors.instructor && (
            <p className="text-red-500 text-xs mt-1">{errors.instructor.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            {...register('published')}
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            Đăng bán ngay
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1">
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
