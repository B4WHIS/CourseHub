import { NextResponse } from 'next/server';

const enrollments: { id: string; userId: string; courseId: string; progress: number; enrolledAt: string }[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const userEnrollments = userId ? enrollments.filter((e) => e.userId === userId) : enrollments;
  return NextResponse.json({ success: true, data: userEnrollments, total: userEnrollments.length });
}

export async function POST(request: Request) {
  const { userId, courseId } = await request.json();
  const exists = enrollments.find((e) => e.userId === userId && e.courseId === courseId);
  if (exists) {
    return NextResponse.json({ success: false, message: 'Đã đăng ký khóa học này' }, { status: 400 });
  }
  const newEnrollment = { id: Date.now().toString(), userId, courseId, progress: 0, enrolledAt: new Date().toISOString() };
  enrollments.push(newEnrollment);
  return NextResponse.json({ success: true, data: newEnrollment }, { status: 201 });
}
