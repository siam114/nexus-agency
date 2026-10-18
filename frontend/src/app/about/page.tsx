import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamData, testimonialsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Target, Zap, ShieldCheck, HeartHandshake, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Nexus Agency",
  description: "Learn about Nexus Agency's mission, team, and philosophy on building world-class digital products.",
};

const values = [
  {
    icon: Target,
    title: "Relentless Quality",
    description: "We don't cut corners. From pixel-precise CSS to scalable TypeScript codebases, excellence is our standard.",
  },
  {
    icon: Zap,
    title: "Velocity & Agility",
    description: "Fast iteration loops, bi-weekly demo sprints, and rapid prototyping ensure you get to market ahead of competitors.",
  },
  {
    icon: ShieldCheck,
    title: "Architectural Integrity",
    description: "We build systems designed to gracefully scale to millions of users without fragile dependencies or technical debt.",
  },
  {
    icon: HeartHandshake,
    title: "True Partnership",
    description: "We treat your product as our own. Transparent communication, shared ownership, and proactive product advice.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Engineering digital experiences with lasting impact.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Founded with the conviction that great software requires both breathtaking design and bulletproof technical architecture, Nexus Agency helps brands redefine digital standards.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-96 lg:h-[480px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Nexus Agency Team Collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
              A multidisciplinary collective of creators, engineers, and product strategists.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We reject bloated agency models. When you partner with us, you collaborate directly with senior engineers and visionary designers who care deeply about your business outcomes.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you need to validate a high-stakes prototype or launch a mission-critical web application, we bring the speed of a startup with the technical rigor of an enterprise.
            </p>

            <div className="pt-4 flex gap-8">
              <div>
                <div className="text-3xl font-extrabold text-blue-600">5+</div>
                <div className="text-xs text-zinc-500 mt-1">Years Operating</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-600">50+</div>
                <div className="text-xs text-zinc-500 mt-1">Shipped Apps</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-600">100%</div>
                <div className="text-xs text-zinc-500 mt-1">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
              The Values That Guide Every Sprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Meet The Leaders
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
              The Minds Behind Nexus Agency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamData.map((member) => (
              <Card key={member.id} className="overflow-hidden p-0 group">
                <div className="relative h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {member.name}
                  </h3>
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 sm:p-14 mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
              Trusted by Product Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((t) => (
              <Card key={t.id} className="p-8 relative">
                <Quote className="h-8 w-8 text-blue-600/20 absolute top-6 right-6" />
                <p className="text-base italic text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Want to work with our team?
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
            We are currently accepting new projects for upcoming sprints.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

