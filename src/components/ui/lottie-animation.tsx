'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { AnimationItem } from 'lottie-web';

// Global in-memory cache for fetched animation data to prevent repeat network requests
const animationCache = new Map<string, Record<string, unknown>>();

interface LottieAnimationProps {
  src: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Resolves animation URL to its JSON equivalent
 */
function resolveAnimationSrc(src: string): string {
  if (!src) return '';
  let cleanSrc = src;
  if (cleanSrc.toLowerCase().endsWith('.lottie')) {
    cleanSrc = cleanSrc.slice(0, -7) + '.json';
  }
  return cleanSrc;
}

/**
 * High-performance, viewport-aware Lottie player.
 * - Automatically pauses when scrolled out of view to consume 0% CPU and eliminate memory build-up.
 * - Resumes seamlessly when scrolled into view.
 * - Pauses when the browser tab is hidden/backgrounded.
 * - Lazy-loads animation assets only when approaching the viewport.
 */
export function LottieAnimation({
  src,
  className = '',
  width = '100%',
  height = '100%',
  loop = true,
  autoplay = true,
  speed = 0.7,
  style,
  onClick,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animItemRef = useRef<AnimationItem | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const resolvedSrc = resolveAnimationSrc(src);

  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;
    if (!container || !resolvedSrc) return;

    let animInstance: AnimationItem | null = null;
    let observer: IntersectionObserver | null = null;

    // Load and initialize Lottie animation
    const initLottie = async () => {
      try {
        const lottieModule = await import('lottie-web');
        const lottie = lottieModule.default || lottieModule;

        if (isCancelled || !containerRef.current) return;

        let animData = animationCache.get(resolvedSrc);

        if (!animData) {
          const res = await fetch(encodeURI(resolvedSrc));
          if (!res.ok) {
            throw new Error(`Failed to load Lottie animation: ${res.statusText}`);
          }
          animData = await res.json();
          if (animData && typeof animData === 'object') {
            animationCache.set(resolvedSrc, animData);
          }
        }

        if (isCancelled || !containerRef.current) return;

        // Clear container before rendering
        containerRef.current.innerHTML = '';

        // Initialize animation with SVG renderer
        // Note: autoplay is controlled by the intersection observer to save CPU
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: loop !== false,
          autoplay: autoplay !== false && isVisibleRef.current,
          animationData: animData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            progressiveLoad: true,
            hideOnTransparent: true,
            className: 'w-full h-full block pointer-events-none',
          },
        });

        const effectiveSpeed = typeof speed === 'number' ? speed : 0.7;
        anim.setSpeed(effectiveSpeed);

        // Fail-safe loop handler
        if (loop !== false) {
          anim.addEventListener('complete', () => {
            if (!isCancelled && animItemRef.current && isVisibleRef.current) {
              animItemRef.current.goToAndPlay(0, true);
            }
          });
        }

        animInstance = anim;
        animItemRef.current = anim;
        setIsLoaded(true);

        // If visible when loaded, ensure playing
        if (isVisibleRef.current && autoplay !== false) {
          anim.play();
        } else {
          anim.pause();
        }
      } catch (err) {
        console.warn('Lottie loading error for:', resolvedSrc, err);
      }
    };

    // Viewport Intersection Observer
    // Only runs/plays animation when the user is watching that part of the page
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            isVisibleRef.current = isIntersecting;

            if (isIntersecting) {
              // Lazy-init on first viewport entry if not yet created
              if (!animItemRef.current && !isCancelled) {
                initLottie();
              } else if (animItemRef.current && autoplay !== false) {
                animItemRef.current.play();
              }
            } else {
              // Offscreen: pause immediately to prevent CPU & memory drain
              if (animItemRef.current) {
                animItemRef.current.pause();
              }
            }
          });
        },
        {
          rootMargin: '100px 0px 100px 0px', // Preload / wake up slightly before entering viewport
          threshold: 0.05,
        }
      );

      observer.observe(container);
    } else {
      // Fallback if IntersectionObserver is unavailable
      isVisibleRef.current = true;
      initLottie();
    }

    // Tab visibility change handler
    const handleVisibilityChange = () => {
      if (!animItemRef.current) return;
      if (document.hidden) {
        animItemRef.current.pause();
      } else if (isVisibleRef.current && autoplay !== false) {
        animItemRef.current.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isCancelled = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
      if (animItemRef.current) {
        try {
          animItemRef.current.destroy();
        } catch {
          // Ignore destruction errors
        }
        animItemRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [resolvedSrc, loop, autoplay, speed]);

  const widthVal = typeof width === 'number' ? `${width}px` : width;
  const heightVal = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden shrink-0 transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        width: widthVal,
        height: heightVal,
        contain: 'layout style paint', // CSS containment to isolate layout calculations
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
