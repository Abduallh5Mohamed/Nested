"use client";

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Bot, Smartphone, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations('Services');
  const services = [
    {
      icon: <Code className="w-10 h-10 text-blue-500" />,
      title: t('webApps'),
      description: t('webAppsDesc'),
    },
    {
      icon: <Bot className="w-10 h-10 text-purple-500" />,
      title: t('aiSolutions'),
      description: t('aiSolutionsDesc'),
    },
    {
      icon: <Smartphone className="w-10 h-10 text-green-500" />,
      title: t('mobileApps'),
      description: t('mobileAppsDesc'),
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-red-500" />,
      title: t('chatbots'),
      description: t('chatbotsDesc'),
    },
  ];

  return (
    <section id="services" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-black">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:-translate-y-2">
              <CardContent className="p-8 flex flex-col items-center text-center z-10">
                <div className="p-4 bg-gray-100 rounded-full mb-6 border border-gray-200 group-hover:bg-blue-100/50 group-hover:border-blue-300 transition-colors duration-300">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl mb-4 text-black/90">{service.title}</CardTitle>
                <CardDescription className="text-base text-gray-600 flex-grow">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
