"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";
import { Linkedin, Facebook, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.25.13.43.2.55.32.12.13.18.28.18.45 0 .2-.06.38-.18.53s-.28.26-.45.33c-.18.08-.4.12-.65.12-.22 0-.46-.03-.7-.1-.24-.07-.54-.17-.9-.33s-.7-.38-1.04-.63c-.34-.25-.6-.55-.8-.9-.2-.34-.36-.7-.48-1.07-.12-.37-.18-.73-.18-1.1s.06-.7.18-1.02.28-.6.48-.85.45-.48.75-.64.6-.28.9-.36c.3-.08.58-.12.84-.12.22 0 .4.02.54.05.14.03.26.08.36.12s.18.1.24.15.1.1.14.15.06.1.06.14c0 .05-.01.1-.02.14s-.03.08-.06.12a.89.89 0 0 1-.16.18c-.06.07-.12.13-.18.18-.06.05-.12.1-.18.14s-.12.08-.18.1-.12.04-.18.04c-.06,0-.12-.01-.18-.03s-.12-.04-.18-.06a1.6 1.6 0 0 0-.24-.12 3.4 3.4 0 0 0-.36-.18c-.1-.06-.2-.1-.28-.13s-.17-.04-.24-.04c-.1,0-.18.02-.26.05s-.15.08-.2.13c-.06.05-.1.1-.14.15s-.08.1-.1.14c-.02.04-.04.08-.06.12s-.03.08-.04.12-.02.08-.02.12c0 .02,0 .04.02.06s0 .05.02.08a.3.3 0 0 0 .04.08c.01.03.03.06.05.08.1.1.2.2.3.3.1.1.2.2.3.3.1.1.2.2.3.2.1,0,.2,0,.3-.1s.2-.1.3-.2c.1-.1.1-.2.2-.3a.3.3 0 0 1 .1-.2c.03-.05.05-.1.06-.13s.03-.06.03-.1c0-.05-.01-.1-.03-.13s-.04-.06-.06-.08a.5.5 0 0 0-.1-.08.4.4 0 0 1-.06-.12c.06-.02.12-.04.18-.06s.12-.04.18-.06.12-.03.18-.03c.06,0,.12,0,.18.01s.12.03.18.04.12.04.18.06.1.04.15.06.1.04.13.06zM12 2a10 10 0 0 0-10 10c0 1.8.48 3.5 1.34 5L2 22l5.4-1.35c1.4.84 3.1 1.35 4.93 1.35h.01c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
);

const socialLinks = [
    { icon: <WhatsAppIcon className="h-5 w-5" />, href: "https://wa.me/201271773837", label: "WhatsApp" },
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/profile.php?id=61579099606317", label: "Facebook" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/nestedtech/", label: "LinkedIn" },
];

export default function Footer() {
  const t = useTranslations('Footer');

  const footerLinks = [
      { title: t('platformTitle'), links: [
          { label: t('solutionsLink'), href: '#' },
          { label: t('pricingLink'), href: '#' },
          { label: t('partnersLink'), href: '#' },
          { label: t('integrationsLink'), href: '#' }
      ] },
      { title: t('companyTitle'), links: [
          { label: t('aboutUsLink'), href: '#about' },
          { label: t('careersLink'), href: '#' },
          { label: t('pressLink'), href: '#' },
          { label: t('newsLink'), href: '#insights' }
      ] },
      { title: t('resourcesTitle'), links: [
          { label: t('blogLink'), href: '#insights' },
          { label: t('newsletterLink'), href: '#' },
          { label: t('eventsLink'), href: '#' },
          { label: t('helpCenterLink'), href: '#' }
      ] },
  ];

  return (
    <footer className="bg-secondary/20 text-foreground border-t border-border/20">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-12">
            <div className="space-y-4 md:col-span-4">
                 <Logo className="text-foreground" />
                <p className="text-sm text-muted-foreground max-w-sm">
                    {t('description')}
                </p>
                <div className="flex space-x-2 mt-4">
                    {socialLinks.map(link => (
                        <Button key={link.label} variant="ghost" size="icon" asChild className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-full">
                           <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                               {link.icon}
                           </a>
                        </Button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm md:col-span-5">
                {footerLinks.map(section => (
                    <div key={section.title}>
                        <h3 className="font-semibold mb-4 text-foreground/90">{section.title}</h3>
                        <ul className="space-y-3">
                            {section.links.map(link => (
                                <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="space-y-4 md:col-span-3">
                <h3 className="font-semibold text-foreground/90">{t('newsletterTitle')}</h3>
                <p className="text-sm text-muted-foreground">{t('newsletterDesc')}</p>
                <form className="flex space-x-2">
                    <Input type="email" placeholder={t('newsletterPlaceholder')} className="flex-1 bg-background/50 border-border/50 focus:ring-primary" />
                    <Button type="submit" variant="default" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shrink-0">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
        <div className="mt-12 border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <Link href="#" className="hover:text-primary transition-colors">{t('privacyPolicy')}</Link>
             <Link href="#" className="hover:text-primary transition-colors">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
