import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export function Logo({ className, iconSize = "md" }: LogoProps) {
  const iconDims = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-8 w-8 sm:h-9 sm:w-9 rounded-xl",
    lg: "h-10 w-10 rounded-2xl",
  }[iconSize];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Brand Squircle with Favicon Sparkles Icon */}
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105",
          iconDims
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 sm:h-5 sm:w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparkles icon matching favicon (icon.svg) */}
          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
          <path d="M20 2v4" />
          <path d="M22 4h-4" />
          <circle cx="4" cy="20" r="2" />
        </svg>
      </div>

      <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Nexus<span className="font-semibold text-slate-800 dark:text-slate-200">Agency</span>
      </span>
    </Link>
  );
}

