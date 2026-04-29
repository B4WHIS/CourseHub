# CourseHub - Nền tảng học trực tuyến

> 🚀 Dự án React SPA được xây dựng với Vite, Tailwind CSS và Zustand

---

## 📋 Giới thiệu

**CourseHub** là nền tảng học trực tuyến (E-learning Platform) hiện đại, cho phép người dùng khám phá, mua và tham gia các khóa học chất lượng cao. Dự án được xây dựng dưới dạng Single Page Application (SPA) với giao diện người dùng mượt mà và trải nghiệm học tập tối ưu.

---

## 👥 Thành viên nhóm

| Họ và tên | MSSV |
|-----------|------|
| Nguyễn Hoàng Thái Bình | 23720251 |

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|-----------|-------|
| ⚛️ **ReactJS** | Thư viện UI hiện đại |
| ⚡ **Vite** | Công cụ build nhanh |
| 🎨 **Tailwind CSS** | Framework CSS tiện lợi |
| 📦 **Zustand** | Quản lý Global State |

---

## ✨ Tính năng nổi bật

- 🔓 **Không cần Backend**: Dự án sử dụng Fake API thông qua `localStorage` để lưu trữ dữ liệu (không yêu cầu JWT/backend)
- 🛒 **Giỏ hàng & Thanh toán**: Quy trình mua khóa học hoàn chỉnh với giỏ hàng, thanh toán và mã giảm giá
- 📚 **Không gian học tập**: Workspace học tập với tính năng theo dõi tiến độ
- 📱 **15 Màn hình Responsive**: Giao diện hoàn toàn tương thích với mọi thiết bị (desktop, tablet, mobile)

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn

### Các bước cài đặt

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các dependencies
npm install

# 3. Chạy development server
npm run dev
```

### Truy cập ứng dụng

Sau khi chạy thành công, truy cập: **http://localhost:5173**

---

## 📂 Cấu trúc dự án

```
frontend/
├── src/
│   ├── components/     # Các component React
│   ├── pages/          # Các trang của ứng dụng
│   ├── context/        # React Context (Zustand stores)
│   ├── services/       # Fake API services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   └── utils/          # Hàm tiện ích
├── public/             # File tĩnh
└── package.json       # Dependencies
```

---

## 📝 License

MIT