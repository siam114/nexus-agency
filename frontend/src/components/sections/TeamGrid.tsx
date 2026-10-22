"use client";

import Image from "next/image";
import { useLiveTeam } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  PortfolioIcon,
} from "@/components/ui/SocialIcons";

export function TeamGrid() {
  const members = useLiveTeam();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
      {members.map((member) => (
        <Card
          key={member.id}
          className="overflow-hidden p-0 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <Image
              src={member.image}
              alt={member.name}
              fill
              unoptimized
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
            {member.bio && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {member.bio}
              </p>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap">
              {member.socials?.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Portfolio`}
                  title={`${member.name} Portfolio`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <PortfolioIcon className="h-4 w-4" />
                </a>
              )}
              {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                  title={`${member.name} GitHub`}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  title={`${member.name} LinkedIn`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {member.socials?.facebook && (
                <a
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Facebook`}
                  title={`${member.name} Facebook`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
              {member.socials?.whatsapp && (
                <a
                  href={member.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} WhatsApp`}
                  title={`${member.name} WhatsApp`}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
