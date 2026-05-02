import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '@/app/login/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/login',
}));

describe('Login page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login form with title', () => {
    render(<Login />);
    expect(screen.getByText('Chào mừng đến CourseHub')).toBeTruthy();
  });

  it('renders email and password labels', () => {
    render(<Login />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Mật khẩu')).toBeTruthy();
  });

  it('renders submit button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: 'Đăng nhập' })).toBeTruthy();
  });

  it('renders register link', () => {
    render(<Login />);
    expect(screen.getByText('Tạo tài khoản mới')).toBeTruthy();
  });
});
