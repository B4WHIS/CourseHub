'use client';

// File Wishlist.tsx - Trang danh sách yêu thích
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import coursesData from '@/services/courses.json';
import CourseCard from '@/components/features/CourseCard';

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
  instructor: string;
  slug: string;
  published: boolean;
}

const WISHLIST_KEY = 'wishlist';

export default function WishlistPage() {
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    const courses = coursesData.courses.filter((c: Course) => wishlist.includes(c.id));
    setWishlistCourses(courses);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Course<span className="text-blue-600">Hub</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Yêu thích</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Khóa học yêu thích</h1>
        <p className="text-gray-500 mb-8">
          {wishlistCourses.length} khóa học trong danh sách
        </p>

        {/* Empty State */}
        {wishlistCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bạn chưa có khóa học yêu thích nào
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Hãy khám phá các khóa học thú vị và thêm vào danh sách yêu thích của bạn nhé!
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Khám phá khóa học
            </Link>
          </div>
        ) : (
          /* Course Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
