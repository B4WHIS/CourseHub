'use client';

// File CourseDetail.tsx - Trang chi tiết khóa học
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CourseHero from '@/components/course/CourseHero';
import CourseContent from '@/components/course/CourseContent';
import Footer from '@/components/layout/Footer';
import coursesData from '@/services/courses.json';
import { Course } from '@/types/course';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/context/useUIStore';

const PURCHASED_KEY = 'purchasedCourses';
const courses: Course[] = coursesData.courses;

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { addToCart, isInCart } = useCart();
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const purchased = localStorage.getItem(PURCHASED_KEY);
    if (purchased) {
      try {
        const ids = JSON.parse(purchased) as string[];
        setIsPurchased(ids.includes(id as string));
      } catch {
        setIsPurchased(false);
      }
    }
  }, [id]);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <NotFoundView onBack={() => router.push('/')} />;
  }

  const inCart = isInCart(course.id);

  function handleAddToCart() {
    if (inCart) {
      showToast('Khóa học này đã có trong giỏ hàng!', 'error');
      return;
    }

    if (!course) return;

    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.thumbnail,
      instructor: course.instructor,
    });

    showToast('Đã thêm khóa học vào giỏ hàng!', 'success');
  }

  function handleBuyNow() {
    if (!course) return;
    if (!inCart) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        thumbnail: course.thumbnail,
        instructor: course.instructor,
      });
    }
    router.push(`/checkout?ids=${course.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CourseHeader onBack={() => router.back()} />

      {/* Banner thông tin khóa học */}
      <CourseHero course={course} inCart={inCart} isPurchased={isPurchased} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />

      {/* Nội dung khóa học */}
      <CourseContent course={course} allCourses={courses} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component header cho trang chi tiết
function CourseHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <BackIcon />
            Quay lại
          </button>
          <a href="/" className="text-xl font-bold text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// Component hiển thị khi không tìm thấy khóa học
function NotFoundView({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy khóa học</h1>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}

// Icon quay lại
function BackIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
