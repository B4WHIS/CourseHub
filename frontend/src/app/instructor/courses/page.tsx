'use client';

// File InstructorCourses.tsx - Trang danh sách khóa học của giảng viên
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import coursesData from '@/services/courses.json';

const STORAGE_KEY = 'instructor_courses';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  enrollmentCount: number;
}

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Đọc khóa học từ localStorage khi trang load
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCourses(JSON.parse(stored));
      } catch {
        setCourses(coursesData.courses);
      }
    } else {
      setCourses(coursesData.courses);
    }
  }, []);

  // Hàm định dạng tiền tệ
  function formatPrice(price: number) {
    return price.toLocaleString('vi-VN') + 'đ';
  }

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
          <p className="text-gray-500 mt-1">Danh sách các khóa học bạn đang giảng dạy</p>
        </div>
        <Link
          href="/instructor/create"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          + Tạo khóa học mới
        </Link>
      </div>

      {/* Danh sách khóa học */}
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Bạn chưa có khóa học nào.</p>
          <Link
            href="/instructor/create"
            className="text-purple-600 hover:underline mt-2 inline-block"
          >
            Tạo khóa học đầu tiên
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">{formatPrice(course.price)}</span>
                  <span className="text-sm text-gray-500">{course.enrollmentCount} học viên</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
