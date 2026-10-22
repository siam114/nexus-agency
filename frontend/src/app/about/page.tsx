import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import {
  Sparkles,
  ArrowRight,
  Target,
  Smartphone,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | NexusAgency",
  description:
    "Learn about NexusAgency, a dedicated digital agency specializing in Shopify development, Figma to website conversion, WordPress development, Custom Website Development, SEO, and ads management.",
};

const values = [
  {
    icon: Target,
    title: "Business-Focused Solutions",
    description:
      "We provide actionable recommendations based on your actual business goals, audience, and operational requirements.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experiences",
    description:
      "Every store, landing page, and website is engineered to function smoothly across desktop, tablet, and mobile devices.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Direct collaboration with honest updates, defined milestones, and prompt answers throughout the project lifecycle.",
  },
  {
    icon: ShieldCheck,
    title: "Practical Optimization",
    description:
      "We focus on real data and proven techniques in technical SEO, conversion flow, and ad campaign structure.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ABOUT NEXUSAGENCY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            We Build Websites That Help Businesses Grow Online
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            NexusAgency helps businesses strengthen their digital footprint through high-converting Shopify stores, pixel-accurate Figma conversions, flexible WordPress websites, custom web applications, organic search optimization, and targeted paid advertising.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-96 lg:h-[480px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="NexusAgency Team Collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              A focused team dedicated to practical digital execution.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We work directly with store owners, growing brands, and service businesses that need reliable digital implementation. Rather than offering bloated consulting packages, we focus on what moves the needle:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>E-commerce website development</strong> on Shopify with custom Liquid themes.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>Figma-to-website implementation</strong> with responsive, clean code.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>WordPress website solutions</strong> for businesses and service providers.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>Custom website development</strong> built for bespoke functionality and scale.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>Search engine optimization</strong> to improve site structure and visibility.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>Paid advertising management</strong> across Google and Meta platforms.</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-8 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-2xl font-extrabold text-blue-600">6</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Core Services</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-blue-600">Direct</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Builder Access</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-blue-600">Data-Led</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              OUR PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              How We Approach Every Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6 flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              OUR TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Meet the Builders &amp; Specialists
            </h2>
          </div>

          <TeamGrid />
        </div>

        {/* Testimonials */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-8 sm:p-14 mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Feedback From Our Clients
            </h2>
          </div>

          <TestimonialsGrid />
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Ready to discuss your project?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Tell us about your requirements for Shopify, Figma conversion, WordPress, SEO, or Ads management.
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
