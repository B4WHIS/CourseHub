# Pre-Commit Checklist cho CourseHub

## Trước khi commit/push code

### 1. Framework & Imports
- [ ] **KHÔNG** import từ Next.js (`next/image`, `next/link`, `next/navigation`, etc.)
- [ ] Import từ `react-router-dom` cho routing
- [ ] Import icons từ `lucide-react`

### 2. Styling
- [ ] Sử dụng Tailwind CSS classes (không CSS Modules)
- [ ] Responsive classes cho mobile (`sm:`, `md:`, `lg:`)
- [ ] Tables có `overflow-x-auto` wrapper
- [ ] Cards dùng grid/flex với responsive breakpoints

### 3. Text & Language
- [ ] Tất cả button labels bằng tiếng Việt
- [ ] Tất cả error messages bằng tiếng Việt
- [ ] Tất cả placeholders bằng tiếng Việt
- [ ] Tất cả code comments bằng tiếng Việt
- [ ] KHÔNG trộn tiếng Anh/tr tiếng Việt

### 4. State & Data
- [ ] Sử dụng `localStorage` cho persistence
- [ ] Các keys đúng: `fakeSession`, `wishlist`, `progress`
- [ ] KHÔNG gọi fetch/axios đến backend API

### 5. Notifications
- [ ] Dùng Toast system thay vì `alert()`
- [ ] Dùng Toast system thay vì `confirm()`
- [ ] Toast messages bằng tiếng Việt

### 6. Routing
- [ ] Dùng `<Link>` từ react-router-dom
- [ ] Dùng `useNavigate()` thay vì `window.location`
- [ ] Protected routes kiểm tra `fakeSession`

### 7. TypeScript
- [ ] Props có interfaces/types
- [ ] KHÔNG có `any` không cần thiết
- [ ] Error handling cho localStorage parse

---

## Quick Test Checklist

### Desktop View
- [ ] Layout không bị break ở 1920px
- [ ] Grid 4 columns hoạt động tốt
- [ ] Tables không cần scroll ngang

### Tablet View
- [ ] Layout không bị break ở 768px
- [ ] Grid 2-3 columns
- [ ] Tables có thể cần scroll ngang

### Mobile View
- [ ] Layout không bị break ở 375px
- [ ] Grid 1 column
- [ ] Tables scroll ngang có scrollbar visible
- [ ] Touch targets đủ lớn (≥44px)

### Functionality
- [ ] Login/Logout hoạt động
- [ ] Wishlist toggle hoạt động
- [ ] Toast notifications hiển thị
- [ ] Navigation giữa pages hoạt động
- [ ] localStorage persistence hoạt động

---

## Common Mistakes to Avoid

### ❌ SAI
```tsx
import Image from 'next/image';
import { useRouter } from 'next/navigation';

<nav className="flex">
  <a href="/">Trang chủ</a>
</nav>

alert('Thành công!');
```

### ✅ ĐÚNG
```tsx
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

<nav className="flex flex-wrap gap-4">
  <Link to="/" className="flex items-center gap-2">
    <Home className="w-4 h-4" />
    <span>Trang chủ</span>
  </Link>
</nav>

showToast({ type: 'success', message: 'Thành công!' });
```

---

## File Naming Conventions

- Components: `PascalCase.tsx` (vd: `CourseCard.tsx`)
- Hooks: `camelCase.ts` (vd: `useAuth.ts`)
- Utils: `camelCase.ts` (vd: `storageUtils.ts`)
- Types: `PascalCase.ts` (vd: `CourseTypes.ts`)