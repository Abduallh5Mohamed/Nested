import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Locale-aware layout (nested). Root <html>/<body> are defined in app/layout.tsx.
export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        data-locale={locale}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="locale-container"
      >
        {children}
        <Toaster />
      </div>
    </NextIntlClientProvider>
  );
}
