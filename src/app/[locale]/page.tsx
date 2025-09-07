"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Features from '@/components/sections/features';
import CaseStudies from '@/components/sections/case-studies';
import Insights from '@/components/sections/insights';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import Preloader from '@/components/layout/preloader';
import AnimatedSection from '@/components/ui/animated-section';

export default function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on page load
    window.history.scrollRestoration = 'manual';
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <>
      <Preloader onLoaded={() => setIsLoading(false)} />
      <div className="flex flex-col min-h-[100dvh] bg-background">
        <Header videoEnded={videoEnded} />
        <Hero onVideoEnd={handleVideoEnd} videoShouldPlay={!isLoading} />
        <main className="flex-1 bg-[hsl(var(--off-white-background))] text-[hsl(var(--dark-text))]">
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Services /></AnimatedSection>
          <AnimatedSection><Features /></AnimatedSection>
          <AnimatedSection><CaseStudies /></AnimatedSection>
          <AnimatedSection><Insights /></AnimatedSection>
          <AnimatedSection><Contact /></AnimatedSection>
        </main>
        <Footer />
      </div>
    </>
  );
}
