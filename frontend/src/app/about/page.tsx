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
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ABOUT NEXUSAGENCY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            We Build Websites That Help Businesses Grow Online
          </h1>
          <p className="mt-6 text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            NexusAgency helps businesses strengthen their digital footprint through high-converting Shopify stores, pixel-accurate Figma conversions, flexible WordPress websites, custom web applications, organic search optimization, and targeted paid advertising.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 sm:mb-24">
          <div className="group relative h-96 lg:h-[480px] 2xl:h-[560px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-2xl hover:border-blue-500/40">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="NexusAgency Team Collaborating"
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
              {[
                { bold: "E-commerce website development", text: "on Shopify with custom Liquid themes." },
                { bold: "Figma-to-website implementation", text: "with responsive, clean code." },
                { bold: "WordPress website solutions", text: "for businesses and service providers." },
                { bold: "Custom website development", text: "built for bespoke functionality and scale." },
                { bold: "Search engine optimization", text: "to improve site structure and visibility." },
                { bold: "Paid advertising management", text: "across Google and Meta platforms." },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl transition-all duration-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>
                    <strong>{item.bold}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-8 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 -m-3 rounded-2xl transition-all duration-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-blue-600">6</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Core Services</div>
              </div>
              <div className="p-3 -m-3 rounded-2xl transition-all duration-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-blue-600">Direct</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Builder Access</div>
              </div>
              <div className="p-3 -m-3 rounded-2xl transition-all duration-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-blue-600">Data-Led</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              OUR PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              How We Approach Every Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <Card
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 p-7 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.25)] flex flex-col justify-between cursor-pointer"
                >
                  {/* Gentle gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-indigo-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Top glowing accent sheen */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                      <Icon className="h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                      {v.description}
                    </p>
                  </div>

                  {/* Subtle footer pill */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Principle 0{index + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 group-hover:scale-150 transition-all duration-300" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6 sm:p-10 lg:p-12 mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10 sm:mb-12">
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
          <Link href="/contact" className="inline-block">
            <Button
              size="lg"
              className="group rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
