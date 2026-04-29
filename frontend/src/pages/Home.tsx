// File Home.tsx - Trang chủ CourseHub
// Component chính của trang chủ

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/features/HeroSection';
import StatsSection from '@/components/features/StatsSection';
import WhyUsSection from '@/components/features/WhyUsSection';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/features/CourseCard';
import LoadingSpinner from '@/components/features/LoadingSpinner';

// Data
import coursesData from '@/services/courses.json';

// Key lưu trữ session trong localStorage
const AUTH_STORAGE_KEY = 'fakeSession';

// Kiểu dữ liệu người dùng giả lập
interface FakeUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Kiểu dữ liệu khóa học
interface Course {
  id: string;
  title: string;
  thumbnail: string;
  level: string;
  category: string;
  description: string;
  enrollmentCount: number;
  price: number;
  duration: string;
}

// Dữ liệu khóa học và thống kê từ file JSON
const courses: Course[] = coursesData.courses;
const stats = coursesData.stats;

export default function HomePage() {
  const [user, setUser] = useState<FakeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Đọc thông tin user từ localStorage khi component được mount
  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);

        // Kiểm tra phiên đăng nhập đã hết hạn chưa
        if (session.expiry && Date.now() > session.expiry) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setUser(null);
        } else {
          setUser(session.user || null);
        }
      } catch {
        // Xử lý khi dữ liệu localStorage bị lỗi
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
      }
    }

    // Hoàn thành loading
    setIsLoading(false);
  }, []);

  // Hiển thị spinner khi đang tải dữ liệu
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Nội dung chính */}
      <main className="flex-1">
        {/* Banner chào mừng */}
        <HeroSection user={user} stats={stats} />

        {/* Thống kê nền tảng */}
        <StatsSection stats={stats} />

        {/* Danh sách khóa học nổi bật */}
        <section id="courses" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Khóa học nổi bật
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Bắt đầu học từ những khóa học phổ biến nhất
              </p>
            </div>

            {/* Grid hiển thị các khóa học */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Nút xem tất cả */}
            <div className="text-center mt-12">
              <Link
                to="/search"
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium 
                           hover:bg-gray-50 transition-colors inline-block"
              >
                Xem tất cả khóa học
              </Link>
            </div>
          </div>
        </section>

        {/* Giới thiệu tại sao chọn CourseHub */}
        <WhyUsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
