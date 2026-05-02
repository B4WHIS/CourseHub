import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu về CourseHub | Nền tảng học trực tuyến',
  description: 'CourseHub - Nền tảng học trực tuyến hàng đầu Việt Nam. Khám phá hàng trăm khóa học chất lượng cao từ các giảng viên giàu kinh nghiệm.',
  openGraph: {
    title: 'Giới thiệu về CourseHub',
    description: 'Nền tảng học trực tuyến hàng đầu Việt Nam',
    url: 'https://coursehub.vercel.app/about',
    siteName: 'CourseHub',
  },
};

async function getStats() {
  return {
    totalCourses: 150,
    totalStudents: 5000,
    totalInstructors: 50,
    successRate: 95,
  };
}

export default async function AboutPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Giới thiệu về CourseHub</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            CourseHub là nền tảng học trực tuyến được xây dựng với mục tiêu mang lại trải nghiệm học tập tốt nhất cho người dùng Việt Nam.
          </p>
          <p className="text-gray-600">
            Với hàng trăm khóa học chất lượng cao từ các giảng viên giàu kinh nghiệm, chúng tôi cam kết giúp bạn phát triển kỹ năng và đạt được mục tiêu nghề nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.totalCourses}+</p>
            <p className="text-sm text-gray-500">Khóa học</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.totalStudents.toLocaleString()}+</p>
            <p className="text-sm text-gray-500">Học viên</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">{stats.totalInstructors}+</p>
            <p className="text-sm text-gray-500">Giảng viên</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.successRate}%</p>
            <p className="text-sm text-gray-500">Tỷ lệ thành công</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Khám phá khóa học
          </Link>
        </div>
      </div>
    </div>
  );
}
