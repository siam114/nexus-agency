"use client";

import * as React from "react";
import Image from "next/image";
import { useLiveTeam } from "@/lib/liveContent";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Crown, Sparkles } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  PortfolioIcon,
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function TeamGrid() {
  const members = useLiveTeam();

  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [windowWidth, setWindowWidth] = React.useState<number>(1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Default active index is SM SIAM (the 3rd card, index 2)
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

  const handlePrev = React.useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count, setActiveIndex]);

  const handleNext = React.useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count, setActiveIndex]);

  // Touch swipe support for mobile
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!members || members.length === 0) {
    return null;
  }

  // Responsive horizontal spacing between cards
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const step1 = isMobile ? 180 : isTablet ? 240 : 285;
  const step2 = isMobile ? 320 : isTablet ? 450 : 540;

  return (
    <div className="w-full mb-20 select-none overflow-hidden">
      {/* Top Controls: Navigation Arrows */}
      <div className="flex items-center justify-end gap-2.5 mb-6 px-4">
        <button
          onClick={handlePrev}
          aria-label="Previous Team Member"
          className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 hover:shadow-md active:scale-90 transition-all duration-300 cursor-pointer shadow-xs"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Team Member"
          className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 hover:shadow-md active:scale-90 transition-all duration-300 cursor-pointer shadow-xs"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Soft Gliding 5-Card Stage */}
      <div
        className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] flex items-center justify-center overflow-hidden py-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {members.map((member, idx) => {
          let diff = idx - activeIndex;
          while (diff > 2) diff -= count;
          while (diff < -2) diff += count;

          const isCenter = diff === 0;
          const isFounder =
            member.role.toLowerCase().includes("founder") ||
            member.name.toLowerCase().includes("siam");

          let xOffset = 0;
          if (diff === -1) xOffset = -step1;
          else if (diff === 1) xOffset = step1;
          else if (diff === -2) xOffset = -step2;
          else if (diff === 2) xOffset = step2;

          const zIndex = isCenter ? 30 : Math.abs(diff) === 1 ? 20 : 10;
          const scale = isCenter ? 1 : Math.abs(diff) === 1 ? 0.88 : 0.76;
          const opacity = isCenter ? 1 : Math.abs(diff) === 1 ? 0.78 : (isMobile ? 0 : 0.45);

          return (
            <div
              key={member.id || member.name}
              onClick={() => setActiveIndex(idx)}
              style={{
                transform: `translate3d(calc(-50% + ${xOffset}px), -50%, 0) scale(${scale})`,
                zIndex,
                opacity,
                transition: "all 650ms cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="absolute top-1/2 left-1/2 cursor-pointer will-change-transform"
            >
              <Card
                className={cn(
                  "overflow-hidden p-0 rounded-3xl flex flex-col justify-between transition-all duration-650 ease-[cubic-bezier(0.25,1,0.5,1)] group",
                  isCenter
                    ? "w-[310px] sm:w-[350px] lg:w-[380px] border-2 border-blue-500/90 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/25 ring-4 ring-blue-500/15"
                    : "w-[240px] sm:w-[260px] lg:w-[280px] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-md hover:shadow-xl hover:opacity-95"
                )}
              >
                {/* Portrait Image - Strictly 1:1 Aspect Ratio (Square) for Center Card */}
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800 transition-all duration-650 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isCenter ? "aspect-square w-full" : "aspect-[4/4.5] w-full"
                  )}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    priority={isCenter}
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    sizes="(max-width: 640px) 310px, (max-width: 1024px) 350px, 380px"
                  />

                  {/* Spotlight Badge on Center Card */}
                  {isCenter && (
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md tracking-wider uppercase">
                        {isFounder ? <Crown className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                        <span>{isFounder ? "Founder & Lead" : "Spotlight"}</span>
                      </span>
                    </div>
                  )}

                  {!isCenter && (
                    <div className="absolute inset-0 bg-slate-950/15 dark:bg-slate-950/30 group-hover:bg-transparent transition-colors duration-500" />
                  )}
                </div>

                {/* Member Details */}
                <div
                  className={cn(
                    "p-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isCenter
                      ? "bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-blue-950/25 dark:via-slate-900 dark:to-slate-900"
                      : "bg-white dark:bg-slate-900"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "font-black text-slate-900 dark:text-white truncate transition-all duration-500",
                        isCenter ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                      )}
                    >
                      {member.name}
                    </h3>
                    {isCenter && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 animate-pulse" />
                    )}
                  </div>

                  <p
                    className={cn(
                      "truncate transition-all duration-500 mt-1",
                      isCenter
                        ? "text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold"
                        : "text-xs text-slate-500 dark:text-slate-400 font-medium"
                    )}
                  >
                    {member.role}
                  </p>

                  {/* Bio for Center Card */}
                  {isCenter && member.bio && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-3">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  <div className="mt-3.5 flex items-center gap-2 text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap">
                    {member.socials?.website && (
                      <a
                        href={member.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Portfolio`}
                        title={`${member.name} Portfolio`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
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
                        className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
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
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
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
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
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
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WhatsappIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2.5 mt-2">
        {members.map((m, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={m.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer focus:outline-none",
                isActive
                  ? "w-9 bg-blue-600 dark:bg-blue-500 shadow-md shadow-blue-500/50"
                  : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              )}
              aria-label={`View ${m.name}`}
              title={m.name}
            />
          );
        })}
      </div>
    </div>
  );
}
