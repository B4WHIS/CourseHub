'use client';

// Cart Context để quản lý giỏ hàng với localStorage
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Kiểu dữ liệu khóa học trong giỏ hàng
export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  instructor: string;
  addedAt: Date;
}

// Kiểu dữ liệu CartContext
interface CartContextType {
  items: CartItem[];
  addToCart: (course: Omit<CartItem, 'addedAt'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalPrice: number;
  itemCount: number;
}

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Key cho localStorage
const CART_STORAGE_KEY = 'coursehub_cart';

// Hàm đọc giỏ hàng từ localStorage
function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    // Chuyển đổi lại addedAt từ string về Date
    return parsed.map((item: CartItem & { addedAt: string }) => ({
      ...item,
      addedAt: new Date(item.addedAt),
    }));
  } catch {
    return [];
  }
}

// Hàm lưu giỏ hàng vào localStorage
function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

// Component Provider cung cấp CartContext
export function CartProvider({ children }: { children: ReactNode }) {
  // State lưu trữ các items trong giỏ hàng
  const [items, setItems] = useState<CartItem[]>([]);

  // Đọc giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const cartItems = getCartFromStorage();
    setItems(cartItems);
  }, []);

  // Lưu vào localStorage mỗi khi items thay đổi
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  // Thêm khóa học vào giỏ hàng
  function addToCart(course: Omit<CartItem, 'addedAt'>) {
    // Kiểm tra nếu đã có trong giỏ hàng thì không thêm
    if (items.some((item) => item.id === course.id)) {
      return;
    }

    const newItem: CartItem = {
      ...course,
      addedAt: new Date(),
    };

    setItems([...items, newItem]);
  }

  // Xóa khóa học khỏi giỏ hàng
  function removeFromCart(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  // Xóa toàn bộ giỏ hàng
  function clearCart() {
    setItems([]);
  }

  // Kiểm tra khóa học đã có trong giỏ hàng chưa
  function isInCart(id: string) {
    return items.some((item) => item.id === id);
  }

  // Tính tổng giá tiền
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Đếm số lượng items
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook để sử dụng CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }
  return context;
}
