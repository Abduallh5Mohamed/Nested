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
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback article for cases where API fails
  const createFallbackArticle = (slug: string): InsightArticle => ({
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Tech Insight`,
    slug,
    description: `An AI-generated insight about ${slug.replace(/-/g, ' ')}.`,
    content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

This is a dynamically generated tech insight article about ${slug.replace(/-/g, ' ')}.

## Overview
Technology continues to evolve rapidly, and staying updated with the latest trends is crucial for any development team.

## Key Points
- Modern web development requires robust architecture
- Mobile-first design is essential in today's landscape
- Performance optimization directly impacts user experience

## Conclusion
At Nested, we focus on delivering cutting-edge solutions that meet these modern requirements.`,
    author: 'Nested Team',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    imageTopic: 'tech innovation'
  });

  useEffect(() => {
    if (!mounted) return;
    
    const controller = new AbortController();
    const fetchArticle = async (slugStr: string) => {
      try {
        let found = false;
        if (typeof window !== 'undefined') {
          try {
            const storedArticle = window.sessionStorage.getItem(`article-${slugStr}`);
            if (storedArticle) {
              const parsed = JSON.parse(storedArticle);
              setArticle(parsed);
              found = true;
            }
          } catch (sessionError) {
            console.warn('SessionStorage error:', sessionError);
            // Continue to fallback
          }
        }
        
        if (!found) {
          try {
            const res = await fetch(`/api/articles/${slugStr}`, { signal: controller.signal });
            if (!res.ok) {
              throw new Error(`API returned ${res.status}`);
            } else {
              const data = await res.json();
              if (data?.article) {
                setArticle(data.article);
                if (typeof window !== 'undefined') {
                  try {
                    window.sessionStorage.setItem(`article-${slugStr}`, JSON.stringify(data.article));
                  } catch (storageError) {
                    console.warn('Storage error:', storageError);
                  }
                }
              } else {
                throw new Error('Invalid API response');
              }
            }
          } catch (apiError: any) {
            if (apiError.name !== 'AbortError') {
              console.warn('API failed, using fallback article:', apiError);
              // Use fallback article instead of showing error
              const fallbackArticle = createFallbackArticle(slugStr);
              setArticle(fallbackArticle);
              if (typeof window !== 'undefined') {
                try {
                  window.sessionStorage.setItem(`article-${slugStr}`, JSON.stringify(fallbackArticle));
                } catch (storageError) {
                  console.warn('Storage error:', storageError);
                }
              }
            }
          }
        }
      } catch (generalError) {
        console.error('General error in fetchArticle:', generalError);
        // Always provide fallback
        const fallbackArticle = createFallbackArticle(slugStr);
        setArticle(fallbackArticle);
      } finally {
        setLoading(false);
      }
    };

    const slug = params?.slug;
    if (slug) {
      const slugStr = Array.isArray(slug) ? slug[0] : String(slug);
      if (slugStr) {
        fetchArticle(slugStr);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    
    return () => {
      try {
        controller.abort();
      } catch (abortError) {
        console.warn('Abort error:', abortError);
      }
    };
  }, [params?.slug, mounted]);

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
  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <p className="text-gray-600 mb-4">حدث خطأ أثناء جلب أو عرض المقال. يرجى المحاولة لاحقًا.</p>
        <Link href="/" passHref>
          <Button>{tInsights('goHome')}</Button>
        </Link>
      </div>
    );
  }
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
  // Add error boundary-like behavior
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header videoEnded={true} />
        <main className="flex-1 pt-20 bg-[hsl(var(--off-white-background))] text-[hsl(var(--dark-text))]">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="text-center py-24">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">Please try refreshing the page.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-500">
                Go back to home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header videoEnded={true} />
      <main className="flex-1 pt-20 bg-[hsl(var(--off-white-background))] text-[hsl(var(--dark-text))]">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <Suspense fallback={<div className="text-center py-12">Loading article...</div>}>
            <ArticlePageContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
