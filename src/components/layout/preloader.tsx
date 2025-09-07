"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import HourglassLoader from '@/components/ui/hourglass-loader';

export default function Preloader({ onLoaded }: { onLoaded: () => void }) {
  const [isHiding, setIsHiding] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const t = useTranslations('Preloader');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsHiding(true);
    }, 2500); // Start hiding animation after 2.5 seconds

    const timer2 = setTimeout(() => {
      setIsGone(true);
      onLoaded();
    }, 3500); // Component is gone after 3.5 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onLoaded]);

  if (isGone) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-transparent transition-opacity duration-1000",
        isHiding && "pointer-events-none"
      )}
    >
        <div
            className={cn(
                "absolute top-0 left-0 h-full w-1/2 bg-[hsl(var(--hero-background))] origin-left transition-transform duration-1000 ease-in-out",
                isHiding ? "scale-x-0" : "scale-x-100"
            )}
        />
        <div
            className={cn(
                "absolute top-0 right-0 h-full w-1/2 bg-[hsl(var(--hero-background))] origin-right transition-transform duration-1000 ease-in-out",
                isHiding ? "scale-x-0" : "scale-x-100"
            )}
        />
        <div className={cn("z-10 flex flex-col items-center gap-4 transition-opacity duration-500 w-64", isHiding ? "opacity-0" : "opacity-100")}>
             <HourglassLoader />
            <div className='w-full text-center'>
                 <p className="text-lg text-primary/80 mb-2 font-headline">{t('loading')}</p>
            </div>
        </div>
    </div>
  );
}
