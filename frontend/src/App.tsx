// File App.tsx - Component chính của ứng dụng với cấu hình React Router
import { Routes, Route } from 'react-router-dom';

// Trang chính
import HomePage from './pages/Home';

// Trang xác thực
import LoginPage from './pages/Login';

// Trang người dùng
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import MyCoursesPage from './pages/MyCourses';

// Trang khóa học
import SearchPage from './pages/Search';
import CourseDetailPage from './pages/CourseDetail';

// Trang giỏ hàng và thanh toán
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';

// Trang yêu thích
import WishlistPage from './pages/Wishlist';

// Trang học tập
import LearnPage from './pages/Learn';

// Trang quản trị
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCoursesPage from './pages/admin/AdminCourses';
import AdminUsersPage from './pages/admin/AdminUsers';
import AdminSettingsPage from './pages/admin/AdminSettings';

// Component bảo vệ route cho Admin
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <Routes>
      {/* Trang chính */}
      <Route path="/" element={<HomePage />} />

      {/* Trang xác thực */}
      <Route path="/login" element={<LoginPage />} />

      {/* Trang người dùng */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/my-courses" element={<MyCoursesPage />} />

      {/* Trang khóa học */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />

      {/* Trang giỏ hàng và thanh toán */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* Trang yêu thích */}
      <Route path="/wishlist" element={<WishlistPage />} />

      {/* Trang học tập */}
      <Route path="/learn/:courseId" element={<LearnPage />} />

      {/* Trang quản trị với Layout bảo vệ */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCoursesPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Trang 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Component trang 404 - Không tìm thấy
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Trang không tìm thấy!</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}

export default App;
