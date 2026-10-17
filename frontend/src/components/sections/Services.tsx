import Link from "next/link";
import { servicesData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Palette, Layers, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

const iconMap = {
  Code2,
  Palette,
  Layers,
  Cpu,
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            What We Do
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            High-Impact Services Designed to Scale
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Comprehensive development and design services tailored for modern products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 4).map((service) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] || Code2;

            return (
              <Card
                key={service.id}
                className="group relative flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services & Methodology <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
