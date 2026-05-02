'use client';

// File MyCourses.tsx - Trang khóa học đã mua của người dùng
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import coursesData from '@/services/courses.json';
import { showToast } from '@/context/useUIStore';
import { EmptyState } from '@/components/ui/Skeleton';
import { BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  level: string;
  category: string;
  thumbnail: string;
  published: boolean;
  enrollmentCount: number;
  duration: string;
  instructor: string;
}

interface FakeUser {
  name: string;
  email: string;
  role: string;
}

const AUTH_STORAGE_KEY = 'fakeSession';
const PURCHASED_KEY = 'purchasedCourses';

function getLevelColor(level: string) {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-700';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700';
    case 'advanced':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getLevelText(level: string) {
  switch (level) {
    case 'beginner':
      return 'Cơ bản';
    case 'intermediate':
      return 'Trung cấp';
    case 'advanced':
      return 'Nâng cao';
    default:
      return level;
  }
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<FakeUser | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedSession) {
      router.push('/login');
      return;
    }

    try {
      const session = JSON.parse(storedSession);
      if (session.expiry && Date.now() > session.expiry) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        showToast('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
        router.push('/login');
        return;
      }
      setUser(session.user || null);
    } catch {
      router.push('/login');
      return;
    }

    // Lấy danh sách khóa học đã mua
    const purchased = localStorage.getItem(PURCHASED_KEY);
    if (purchased) {
      try {
        const ids = JSON.parse(purchased) as string[];
        const courses = coursesData.courses.filter((c: Course) => ids.includes(c.id));
        setPurchasedCourses(courses);
      } catch {
        setPurchasedCourses([]);
      }
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Đang chuyển hướng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Course<span className="text-blue-600">Hub</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
          <p className="text-gray-500 mt-1">Xin chào, {user.name}!</p>
        </div>

        {purchasedCourses.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="w-10 h-10" />}
            title="Bạn chưa mua khóa học nào"
            description="Hãy khám phá các khóa học thú vị và bắt đầu học ngay hôm nay!"
            actionLabel="Khám phá khóa học"
            actionHref="/"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Đã mua
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}
                    >
                      {getLevelText(course.level)}
                    </span>
                    <span className="text-xs text-gray-500">{course.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      <svg
                        className="w-4 h-4 inline mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {course.duration}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CourseHub. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
