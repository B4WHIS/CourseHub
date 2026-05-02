'use client';

// Cart Context để quản lý giỏ hàng với localStorage theo từng user
import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

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
  setCurrentUser: (email: string | null) => void;
}

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Key mặc định cho guest (người dùng chưa đăng nhập)
const GUEST_CART_KEY = 'cart_guest';

// Hàm tạo key localStorage theo email
function getCartKey(email: string | null): string {
  if (!email) {
    return GUEST_CART_KEY;
  }
  return `cart_${email}`;
}

// Hàm đọc giỏ hàng từ localStorage
function getCartFromStorage(cartKey: string): CartItem[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(cartKey);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return parsed.map((item: CartItem & { addedAt: string }) => ({
      ...item,
      addedAt: new Date(item.addedAt),
    }));
  } catch {
    return [];
  }
}

// Hàm lưu giỏ hàng vào localStorage
function saveCartToStorage(cartKey: string, items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(cartKey, JSON.stringify(items));
}

// Component Provider cung cấp CartContext
export function CartProvider({ children }: { children: ReactNode }) {
  // State lưu trữ các items trong giỏ hàng
  const [items, setItems] = useState<CartItem[]>([]);
  
  // State lưu email của user hiện tại
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  // Hàm để Navbar/Auth gọi khi user đăng nhập/đăng xuất
  const setCurrentUser = useCallback((email: string | null) => {
    setCurrentEmail(email);
  }, []);

  // Khi email thay đổi, đọc giỏ hàng tương ứng
  useEffect(() => {
    const cartKey = getCartKey(currentEmail);
    const cartItems = getCartFromStorage(cartKey);
    setItems(cartItems);
  }, [currentEmail]);

  // Lưu vào localStorage mỗi khi items thay đổi
  useEffect(() => {
    const cartKey = getCartKey(currentEmail);
    saveCartToStorage(cartKey, items);
  }, [items, currentEmail]);

  // Thêm khóa học vào giỏ hàng
  const addToCart = useCallback((course: Omit<CartItem, 'addedAt'>) => {
    setItems((prev) => {
      // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
      if (prev.some((item) => item.id === course.id)) {
        return prev; // Đã có rồi, không thêm nữa
      }
      // Thêm khóa học mới vào giỏ hàng
      return [...prev, { ...course, addedAt: new Date() }];
    });
  }, []);

  // Xóa khóa học khỏi giỏ hàng
  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Xóa toàn bộ giỏ hàng
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Kiểm tra khóa học đã có trong giỏ hàng chưa
  const isInCart = useCallback((id: string) => {
    return items.some((item) => item.id === id);
  }, [items]);

  // Tính tổng giá tiền
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  // Đếm số lượng items
  const itemCount = items.length;

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      totalPrice,
      itemCount,
      setCurrentUser,
    }),
    [items, addToCart, removeFromCart, clearCart, isInCart, totalPrice, itemCount, setCurrentUser]
  );

  return (
    <CartContext.Provider value={value}>
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