"use client";

import Image from "next/image";
import { useLiveTestimonials } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

export function TestimonialsGrid() {
  const testimonials = useLiveTestimonials();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => (
        <Card
          key={t.id || `testimonials-grid-${idx}-${t.name}`}
          className="p-8 relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
        >
          <Quote className="h-8 w-8 text-blue-600/20 absolute top-6 right-6" />

          <div>
            {t.rating && (
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            )}
            <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              &ldquo;{t.content}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
              <Image
                src={t.avatar || DEFAULT_AVATAR}
                alt={t.name}
                fill
                unoptimized
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="truncate">
              <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                {t.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {t.role || "Client"}
                {t.company ? `, ${t.company}` : ""}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

