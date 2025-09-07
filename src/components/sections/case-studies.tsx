"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function CaseStudies() {
  const t = useTranslations('CaseStudies');
  const caseStudies = [
    {
      title: t('study1Title'),
      description: t('study1Desc'),
      image: "/assets/ai-chatbot-screenshot-1.png",
      aiHint: "dashboard analytics",
      tags: [t('study1Tag1'), t('study1Tag2'), t('study1Tag3')]
    },
    {
      title: t('study2Title'),
      description: t('study2Desc'),
      image: "/assets/Screenshot 2025-09-02 182401.png",
      aiHint: "ecommerce interface",
      tags: [t('study2Tag1'), t('study2Tag2'), t('study2Tag3')]
    },
    {
      title: t('study3Title'),
      description: t('study3Desc'),
      image: "/assets/Screenshot 2025-09-02 190255.png",
      aiHint: "chatbot interface",
      tags: [t('study3Tag1'), t('study3Tag2'), t('study3Tag3')]
    }
  ]

  return (
    <section id="case-studies" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">{t('tagline')}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-black">{t('title')}</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
              {t('description')}
            </p>
        </div>
        <div className="grid gap-24">
          {caseStudies.map((study, index) => (
            <div key={study.title} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className={`relative rounded-2xl overflow-hidden group shadow-2xl shadow-gray-900/10 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={study.aiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
              </div>

              <div className={`space-y-6 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <h3 className="text-3xl lg:text-4xl font-bold font-headline text-black/90">
                  {study.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                    {study.tags.map(tag => (
                        <div key={tag} className="text-sm font-medium bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full border border-blue-500/20">{tag}</div>
                    ))}
                </div>
                <p className="text-gray-600 text-lg md:text-xl/relaxed">
                  {study.description}
                </p>
                <Button asChild variant="link" size="lg" className="px-0 text-lg text-blue-600 hover:text-blue-500">
                  <Link href="#">{t('readCaseStudy')} <ArrowRight className="ms-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
