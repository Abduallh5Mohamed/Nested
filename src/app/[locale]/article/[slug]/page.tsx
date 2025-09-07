import type { Metadata } from 'next';
import { buildCanonical, humanizeSlug, articleKeywords } from '@/config/seo';
import ArticlePage from './ArticleClient';

type Params = { params: { slug: string; locale: string } };

export function generateMetadata({ params }: Params): Metadata {
  const { slug, locale } = params;
  const titleBase = humanizeSlug(slug || 'Article');
  const title = `${titleBase} | Nested Insights`;
  const description = `${titleBase} – An AI-generated insight article on ${titleBase}. Read more on Nested.`;
  const canonical = buildCanonical(`/article/${slug}`, locale);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      locale,
      images: [ { url: '/assets/ai-chatbot-screenshot-1.png', width: 1200, height: 630, alt: titleBase } ]
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/assets/ai-chatbot-screenshot-1.png'] },
    keywords: articleKeywords([titleBase.toLowerCase()])
  };
}

export default function Page() { return <ArticlePage />; }
