'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { EmptyState } from '@/components/ui/Skeleton';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { showToast } from '@/context/useUIStore';

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

interface Coupon {
  code: string;
  discount: number;
  description: string;
}

const VALID_COUPONS: Coupon[] = [
  { code: 'GIAM20', discount: 20, description: 'Giảm 20% tất cả khóa học' },
  { code: 'COURSEHUB', discount: 20, description: 'Giảm 20% cho thành viên CourseHub' },
  { code: 'WELCOME10', discount: 10, description: 'Giảm 10% chào mừng' },
  { code: 'NEWYEAR2024', discount: 15, description: 'Giảm 15% năm mới' },
];

export default function CartPage() {
  const { items, removeFromCart, totalPrice, itemCount } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>(items.map((i) => i.id));
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedItems = items.filter((i) => selectedIds.includes(i.id));
  const selectedTotal = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const discountAmount = appliedCoupon ? (selectedTotal * appliedCoupon.discount) / 100 : 0;
  const finalTotal = selectedTotal - discountAmount;
  const allSelected = selectedIds.length === items.length && items.length > 0;

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  }

  const handleApplyCoupon = () => {
    setErrorMsg('');
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setErrorMsg('Vui lòng nhập mã giảm giá!');
      return;
    }
    const coupon = VALID_COUPONS.find((c) => c.code === code);
    if (coupon) {
      setAppliedCoupon(coupon);
      showToast(`Áp dụng mã ${coupon.code} - ${coupon.description}`, 'success');
      setCouponCode('');
    } else {
      setErrorMsg('Mã giảm giá không hợp lệ!');
      showToast('Mã giảm giá không hợp lệ!', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Đã hủy mã giảm giá!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Course<span className="text-blue-600">Hub</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-10 h-10" />}
            title="Giỏ hàng của bạn đang trống"
            description="Hãy khám phá các khóa học thú vị của chúng tôi."
            actionLabel="Tiếp tục mua sắm"
            actionHref="/"
          />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 px-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    {allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'} ({items.length})
                  </span>
                </label>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border p-4 flex gap-4 transition-colors ${
                    selectedIds.includes(item.id) ? 'border-blue-400' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="relative w-32 h-24 flex-shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="128px"
                      className="object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.instructor}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng cộng</h2>

                {!appliedCoupon ? (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã giảm giá</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
                    <p className="text-xs text-gray-500 mt-2">
                      Thử: GIAM20, COURSEHUB, WELCOME10, NEWYEAR2024
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-700">{appliedCoupon.code}</p>
                          <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <button onClick={handleRemoveCoupon} className="text-sm text-red-500 hover:text-red-700">
                        Hủy
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Đã chọn</span>
                    <span>{selectedItems.length} / {items.length} khóa học</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(selectedTotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({appliedCoupon.discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Link
                  href={selectedIds.length > 0 ? `/checkout?ids=${selectedIds.join(',')}` : '#'}
                  className={`block w-full mt-4 py-3 text-center rounded-lg font-semibold transition-colors ${
                    selectedIds.length > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (selectedIds.length === 0) {
                      e.preventDefault();
                      showToast('Vui lòng chọn ít nhất một khóa học!', 'error');
                    }
                  }}
                >
                  Tiến hành thanh toán ({selectedItems.length})
                </Link>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Thanh toán an toàn & bảo đảm
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CourseHub. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}