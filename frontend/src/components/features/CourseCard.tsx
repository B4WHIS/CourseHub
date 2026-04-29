// Component CourseCard - Card hiển thị khóa học
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getLevelLabel, getLevelColor, formatPrice } from '@/utils';
import { showToast } from '@/context/useUIStore';

const WISHLIST_KEY = 'wishlist';

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  level: string;
  category: string;
  description: string;
  enrollmentCount: number;
  price: number;
  duration: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    setIsWishlisted(wishlist.includes(course.id));
  }, [course.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    let newWishlist: string[];

    if (wishlist.includes(course.id)) {
      newWishlist = wishlist.filter((id: string) => id !== course.id);
      showToast('Đã xóa khỏi mục Yêu thích', 'success');
    } else {
      newWishlist = [...wishlist, course.id];
      showToast('Đã thêm vào mục Yêu thích', 'success');
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
    setIsWishlisted(newWishlist.includes(course.id));
  };

  function getBadgeColor(level: string): string {
    if (getLevelColor(level) === 'success') return 'bg-green-100 text-green-800';
    if (getLevelColor(level) === 'warning') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }

  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 
                 overflow-hidden hover:shadow-lg transition-shadow relative"
    >
      {/* Hình ảnh khóa học */}
      <div className="h-40 bg-gray-200 relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        {/* Badge cấp độ */}
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(course.level)}`}
        >
          {getLevelLabel(course.level)}
        </span>
        {/* Wishlist Heart */}
        <button
          onClick={toggleWishlist}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-colors
            ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'}
          `}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Thông tin khóa học */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{course.category}</p>
        <h3 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.description}</p>

        {/* Số lượng học viên */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
          <span>{course.enrollmentCount.toLocaleString()} học viên</span>
        </div>

        {/* Giá và thời lượng */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>
      </div>
    </Link>
  );
}
