import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { serviceDetailsData } from "@/data/serviceDetailsData";
import { projectsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServiceFaqAccordion } from "@/components/sections/ServiceFaqAccordion";
import { ServiceHeroVisual } from "@/components/sections/ServiceHeroVisual";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Target,
  Sparkles,
  Zap,
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  Sliders,
  Code2,
  Smartphone,
  Layers,
  FileText,
  Mail,
  HelpCircle,
} from "lucide-react";

export function generateStaticParams() {
  return Object.keys(serviceDetailsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetailsData[slug];

  if (!service) {
    return {
      title: "Service Not Found | NexusAgency",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

const offeringIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  Sliders,
  Code2,
  Smartphone,
  Layers,
  Zap,
  CheckCircle2,
  FileText,
  ShieldCheck,
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetailsData[slug];

  if (!service) {
    notFound();
  }

  // Filter verified projects matching this service
  const matchingProjects = projectsData.filter(
    (p) =>
      p.category === service.title ||
      (service.slug === "seo-services" && p.category === "SEO") ||
      p.tags.some(
        (t) =>
          t.toLowerCase().includes(service.title.toLowerCase()) ||
          (service.slug === "seo-services" && t.toLowerCase().includes("seo"))
      )
  );

  const contactUrlWithParam = `/contact?service=${encodeURIComponent(service.title)}`;

  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* =========================================================================
            SECTION A: Breadcrumb Navigation
           ========================================================================= */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-semibold text-slate-900 dark:text-white" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>

        {/* =========================================================================
            SECTION B: Service Hero Section
           ========================================================================= */}
        <section className="relative overflow-hidden pb-16 lg:pb-24 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                <span>{service.eyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {service.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link href={contactUrlWithParam} className="w-full sm:w-auto flex-1">
                  <Button
                    size="lg"
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-3.5 text-sm font-semibold shadow-md shadow-blue-500/25 transition-transform hover:-translate-y-0.5"
                  >
                    Start Your Project <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/work" className="w-full sm:w-auto flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full justify-center rounded-full px-6 py-3.5 text-sm font-semibold border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Explore Our Work
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5">
              <ServiceHeroVisual slug={service.slug} badge={service.visualBadge} />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION C: Service Overview
           ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              SERVICE OVERVIEW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Understanding {service.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.overview.whatItIs}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1: Business Problems Solved */}
            <Card className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 mb-4">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Challenges We Address
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {service.overview.problemsSolved.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Box 2: Who Can Benefit */}
            <Card className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Who Benefits Most
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.overview.whoItIsFor}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Target Profile
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                  Merchants, growing businesses, agencies &amp; founders
                </p>
              </div>
            </Card>

            {/* Box 3: What NexusAgency Delivers & Business Impact */}
            <Card className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                What We Deliver
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.overview.whatWeDeliver}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Business Impact
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                  {service.overview.businessImpact}
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            SECTION D: What We Offer (Feature Grid)
           ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              What We Offer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore our six core offerings under {service.title}, built strictly according to professional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((item) => {
              const IconComponent = offeringIconMap[item.iconName] || Zap;

              return (
                <Card
                  key={item.title}
                  className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION E: Benefits and Use Cases
           ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Benefits (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  PRACTICAL ADVANTAGES
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                  Benefits of Our Approach
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Tangible, data-informed advantages focused on quality, speed, and usability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((b) => (
                  <Card
                    key={b.title}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2 font-bold text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{b.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {b.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Realistic Use Cases (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  REALISTIC SCENARIOS
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                  Common Use Cases
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  How businesses typically engage us for this service.
                </p>
              </div>

              <div className="space-y-3.5">
                {service.useCases.map((uc) => (
                  <div
                    key={uc.title}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {uc.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {uc.scenario}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION F: Our Working Process
           ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              OUR WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Our 4-Step Process
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              A structured, transparent roadmap tailored specifically for {service.title} projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <Card
                key={step.step}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-mono font-bold text-xs shadow-sm shadow-blue-500/25 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION G: Relevant Portfolio and Case Studies
           ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                PROVEN WORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                Related Case Studies
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Selected client work representing our {service.title} capabilities.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {matchingProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden p-0 group flex flex-col justify-between hover:shadow-2xl transition-all duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <Link href={`/projects/${project.slug}`} className="block relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 rounded-lg bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                      {project.category}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                        {project.client && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {project.client}
                          </span>
                        )}
                        {project.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>

                      {project.metrics && project.metrics.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 text-xs"
                            >
                              <div className="font-bold text-blue-600 dark:text-blue-400">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline shrink-0"
                      >
                        View Project <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-10 text-center max-w-lg mx-auto">
              <Sparkles className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Case Studies
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                We are currently compiling additional case studies for this service. Contact us to request sample deliverables and client references.
              </p>
              <div className="mt-4">
                <Link href={contactUrlWithParam}>
                  <Button size="sm">Request Work Samples</Button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION H: Frequently Asked Questions
           ========================================================================= */}
        <section className="py-12 sm:py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                <HelpCircle className="h-3 w-3" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Questions About {service.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct, honest answers about scope, technical execution, timelines, and deliverables.
              </p>

              {/* Direct Support Card on Tablet & Desktop */}
              <div className="hidden sm:block p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 mt-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Have another question?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3 leading-relaxed">
                  We are happy to review your specific project requirements and discuss options.
                </p>
                <Link
                  href={contactUrlWithParam}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                >
                  Ask our team directly <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7 w-full">
              <ServiceFaqAccordion faqs={service.faqs} />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION I: Final Call to Action
           ========================================================================= */}
        <section className="pt-16 sm:pt-20">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-14 text-white text-center flex flex-col items-center shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold max-w-xl">
              {service.ctaHeading}
            </h2>
            <p className="mt-4 text-blue-100 max-w-xl text-sm sm:text-base leading-relaxed">
              {service.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto">
              <Link href={contactUrlWithParam} className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  className="w-full justify-center rounded-full bg-white text-blue-600 hover:bg-slate-100 shadow-md font-semibold px-8"
                >
                  Start Your Project <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href={contactUrlWithParam} className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-center rounded-full border-blue-400 text-white hover:bg-white/10 px-7 font-semibold"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

