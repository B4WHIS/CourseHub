// File main.tsx - Điểm khởi đầu chính của ứng dụng React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/ui/Toast';
import './styles/globals.css';

// Khởi tạo ứng dụng React với Vite
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ToastProvider />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
