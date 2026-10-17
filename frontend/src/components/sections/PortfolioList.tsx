"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioListProps {
  projects: Project[];
}

export function PortfolioList({ projects }: PortfolioListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden p-0 group flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className="absolute top-3 left-3 rounded-lg bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                {project.category}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-zinc-400 mb-2">
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

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  {project.title}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
          Have a unique idea you&apos;d like us to build?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          We can tailor a team and custom tech stack to fit your exact milestones.
        </p>
        <Link href="/contact">
          <Button size="lg">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

