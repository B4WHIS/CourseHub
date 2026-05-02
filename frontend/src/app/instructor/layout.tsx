'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, PlusCircle, Home } from 'lucide-react';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/instructor', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { href: '/instructor/courses', label: 'Khóa học của tôi', icon: BookOpen },
    { href: '/instructor/create', label: 'Tạo khóa học mới', icon: PlusCircle },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">Khu vực giảng viên</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
