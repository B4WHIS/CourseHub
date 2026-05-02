// Root Layout của Next.js App Router
import type { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';

// SEO Metadata cho toàn bộ app
export const metadata: Metadata = {
  title: 'CourseHub - Nền tảng học trực tuyến',
  description: 'Đồ án React/Next.js năm 3 - Platform học trực tuyến E-learning',
  openGraph: {
    title: 'CourseHub - Nền tảng học trực tuyến',
    description: 'Khám phá, mua và tham gia các khóa học chất lượng cao',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
