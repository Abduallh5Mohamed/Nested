"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Hero({ onVideoEnd, videoShouldPlay }: { onVideoEnd: () => void, videoShouldPlay: boolean }) {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd();
  };

  useEffect(() => {
    if (videoShouldPlay && videoRef.current) {
      videoRef.current.play();
    }
  }, [videoShouldPlay]);

  return (
    <section className={cn(
        "relative w-full h-[100dvh] flex items-center justify-center text-center overflow-hidden transition-colors duration-1000",
        videoEnded ? "bg-[#000822]" : "bg-white"
    )}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 flex items-center justify-center">
        <video
          ref={videoRef}
          muted
          playsInline
          onEnded={handleVideoEnd}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-opacity duration-1000",
            "object-contain md:object-cover",
            videoEnded ? "opacity-0" : "opacity-100"
          )}
        >
          <source src="/assets/Nested_Intro.mp4" type="video/mp4" />
        </video>
        <div className={cn(
          "absolute w-full h-full transition-opacity duration-1000",
          videoEnded ? "opacity-100" : "opacity-0"
        )}>
          <Image
            src="/assets/Hero_Background.jpg"
            alt="Cosmic background"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className={cn(
              "transition-transform duration-1000 object-contain md:object-cover transform-gpu translate-y-16"
            )}
            data-ai-hint="space stars"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </div>
      <div 
        className={cn(
          "container relative px-4 md:px-6 transition-opacity duration-1000 delay-500",
          videoEnded ? "opacity-100" : "opacity-0"
        )}
      >
        
      </div>
       {/* Wavy section separator */}
      <div className={cn("absolute bottom-0 left-0 w-full leading-none transition-opacity duration-1000 delay-500", videoEnded ? "opacity-100" : "opacity-0")}>
        <svg
          className="relative block w-full h-[100px] md:h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="waves">
            <use
              xlinkHref="#gentle-wave"
              x="75"
              y="0"
              fill="rgba(247,247,247,0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="75"
              y="3"
              fill="rgba(247,247,247,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="75"
              y="6"
              fill="hsl(var(--off-white-background))"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}
