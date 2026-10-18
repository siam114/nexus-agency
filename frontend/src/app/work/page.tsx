import type { Metadata } from "next";
import { projectsData } from "@/data/mockData";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | NexusAgency",
  description: "Browse featured Shopify storefronts, custom web applications, and conversion-focused digital products designed and developed by NexusAgency.",
};

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Work that drives real business results.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Every Shopify store and custom web application we build pairs conversion-driven design
            with high-performance engineering.
          </p>
        </div>

        {/* Portfolio List with Filters */}
        <PortfolioList projects={projectsData} />
      </div>
    </div>
  );
}
