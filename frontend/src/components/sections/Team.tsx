import Link from "next/link";
import Image from "next/image";
import { teamData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { ArrowRight, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Team() {
  return (
    <section id="team" className="py-20 lg:py-24 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header with "Join the team" on right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
              <span>OUR TEAM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              A small, dedicated team of designers, developers and strategists
              working together to bring your ideas to life.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
              We&apos;re a remote-first team, collaborating from around the world.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
            >
              Join the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 5 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {teamData.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden p-0 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all group"
            >
              {/* Member Portrait */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Member Details */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {member.role}
                </p>

                {/* Social Icons */}
                <div className="mt-3 flex items-center gap-2.5 text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Website`}
                    className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

