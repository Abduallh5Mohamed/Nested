import type { Metadata } from 'next';
import './globals.css';

// Root metadata (locale-agnostic). Locale-specific adjustments can be done in [locale]/layout.tsx if needed.
export const metadata: Metadata = {
  title: 'Nested - Innovative Tech Solutions for Web and Mobile Apps',
  description:
    'Nested pioneers innovative technology solutions to elevate your business. Discover our services in web development, AI, and cloud computing. We specialize in creating custom websites and applications.',
  keywords: [
    'Nested',
    'web development',
    'mobile app development',
    'AI solutions',
    'تطوير مواقع',
    'تطوير تطبيقات',
    'حلول الذكاء الاصطناعي',
    'انشاء ويب سايت',
    'create a website',
    'انشاء ابلكيشن',
    'create an application',
    'تصميم مواقع',
    'برمجة تطبيقات',
    'شركة برمجة',
    'Baraa',
    'Abduallh'
  ],
  authors: [{ name: 'Abduallh' }, { name: 'Baraa' }],
  creator: 'Nested',
  publisher: 'Nested',
  icons: {
    icon: '/assets/Cutted_Nested.png'
  }
};

// The root layout must include <html> and <body>. Locale-specific direction & lang are handled in [locale]/layout.tsx wrapper.
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/Cutted_Nested.png" type="image/png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
