// Component tóm tắt đơn hàng
import { CartItem } from '@/context/CartContext';
import Image from 'next/image';

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ';
}

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export default function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h2>

        <div className="space-y-3 pb-4 border-b border-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-12 flex-shrink-0">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-cover rounded"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
                <p className="text-sm font-bold text-blue-600">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Tạm tính</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Tổng cộng</span>
            <span className="text-blue-600">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
