import { NextResponse } from 'next/server';

const coursesData = [
  { id: '1', title: 'Lập trình React từ cơ bản đến nâng cao', price: 500000, category: 'Lập trình', level: 'Beginner' },
  { id: '2', title: 'JavaScript nâng cao', price: 400000, category: 'Lập trình', level: 'Intermediate' },
  { id: '3', title: 'Thiết kế UI/UX với Figma', price: 300000, category: 'Thiết kế', level: 'Beginner' },
  { id: '4', title: 'Node.js & Express cơ bản', price: 450000, category: 'Backend', level: 'Beginner' },
  { id: '5', title: 'Machine Learning với Python', price: 600000, category: 'AI/ML', level: 'Advanced' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  const category = searchParams.get('category') || '';
  const level = searchParams.get('level') || '';

  let results = coursesData.filter((c) => c.title.toLowerCase().includes(q));
  if (category) results = results.filter((c) => c.category === category);
  if (level) results = results.filter((c) => c.level === level);

  return NextResponse.json({ success: true, data: results, total: results.length });
}
