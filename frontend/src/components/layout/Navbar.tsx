// Component Navbar - Thanh điều hướng chính
'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/context/useUIStore';
import { User, Settings, LogOut, BookOpen, LayoutDashboard, GraduationCap, Menu, X, Search, ShoppingCart, Home, BookMarked, CreditCard } from 'lucide-react';

const AUTH_STORAGE_KEY = 'fakeSession';

interface FakeUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();

  const [user, setUser] = useState<FakeUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);

        if (session.expiry && Date.now() > session.expiry) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setUser(null);
          showToast('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
          navigate('/login');
        } else if (session.user) {
          setUser(session.user);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsDropdownOpen(false);
    showToast('Đăng xuất thành công!', 'success');
    navigate('/');
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  function getRoleBadgeColor(role: string) {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'instructor':
        return 'bg-blue-100 text-blue-700';
      case 'student':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  function getRoleLabel(role: string) {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'instructor':
        return 'Giảng viên';
      case 'student':
        return 'Học viên';
      default:
        return role;
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </Link>

          {/* Desktop Search form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm khóa học..."
                className="w-80 pl-10 pr-4 py-2 rounded-full border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent text-sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist icon */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-700 hover:text-red-500 
                      hover:bg-red-50 rounded-lg transition-colors"
            >
              <HeartIcon />
            </Link>

            {/* Cart icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 
                                          hover:bg-blue-50 rounded-lg transition-colors"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white 
                                  text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User menu or Login buttons */}
            {user ? (
              <UserDropdown
                user={user}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                dropdownRef={dropdownRef}
                getRoleBadgeColor={getRoleBadgeColor}
                getRoleLabel={getRoleLabel}
                handleLogout={handleLogout}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 
                                               hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white 
                                               rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm khóa học..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              <MobileNavLink to="/" icon={<Home className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                Trang chủ
              </MobileNavLink>
              <MobileNavLink to="/search" icon={<Search className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                Tất cả khóa học
              </MobileNavLink>
              <MobileNavLink to="/wishlist" icon={<HeartIcon />} onClick={() => setIsMobileMenuOpen(false)}>
                Yêu thích
              </MobileNavLink>
              <MobileNavLink to="/cart" icon={<ShoppingCart className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                Giỏ hàng ({itemCount})
              </MobileNavLink>
              <MobileNavLink to="/my-courses" icon={<BookMarked className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                Khóa học của tôi
              </MobileNavLink>

              {/* Auth Links for Mobile */}
              {user ? (
                <>
                  <MobileNavLink to="/profile" icon={<User className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                    Hồ sơ ({user.name})
                  </MobileNavLink>
                  <MobileNavLink to="/settings" icon={<Settings className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                    Cài đặt
                  </MobileNavLink>
                  {user.role === 'admin' && (
                    <MobileNavLink to="/admin" icon={<LayoutDashboard className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                      Trang Quản trị
                    </MobileNavLink>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <MobileNavLink to="/login" icon={<CreditCard className="w-5 h-5" />} onClick={() => setIsMobileMenuOpen(false)}>
                  Đăng nhập / Đăng ký
                </MobileNavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Component dropdown người dùng
function UserDropdown({
  user,
  isOpen,
  setIsOpen,
  dropdownRef,
  getRoleBadgeColor,
  getRoleLabel,
  handleLogout,
}: {
  user: FakeUser;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  getRoleBadgeColor: (role: string) => string;
  getRoleLabel: (role: string) => string;
  handleLogout: () => void;
}) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div
          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white 
                        rounded-full flex items-center justify-center font-medium shadow-sm"
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg 
                        border border-gray-200 overflow-hidden z-50"
        >
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <span
              className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full 
                             ${getRoleBadgeColor(user.role)}`}
            >
              {getRoleLabel(user.role)}
            </span>
          </div>

          <div className="py-1">
            <DropdownLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              icon={<User className="w-4 h-4" />}
            >
              Hồ sơ cá nhân
            </DropdownLink>
            <DropdownLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              icon={<Settings className="w-4 h-4" />}
            >
              Cài đặt
            </DropdownLink>

            {user.role === 'student' && (
              <DropdownLink
                to="/my-courses"
                onClick={() => setIsOpen(false)}
                icon={<BookOpen className="w-4 h-4" />}
              >
                Khóa học của tôi
              </DropdownLink>
            )}

            {user.role === 'admin' && (
              <DropdownLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                icon={<LayoutDashboard className="w-4 h-4" />}
              >
                Trang Quản trị
              </DropdownLink>
            )}

            {user.role === 'instructor' && (
              <DropdownLink
                to="/instructor"
                onClick={() => setIsOpen(false)}
                icon={<GraduationCap className="w-4 h-4" />}
              >
                Quản lý giảng dạy
              </DropdownLink>
            )}
          </div>

          <div className="border-t border-gray-200 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 
                               hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Component link trong dropdown
function DropdownLink({
  to,
  onClick,
  icon,
  children,
}: {
  to: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 
                     hover:bg-blue-50 hover:text-blue-600 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

// Component link điều hướng cho mobile
function MobileNavLink({
  to,
  onClick,
  icon,
  children,
}: {
  to: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
