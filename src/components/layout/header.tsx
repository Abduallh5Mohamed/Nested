"use client";

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export default function Header({ videoEnded }: { videoEnded: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#features', label: t('features') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <>
      <header className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl px-0 md:px-4 transition-opacity duration-1000",
          videoEnded ? "opacity-100" : "opacity-0"
        )}>
        <div className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-6 bg-black/20 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            {/* Left side */}
            <div className="flex items-center gap-4">
                 <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden bg-white text-sky-400 hover:bg-gray-200 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.slice(0, 2).map((link) => (
                        <a
                        key={link.label}
                        href={link.href}
                        className="font-medium text-foreground transition-colors hover:text-foreground/80"
                        >
                        {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Center Logo */}
             <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-3xl shadow-md p-2 md:p-3">
                    <Logo className="text-primary" hideText={true} />
                </div>
            </Link>


            {/* Right side */}
            <div className="flex items-center gap-4">
                 <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.slice(2).map((link) => (
                        <a
                        key={link.label}
                        href={link.href}
                        className="font-medium text-foreground transition-colors hover:text-foreground/80"
                        >
                        {link.label}
                        </a>
                    ))}
                </nav>
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white text-sky-400 hover:bg-gray-200 rounded-full w-10 h-10 font-bold text-lg"
                    aria-label={t('toggleLanguage')}
                    onClick={toggleLanguage}
                >
                    {locale === 'en' ? 'ع' : 'EN'}
                </Button>
            </div>

        </div>
      </header>
      {isOpen && (
        <div className={cn(
            "fixed top-20 left-4 right-4 z-40 border bg-background/95 backdrop-blur-md rounded-xl p-4 md:hidden transition-opacity duration-1000",
             videoEnded ? "opacity-100" : "opacity-0"
            )}>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
