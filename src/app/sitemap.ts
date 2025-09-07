import type { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES, SITE_URL } from '@/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const localeEntries = SUPPORTED_LOCALES.map((loc) => ({
    url: `${SITE_URL}/${loc}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1
  }));
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    ...localeEntries
  ];
}
