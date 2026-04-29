// Component WhyUsSection - Giới thiệu tại sao chọn CourseHub
export default function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Cột trái - Nội dung */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Tại sao chọn CourseHub?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chúng tôi cung cấp trải nghiệm học tập tốt nhất với các chuyên gia trong ngành.
            </p>

            {/* Danh sách lợi ích */}
            <div className="mt-8 space-y-4">
              <BenefitItem
                icon={<BookIcon />}
                iconBg="bg-blue-100"
                title="Giảng viên chuyên nghiệp"
                description="Học từ những chuyên gia với kinh nghiệm thực tế."
              />
              <BenefitItem
                icon={<ClockIcon />}
                iconBg="bg-purple-100"
                title="Học theo tốc độ riêng"
                description="Truy cập mọi lúc, mọi nơi không giới hạn."
              />
              <BenefitItem
                icon={<AwardIcon />}
                iconBg="bg-green-100"
                title="Chứng chỉ hoàn thành"
                description="Nhận chứng chỉ khi hoàn thành khóa học."
              />
            </div>
          </div>

          {/* Cột phải - Video placeholder */}
          <div
            className="aspect-video rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 
                          flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center 
                            cursor-pointer hover:bg-white/30 transition-colors relative z-10"
            >
              <PlayIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component một lợi ích
function BenefitItem({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Icons
function BookIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
