"use client";

import * as React from "react";
import Image from "next/image";
import { useLiveTestimonials } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

export function Testimonials() {
  const testimonials = useLiveTestimonials();
  const [startIndex, setStartIndex] = React.useState(0);

  const prev = () => {
    setStartIndex((current) =>
      current === 0 ? Math.max(testimonials.length - 1, 0) : current - 1
    );
  };

  const next = () => {
    setStartIndex((current) =>
      current >= testimonials.length - 1 ? 0 : current + 1
    );
  };

  const displayedTestimonials =
    testimonials.length > 0
      ? [
          ...testimonials.slice(startIndex),
          ...testimonials.slice(0, startIndex),
        ]
      : [];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Left/Right arrows on right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              Real feedback from real clients. We&apos;re proud to build long-term partnerships.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedTestimonials.map((t, idx) => (
            <Card
              key={t.id || `testimonial-${idx}-${t.name}`}
              className="p-6 sm:p-7 flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-7 w-7 text-blue-600/30 dark:text-blue-400/30" />
                  {t.rating && (
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={t.avatar || DEFAULT_AVATAR}
                    alt={t.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {t.role || "Client"}{t.company ? `, ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

