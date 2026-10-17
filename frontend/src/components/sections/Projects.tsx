import Link from "next/link";
import { projectsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Projects() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Selected Work
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Proven Results & Recent Case Studies
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            A showcase of digital products crafted with precision, speed, and modern architectural standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden p-0 group flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
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

        <div className="mt-14 text-center">
          <Link href="/portfolio">
            <Button variant="outline" size="lg">
              View All Case Studies ({projectsData.length}) <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
