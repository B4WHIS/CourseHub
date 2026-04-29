# CourseHub - Detailed Architecture Reference

## 1. Framework & Architecture

### Công nghệ
- **React SPA** thuần túy với **Vite**
- **TypeScript** cho type safety
- **TUYỆT ĐỐI KHÔNG sử dụng Next.js**

### Cấm tuyệt đối:
```tsx
// ❌ KHÔNG ĐƯỢC DÙNG
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// App router, server components, v.v.
```

### Được phép:
```tsx
// ✅ DÙNG THẾ NÀY
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'lucide-react'; // hoặc thẻ img thường
```

---

## 2. Routing

- Thư viện: `react-router-dom` (version 6+)
- Routes centralized trong `App.tsx` hoặc thư mục `/router`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Ví dụ navigation
const navigate = useNavigate();
navigate('/courses');
navigate(`/courses/${courseId}`);

// Link usage
<Link to="/courses" className="text-blue-500">Danh sách khóa học</Link>
```

---

## 3. Styling & UI

### Tailwind CSS
- Cấu hình qua `tailwind.config.js`
- Sử dụng utility classes cho tất cả styling
- **KHÔNG** dùng CSS Modules, Styled Components

### Icons (lucide-react)
```tsx
import { 
  Home, 
  User, 
  Search, 
  Heart, 
  Bell, 
  Menu, 
  X, 
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle
} from 'lucide-react';

// Sử dụng
<Heart className="w-5 h-5 text-gray-500" />
<Heart className="w-5 h-5 fill-red-500 text-red-500" /> // filled state
```

### Responsive Design

**Tables - Horizontal Scroll:**
```tsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* table content */}
  </table>
</div>
```

**Cards - Flex/Grid Stacking:**
```tsx
// Grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Card items */}
</div>

// Hoặc flex với wrap
<div className="flex flex-wrap gap-4">
  {/* Card items */}
</div>
```

---

## 4. State Management & Data

### localStorage Keys
| Key | Mục đích | Type |
|-----|----------|------|
| `fakeSession` | Auth session | `{ userId, email, name, role }` |
| `wishlist` | Danh sách yêu thích | `string[]` (course IDs) |
| `progress` | Tiến độ học tập | `{ [courseId]: number }` |

### Helpers Pattern
```tsx
// Tạo helper functions cho localStorage
const getSession = () => {
  const data = localStorage.getItem('fakeSession');
  return data ? JSON.parse(data) : null;
};

const setSession = (session: Session) => {
  localStorage.setItem('fakeSession', JSON.stringify(session));
};

const removeSession = () => {
  localStorage.removeItem('fakeSession');
};
```

### KHÔNG gọi API backend
- Mọi data đều mock client-side
- Tạo mock data files nếu cần
- Simulate delays với `setTimeout` nếu muốn

---

## 5. Language Requirement

### Tất cả text bằng tiếng Việt

**UI Elements:**
```tsx
<button>Đăng nhập</button>
<button>Đăng ký</button>
<h1>Danh sách khóa học</h1>
<span>Không tìm thấy kết quả</span>
```

**Error Messages:**
```tsx
"Email không hợp lệ"
"Mật khẩu phải có ít nhất 8 ký tự"
"Đăng nhập thất bại. Vui lòng thử lại."
```

**Placeholders:**
```tsx
<input placeholder="Nhập email của bạn" />
<input placeholder="Nhập mật khẩu" />
<textarea placeholder="Viết bình luận của bạn..." />
```

**Code Comments:**
```tsx
// Xử lý đăng nhập
const handleLogin = () => { ... }

// Lấy danh sách khóa học từ localStorage
const getCourses = () => { ... }
```

---

## 6. Notifications (Toast System)

### TUYỆT ĐỐI KHÔNG dùng alert()
```tsx
// ❌ KHÔNG BAO GIỜ
alert('Thành công!');
confirm('Bạn có chắc muốn xóa?');
```

### Sử dụng Toast Provider
```tsx
import { useToast } from '@/contexts/ToastContext';

// Trong component
const { showToast } = useToast();

showToast({
  type: 'success',
  message: 'Đăng nhập thành công!'
});

showToast({
  type: 'error', 
  message: 'Có lỗi xảy ra. Vui lòng thử lại.'
});
```

### Toast Types
- `success` - Thành công (màu xanh lá)
- `error` - Lỗi (màu đỏ)
- `warning` - Cảnh báo (màu vàng)
- `info` - Thông tin (màu xanh dương)