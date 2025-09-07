"use client";

import { Target, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-black">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold font-headline mb-4 text-black">{t('missionTitle')}</h3>
            <p className="text-gray-600 text-lg mb-6">
              {t('missionDescription')}
            </p>
            <div className="flex items-center text-blue-600">
              <Target className="w-8 h-8 me-4" />
              <span className="text-xl font-semibold">{t('missionTagline')}</span>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold font-headline mb-4 text-black">{t('visionTitle')}</h3>
            <p className="text-gray-600 text-lg mb-6">
              {t('visionDescription')}
            </p>
            <div className="flex items-center text-blue-600">
              <Eye className="w-8 h-8 me-4" />
              <span className="text-xl font-semibold">{t('visionTagline')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
