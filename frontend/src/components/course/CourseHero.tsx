// Component hero thông tin khóa học
import { Course } from '@/types/course';

interface CourseHeroProps {
  course: Course;
  inCart: boolean;
  onAddToCart: () => void;
}

function getLevelLabel(level: string): string {
  if (level === 'beginner') return 'Cơ bản';
  if (level === 'intermediate') return 'Trung cấp';
  if (level === 'advanced') return 'Nâng cao';
  return level;
}

export default function CourseHero({ course, inCart, onAddToCart }: CourseHeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
              {course.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-blue-100 mb-6">{course.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <InstructorAvatar name={course.instructor} />
              <div>
                <p className="font-medium">{course.instructor}</p>
                <p className="text-sm text-blue-200">Giảng viên</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <StatItem icon={<ClockIcon />} label={course.duration} />
              <StatItem
                icon={<UsersIcon />}
                label={`${course.enrollmentCount.toLocaleString()} học viên`}
              />
              <StatItem icon={<BadgeIcon />} label={getLevelLabel(course.level)} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 text-gray-900">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <div className="mb-6">
              <p className="text-sm text-gray-500">Giá khóa học</p>
              <p className="text-3xl font-bold text-blue-600">
                {course.price.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <button
              onClick={onAddToCart}
              disabled={inCart}
              className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${inCart ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {inCart ? '✓ Đã có trong giỏ hàng' : 'Thêm vào giỏ hàng'}
            </button>
            <a
              href="/cart"
              className="block w-full py-3 text-center border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Xem giỏ hàng
            </a>
            <GuaranteeBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {label}
    </div>
  );
}

function InstructorAvatar({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
      <span className="text-xl font-bold">{name.charAt(0)}</span>
    </div>
  );
}

function GuaranteeBadge() {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <ShieldIcon />
        Bảo đảm hoàn tiền trong 30 ngày
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
