"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Rocket, Star, Laptop, LineChart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations('Features');

  return (
    <section id="features" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-black">
            {t('title')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 text-2xl font-headline text-black">
                <div className="flex -space-x-2">
                  <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  <Rocket className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                {t('scalabilityTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">
                {t('scalabilityDesc')}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 text-2xl font-headline text-black">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-bold text-black">4.9</span>
                </div>
                {t('clientSuccessTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">
                {t('clientSuccessDesc')}
              </p>
              <div className="flex items-center gap-4 mt-4">
                  <Laptop className="w-8 h-8 text-blue-600" />
                  <LineChart className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
