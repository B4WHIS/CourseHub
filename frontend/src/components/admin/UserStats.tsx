// Component thống kê người dùng
import { User } from './UserTable';

interface UserStatsProps {
  users: User[];
}

export default function UserStats({ users }: UserStatsProps) {
  const studentCount = users.filter((u) => u.role === 'STUDENT').length;
  const instructorCount = users.filter((u) => u.role === 'INSTRUCTOR').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<StudentIcon />}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        label="Học viên"
        value={studentCount}
      />
      <StatCard
        icon={<InstructorIcon />}
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
        label="Giảng viên"
        value={instructorCount}
      />
      <StatCard
        icon={<AdminIcon />}
        iconBg="bg-orange-100"
        iconColor="text-orange-600"
        label="Quản trị"
        value={adminCount}
      />
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StudentIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function InstructorIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
