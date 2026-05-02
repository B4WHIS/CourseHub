'use client';

// File AdminCourses.tsx - Trang quản lý khóa học với chức năng duyệt
import { useState, useEffect } from 'react';
import Image from 'next/image';
import coursesData from '@/services/courses.json';
import { showToast } from '@/context/useUIStore';

const COURSES_KEY = 'admin_courses';

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
  approved?: boolean;
  enrollmentCount: number;
}

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function getLevelLabel(level: string) {
  if (level === 'beginner') return 'Cơ bản';
  if (level === 'intermediate') return 'Trung cấp';
  if (level === 'advanced') return 'Nâng cao';
  return level;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  // Đọc dữ liệu từ localStorage khi trang load
  useEffect(() => {
    const stored = localStorage.getItem(COURSES_KEY);
    if (stored) {
      try {
        let parsed = JSON.parse(stored);
        // Thêm approved: true cho các khóa học cũ chưa có field này
        parsed = parsed.map((c: Course) => ({
          ...c,
          approved: c.approved !== undefined ? c.approved : true,
        }));
        setCourses(parsed);
      } catch {
        setCourses(coursesData.courses);
      }
    } else {
      setCourses(coursesData.courses);
    }
  }, []);

  // Lọc khóa học theo trạng thái
  const filteredCourses = courses.filter((course) => {
    if (filter === 'approved') return course.approved === true;
    if (filter === 'pending') return course.approved === false || course.approved === undefined;
    return true;
  });

  // Duyệt khóa học
  function handleApprove(courseId: string) {
    const updatedCourses = courses.map((c) => {
      if (c.id === courseId) {
        return { ...c, approved: true };
      }
      return c;
    });
    setCourses(updatedCourses);
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
    showToast('Đã duyệt khóa học!', 'success');
  }

  // Hủy duyệt khóa học
  function handleUnapprove(courseId: string) {
    const updatedCourses = courses.map((c) => {
      if (c.id === courseId) {
        return { ...c, approved: false };
      }
      return c;
    });
    setCourses(updatedCourses);
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
    showToast('Đã hủy duyệt khóa học!', 'success');
  }

  // Xóa khóa học
  function handleDelete(courseId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      const updatedCourses = courses.filter((c) => c.id !== courseId);
      setCourses(updatedCourses);
      localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
      showToast('Đã xóa khóa học!', 'success');
    }
  }

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Duyệt khóa học</h1>
        <p className="text-gray-500 mt-1">Quản lý và phê duyệt khóa học</p>
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Tất cả ({courses.length})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Đã duyệt ({courses.filter((c) => c.approved === true).length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Chờ duyệt ({courses.filter((c) => !c.approved).length})
        </button>
      </div>

      {/* Bảng khóa học */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Không có khóa học nào</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Khóa học</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giảng viên</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giá</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                       <div className="relative w-16 h-12 flex-shrink-0">
                         <Image
                           src={course.thumbnail}
                           alt={course.title}
                           fill
                           sizes="64px"
                           className="object-cover rounded"
                           loading="lazy"
                         />
                       </div>
                       <div>
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.category} • {getLevelLabel(course.level)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{course.instructor}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatPrice(course.price)}</td>
                  <td className="px-4 py-3">
                    {course.approved === true ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Đã duyệt</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">Chờ duyệt</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {course.approved === true ? (
                        <button
                          onClick={() => handleUnapprove(course.id)}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
                        >
                          Hủy duyệt
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(course.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                        >
                          Duyệt
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
