import * as React from "react";
import { capabilitiesData, trustedLogos } from "@/data/mockData";
import {
  RefreshCw,
  Wrench,
  TrendingUp,
  Sparkles,
  Cpu,
  Globe,
  Leaf,
  Layers,
} from "lucide-react";

const capabilityIcons = {
  RefreshCw,
  Wrench,
  TrendingUp,
};

const logoIcons = {
  Sparkles,
  Cpu,
  Globe,
  Leaf,
  Layers,
};

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-5 sm:p-6 lg:p-7 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: 3 Capabilities */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {capabilitiesData.map((cap) => {
                const IconComponent =
                  capabilityIcons[cap.iconName as keyof typeof capabilityIcons] ||
                  RefreshCw;

                return (
                  <div key={cap.title} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {cap.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {cap.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Divider (Desktop) */}
            <div className="hidden lg:block lg:col-span-1 border-r border-slate-200 dark:border-slate-800 h-10 mx-auto" />

            {/* Right Side: Trusted by businesses worldwide */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Trusted by businesses worldwide
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-slate-400 dark:text-slate-500">
                {trustedLogos.map((brand) => {
                  const LogoIcon =
                    logoIcons[brand.icon as keyof typeof logoIcons] || Sparkles;

                  return (
                    <div
                      key={brand.name}
                      className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <LogoIcon className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold tracking-tight text-slate-600 dark:text-slate-400">
                        {brand.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

