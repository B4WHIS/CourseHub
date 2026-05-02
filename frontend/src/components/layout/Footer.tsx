// Component Footer - Chân trang
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1 - Thông tin thương hiệu */}
          <div>
            <span className="text-xl font-bold text-white">CourseHub</span>
            <p className="mt-2 text-sm">Nền tảng học trực tuyến hàng đầu Việt Nam.</p>
          </div>

          {/* Cột 2 - Danh mục khóa học */}
          <div>
            <h4 className="text-white font-semibold mb-4">Khóa học</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search?category=Lập trình Web" className="hover:text-white">
                  Lập trình Web
                </Link>
              </li>
              <li>
                <Link href="/search?category=Khoa học dữ liệu" className="hover:text-white">
                  Khoa học dữ liệu
                </Link>
              </li>
              <li>
                <Link href="/search?category=DevOps" className="hover:text-white">
                  DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3 - Liên kết */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          © {currentYear} CourseHub. Mọi quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
