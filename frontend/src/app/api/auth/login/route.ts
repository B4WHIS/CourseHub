import { NextResponse } from 'next/server';

const VALID_USERS = [
  { id: '1', name: 'Admin', email: 'admin@coursehub.vn', password: '123', role: 'admin' },
  { id: '2', name: 'Giảng viên', email: 'instructor@coursehub.vn', password: '123', role: 'instructor' },
  { id: '3', name: 'Học viên', email: 'student@coursehub.vn', password: '123', role: 'student' },
];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = VALID_USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ success: false, message: 'Sai email hoặc mật khẩu' }, { status: 401 });
  }

  const { password: _, ...userWithoutPassword } = user;
  return NextResponse.json({ success: true, data: userWithoutPassword, token: 'fake-jwt-token-' + Date.now() });
}
