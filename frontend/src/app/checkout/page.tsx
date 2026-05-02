'use client';

// File Checkout.tsx - Trang thanh toán
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import SuccessModal from '@/components/checkout/SuccessModal';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/context/useUIStore';
import { EmptyState } from '@/components/ui/Skeleton';
import { ShoppingBag } from 'lucide-react';

// Key lưu trữ khóa học đã mua trong localStorage
const PURCHASED_KEY = 'purchasedCourses';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // State theo dõi loading và hiển thị thành công
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Kiểm tra nếu giỏ hàng trống
  if (items.length === 0 && !showSuccess) {
    return <EmptyCartMessage />;
  }

  // Xử lý thay đổi input trong form
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Xác thực dữ liệu form
  function validateForm(): boolean {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Vui lòng điền đầy đủ thông tin!', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Email không hợp lệ!', 'error');
      return false;
    }

    return true;
  }

  // Xử lý thanh toán
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Giả lập thời gian xử lý thanh toán (2 giây)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Lưu danh sách khóa học đã mua vào localStorage
    const purchasedIds = items.map((item) => item.id);
    const existingPurchased = localStorage.getItem(PURCHASED_KEY);
    const allPurchased = existingPurchased
      ? [...new Set([...JSON.parse(existingPurchased), ...purchasedIds])]
      : purchasedIds;
    localStorage.setItem(PURCHASED_KEY, JSON.stringify(allPurchased));

    // Xóa giỏ hàng sau khi thanh toán thành công
    clearCart();

    setIsLoading(false);
    setShowSuccess(true);
  }

  // Xử lý đóng modal thành công và quay về trang chủ
  function handleCloseSuccess() {
    setShowSuccess(false);
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CheckoutHeader />

      {/* Nội dung chính */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form thanh toán */}
          <div className="lg:col-span-2">
            <CheckoutForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Tóm tắt đơn hàng */}
          <OrderSummary items={items} totalPrice={totalPrice} />
        </div>
      </main>

      {/* Modal thành công */}
      <SuccessModal isOpen={showSuccess} onClose={handleCloseSuccess} email={formData.email} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component header cho trang checkout
function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Course<span className="text-blue-600">Hub</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay về giỏ hàng
          </Link>
        </div>
      </div>
    </header>
  );
}

// Component thông báo giỏ hàng trống
function EmptyCartMessage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <EmptyState
        icon={<ShoppingBag className="w-10 h-10" />}
        title="Giỏ hàng trống"
        description="Vui lòng thêm khóa học vào giỏ hàng trước."
        actionLabel="Quay về trang chủ"
        actionHref="/"
      />
    </div>
  );
}
