// Kiểu dữ liệu khóa học (dùng chung cho toàn app)
export interface Course {
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
