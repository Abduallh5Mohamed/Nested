'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { ArrowLeft, Calendar, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { type InsightArticle } from '@/ai/flows/insights-generator';
import { Skeleton } from '@/components/ui/skeleton';
import InteractiveInsightIcon from '@/components/ui/interactive-insight-icon';

function ArticlePageContent() {
  const params = useParams();
  const t = useTranslations('Insights');
  const [article, setArticle] = useState<InsightArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async (slugStr: string) => {
      // Try sessionStorage first
      let found = false;
      if (typeof window !== 'undefined') {
        try {
          const storedArticle = window.sessionStorage.getItem(`article-${slugStr}`);
          if (storedArticle) {
            setArticle(JSON.parse(storedArticle));
            found = true;
          }
        } catch (error) {
          console.error('Could not retrieve article from session storage', error);
        }
      }
      // If not found, fetch from Gemini API
      if (!found) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAYUegFJOJwTYMxZMTzYs6fBX2JzMgoH0g`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `Generate a tech insight article with slug: ${slugStr}. Return JSON with title, slug, description, content, author, date, imageTopic.` }]
              }]
            })
          });
          const data = await res.json();
          // Gemini returns content in a nested structure, extract JSON from text
          let articleJson = null;
          if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            try {
              articleJson = JSON.parse(data.candidates[0].content.parts[0].text);
              setArticle(articleJson);
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(`article-${slugStr}`, JSON.stringify(articleJson));
              }
            } catch (e) {
              console.error('Failed to parse Gemini API response', e);
            }
          }
        } catch (error) {
          console.error('Failed to fetch article from Gemini API', error);
        }
      }
      setLoading(false);
    };
    const slug = params.slug;
    if (slug) {
      const slugStr = Array.isArray(slug) ? slug[0] : slug;
      fetchArticle(slugStr);
    } else {
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Skeleton className="h-8 w-1/4 mb-12" />
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-12" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-11/12 mb-4" />
      </div>
    );
  }

  const tInsights = useTranslations('Insights');
  if (!article) {
    return (
      <div className="text-center py-24">
        <p className="text-black">{tInsights('articleNotFound')}</p>
        <p className="text-gray-600 mb-4">{tInsights('articleNotFoundDesc')}</p>
        <Link href="/" passHref>
          <Button>{tInsights('goHome')}</Button>
        </Link>
      </div>
    );
  }

  const { title, content, author, date } = article;
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/#insights" scroll={false} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors mb-8">
        <ArrowLeft size={16} />
        {t('backToInsights')}
      </Link>
      <article>
        <header className="mb-12">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-xl bg-muted">
            <InteractiveInsightIcon />
          </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-black mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8"><AvatarFallback><Bot size={16} /></AvatarFallback></Avatar>
                <span className="font-medium">{author}</span>
              </div>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{date}</span>
              </div>
            </div>
        </header>
        <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-black prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header videoEnded={true} />
      <main className="flex-1 pt-20 bg-[hsl(var(--off-white-background))] text-[hsl(var(--dark-text))]">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <Suspense fallback={<div>Loading...</div>}>
            <ArticlePageContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
