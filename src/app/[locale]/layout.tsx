import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export const metadata: Metadata = {
  title: 'Nested - Innovative Tech Solutions for Web and Mobile Apps',
  description: 'Nested pioneers innovative technology solutions to elevate your business. Discover our services in web development, AI, and cloud computing. We specialize in creating custom websites and applications.',
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
    icon: '/assets/Cutted_Nested.png',
  }
};
 
export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/assets/Cutted_Nested.png" type="image/png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
