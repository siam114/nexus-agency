import type { Metadata } from "next";
import Link from "next/link";
import { servicesData, processSteps } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | NexusAgency",
  description:
    "Explore our 6 core services: Shopify Development, Figma to Website Conversion, WordPress Development, Custom Website Development, SEO Services, and Ads Management.",
};

const iconMap = {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  Code2,
};

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CAPABILITIES &amp; SERVICES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Everything You Need to Grow Online
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We combine website development, design implementation, search optimization, and paid advertising to help businesses strengthen their online presence.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="space-y-12 mb-28">
          {servicesData.map((service, index) => {
            const Icon =
              iconMap[service.iconName as keyof typeof iconMap] || ShoppingCart;

            return (
              <Card
                key={service.id}
                id={service.id}
                className="scroll-mt-24 p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Icon & Core Details (lg: 5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
                        Service 0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      <Link
                        href={service.link || `/services/${service.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                      <Link href={service.link || `/services/${service.id}`} className="w-full sm:w-auto flex-1">
                        <Button className="w-full justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 text-xs sm:text-sm">
                          Explore Service Details <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Button>
                      </Link>
                      <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="w-full sm:w-auto flex-1">
                        <Button
                          variant="outline"
                          className="w-full justify-center rounded-full border-slate-200 dark:border-slate-800 px-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Inquire Now
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Features & Deliverables (lg: 7 cols) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/70 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3.5">
                        Key Capabilities
                      </h4>
                      <ul className="space-y-2.5">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                          >
                            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What You Receive */}
                    {service.deliverables && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3.5">
                          Agreed Deliverables
                        </h4>
                        <ul className="space-y-2.5">
                          {service.deliverables.map((deliv) => (
                            <li
                              key={deliv}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                            >
                              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* How We Work Process Section */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-8 sm:p-14 mb-28">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              How We Work
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A transparent, four-stage workflow tailored to website development, SEO, and advertising projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((p) => (
              <div key={p.step} className="relative">
                <span className="text-4xl font-black text-blue-600/30 dark:text-blue-500/20 font-mono">
                  {p.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-14 text-white text-center flex flex-col items-center shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
            START YOUR PROJECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-xl">
            Ready to Grow Your Online Business?
          </h2>
          <p className="mt-4 text-blue-100 max-w-xl text-sm sm:text-base leading-relaxed">
            Whether you need a Shopify store, a Figma design converted into a website, a WordPress solution, SEO improvements, or advertising management, let&apos;s discuss your project.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-slate-100 shadow-md font-semibold px-8">
                Start a Project <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
