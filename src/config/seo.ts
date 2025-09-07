export const SITE_NAME = 'Nested';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'ar'] as const;

export const SITE_URL = ((): string => {
  if (typeof process !== 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  return 'http://localhost:3000';
})();

export const BASE_KEYWORDS = [
  'Nested','software','web','website','web development','frontend','backend','full stack','mobile','app','application','design','ui','ux','user experience','react','nextjs','next.js','typescript','firebase','cloud','deployment','seo','optimization','performance','accessibility','startup','agency','company','innovation','automation','ai','artificial intelligence','machine learning','LLM','chatbot','data','api','integration','digital transformation',
  'تطوير','موقع','مواقع','تصميم','برمجة','تطبيق','تطبيقات','شركة برمجة','شركة تقنية','سيو','تحسين محركات البحث','ذكاء اصطناعي','برمجة مواقع','تحول رقمي','خوارزميات','تحسين الأداء'
];

export function buildCanonical(path: string, locale?: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale && locale !== DEFAULT_LOCALE) return `${SITE_URL}/${locale}${clean === '/' ? '' : clean}`;
  return `${SITE_URL}${clean}`;
}

export function humanizeSlug(slug: string) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b([a-z])/g, (m) => m.toUpperCase()).trim();
}

export function articleKeywords(extra: string[] = []) {
  return Array.from(new Set([...BASE_KEYWORDS, ...extra]));
}
