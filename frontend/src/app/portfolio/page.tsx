import type { Metadata } from "next";
import { projectsData } from "@/data/mockData";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Nexus Agency",
  description: "Explore our recent work across web applications, SaaS platforms, design systems, and mobile solutions.",
};

export default function PortfolioPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Work that drives measurable growth.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every product we build pairs rigorous engineering standards with captivating aesthetics. Browse our latest projects below.
          </p>
        </div>

        {/* Portfolio List with Filters */}
        <PortfolioList projects={projectsData} />
      </div>
    </div>
  );
}

