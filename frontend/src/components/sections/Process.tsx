import * as React from "react";
import { processSteps } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Search, FileText, Wrench, Rocket, ArrowRight } from "lucide-react";

const iconMap = {
  Search,
  FileText,
  Wrench,
  Rocket,
};

export function Process() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 text-left sm:text-center sm:mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
            <span>OUR PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How we work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            A simple, transparent process to turn your ideas into real results.
          </p>
        </div>

        {/* 4 Process Step Cards with Connecting Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => {
            const Icon = iconMap[step.iconName as keyof typeof iconMap] || Search;

            return (
              <div key={step.step} className="relative flex">
                <Card className="w-full flex flex-col justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm shadow-blue-500/30">
                        {step.step}
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>

                {/* Connecting arrow between cards on desktop */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 pointer-events-none">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

