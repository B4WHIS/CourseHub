// Component nội dung khóa học
import { Course } from '@/types/course';

interface CourseContentProps {
  course: Course;
  allCourses: Course[];
}

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ';
}

const syllabus = [
  { title: 'Giới thiệu tổng quan', lessons: 3 },
  { title: 'Các khái niệm cơ bản', lessons: 5 },
  { title: 'Thực hành dự án', lessons: 8 },
  { title: 'Tối ưu và nâng cao', lessons: 4 },
  { title: 'Dự án cuối khóa', lessons: 2 },
];

export default function CourseContent({ course, allCourses }: CourseContentProps) {
  const otherCourses = allCourses.filter((c) => c.id !== course.id && c.published).slice(0, 3);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nội dung khóa học</h2>
            <p className="text-gray-600 mb-8">{course.description}</p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Chương trình học</h3>
            <div className="space-y-3">
              {syllabus.map((item, index) => (
                <SyllabusItem
                  key={index}
                  index={index + 1}
                  title={item.title}
                  lessons={item.lessons}
                />
              ))}
            </div>
          </div>

          <Sidebar otherCourses={otherCourses} />
        </div>
      </div>
    </section>
  );
}

function SyllabusItem({
  index,
  title,
  lessons,
}: {
  index: number;
  title: string;
  lessons: number;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-medium">
            {index}
          </span>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <span className="text-sm text-gray-500">{lessons} bài</span>
      </div>
    </div>
  );
}

function Sidebar({ otherCourses }: { otherCourses: Course[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Khóa học khác</h3>
      <div className="space-y-4">
        {otherCourses.map((c) => (
          <a
            key={c.id}
            href={`/courses/${c.id}`}
            className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <img src={c.thumbnail} alt={c.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h4 className="font-medium text-gray-900 line-clamp-2">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{c.instructor}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(c.price)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
