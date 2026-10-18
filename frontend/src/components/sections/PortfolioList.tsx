"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Building2, ArrowRight, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioListProps {
  projects: Project[];
}

const CATEGORIES = [
  "All Projects",
  "Shopify Development",
  "Figma to Website Conversion",
  "WordPress Development",
  "SEO",
  "Ads Management",
];

export function PortfolioList({ projects }: PortfolioListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Projects");

  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid or Placeholder */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden p-0 group flex flex-col justify-between hover:shadow-2xl transition-all duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                  {project.category}
                </span>
              </div>

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

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Verified Project Attributes / Metrics */}
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

                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Clearly editable placeholder if no projects match */
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center max-w-xl mx-auto my-8">
          <FolderKanban className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedCategory} Case Studies
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Case studies for this service category are being prepared. Contact us to review recent client examples and sample deliverables.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button size="sm">
                Inquire About {selectedCategory} <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Ready to Grow Your Online Business?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
          Whether you need a Shopify store, a Figma design converted into a website, a WordPress solution, SEO improvements, or advertising management, let&apos;s discuss your project.
        </p>
        <Link href="/contact">
          <Button size="lg" className="rounded-full px-7">
            Start a Project <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
