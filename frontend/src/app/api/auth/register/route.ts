import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, message: 'Thiếu thông tin bắt buộc' }, { status: 400 });
  }

  const newUser = { id: Date.now().toString(), name, email, role: 'student', status: 'active' };
  return NextResponse.json({ success: true, data: newUser, message: 'Đăng ký thành công' }, { status: 201 });
}
