import { NextResponse } from 'next/server';

const coursesData = [
  { id: '1', title: 'Lập trình React từ cơ bản đến nâng cao', price: 500000, instructor: 'Nguyễn Văn A', category: 'Lập trình', level: 'Beginner', status: 'approved' },
  { id: '2', title: 'JavaScript nâng cao', price: 400000, instructor: 'Trần Thị B', category: 'Lập trình', level: 'Intermediate', status: 'approved' },
  { id: '3', title: 'Thiết kế UI/UX với Figma', price: 300000, instructor: 'Lê Văn C', category: 'Thiết kế', level: 'Beginner', status: 'approved' },
  { id: '4', title: 'Node.js & Express cơ bản', price: 450000, instructor: 'Phạm Thị D', category: 'Backend', level: 'Beginner', status: 'pending' },
  { id: '5', title: 'Machine Learning với Python', price: 600000, instructor: 'Hoàng Văn E', category: 'AI/ML', level: 'Advanced', status: 'approved' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const start = (page - 1) * limit;
  const end = start + limit;
  return NextResponse.json({
    success: true,
    data: coursesData.slice(start, end),
    total: coursesData.length,
    page,
    limit,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCourse = { ...body, id: Date.now().toString(), status: 'pending' };
  coursesData.push(newCourse);
  return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
}
