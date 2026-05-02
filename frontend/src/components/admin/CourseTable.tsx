import Image from 'next/image';

// Kiểu dữ liệu khóa học
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  thumbnail: string;
  published: boolean;
  enrollmentCount: number;
  duration: string;
  instructor: string;
  slug: string;
}

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (course: Course) => void;
}

// Chuyển cấp độ sang tiếng Việt
function getLevelLabel(level: string): string {
  if (level === 'beginner') return 'Cơ bản';
  if (level === 'intermediate') return 'Trung cấp';
  if (level === 'advanced') return 'Nâng cao';
  return level;
}

// Lấy màu badge theo cấp độ
function getLevelColor(level: string): string {
  if (level === 'beginner') return 'bg-green-100 text-green-800';
  if (level === 'intermediate') return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export default function CourseTable({
  courses,
  onEdit,
  onDelete,
  onTogglePublish,
}: CourseTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white border border-gray-200">
      <table className="w-full min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <HeaderCell>Tên khóa học</HeaderCell>
            <HeaderCell>Danh mục</HeaderCell>
            <HeaderCell>Cấp độ</HeaderCell>
            <HeaderCell>Trạng thái</HeaderCell>
            <HeaderCell>Giá</HeaderCell>
            <HeaderCell>Học viên</HeaderCell>
            <HeaderCell>Hành động</HeaderCell>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      sizes="48px"
                      className="object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-700">{course.category}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}
                >
                  {getLevelLabel(course.level)}
                </span>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => onTogglePublish(course)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.published
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {course.published ? 'Đang bán' : 'Nháp'}
                </button>
              </td>
              <td className="py-4 px-6 font-medium text-gray-900">
                {course.price.toLocaleString('vi-VN')}đ
              </td>
              <td className="py-4 px-6 text-gray-700">{course.enrollmentCount}</td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <ActionButton onClick={() => onEdit(course)} variant="edit">
                    Sửa
                  </ActionButton>
                  <ActionButton onClick={() => onDelete(course.id)} variant="delete">
                    Xóa
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{children}</th>;
}

function ActionButton({
  onClick,
  variant,
  children,
}: {
  onClick: () => void;
  variant: 'edit' | 'delete';
  children: React.ReactNode;
}) {
  const classes =
    variant === 'edit' ? 'text-blue-600 hover:bg-blue-50' : 'text-red-600 hover:bg-red-50';
  return (
    <button onClick={onClick} className={`px-3 py-1 text-sm rounded-lg ${classes}`}>
      {children}
    </button>
  );
}
