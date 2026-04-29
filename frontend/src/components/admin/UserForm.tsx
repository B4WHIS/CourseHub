// Component form thêm người dùng
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface UserFormData {
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR';
}

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: UserFormData;
  onFormChange: (data: UserFormData) => void;
}

export default function UserForm({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
}: UserFormProps) {
  function handleChange(field: keyof UserFormData, value: string) {
    onFormChange({ ...formData, [field]: value });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm người dùng mới">
      <div className="space-y-4">
        <Input
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <Input
          label="Email"
          placeholder="email@example.com"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="STUDENT">Học viên</option>
            <option value="INSTRUCTOR">Giảng viên</option>
          </select>
        </div>
        <div className="flex gap-3 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Hủy
          </Button>
          <Button onClick={onSubmit} className="flex-1">
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
