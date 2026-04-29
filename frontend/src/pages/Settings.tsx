// File Settings.tsx - Trang cài đặt tài khoản
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from '@/context/useUIStore';

const AUTH_STORAGE_KEY = 'fakeSession';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedSession) {
      navigate('/login');
      return;
    }

    try {
      const session = JSON.parse(storedSession);
      if (session.expiry && Date.now() > session.expiry) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        navigate('/login');
        return;
      }

      const storedUser = session.user;
      if (!storedUser) {
        navigate('/login');
        return;
      }
      setUserEmail(storedUser.email);
      setName(storedUser.name);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  function handleSaveProfile() {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedSession) {
      const session = JSON.parse(storedSession);
      session.user = { ...session.user, name };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      showToast('Cập nhật thông tin thành công!', 'success');
    }
  }

  function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      showToast('Mật khẩu mới không khớp!', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Mật khẩu mới phải có ít nhất 6 ký tự!', 'error');
      return;
    }
    showToast('Đổi mật khẩu thành công!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Đang kiểm tra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Cài đặt tài khoản</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Thông tin cá nhân
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Đổi mật khẩu
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CourseHub. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
