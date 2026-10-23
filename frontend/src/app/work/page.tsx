import type { Metadata } from "next";
import { projectsData } from "@/data/mockData";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio & Work | NexusAgency",
  description:
    "Explore our projects across Shopify Development, Figma to Website Conversion, WordPress Development, Custom Website Development, SEO, and Ads Management.",
};

export default function WorkPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PORTFOLIO &amp; WORK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Work That Helps Your Business Grow
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Browse our completed projects organized across our six core services: Shopify stores, Figma conversions, WordPress websites, custom web applications, SEO audits, and targeted advertising setups.
          </p>
        </div>

        {/* Portfolio List with Filters */}
        <PortfolioList projects={projectsData} />
      </div>
    </div>
  );
}
