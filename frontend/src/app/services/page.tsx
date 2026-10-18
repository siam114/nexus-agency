import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Palette, Layers, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, ShoppingCart, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Nexus Agency",
  description: "Explore our specialized services: full-stack web and mobile development, UI/UX design, cloud architecture, and AI integrations.",
};

const iconMap = {
  ShoppingCart,
  Code2,
  Palette,
  Bot,
  Layers,
  Cpu,
};

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We audit your project vision, target audience, technical risks, and create a concrete architectural roadmap.",
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    description: "Crafting wireframes, responsive design systems, and clickable Figma prototypes with your brand identity.",
  },
  {
    step: "03",
    title: "Agile Development",
    description: "Clean code execution using Next.js, TypeScript, scalable databases, and automated CI/CD deployment pipelines.",
  },
  {
    step: "04",
    title: "Quality Assurance & Launch",
    description: "Rigorous performance optimization, security checks, SEO audits, followed by seamless production rollout.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Capabilities & Expertise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Crafted for speed, built for scale.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We partner with ambitious startups and modern enterprises to design, build, and deploy high-converting digital products.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] || Code2;

            return (
              <Card
                key={service.id}
                className="flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {service.title}
                      </h3>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Specialized Offering</span>
                    </div>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.deliverables && (
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                        What You Receive
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((deliv) => (
                          <li key={deliv} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      Inquire About This Service <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 sm:p-14 mb-28">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Our Methodology</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
              How We Deliver Exceptional Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((p) => (
              <div key={p.step} className="relative">
                <span className="text-4xl font-black text-blue-600/30 dark:text-blue-500/20 font-mono">
                  {p.step}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-12 text-white text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold max-w-xl">
            Ready to bring your next product to life?
          </h2>
          <p className="mt-4 text-blue-100 max-w-lg">
            Let&apos;s discuss your timeline, tech specifications, and goals. We&apos;ll provide a transparent roadmap and quote.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-zinc-100 shadow-lg">
                Book a Free Discovery Call <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

