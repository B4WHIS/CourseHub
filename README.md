# CourseHub - Nền tảng học trực tuyến

**CourseHub** là một nền tảng e-learning (chợ khóa học trực tuyến) được xây dựng bằng Next.js, cho phép học viên tìm kiếm, mua và học các khóa học; giảng viên tạo và quản lý khóa học; quản trị viên giám sát toàn bộ hệ thống.

> Đây là đồ án **Frontend** — dữ liệu được mô phỏng qua file JSON + localStorage, không có backend thật.

---

## Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand + React Context |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Toast | react-hot-toast |
| Testing | Vitest + Testing Library |

---

## Tính năng chính

### Học viên
- Trang chủ với banner, thống kê, danh sách khóa học nổi bật
- Tìm kiếm khóa học (theo từ khóa, danh mục, cấp độ) + phân trang
- Xem chi tiết khóa học
- Giỏ hàng + mã giảm giá (`GIAM20`, `COURSEHUB`, `WELCOME10`, `NEWYEAR2024`)
- Thanh toán mô phỏng
- Khóa học đã mua
- Học trực tuyến (video, bài giảng, câu hỏi trắc nghiệm, theo dõi tiến độ)
- Danh sách yêu thích
- Trang cá nhân & cài đặt

### Giảng viên
- Dashboard thống kê (khóa học, học viên, đánh giá, thu nhập)
- Quản lý khóa học của mình
- Tạo khóa học mới

### Quản trị viên
- Dashboard tổng quan (biểu đồ cột + tròn)
- Quản lý khóa học (duyệt/từ chối/xóa)
- Quản lý người dùng (cấm/bỏ cấm/xóa)
- Cài đặt hệ thống

---

## Cấu trúc thư mục

```
frontend/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── admin/         # Trang quản trị
│   │   ├── instructor/    # Trang giảng viên
│   │   ├── learn/         # Trang học
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── login/
│   │   ├── register/
│   │   ├── search/
│   │   ├── my-courses/
│   │   ├── wishlist/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── about/
│   ├── components/        # UI components
│   │   ├── ui/            # Base UI (Button, Modal, Input, ...)
│   │   ├── layout/        # Navbar, Footer
│   │   ├── features/      # HeroSection, CourseCard, ...
│   │   └── admin/         # Admin-specific components
│   ├── context/           # CartContext, Zustand stores
│   ├── hooks/             # useAuth, useFetch, useDebounce
│   ├── services/          # Mock data (JSON)
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── public/
```

---

## Cài đặt & Chạy

**Yêu cầu:** Node.js 18+

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

### Các lệnh khác

| Lệnh | Mô tả |
|------|-------|
| `npm run build` | Build production |
| `npm run start` | Chạy production server |
| `npm run lint` | Kiểm tra ESLint |
| `npm run type-check` | Kiểm tra TypeScript |
| `npm test` | Chạy unit test |

---

## Tài khoản demo

Tất cả mật khẩu đều là `123`.

| Vai trò | Email |
|---------|-------|
| Admin | admin@coursehub.vn |
| Instructor | binh.tran@email.com |
| Student | an.nguyen@email.com |

---

## Ghi chú

- Dự án **không cần** biến môi trường — chạy được ngay sau khi cài dependencies
- Ảnh khóa học được lấy từ [Unsplash](https://images.unsplash.com)
- Dữ liệu khởi tạo nằm trong `frontend/src/services/*.json`
