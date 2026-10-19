import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectDetailsData } from "@/data/projectDetailsData";
import { projectsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  Zap,
  Globe,
  ExternalLink,
  Layers,
  ShieldCheck,
  Target,
  ArrowUpRight,
  Monitor,
  Smartphone,
  FolderKanban,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(projectDetailsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailsData[slug];

  if (!project) {
    return {
      title: "Project Not Found | NexusAgency",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectDetailsData[slug];

  if (!project) {
    notFound();
  }

  // Related projects (filter out current project, take 3 matching or featured projects)
  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => {
      // Prioritize projects in same category
      if (a.category === project.category && b.category !== project.category) return -1;
      if (b.category === project.category && a.category !== project.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const contactUrlWithParam = `/contact?service=${encodeURIComponent(project.category)}`;

  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* =========================================================================
            SECTION 1: Breadcrumb Navigation
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
                href="/work"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-semibold text-slate-900 dark:text-white" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* =========================================================================
            SECTION 2: Project Hero Section
           ========================================================================= */}
        <section className="relative overflow-hidden pb-16 lg:pb-24 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                <FolderKanban className="h-3.5 w-3.5" />
                <span>{project.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {project.title}
              </h1>

              {/* Meta Badges: Client & Year */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Client: <strong className="text-slate-800 dark:text-slate-200">{project.client}</strong></span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Delivered: <strong className="text-slate-800 dark:text-slate-200">{project.year}</strong></span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {project.summary}
              </p>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shadow-xs"
                  >
                    <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 leading-tight">
                      {metric.value}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href={contactUrlWithParam}>
                  <Button size="lg" className="rounded-full px-6 shadow-sm shadow-blue-500/20">
                    Discuss Similar Project <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>

                {/* Only render live URL if verified genuine link exists */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500/50 transition-colors shadow-xs"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                  </a>
                )}

                <Link href={`/services/${project.serviceSlug}`}>
                  <Button variant="outline" size="lg" className="rounded-full px-6">
                    View Service Details <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Column (Browser Mockup Frame) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl overflow-hidden group">
                {/* Browser Top Window Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="rounded-md bg-slate-900/80 px-3 py-1 text-[10px] font-mono text-slate-400 max-w-[220px] truncate border border-slate-700/40">
                    nexusagency.com/projects/{project.slug}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Hero Project Screenshot */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="rounded-lg bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      NexusAgency Verified Work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: Project Overview & Core Goals
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                PROJECT CONTEXT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Background &amp; Purpose
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Clear parameters, intended target audience, and business objectives established at project kickoff.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Target className="h-4 w-4" />
                  <span>Purpose &amp; Scope</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.overview.purpose}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Audience
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.overview.audience}
                  </p>
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Key Project Objectives</span>
                </div>
                <ul className="space-y-2.5">
                  {project.overview.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: Challenge & Our Solution
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              TECHNICAL APPROACH
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              The Challenge &amp; Solution
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every project comes with specific friction points. Here is how we analyzed requirements and engineered dependable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Challenge Card */}
            <Card className="p-8 rounded-2xl border-rose-200/60 dark:border-rose-950/60 bg-gradient-to-br from-rose-50/30 via-white to-white dark:from-rose-950/10 dark:via-slate-900 dark:to-slate-900 space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
                <span>The Challenge</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Friction Points &amp; Limitations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.challenge.summary}
              </p>
              <ul className="space-y-3 pt-2">
                {project.challenge.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Our Solution Card */}
            <Card className="p-8 rounded-2xl border-emerald-200/60 dark:border-emerald-950/60 bg-gradient-to-br from-emerald-50/30 via-white to-white dark:from-emerald-950/10 dark:via-slate-900 dark:to-slate-900 space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                <span>Our Solution</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Delivery Approach &amp; Execution
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution.summary}
              </p>
              <ul className="space-y-3 pt-2">
                {project.solution.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: Key Features & Deliverables
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              CONCRETE DELIVERABLES
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Key Features Delivered
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Specific, tangible components engineered to fulfill the project&apos;s functional and visual requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, idx) => (
              <Card
                key={idx}
                className="p-6 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: Design & Development Showcase
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                VISUAL PRESENTATION
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {project.showcase.title}
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {project.showcase.description}
              </p>
            </div>

            {/* Responsive Viewport Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Desktop Viewport Optimization
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {project.showcase.desktopAspect}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Mobile &amp; Touch Experience
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {project.showcase.mobileAspect}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: Technology Stack & Services Provided
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tech Stack */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Layers className="h-3.5 w-3.5" />
                <span>Technologies &amp; Tools Used</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Technical Stack
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Modern tools selected specifically for maintainability, speed, and platform stability.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Provided */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Agency Scope</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Services Provided
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Core disciplines executed by NexusAgency throughout the project lifecycle.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.servicesProvided.map((svc) => (
                  <span
                    key={svc}
                    className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-2xs"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: Verified Project Outcome
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              <Zap className="h-3.5 w-3.5" />
              <span>DELIVERED RESULTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Project Outcome &amp; Impact
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.outcome.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
              {project.outcome.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: Related Projects
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                MORE WORK
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Related Projects
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
            >
              Browse all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relProject) => (
              <Card
                key={relProject.id}
                className="overflow-hidden p-0 group flex flex-col justify-between hover:shadow-xl transition-all duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <Link href={`/projects/${relProject.slug}`} className="block relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={relProject.image}
                    alt={relProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-black/75 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium text-white">
                    {relProject.category}
                  </span>
                </Link>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      <Link href={`/projects/${relProject.slug}`}>{relProject.title}</Link>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {relProject.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {relProject.year}
                    </span>
                    <Link
                      href={`/projects/${relProject.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
                    >
                      View Project <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: Final Call to Action
           ========================================================================= */}
        <section className="pt-16 sm:pt-20">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-14 text-white text-center flex flex-col items-center shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
              START YOUR PROJECT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold max-w-xl leading-tight">
              Ready to Discuss a Similar Project for Your Business?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-lg leading-relaxed">
              Let&apos;s evaluate your goals and build a high-performance digital solution for {project.category}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={contactUrlWithParam}>
                <Button
                  size="lg"
                  className="rounded-full bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 shadow-md"
                >
                  Discuss Your Project <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-blue-400/50 bg-blue-800/40 text-white hover:bg-blue-800/80 px-6"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
