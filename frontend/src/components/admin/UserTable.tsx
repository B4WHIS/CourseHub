// Component bảng quản lý người dùng
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STUDENT' | 'INSTRUCTOR';
  status: 'active' | 'banned';
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  onToggleBan: (user: User) => void;
  onDelete: (id: string) => void;
}

function getRoleLabel(role: string): string {
  if (role === 'ADMIN') return 'Quản trị';
  if (role === 'INSTRUCTOR') return 'Giảng viên';
  return 'Học viên';
}

function getRoleColor(role: string): string {
  if (role === 'ADMIN') return 'bg-red-100 text-red-800';
  if (role === 'INSTRUCTOR') return 'bg-purple-100 text-purple-800';
  return 'bg-blue-100 text-blue-800';
}

function getAvatarColor(role: string): string {
  if (role === 'ADMIN') return 'bg-red-100 text-red-600';
  if (role === 'INSTRUCTOR') return 'bg-purple-100 text-purple-600';
  return 'bg-blue-100 text-blue-600';
}

export default function UserTable({ users, onToggleBan, onDelete }: UserTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white border border-gray-200">
      <table className="w-full min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <HeaderCell>Người dùng</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Vai trò</HeaderCell>
            <HeaderCell>Trạng thái</HeaderCell>
            <HeaderCell>Ngày tham gia</HeaderCell>
            <HeaderCell>Hành động</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getAvatarColor(user.role)}`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-700">{user.email}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                >
                  {getRoleLabel(user.role)}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-700">
                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleBan(user)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      user.status === 'active'
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{children}</th>;
}
