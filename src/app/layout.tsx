import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_URL, SUPPORTED_LOCALES } from '@/config/seo';

// Root metadata (locale-agnostic). Locale-specific adjustments can be done in [locale]/layout.tsx if needed.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Nested – Innovative Tech Solutions (Web, Mobile, AI)', template: '%s | Nested' },
  description: 'Nested delivers high-performance web, mobile, and AI solutions. Custom development, localization, scalability, and modern user experience with measurable business impact.',
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Nested','web development','mobile apps','AI','cloud','startup','agency','software company','performance','SEO','RTL','Arabic','internationalization'],
  authors: [{ name: 'Abduallh' }, { name: 'Baraa' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  colorScheme: 'light',
  icons: { icon: '/assets/Cutted_Nested.png' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Nested – Innovative Tech Solutions (Web, Mobile, AI)',
    siteName: SITE_NAME,
    description: 'Custom web, mobile & AI solutions with modern UX and measurable outcomes.',
    images: [ { url: '/assets/ai-chatbot-screenshot-1.png', width: 1200, height: 630, alt: 'Nested – Web & AI Solutions' } ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nested – Innovative Tech Solutions (Web, Mobile, AI)',
    description: 'Full-stack development, AI integration & performance-first approach.',
    images: ['/assets/ai-chatbot-screenshot-1.png']
  },
  alternates: { canonical: SITE_URL, languages: Object.fromEntries(SUPPORTED_LOCALES.map(l => [l, `${SITE_URL}/${l}`])) },
  category: 'technology'
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
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/assets/Cutted_Nested.png`,
              sameAs: [],
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
