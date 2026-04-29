// File AdminUsers.tsx - Trang quản lý người dùng trong admin
import { useState } from 'react';
import usersData from '@/services/users.json';
import { Button } from '@/components/ui/Button';
import UserTable, { User } from '@/components/admin/UserTable';
import UserStats from '@/components/admin/UserStats';
import UserForm from '@/components/admin/UserForm';
import { showToast } from '@/context/useUIStore';

const initialUsers: User[] = usersData.users as User[];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'STUDENT' as 'STUDENT' | 'INSTRUCTOR',
  });

  function handleAddUser() {
    if (!formData.name || !formData.email) {
      showToast('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'STUDENT' });
    showToast('Đã thêm người dùng mới thành công!', 'success');
  }

  function handleToggleBan(user: User) {
    if (user.status === 'active') {
      if (confirm(`Bạn có chắc muốn khóa tài khoản của "${user.name}"?`)) {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: 'banned' } : u)));
        showToast('Đã khóa tài khoản thành công!', 'success');
      }
    } else {
      if (confirm(`Bạn có chắc muốn mở khóa tài khoản của "${user.name}"?`)) {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: 'active' } : u)));
        showToast('Đã mở khóa tài khoản thành công!', 'success');
      }
    }
  }

  function handleDelete(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter((u) => u.id !== id));
      showToast('Đã xóa người dùng thành công!', 'success');
    }
  }

  return (
    <div className="p-8">
      {/* Tiêu đề trang */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-500 mt-1">Quản lý tài khoản người dùng trong hệ thống</p>
        </div>

        {/* Nút thêm người dùng */}
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon />
          Thêm người dùng
        </Button>
      </div>

      {/* Thống kê số lượng người dùng */}
      <UserStats users={users} />

      {/* Bảng danh sách người dùng */}
      <UserTable users={users} onToggleBan={handleToggleBan} onDelete={handleDelete} />

      {/* Modal thêm người dùng */}
      <UserForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
        formData={formData}
        onFormChange={setFormData}
      />
    </div>
  );
}

// Icon dấu cộng
function PlusIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
