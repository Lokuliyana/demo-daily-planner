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
 * Builds a list of candidate URLs to fetch the animation from,
 * ensuring it works seamlessly on local dev, root hosting, and GitHub Pages subpaths.
 */
function getCandidateUrls(src: string): string[] {
  if (!src) return [];
  
  let cleanSrc = src;
  if (cleanSrc.toLowerCase().endsWith('.lottie')) {
    cleanSrc = cleanSrc.slice(0, -7) + '.json';
  }

  // If already absolute HTTP / data URI, return as-is
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://') || cleanSrc.startsWith('data:')) {
    return [cleanSrc];
  }

  const filename = cleanSrc.split('/').pop() || '';
  const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Detect runtime subpath on GitHub Pages if window is available
  let runtimeBasePath = '';
  if (typeof window !== 'undefined') {
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0] === 'demo-daily-planner') {
      runtimeBasePath = '/demo-daily-planner';
    }
  }

  const effectiveBasePath = basePathEnv || runtimeBasePath;

  const normalizedPath = cleanSrc.startsWith('/') ? cleanSrc : `/${cleanSrc}`;
  const candidates: string[] = [];

  // 1. Path with effective base path (e.g. /demo-daily-planner/animation/...)
  if (effectiveBasePath && !normalizedPath.startsWith(effectiveBasePath)) {
    candidates.push(`${effectiveBasePath}${normalizedPath}`);
  }

  // 2. Exact normalized path (e.g. /animation/...)
  candidates.push(normalizedPath);

  // 3. GitHub Pages explicit repository path fallback
  if (!normalizedPath.startsWith('/demo-daily-planner')) {
    candidates.push(`/demo-daily-planner${normalizedPath}`);
  }

  // 4. Relative path from current document
  candidates.push(`.${normalizedPath}`);

  // 5. Lowercase hyphenated alternatives if filename has spaces or uppercase
  if (filename) {
    const slugName = filename.toLowerCase().replace(/\s+/g, '-');
    if (slugName !== filename.toLowerCase()) {
      if (effectiveBasePath) candidates.push(`${effectiveBasePath}/animation/${slugName}`);
      candidates.push(`/animation/${slugName}`);
      candidates.push(`/demo-daily-planner/animation/${slugName}`);
    }
  }

  // Deduplicate candidates
  return Array.from(new Set(candidates));
}

/**
 * High-performance, viewport-aware Lottie player.
 * - Resolves GitHub Pages basePath automatically.
 * - Pauses when scrolled out of view to consume 0% CPU and eliminate memory build-up.
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

  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;
    if (!container || !src) return;

    let observer: IntersectionObserver | null = null;

    // Load and initialize Lottie animation data from candidates
    const initLottie = async () => {
      try {
        const lottieModule = await import('lottie-web');
        const lottie = lottieModule.default || lottieModule;

        if (isCancelled || !containerRef.current) return;

        let animData: Record<string, unknown> | null = (animationCache.get(src) as Record<string, unknown>) || null;

        if (!animData) {
          const candidates = getCandidateUrls(src);
          let fetchSuccess = false;

          for (const url of candidates) {
            try {
              const res = await fetch(encodeURI(url));
              if (res.ok) {
                const json = await res.json();
                if (json && typeof json === 'object') {
                  animData = json;
                  animationCache.set(src, json);
                  fetchSuccess = true;
                  break;
                }
              }
            } catch {
              // Try next candidate
            }
          }

          if (!fetchSuccess || !animData) {
            console.warn('Could not load Lottie animation from any candidate URL for:', src);
            return;
          }
        }

        if (isCancelled || !containerRef.current) return;

        // Clear container before rendering
        containerRef.current.innerHTML = '';

        // Initialize animation with SVG renderer
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

        animItemRef.current = anim;
        setIsLoaded(true);

        // If visible when loaded, ensure playing
        if (isVisibleRef.current && autoplay !== false) {
          anim.play();
        } else {
          anim.pause();
        }
      } catch (err) {
        console.warn('Lottie loading error for:', src, err);
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
          rootMargin: '100px 0px 100px 0px',
          threshold: 0.05,
        }
      );

      observer.observe(container);
    } else {
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
  }, [src, loop, autoplay, speed]);

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
        contain: 'layout style paint',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
