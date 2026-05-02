'use client';
/* eslint-disable react/no-unescaped-entities */

// File AdminDashboard.tsx - Trang Dashboard quản trị với thống kê thực
import { useState, useEffect } from 'react';
import coursesData from '@/services/courses.json';
import usersData from '@/services/users.json';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COURSES_KEY = 'admin_courses';
const USERS_KEY = 'usersList';

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

interface DashboardCourse {
  id: string;
  title: string;
  price: number;
  enrollmentCount: number;
  approved?: boolean;
}

export default function AdminDashboard() {
  // State lưu thống kê
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingCourses, setPendingCourses] = useState(0);
  const [courses, setCourses] = useState<DashboardCourse[]>([]);
  const [userRoleData, setUserRoleData] = useState<{ name: string; value: number }[]>([]);

  // Đọc dữ liệu từ localStorage khi trang load
  useEffect(() => {
    // Đọc danh sách users
    let users: unknown[] = [];
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
      } catch {
        users = usersData.users;
      }
    } else {
      users = usersData.users;
    }
    setTotalUsers(users.length);

    // Đọc danh sách courses
    let loadedCourses: DashboardCourse[] = [];
    const storedCourses = localStorage.getItem(COURSES_KEY);
    if (storedCourses) {
      try {
        loadedCourses = JSON.parse(storedCourses);
      } catch {
        loadedCourses = coursesData.courses as DashboardCourse[];
      }
    } else {
      loadedCourses = coursesData.courses as DashboardCourse[];
    }
    setCourses(loadedCourses);
    setTotalCourses(loadedCourses.length);

    // Đếm khóa học chờ duyệt (status = false)
    const pending = loadedCourses.filter((c) =>
      c.approved === false || c.approved === undefined
    ).length;
    setPendingCourses(pending);

    // Tính tổng doanh thu (giả lậm: mỗi khóa học = price * enrollmentCount)
    const revenue = loadedCourses.reduce((sum: number, c) => {
      const price = c.price || 0;
      const count = c.enrollmentCount || 0;
      return sum + price * count;
    }, 0);
    setTotalRevenue(revenue);

    // Thống kê người dùng theo role
    const roleCount: Record<string, number> = { Student: 0, Instructor: 0, Admin: 0 };
    (users as { role?: string }[]).forEach((u) => {
      const r = (u.role || 'student').toLowerCase();
      if (r === 'admin') roleCount.Admin++;
      else if (r === 'instructor') roleCount.Instructor++;
      else roleCount.Student++;
    });
    setUserRoleData([
      { name: 'Học viên', value: roleCount.Student },
      { name: 'Giảng viên', value: roleCount.Instructor },
      { name: 'Quản trị', value: roleCount.Admin },
    ]);
  }, []);

  // Tính data cho biểu đồ doanh thu
  const chartData = courses.map((c) => ({
    name: c.title.length > 20 ? c.title.substring(0, 20) + '...' : c.title,
    revenue: (c.price || 0) * (c.enrollmentCount || 0),
  }));

  return (
    <div className="p-8">
      {/* Tiêu đề trang */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển</h1>
        <p className="text-gray-500 mt-1">Thống kê hệ thống CourseHub</p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card tổng người dùng */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng người dùng</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card tổng khóa học */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng khóa học</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">{totalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card khóa học chờ duyệt */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Chờ duyệt</p>
              <p className="text-2xl font-bold mt-1 text-yellow-600">{pendingCourses}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card tổng doanh thu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng doanh thu</p>
              <p className="text-2xl font-bold mt-1 text-gray-900">{formatPrice(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh thu theo khóa học */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo khóa học</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatPrice(Number(value))} />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ phân bố người dùng theo role */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố người dùng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
                <Cell fill="#8B5CF6" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bảng tóm tắt khóa học */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt khóa học</h2>
          <div className="space-y-3">
            {courses.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.title}</p>
                  <p className="text-xs text-gray-500">
                    {c.enrollmentCount || 0} học viên × {formatPrice(c.price || 0)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-blue-600 ml-4">
                  {formatPrice((c.price || 0) * (c.enrollmentCount || 0))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thông báo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn sử dụng</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Vào mục "Duyệt khóa học" để phê duyệt các khóa học mới</li>
          <li>• Vào mục "Quản lý người dùng" để quản lý tài khoản</li>
          <li>• Chỉ khóa học "Đã duyệt" mới hiển thị cho học viên</li>
        </ul>
      </div>
    </div>
  );
}
