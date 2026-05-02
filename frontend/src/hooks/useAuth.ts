// useAuth hook - dùng Cookies thay vì localStorage
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

interface User {
  email: string;
  role: string;
  name: string;
  avatar?: string;
}

interface SessionData {
  user: User;
  expiry: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(() => {
    const raw = Cookies.get('fakeSession');
    if (!raw) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const session: SessionData = JSON.parse(raw);
      if (Date.now() > session.expiry) {
        // Hết hạn thì xóa cookie
        Cookies.remove('fakeSession');
        setUser(null);
      } else {
        setUser(session.user);
      }
    } catch {
      // Lỗi parse thì xóa cookie
      Cookies.remove('fakeSession');
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback((userData: User, hours: number = 24) => {
    const session: SessionData = {
      user: userData,
      expiry: Date.now() + hours * 60 * 60 * 1000,
    };
    // Lưu vào cookie, hết hạn sau số giờ quy định
    Cookies.set('fakeSession', JSON.stringify(session), {
      expires: hours / 24, // js-cookie tính bằng ngày
      path: '/',
    });
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('fakeSession');
    setUser(null);
  }, []);

  return { user, isLoading, login, logout, checkSession };
}
