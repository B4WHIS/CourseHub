// Client wrapper cho các Provider cần 'use client'
'use client';

import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider />
      {children}
    </CartProvider>
  );
}
