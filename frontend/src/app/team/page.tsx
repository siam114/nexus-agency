import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Sparkles, HeartHandshake, Zap, Target } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Meet Our Team | NexusAgency",
  description: "Meet the engineers, designers, and strategists behind NexusAgency. A remote-first digital product studio.",
};

const cultureValues = [
  {
    icon: Target,
    title: "Craft & Detail",
    description: "We obsess over micro-interactions, responsive fluidity, and clean software architecture.",
  },
  {
    icon: Zap,
    title: "Startup Velocity",
    description: "Rapid iteration cycles with weekly sprint demos, keeping you continuously in the loop.",
  },
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    description: "Direct collaboration with senior builders without account manager bottlenecks.",
  },
];

export default function TeamPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>OUR TEAM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Meet the Builders &amp; Designers
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A small, dedicated team of designers, developers, and strategists working
            together from around the world to bring your ideas to life.
          </p>
        </div>

        {/* 5 Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
          {teamData.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden p-0 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {member.name}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5 mb-2 truncate">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {member.bio ||
                    "Passionate about building scalable digital experiences and high-conversion products."}
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Website`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Culture & Values */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-8 sm:p-14 mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              How We Operate
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Our Working Culture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureValues.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {v.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Join the Team CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Want to build with us?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            We are always looking for exceptional engineers, UI/UX designers, and Shopify experts.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7">
              Reach Out &amp; Apply <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
