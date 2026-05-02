// File seedData.ts - Hàm khởi tạo dữ liệu mẫu cho ứng dụng
// Chạy một lần khi ứng dụng load lần đầu

const USERS_KEY = 'usersList';
const COURSES_KEY = 'admin_courses';

// Dữ liệu người dùng mẫu
const seedUsers = [
  {
    id: '1',
    name: 'Quản trị viên',
    email: 'admin@coursehub.vn',
    role: 'admin',
    isBanned: false,
  },
  {
    id: '2',
    name: 'Giảng viên',
    email: 'teacher@coursehub.vn',
    role: 'instructor',
    isBanned: false,
  },
  {
    id: '3',
    name: 'Học viên',
    email: 'student@coursehub.vn',
    role: 'student',
    isBanned: false,
  },
];

// Dữ liệu khóa học mẫu
const seedCourses = [
  {
    id: '1',
    title: 'Lập trình Web Frontend với ReactJS và Next.js',
    slug: 'reactjs-nextjs-frontend',
    description: 'Học lập trình web hiện đại với ReactJS và Next.js từ cơ bản đến nâng cao. Bao gồm hooks, state management, routing và triển khai production.',
    price: 500000,
    level: 'beginner',
    category: 'Lập trình Web',
    duration: '25 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    approved: true,
    enrollmentCount: 125,
  },
  {
    id: '2',
    title: 'Tiếng Anh IELTS 5.5 cấp tốc cho người mất gốc',
    slug: 'ielts-55',
    description: 'Lộ trình học IELTS 5.5 trong 3 tháng dành cho người mất gốc. Phát âm, ngữ pháp, đọc, viết và luyện đề.',
    price: 800000,
    level: 'beginner',
    category: 'Ngoại ngữ',
    duration: '40 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424b?w=800',
    approved: true,
    enrollmentCount: 89,
  },
  {
    id: '3',
    title: 'Lập trình ứng dụng di động đa nền tảng với Flutter',
    slug: 'flutter-mobile',
    description: 'Xây dựng ứng dụng di động cho iOS và Android cùng lúc với Flutter. Học Dart, widgets, state management và publish app.',
    price: 650000,
    level: 'intermediate',
    category: 'Lập trình Mobile',
    duration: '30 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-96a888804f8d?w=800',
    approved: true,
    enrollmentCount: 67,
  },
  {
    id: '4',
    title: 'Calisthenics thực chiến: Lộ trình 3 buổi/tuần',
    slug: 'calisthenics',
    description: 'Bài tập body-weight training thực chiến tại nhà. Không cần dụng cụ, phù hợp cho người bận rộn muốn rèn luyện sức mạnh.',
    price: 300000,
    level: 'beginner',
    category: 'Sức khỏe',
    duration: '15 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    approved: true,
    enrollmentCount: 234,
  },
  {
    id: '5',
    title: 'Lộ trình trở thành Cloud Engineer & DevOps',
    slug: 'cloud-devops',
    description: 'Học AWS, Azure, Docker, Kubernetes và CI/CD. Lộ trình đầy đủ để trở thành Cloud Engineer chuyên nghiệp.',
    price: 1200000,
    level: 'advanced',
    category: 'Cloud Computing',
    duration: '50 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0f5?w=800',
    approved: false,
    enrollmentCount: 0,
  },
  {
    id: '6',
    title: 'Nhập môn Đầu tư Chứng khoán ETF dài hạn',
    slug: 'etf-investing',
    description: 'Hướng dẫn đầu tư ETF an toàn và hiệu quả dài hạn. Phù hợp cho người mới bắt đầu muốn tự do tài chính.',
    price: 400000,
    level: 'beginner',
    category: 'Tài chính',
    duration: '10 giờ',
    instructor: 'Giảng viên',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    approved: false,
    enrollmentCount: 0,
  },
];

// Hàm chạy seed dữ liệu
export function seedDatabase() {
  // Chỉ chạy nếu đang ở browser
  if (typeof window === 'undefined') return;

  // Seed users nếu chưa có
  const storedUsers = localStorage.getItem(USERS_KEY);
  if (!storedUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    console.log('Da tao du lieu nguoi dung moi');
  }

  // Seed courses nếu chưa có
  const storedCourses = localStorage.getItem(COURSES_KEY);
  if (!storedCourses) {
    localStorage.setItem(COURSES_KEY, JSON.stringify(seedCourses));
    console.log('Da tao du lieu khoa hoc moi');
  }
}