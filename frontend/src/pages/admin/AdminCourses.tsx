// File AdminCourses.tsx - Trang quản lý khóa học trong admin
import { useState } from 'react';
import coursesData from '@/services/courses.json';
import { Button } from '@/components/ui/Button';
import CourseTable, { Course } from '@/components/admin/CourseTable';
import CourseForm from '@/components/admin/CourseForm';
import { showToast } from '@/context/useUIStore';

const initialCourses: Course[] = coursesData.courses;

const STORAGE_KEY = 'admin_courses';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return initialCourses;
        }
      }
    }
    return initialCourses;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    level: 'beginner',
    category: 'Lập trình Web',
    duration: '',
    instructor: '',
    published: true,
  });

  function handleAddNew() {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      level: 'beginner',
      category: 'Lập trình Web',
      duration: '',
      instructor: '',
      published: true,
    });
    setIsModalOpen(true);
  }

  function handleEdit(course: Course) {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      level: course.level,
      category: course.category,
      duration: course.duration,
      instructor: course.instructor,
      published: course.published,
    });
    setIsModalOpen(true);
  }

  function handleSave() {
    if (!formData.title || !formData.price) {
      showToast('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    let updatedCourses: Course[];

    if (editingCourse) {
      updatedCourses = courses.map((c) =>
        c.id === editingCourse.id ? { ...c, ...formData, price: parseInt(formData.price) } : c
      );
      showToast('Đã cập nhật khóa học thành công!', 'success');
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        price: parseInt(formData.price),
        level: formData.level,
        category: formData.category,
        duration: formData.duration || '10 giờ',
        instructor: formData.instructor || 'Giảng viên',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        published: formData.published,
        enrollmentCount: 0,
      };
      updatedCourses = [...courses, newCourse];
      showToast('Đã thêm khóa học mới thành công!', 'success');
    }

    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
    setIsModalOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      const updatedCourses = courses.filter((c) => c.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
      showToast('Đã xóa khóa học thành công!', 'success');
    }
  }

  function handleTogglePublish(course: Course) {
    const updatedCourses = courses.map((c) =>
      c.id === course.id ? { ...c, published: !c.published } : c
    );
    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
  }

  return (
    <div className="p-8">
      {/* Tiêu đề trang */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h1>
          <p className="text-gray-500 mt-1">Danh sách tất cả khóa học trong hệ thống</p>
        </div>

        {/* Nút thêm khóa học */}
        <Button onClick={handleAddNew}>
          <PlusIcon />
          Thêm khóa học
        </Button>
      </div>

      {/* Bảng danh sách khóa học */}
      <CourseTable
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
      />

      {/* Modal thêm/sửa khóa học */}
      <CourseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingCourse={editingCourse ? { ...formData, price: formData.price } : null}
        formData={formData}
        onFormChange={setFormData}
      />
    </div>
  );
}

// Icon dấu cộng
function PlusIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
