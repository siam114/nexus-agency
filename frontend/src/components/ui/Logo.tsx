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
      {/* Blue Brand Squircle with White Stylized Icon */}
      <div
        className={cn(
          "flex items-center justify-center bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105",
          iconDims
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized geometric N ribbon logo */}
          <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3h2A1.5 1.5 0 0 1 9 4.5v8.2L15 4.5A1.5 1.5 0 0 1 16.5 3h2A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-8.2L9 19.5A1.5 1.5 0 0 1 7.5 21h-2A1.5 1.5 0 0 1 4 19.5v-15z" />
        </svg>
      </div>

      <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Nexus<span className="font-semibold text-slate-800 dark:text-slate-200">Agency</span>
      </span>
    </Link>
  );
}

