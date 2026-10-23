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
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left sm:text-center sm:mx-auto">
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

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = iconMap[step.iconName as keyof typeof iconMap] || Search;

            return (
              <div key={step.step} className="flex">
                <Card className="group w-full flex flex-col justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer">
                  <div>
                    {/* Step Number, Icon & Sequence Indicator */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                          {step.step}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Clean in-card flow arrow, strictly inside card with zero overflow */}
                      {idx < processSteps.length - 1 && (
                        <div
                          className="hidden lg:flex items-center text-slate-300 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-blue-500 transition-all duration-300"
                          aria-hidden="true"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
