'use client';

// File Login.tsx - Trang đăng nhập CourseHub
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import mockData from '@/services/users.json';
import { showToast } from '@/context/useUIStore';

const AUTH_STORAGE_KEY = 'fakeSession';
const USERS_LIST_KEY = 'usersList';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra nếu đã đăng nhập thì chuyển hướng về trang chủ
  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.expiry && Date.now() < session.expiry) {
          router.push('/');
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, [router]);

  // Xử lý đăng nhập
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      showToast('Vui lòng điền đầy đủ email và mật khẩu!', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Tìm user trong localStorage trước, rồi mới đến mock data
    const storedUsers = JSON.parse(localStorage.getItem(USERS_LIST_KEY) || '[]');
    const allUsers = [...storedUsers, ...mockData.users];

    const foundUser = allUsers.find(
      (u: { email: string; password?: string; name: string; role: string; isBanned?: boolean }) => {
        const storedPassword = `123`;
        return u.email === email && storedPassword === password;
      }
    );

    setIsLoading(false);

    if (foundUser) {
      // Kiểm tra user có bị khóa không
      if (foundUser.isBanned === true) {
        showToast('Tài khoản của bạn đã bị khóa. Liên hệ quản trị viên!', 'error');
        return;
      }

      const { ...userWithoutPassword } = foundUser;
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: userWithoutPassword, expiry: expirationTime })
      );
      showToast('Đăng nhập thành công!', 'success');
      router.push('/');
    } else {
      showToast('Sai email hoặc mật khẩu!', 'error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Chào mừng đến CourseHub
              </h1>
              <p className="text-gray-500 mt-2">
                Đăng nhập để truy cập khóa học của bạn
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">hoặc</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <Link
              href="/register"
              className="w-full py-3 rounded-lg font-semibold transition-colors border-2 border-blue-600 text-blue-600 hover:bg-blue-50 block text-center"
            >
              Tạo tài khoản mới
            </Link>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center mb-2">
                <strong>Tài khoản demo:</strong>
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Admin:</strong> admin@coursehub.vn / 123
                </p>
                <p>
                  <strong>Giảng viên:</strong> binh.tran@email.com / 123
                </p>
                <p>
                  <strong>Học viên:</strong> an.nguyen@email.com / 123
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CourseHub. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
