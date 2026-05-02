'use client';

// File InstructorCreateCourse.tsx - Trang tạo khóa học mới cho giảng viên
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/context/useUIStore';

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

export default function InstructorCreateCoursePage() {
  const router = useRouter();
  
  // State lưu form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Lập trình Web',
    level: 'beginner',
    duration: '10 giờ',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
  });

  // Xử lý khi submit form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Kiểm tra dữ liệu
    if (!formData.title || !formData.price) {
      showToast('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    // Lấy danh sách khóa học từ localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    let courses: Course[] = [];
    if (stored) {
      try {
        courses = JSON.parse(stored);
      } catch {
        courses = [];
      }
    }

    // Tạo khóa học mới
    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      category: formData.category,
      level: formData.level,
      duration: formData.duration,
      instructor: 'Giảng viên',
      thumbnail: formData.thumbnail,
      enrollmentCount: 0,
    };

    // Lưu vào localStorage
    courses.push(newCourse);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));

    // Hiển thị thông báo
    showToast('Tạo khóa học thành công!', 'success');
    
    // Chuyển về trang danh sách
    router.push('/instructor/courses');
  }

  // Cập nhật form khi input thay đổi
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Tiêu đề */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
          <p className="text-gray-500 mt-1">Điền thông tin khóa học bạn muốn tạo</p>
        </div>

        {/* Form tạo khóa học */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          {/* Tên khóa học */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên khóa học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ví dụ: React JS cơ bản"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn về khóa học..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ví dụ: 299000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Lập trình Web">Lập trình Web</option>
              <option value="Lập trình Mobile">Lập trình Mobile</option>
              <option value="Lập trình Python">Lập trình Python</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Cấp độ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>

          {/* Thời lượng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ví dụ: 10 giờ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Ảnh thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL ảnh thumbnail</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Nút submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              Tạo khóa học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
