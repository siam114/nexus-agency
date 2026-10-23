"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLiveTeam } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Sparkles } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  PortfolioIcon,
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function Team() {
  const members = useLiveTeam();

  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);

  // Computed active index: defaults to SM SIAM (the 3rd card, index 2), or user selected card
  const activeIndex = React.useMemo(() => {
    if (selectedIdx !== null) return selectedIdx;
    if (!members || members.length === 0) return 2;
    const siamIdx = members.findIndex((m) =>
      m.name.toLowerCase().includes("siam")
    );
    return siamIdx !== -1 ? siamIdx : Math.min(2, members.length - 1);
  }, [selectedIdx, members]);

  const count = members.length;

  const setActiveIndex = React.useCallback(
    (idxOrFn: number | ((prev: number) => number)) => {
      if (typeof idxOrFn === "function") {
        setSelectedIdx((prev) => idxOrFn(prev !== null ? prev : activeIndex));
      } else {
        setSelectedIdx(idxOrFn);
      }
    },
    [activeIndex]
  );

  const handlePrev = () => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev + 1) % count);
  };

  if (!members || members.length === 0) {
    return null;
  }

  // Generate 5 slots with activeIndex ALWAYS in the center (Slot 2 / Middle)
  // Slots: [-2, -1, 0, 1, 2] where 0 is the center 3rd position
  const visibleSlots = [-2, -1, 0, 1, 2].map((offset) => {
    const memberIndex = (activeIndex + offset + count * 2) % count;
    return {
      offset,
      isCenter: offset === 0,
      member: members[memberIndex],
      memberIndex,
    };
  });

  return (
    <section id="team" className="py-14 lg:py-20 bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
              <Sparkles className="h-3 w-3" />
              <span>OUR SPECIALISTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              A high-impact remote team of senior engineers, designers, and growth strategists
              focused on delivering real business results.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Team Member"
                className="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 active:scale-90 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Team Member"
                className="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 active:scale-90 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline"
            >
              Join the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 5-Card Spotlight Carousel */}
        {/* On Desktop: 5 visible columns with center column enlarged & 2 on left, 2 on right */}
        {/* On Mobile: Horizontal touch slider centered on active card */}
        <div className="relative pt-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-center">
            {visibleSlots.map(({ offset, isCenter, member, memberIndex }) => {
              const isFounder = member.role.toLowerCase().includes("founder") || member.name.toLowerCase().includes("siam");

              return (
                <div
                  key={`${member.id || member.name}-${offset}`}
                  onClick={() => setActiveIndex(memberIndex)}
                  className={cn(
                    "cursor-pointer transition-all duration-500 ease-out",
                    // Hide extreme side cards on smaller screens
                    (offset === -2 || offset === 2) && "hidden lg:block",
                    (offset === -1 || offset === 1) && "hidden sm:block",
                    isCenter ? "z-30 lg:-translate-y-2" : "z-10 hover:opacity-100"
                  )}
                >
                  <Card
                    className={cn(
                      "overflow-hidden p-0 rounded-2xl transition-all duration-500 ease-out flex flex-col justify-between group",
                      isCenter
                        ? "border-2 border-blue-500/80 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/20 scale-100 lg:scale-105"
                        : "border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 opacity-75 hover:opacity-95 hover:scale-[0.98] shadow-sm hover:shadow-md scale-95"
                    )}
                  >
                    {/* Portrait Image */}
                    <div
                      className={cn(
                        "relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800 transition-all duration-500",
                        isCenter ? "h-64 sm:h-72 lg:h-76" : "h-52 sm:h-56 lg:h-60"
                      )}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        unoptimized
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out",
                          isCenter ? "group-hover:scale-105" : "group-hover:scale-102"
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                      />

                      {/* Spotlight Badge on Center Card */}
                      {isCenter && (
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-sm tracking-wider uppercase">
                            {isFounder ? <Crown className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                            <span>{isFounder ? "Founder & Lead" : "Spotlight"}</span>
                          </span>
                        </div>
                      )}

                      {!isCenter && (
                        <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                      )}
                    </div>

                    {/* Member Details */}
                    <div className={cn("p-4 transition-all duration-300", isCenter && "bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/20 dark:to-slate-900")}>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={cn("font-extrabold text-slate-900 dark:text-white truncate transition-all", isCenter ? "text-base sm:text-lg" : "text-sm")}>
                          {member.name}
                        </h3>
                        {isCenter && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 animate-pulse" />
                        )}
                      </div>

                      <p className={cn("font-medium truncate transition-all", isCenter ? "text-xs text-blue-600 dark:text-blue-400 mt-1 font-semibold" : "text-xs text-slate-500 dark:text-slate-400 mt-0.5")}>
                        {member.role}
                      </p>

                      {/* Bio for Center Card */}
                      {isCenter && member.bio && (
                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-2.5">
                          {member.bio}
                        </p>
                      )}

                      {/* Social Links */}
                      <div className="mt-3 flex items-center gap-1.5 text-slate-400 dark:text-slate-500 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex-wrap">
                        {member.socials?.website && (
                          <a
                            href={member.socials.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} Portfolio`}
                            title={`${member.name} Portfolio`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PortfolioIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.socials?.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} GitHub`}
                            title={`${member.name} GitHub`}
                            className="hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.socials?.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} LinkedIn`}
                            title={`${member.name} LinkedIn`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <LinkedinIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.socials?.facebook && (
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} Facebook`}
                            title={`${member.name} Facebook`}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FacebookIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.socials?.whatsapp && (
                          <a
                            href={member.socials.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} WhatsApp`}
                            title={`${member.name} WhatsApp`}
                            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <WhatsappIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator & Quick Selector */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {members.map((m, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={m.id || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none",
                    isActive
                      ? "w-8 bg-blue-600 dark:bg-blue-500 shadow-sm shadow-blue-500/50"
                      : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                  )}
                  aria-label={`View ${m.name}`}
                  title={m.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
