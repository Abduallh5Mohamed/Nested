"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link, useRouter } from "@/navigation";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useTranslations } from 'next-intl';
import { type InsightArticle } from '@/ai/flows/insights-generator';
import { Skeleton } from '@/components/ui/skeleton';
import InteractiveInsightIcon from '@/components/ui/interactive-insight-icon';

// Hardcoded articles to prevent API quota errors
const staticArticles: InsightArticle[] = [
    {
        title: "The Transformative Power of Mobile Apps for Retail Businesses",
        slug: "mobile-apps-for-retail-businesses",
        description: "Discover how a custom mobile application can revolutionize customer engagement and drive sales for your retail brand.",
        content: "In today's competitive retail landscape, a mobile app is no longer a luxury—it's a necessity. A well-designed mobile application serves as a direct channel to your customers, offering personalized experiences, loyalty programs, and a seamless shopping journey. From push notifications about sales to in-app exclusive offers, mobile apps foster a level of engagement that websites alone cannot match.\n\nFurthermore, mobile apps provide invaluable data on customer behavior. By analyzing how users interact with your app, you can gain deep insights into their preferences, purchase history, and browsing habits. This data empowers you to make informed decisions on inventory, marketing strategies, and product development, ultimately leading to a more profitable business model.\n\nAt Nested, we specialize in creating bespoke mobile applications that not only look stunning but are also engineered for performance and scalability. We work closely with our clients to understand their unique challenges and develop a mobile strategy that delivers measurable results, from increased customer retention to significant revenue growth.",
        author: "Alex Morgan",
        date: "July 22, 2024",
        imageTopic: "retail app"
    },
    {
        title: "Why UI/UX is the Cornerstone of Successful Web Applications",
        slug: "ui-ux-for-web-applications",
        description: "A deep dive into why intuitive and beautiful user interfaces are critical for the success of any modern web application.",
        content: "A powerful backend and robust features are essential, but without a compelling User Interface (UI) and a seamless User Experience (UX), even the most advanced web application can fail. UI/UX design is the bridge between your technology and your users. It's the first impression and the lasting memory of your brand. An intuitive interface reduces the learning curve, making it easy for users to find value in your product quickly.\n\nA great UX goes beyond aesthetics; it's about understanding the user's journey and anticipating their needs. This involves a meticulous process of research, wireframing, prototyping, and user testing. The goal is to create a flow that feels natural and effortless, guiding the user towards their goals without friction. This focus on the user not only increases satisfaction but also drives key business metrics like conversion rates and user retention.\n\nOur design philosophy at Nested is human-centric. We believe that technology should be accessible and enjoyable for everyone. Our team of UI/UX experts collaborates with you to craft interfaces that are not only visually stunning but also strategically designed to meet your business objectives and delight your users.",
        author: "Samantha Chen",
        date: "July 21, 2024",
        imageTopic: "app interface"
    },
    {
        title: "PWAs vs. Native Apps: Choosing the Right Strategy for Your Business",
        slug: "pwas-vs-native-apps",
        description: "An essential guide to understanding the pros and cons of Progressive Web Apps and Native Applications for your next project.",
        content: "One of the most critical decisions in modern application development is choosing between a Progressive Web App (PWA) and a Native App. Each approach has its unique strengths, and the right choice depends entirely on your business goals, target audience, and budget. Native apps, built specifically for iOS or Android, offer the highest level of performance and the deepest integration with device hardware, such as the camera, GPS, and push notifications.\n\nOn the other hand, PWAs offer a compelling alternative. Built with web technologies, they run in the browser and provide an app-like experience without the need for an app store download. They are discoverable by search engines, shareable via a simple URL, and a single codebase can serve all devices. This can lead to significantly lower development and maintenance costs. PWAs can also work offline and support push notifications, bridging the gap between web and native.\n\nDeciding which path to take requires a strategic analysis of your project's requirements. Do you need the raw performance and hardware access of a native app, or is the accessibility and cost-effectiveness of a PWA a better fit? At Nested, we provide expert consultation to help you navigate this choice, ensuring the technology you invest in is perfectly aligned with your vision for success.",
        author: "David Rodriguez",
        date: "July 20, 2024",
        imageTopic: "mobile development"
    }
];

function ArticleCard({ article }: { article: InsightArticle }) {
  const router = useRouter();
  const t = useTranslations('Insights');

  const handleReadArticle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      // Save the full article object to sessionStorage before navigating
      sessionStorage.setItem(`article-${article.slug}`, JSON.stringify(article));
      router.push(`/article/${article.slug}`);
    } catch (error) {
      console.error("Could not save article to session storage, navigating directly with fallback.", error);
      // Fallback navigation if sessionStorage fails
      router.push(`/article/${article.slug}`);
    }
  };
  
  return (
    <Card className="bg-white border-gray-200 overflow-hidden group transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 rounded-2xl flex flex-col">
      <Link href={`/article/${article.slug}`} onClick={handleReadArticle} className="block" aria-label={`Read more about ${article.title}`}>
        <InteractiveInsightIcon />
      </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1.5"><User size={14} /> {article.author}</div>
            <div className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</div>
        </div>
        <h3 className="text-xl font-bold font-headline mb-3 text-black/90 group-hover:text-blue-600 transition-colors">{article.title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{article.description}</p>
        <Link href={`/article/${article.slug}`} onClick={handleReadArticle} className="text-sm font-semibold text-blue-600 inline-flex items-center gap-2 group/link mt-auto">
          {t('readArticle')}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}

function ArticleSkeleton() {
    return (
        <Card className="bg-white border-gray-200 overflow-hidden rounded-2xl flex flex-col">
            <Skeleton className="w-full h-56" />
            <CardContent className="p-6 flex flex-col flex-grow">
                 <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-5 w-28 mt-auto" />
            </CardContent>
        </Card>
    )
}

export default function Insights() {
    const t = useTranslations('Insights');
    const [articles, setArticles] = useState<InsightArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // We are now using static articles, so we can just set them.
        setArticles(staticArticles);
        setLoading(false);
    }, []);

  return (
    <section id="insights" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">{t('tagline')}</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-black">{t('title')}</h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <>
                <ArticleSkeleton />
                <ArticleSkeleton />
                <ArticleSkeleton />
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
