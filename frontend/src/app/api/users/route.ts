import { NextResponse } from 'next/server';

const usersData = [
  { id: '1', name: 'Admin User', email: 'admin@coursehub.vn', role: 'admin', status: 'active' },
  { id: '2', name: 'Giảng viên A', email: 'instructor@coursehub.vn', role: 'instructor', status: 'active' },
  { id: '3', name: 'Học viên B', email: 'student@coursehub.vn', role: 'student', status: 'active' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: usersData });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = { ...body, id: Date.now().toString(), status: 'active' };
  usersData.push(newUser);
  return NextResponse.json({ success: true, data: newUser }, { status: 201 });
}
