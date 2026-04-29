// Component form thêm/sửa khóa học
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface CourseFormData {
  title: string;
  description: string;
  price: string;
  level: string;
  category: string;
  duration: string;
  instructor: string;
  published: boolean;
}

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingCourse: CourseFormData | null;
  formData: CourseFormData;
  onFormChange: (data: CourseFormData) => void;
}

interface CourseFormData {
  title: string;
  description: string;
  price: string;
  level: string;
  category: string;
  duration: string;
  instructor: string;
  published: boolean;
}

export default function CourseForm({
  isOpen,
  onClose,
  onSave,
  editingCourse,
  formData,
  onFormChange,
}: CourseFormProps) {
  function handleChange(field: keyof CourseFormData, value: string | boolean) {
    onFormChange({ ...formData, [field]: value });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCourse ? 'Sửa khóa học' : 'Thêm khóa học mới'}
    >
      <div className="space-y-4">
        <Input
          label="Tên khóa học"
          placeholder="Nhập tên khóa học"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Nhập mô tả khóa học"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Giá (VNĐ)"
            placeholder="499000"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
          <Input
            label="Thời lượng"
            placeholder="12 giờ"
            value={formData.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value)}
            >
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="Lập trình Web">Lập trình Web</option>
              <option value="Backend">Backend</option>
              <option value="Khoa học dữ liệu">Khoa học dữ liệu</option>
              <option value="DevOps">DevOps</option>
              <option value="Thiết kế">Thiết kế</option>
            </select>
          </div>
        </div>

        <Input
          label="Giảng viên"
          placeholder="Tên giảng viên"
          value={formData.instructor}
          onChange={(e) => handleChange('instructor', e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            Đăng bán ngay
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Hủy
          </Button>
          <Button onClick={onSave} className="flex-1">
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
}
