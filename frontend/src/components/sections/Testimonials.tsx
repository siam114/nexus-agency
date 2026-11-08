"use client";

import * as React from "react";
import Image from "next/image";
import { useLiveTestimonials } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

export function Testimonials() {
  const testimonials = useLiveTestimonials();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState<number>(1200);

  // Responsive visible cards count
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = React.useMemo(() => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  }, [windowWidth]);

  const maxIndex = React.useMemo(() => {
    return Math.max(0, testimonials.length - visibleCount);
  }, [testimonials.length, visibleCount]);

  // Safe clamped index to prevent invalid slide calculation during responsive resize
  const safeIndex = Math.min(currentIndex, maxIndex);

  const next = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play timer (every 6 seconds, paused on hover)
  React.useEffect(() => {
    if (isPaused || testimonials.length <= visibleCount) return;
    const interval = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length, visibleCount, next]);

  // Touch and drag swipe state
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragStartX.current === null) return;
    if (dragOffset < -45) {
      next();
    } else if (dragOffset > 45) {
      prev();
    }
    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
    setIsPaused(false);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (!testimonials || testimonials.length === 0) return null;

  // Percentage shift for smooth sliding track
  const stepPercent = 100 / visibleCount;
  const baseTranslate = -(safeIndex * stepPercent);

  return (
    <section
      className="py-10 sm:py-14 lg:py-16 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-xl 2xl:max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
              <Sparkles className="h-3 w-3" />
              <span>TESTIMONIALS & REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Trusted by Ambitious Brands
            </h2>
            <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Real feedback from real founders, store owners, and team leads who scale with our technical solutions.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Slide Index Counter */}
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono hidden sm:block mr-1">
              <span className="text-slate-900 dark:text-white font-bold">
                {String(safeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs touch-manipulation"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs touch-manipulation"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Smooth Carousel Viewport */}
        <div
          className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex -mx-3"
            style={{
              transform: isDragging
                ? `translateX(calc(${baseTranslate}% + ${dragOffset}px))`
                : `translateX(${baseTranslate}%)`,
              transition: isDragging
                ? "none"
                : "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {testimonials.map((t, idx) => {
              const isCurrent =
                idx >= safeIndex && idx < safeIndex + visibleCount;

              return (
                <div
                  key={t.id || `testimonial-${idx}`}
                  className="px-3 shrink-0 flex-grow-0"
                  style={{
                    flexBasis: `${stepPercent}%`,
                    maxWidth: `${stepPercent}%`,
                  }}
                >
                  <Card
                    className={cn(
                      "h-full p-7 sm:p-8 flex flex-col justify-between rounded-3xl border bg-white dark:bg-slate-900/90 backdrop-blur-md shadow-sm relative group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isCurrent
                        ? "border-slate-200/90 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 hover:border-blue-500/50"
                        : "border-slate-200/60 dark:border-slate-800/60 opacity-90"
                    )}
                  >
                    {/* Top gradient highlight on hover */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Quote Icon & Rating Stars */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                          <Quote className="h-5 w-5 fill-current opacity-80" />
                        </div>
                        {t.rating && (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-amber-500">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Quote */}
                      <p className="text-sm sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        &ldquo;{t.content}&rdquo;
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3.5">
                      <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-500/50 bg-slate-100 dark:bg-slate-800 transition-all duration-300">
                        <Image
                          src={t.avatar || DEFAULT_AVATAR}
                          alt={t.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 truncate">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                            {t.name}
                          </h4>
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                          {t.role || "Client"}
                          {t.company ? ` • ${t.company}` : ""}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel indicator dots with smooth expandable active pill */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer touch-manipulation",
                  safeIndex === i
                    ? "w-8 bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500/30"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
