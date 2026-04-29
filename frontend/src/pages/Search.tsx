// File Search.tsx - Trang tìm kiếm khóa học
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import coursesData from '@/services/courses.json';
import { EmptyState } from '@/components/ui/Skeleton';
import { SearchX } from 'lucide-react';

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

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

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

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const courses = coursesData.courses.filter((c: Course) => c.published);
  const categories = ['all', ...new Set(courses.map((c: Course) => c.category))];

  useEffect(() => {
    filterCourses();
  }, [query, selectedCategory]);

  function filterCourses() {
    let filtered = courses;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (c: Course) =>
          c.title.toLowerCase().includes(lowerQuery) ||
          c.description.toLowerCase().includes(lowerQuery) ||
          c.category.toLowerCase().includes(lowerQuery) ||
          c.instructor.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c: Course) => c.category === selectedCategory);
    }

    setResults(filtered);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Course<span className="text-blue-600">Hub</span>
            </Link>
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm khóa học..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Kết quả tìm kiếm cho "${query}"` : 'Tất cả khóa học'}
          </h1>
          <p className="text-gray-500 mt-1">Tìm thấy {results.length} khóa học</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <EmptyState
            icon={<SearchX className="w-10 h-10" />}
            title="Không tìm thấy khóa học"
            description="Hãy thử tìm kiếm với từ khóa khác."
            actionLabel="Khám phá khóa học"
            actionHref="/"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
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
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(course.price)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {course.enrollmentCount.toLocaleString()} học viên
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
