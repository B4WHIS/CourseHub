// Next.js Middleware - Bảo vệ route /admin và /instructor
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get('fakeSession');

  // Nếu không có cookie session thì cho phép qua (page tự redirect)
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.next();
  }

  try {
    const session = JSON.parse(sessionCookie.value);

    // Kiểm tra hết hạn
    if (Date.now() > session.expiry) {
      const response = NextResponse.next();
      response.cookies.delete('fakeSession');
      return response;
    }

    const role = session.user?.role;

    // Bảo vệ trang admin
    if (pathname.startsWith('/admin')) {
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    // Bảo vệ trang instructor (admin cũng được vào)
    if (pathname.startsWith('/instructor')) {
      if (role !== 'instructor' && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } catch {
    // Cookie bị lỗi thì xóa
    const response = NextResponse.next();
    response.cookies.delete('fakeSession');
    return response;
  }

  return NextResponse.next();
}

// Chỉ chạy middleware cho các route cần bảo vệ
export const config = {
  matcher: ['/admin/:path*', '/instructor/:path*'],
};
