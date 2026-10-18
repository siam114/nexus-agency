import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, BarChart2 } from "lucide-react";

export function Projects() {
  return (
    <section id="portfolio" className="py-12 lg:py-16 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header with "View all work" on right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
              <span>OUR PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Work
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              A few selected projects we&apos;re proud of. Each one is built with a focus on
              performance, user experience and real business results.
            </p>
          </div>

          <div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
            >
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 3 Visual Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden p-0 group flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Project Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics & Case Study Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={metric.label}
                          className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/30"
                        >
                          <div className="text-blue-600 dark:text-blue-400">
                            {idx === 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <BarChart2 className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                              {metric.value}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-1">
                              {metric.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/portfolio`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
                  >
                    Case study <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
