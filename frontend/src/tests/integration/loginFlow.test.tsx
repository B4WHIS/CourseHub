import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/login/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/login',
}));

describe('Login Integration Test', () => {
  beforeEach(() => {
    localStorage.clear();
    const usersData = [
      { id: '1', name: 'Admin', email: 'admin@coursehub.vn', password: '123', role: 'admin' },
      { id: '2', name: 'Student', email: 'student@coursehub.vn', password: '123', role: 'student' },
    ];
    localStorage.setItem('usersList', JSON.stringify(usersData));
  });

  it('completes login flow with valid credentials', async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu');
    const submitButton = screen.getByRole('button', { name: 'Đăng nhập' });

    fireEvent.change(emailInput, { target: { value: 'admin@coursehub.vn' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('fakeSession')).toBeTruthy();
    });
  });

  it('does not create session with invalid credentials', async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu');
    const submitButton = screen.getByRole('button', { name: 'Đăng nhập' });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const session = localStorage.getItem('fakeSession');
      expect(session).toBeFalsy();
    });
  });
});
