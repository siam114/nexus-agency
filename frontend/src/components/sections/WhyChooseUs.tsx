import * as React from "react";
import { whyChooseUsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import {
  Target,
  Smartphone,
  MessageSquare,
  Gauge,
  ShieldCheck,
} from "lucide-react";

const iconMap = {
  Target,
  Smartphone,
  MessageSquare,
  Gauge,
  ShieldCheck,
};

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="max-w-2xl 2xl:max-w-3xl mb-12 sm:mb-16 text-left sm:text-center sm:mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
            <span>WHY CHOOSE US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Why Businesses Choose NexusAgency
          </h2>
          <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            We deliver business-focused solutions, responsive website experiences, and dependable ongoing support.
          </p>
        </div>

        {/* 5 Value Items in a Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 2xl:gap-6">
          {whyChooseUsData.map((item) => {
            const Icon =
              iconMap[item.iconName as keyof typeof iconMap] || MessageSquare;

            return (
              <Card
                key={item.id}
                className="relative overflow-hidden p-5 2xl:p-6 flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group"
              >
                {/* Subtle top glowing sheen */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
