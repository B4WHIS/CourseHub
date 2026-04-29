// Component HeroSection - Banner chào mừng trang chủ
'use client';

import { Link } from 'react-router-dom';

interface FakeUser {
  name: string;
  role: string;
}

interface Stats {
  totalUsers: number;
}

interface HeroSectionProps {
  user: FakeUser | null;
  stats: Stats;
}

export default function HeroSection({ user, stats }: HeroSectionProps) {
  if (user) {
    return <UserHero user={user} stats={stats} />;
  }

  return <GuestHero />;
}

// Banner chào mừng cho người dùng đã đăng nhập
function UserHero({ user, stats }: { user: FakeUser; stats: Stats }) {
  return (
    <section
      className="relative overflow-hidden 
                        bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700"
    >
      {/* Hiệu ứng nền blur */}
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 
                      bg-purple-500/30 rounded-full blur-3xl"
      />
      <div
        className="absolute -top-20 -left-20 w-96 h-96 
                      bg-blue-400/30 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cột trái - Hình ảnh */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <div
                className="w-64 h-64 lg:w-80 lg:h-80 
                              rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Học tập chuyên nghiệp"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Icon sách xanh */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-400 
                              rounded-full flex items-center justify-center 
                              border-4 border-white shadow-lg"
              >
                <BookIcon />
              </div>
            </div>
          </div>

          {/* Cột phải - Chào mừng */}
          <div className="text-white order-1 lg:order-2">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              Chào mừng trở lại, <span className="text-yellow-300">{user.name}</span>!
            </h1>

            <p className="mt-6 text-base lg:text-lg text-blue-100 leading-relaxed">
              Cảm ơn bạn đã tin tưởng và lựa chọn CourseHub là người bạn đồng hành. Hãy tiếp tục
              khám phá thêm nhiều khóa học mới để nâng cao kỹ năng của bạn nhé.
            </p>

            {/* Số liệu học viên */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar initial="A" color="bg-blue-400" />
                <Avatar initial="B" color="bg-green-400" />
                <Avatar initial="C" color="bg-purple-400" />
              </div>
              <p className="text-sm text-blue-200">
                Cùng <strong className="text-white">{stats.totalUsers.toLocaleString()}+</strong>{' '}
                học viên đang học tập
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Banner mặc định cho khách chưa đăng nhập
function GuestHero() {
  return (
    <section
      className="relative overflow-hidden 
                        bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white"
    >
      {/* Hiệu ứng nền blur */}
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 
                      bg-purple-500/30 rounded-full blur-3xl"
      />
      <div
        className="absolute -top-20 -left-20 w-96 h-96 
                      bg-blue-400/30 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Nền tảng học trực tuyến
            <br />
            <span className="text-blue-200">hàng đầu Việt Nam</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-blue-100 max-w-2xl">
            Nâng cao kỹ năng của bạn với các chuyên gia hàng đầu. Từ lập trình web đến khoa học dữ
            liệu.
          </p>

          {/* Nút hành động */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/search"
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold 
                         hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <SearchIcon />
              Khám phá ngay
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold 
                         hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <UserPlusIcon />
              Bắt đầu miễn phí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component avatar tròn với chữ cái đầu
function Avatar({ initial, color }: { initial: string; color: string }) {
  return (
    <div
      className={`w-10 h-10 rounded-full ${color} border-2 border-white 
                    flex items-center justify-center text-xs font-bold text-white`}
    >
      {initial}
    </div>
  );
}

// Icons
function BookIcon() {
  return (
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    </svg>
  );
}
