# CourseHub - Code Examples

## Component Examples

### 1. CourseCard Component
```tsx
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

export function CourseCard({ id, title, description }: CourseCardProps) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isWishlisted = wishlist.includes(id);

  const toggleWishlist = () => {
    const newWishlist = isWishlisted
      ? wishlist.filter((cId: string) => cId !== id)
      : [...wishlist, id];
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>
      <div className="mt-4 flex gap-2">
        <button 
          onClick={toggleWishlist}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400'
            }`} 
          />
        </button>
        <Link 
          to={`/courses/${id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
```

### 2. Login Form
```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';

export function LoginForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate đơn giản
    if (!email || !password) {
      showToast({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin!'
      });
      return;
    }

    // Mock login - lưu vào localStorage
    const session = {
      userId: '1',
      email,
      name: 'Người dùng',
      role: 'student'
    };
    localStorage.setItem('fakeSession', JSON.stringify(session));

    showToast({
      type: 'success',
      message: 'Đăng nhập thành công!'
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Đăng nhập
      </button>
    </form>
  );
}
```

### 3. Responsive Table
```tsx
export function CourseTable({ courses }: { courses: Course[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tên khóa học
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Giảng viên
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Thời lượng
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="px-4 py-3">{course.title}</td>
              <td className="px-4 py-3">{course.instructor}</td>
              <td className="px-4 py-3">{course.duration}</td>
              <td className="px-4 py-3">
                <Link to={`/courses/${course.id}`}>
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 4. Course Grid (Responsive Cards)
```tsx
export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
}
```

### 5. Protected Route (Auth Check)
```tsx
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const session = localStorage.getItem('fakeSession');

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

### 6. Using Toast in Hook Pattern
```tsx
import { createContext, useContext, useState, useCallback } from 'react';

// Toast Context
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast phải được dùng trong ToastProvider');
  }
  return context;
}
```