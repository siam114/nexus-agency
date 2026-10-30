"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-300 shadow-xl shadow-slate-900/10 dark:shadow-black/30 transition-all duration-300 ease-out cursor-pointer hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-blue-500/20 hover:-translate-y-1 active:scale-90 active:translate-y-0 touch-manipulation",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}

