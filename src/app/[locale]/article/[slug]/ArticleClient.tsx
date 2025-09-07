'use client';
import { useEffect, useState } from 'react';
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

function ArticlePageContent() {
  const params = useParams();
  const t = useTranslations('Insights');
  const [article, setArticle] = useState<InsightArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const createFallbackArticle = (slug: string): InsightArticle => ({
      title: `2025 Tech Analysis: ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      slug,
      description: `Latest 2025 insights about ${slug.replace(/-/g, ' ')}.`,
      content: `# 2025 Tech Analysis: ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

Welcome to our comprehensive 2025 analysis of ${slug.replace(/-/g, ' ')}.

## Current State of Technology
The technology landscape in 2025 continues to evolve at an unprecedented pace, with ${slug.replace(/-/g, ' ')} at the forefront of innovation.

## Key Trends and Innovations
- AI-powered development tools are revolutionizing workflows
- Cloud-native solutions are becoming the standard
- User experience design is more crucial than ever
- Security-first approaches are mandatory for modern applications

## Market Impact and Adoption
Organizations worldwide are embracing ${slug.replace(/-/g, ' ')} to:
- Accelerate digital transformation initiatives
- Improve operational efficiency and reduce costs
- Enhance customer experience and engagement
- Stay competitive in rapidly evolving markets

## Future Outlook
Looking ahead to late 2025 and beyond, we anticipate:
- Continued integration with emerging technologies
- Greater accessibility for businesses of all sizes
- Enhanced automation and intelligent features
- Stronger focus on sustainability and ethical development

## Conclusion
At Nested, we're committed to helping organizations navigate this technological evolution and leverage ${slug.replace(/-/g, ' ')} for sustainable growth and success.`,
      author: Math.random() > 0.5 ? 'Abduallh' : 'Baraa',
      date: 'September 7, 2025',
      imageTopic: 'tech innovation'
    });

    const loadArticle = async () => {
      try {
        const slug = params?.slug;
        if (!slug || !isMounted) return;
        
        const slugStr = Array.isArray(slug) ? slug[0] : String(slug);
        
        // Try sessionStorage first (only on client)
        if (typeof window !== 'undefined') {
          try {
            const stored = sessionStorage.getItem(`article-${slugStr}`);
            if (stored && isMounted) {
              setArticle(JSON.parse(stored));
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn('SessionStorage error:', e);
          }
        }

        // Fallback to creating article
        if (isMounted) {
          const fallback = createFallbackArticle(slugStr);
          setArticle(fallback);
          
          // Save to sessionStorage
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.setItem(`article-${slugStr}`, JSON.stringify(fallback));
            } catch (e) {
              console.warn('Storage save error:', e);
            }
          }
        }
      } catch (error) {
        console.warn('Article loading error:', error);
        if (isMounted) {
          const slug = params?.slug;
          const slugStr = Array.isArray(slug) ? slug[0] : String(slug || 'default');
          setArticle(createFallbackArticle(slugStr));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArticle();
    
    return () => {
      isMounted = false;
    };
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="h-8 w-1/4 mb-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-96 w-full mb-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 w-3/4 mb-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-1/2 mb-12 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-24">
        <p className="text-black mb-4">Article not found</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const { title, content, author, date } = article;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/#insights" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors mb-8">
        <ArrowLeft size={16} />
        {t('backToInsights')}
      </Link>
      <article>
        <header className="mb-12">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-6xl text-blue-500 opacity-50">💡</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                {article.authorImage ? (
                  <img 
                    src={article.authorImage}
                    alt={author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                  {author === 'Abduallh' ? 'AB' : author === 'Baraa' ? 'BR' : author === 'Nested Team' ? 'NT' : 'AI'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{author}</span>
                <span className="text-xs text-gray-500">
                  {author === 'Abduallh' ? 'Full-Stack Developer' : 
                   author === 'Baraa' ? 'UI/UX Designer' : 
                   author === 'Nested Team' ? 'Development Team' : 'AI Assistant'}
                </span>
              </div>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
          </div>
        </header>
        <div className="prose prose-lg max-w-none text-gray-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--off-white-background))]">
      <Header videoEnded={true} />
      <main className="flex-1 pt-20 bg-[hsl(var(--off-white-background))] text-[hsl(var(--dark-text))]">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <ArticlePageContent />
        </div>
      </main>
      <div className="bg-black text-white">
        <Footer />
      </div>
    </div>
  );
}
