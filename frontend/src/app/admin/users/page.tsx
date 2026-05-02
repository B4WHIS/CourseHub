'use client';

// File AdminUsers.tsx - Trang quản lý người dùng với chức năng khóa tài khoản
import { useState, useEffect } from 'react';
import usersData from '@/services/users.json';
import { showToast } from '@/context/useUIStore';

const USERS_KEY = 'usersList';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned?: boolean;
}

function getRoleLabel(role: string) {
  if (role === 'admin' || role === 'ADMIN') return 'Quản trị';
  if (role === 'instructor' || role === 'INSTRUCTOR') return 'Giảng viên';
  if (role === 'student' || role === 'STUDENT') return 'Học viên';
  return role;
}

function getRoleBadgeClass(role: string) {
  const roleLower = role?.toLowerCase();
  if (roleLower === 'admin') return 'bg-purple-100 text-purple-700';
  if (roleLower === 'instructor') return 'bg-blue-100 text-blue-700';
  return 'bg-green-100 text-green-700';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'banned'>('all');

  // Đọc dữ liệu từ localStorage khi trang load
  useEffect(() => {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch {
        setUsers(usersData.users);
      }
    } else {
      setUsers(usersData.users);
    }
  }, []);

  // Lọc người dùng
  const filteredUsers = users.filter((user) => {
    if (filter === 'banned') return user.isBanned === true;
    return true;
  });

  // Khóa tài khoản
  function handleBan(userId: string) {
    if (confirm('Bạn có chắc chắn muốn khóa tài khoản này?')) {
      const updatedUsers = users.map((u) => {
        if (u.id === userId) {
          return { ...u, isBanned: true };
        }
        return u;
      });
      setUsers(updatedUsers);
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      showToast('Đã khóa tài khoản!', 'success');
    }
  }

  // Mở khóa tài khoản
  function handleUnban(userId: string) {
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return { ...u, isBanned: false };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    showToast('Đã mở khóa tài khoản!', 'success');
  }

  // Xóa người dùng
  function handleDelete(userId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      showToast('Đã xóa người dùng!', 'success');
    }
  }

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p className="text-gray-500 mt-1">Quản lý tài khoản người dùng</p>
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Tất cả ({users.length})
        </button>
        <button
          onClick={() => setFilter('banned')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'banned' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Bị khóa ({users.filter((u) => u.isBanned).length})
        </button>
      </div>

      {/* Bảng người dùng */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Không có người dùng nào</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Người dùng</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Vai trò</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${getRoleBadgeClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.isBanned === true ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                        Bị khóa
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        Hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {user.isBanned === true ? (
                        <button
                          onClick={() => handleUnban(user.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                        >
                          Mở khóa
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBan(user.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                        >
                          Khóa
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
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
      )}
    </div>
  );
}
