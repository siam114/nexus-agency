import type { Metadata } from "next";
import Link from "next/link";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, HeartHandshake, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Team | NexusAgency",
  description:
    "Meet the developers, designers, and specialists behind NexusAgency. Specialists in Shopify development, Figma to website conversion, WordPress, SEO, and ads management.",
};

const cultureValues = [
  {
    icon: Target,
    title: "Craft & Detail",
    description:
      "We obsess over responsive fluidity, pixel-conscious layouts, and clean code across every client store and website.",
  },
  {
    icon: Zap,
    title: "Transparent Milestones",
    description:
      "Structured sprint check-ins, defined deliverables, and clear timelines without unexpected surprises.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Collaboration",
    description:
      "Work directly with experienced developers and campaign specialists who take pride in your project's success.",
  },
];

export default function TeamPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>OUR TEAM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Meet the Builders &amp; Specialists
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A dedicated team specializing in Shopify storefronts, Figma conversions, WordPress development, technical SEO, and paid ad management.
          </p>
        </div>

        {/* Dynamic Team Member Cards Grid */}
        <TeamGrid />

        {/* Culture & Values */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6 sm:p-10 lg:p-12 mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              HOW WE OPERATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Our Working Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureValues.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {v.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Join the Team / Project CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Ready to build with us?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            Let&apos;s discuss your upcoming project or website requirements with our team.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7">
              Start a Project <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
