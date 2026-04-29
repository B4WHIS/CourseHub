// Component StatsSection - Hiển thị số liệu thống kê
interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
}

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid 4 cột hiển thị số liệu */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={stats.totalUsers.toLocaleString() + '+'} label="Học viên" />
          <StatItem value={stats.totalCourses.toString()} label="Khóa học" />
          <StatItem value={stats.totalEnrollments.toLocaleString() + '+'} label="Lượt đăng ký" />
          <StatItem value="24/7" label="Truy cập" />
        </div>
      </div>
    </section>
  );
}

// Component hiển thị một số liệu
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl lg:text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
