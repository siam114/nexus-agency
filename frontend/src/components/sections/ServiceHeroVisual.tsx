import * as React from "react";
import {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  TrendingUp,
  Sparkles,
  Layers,
  Code2,
  BarChart2,
} from "lucide-react";

interface ServiceHeroVisualProps {
  slug: string;
  badge: {
    label: string;
    value: string;
    tag: string;
  };
}

export function ServiceHeroVisual({ slug, badge }: ServiceHeroVisualProps) {
  if (slug === "shopify-development") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
                <ShoppingCart className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Shopify Storefront
              </span>
            </div>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
              Online Store 2.0
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="h-28 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-950 p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
                  Featured Product
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  Eco Outdoor Jacket
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">$148.00</div>
              </div>
              <div className="h-16 w-16 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <span className="text-2xl">🧥</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Mobile Checkout</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Optimized
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Theme Code</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Custom Liquid
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics Badge */}
        <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.value}
              </div>
              <div className="text-[10px] text-slate-400">{badge.tag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "figma-to-website") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                <Layout className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Figma Frame → Web Component
              </span>
            </div>
            <span className="rounded-full bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-purple-600">
              100% Responsive
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed overflow-hidden">
              <div className="text-slate-500">{"// Semantic React / Tailwind Implementation"}</div>
              <div className="text-purple-400">export function <span className="text-blue-300">HeroSection</span>() &#123;</div>
              <div className="pl-3 text-slate-300">return (</div>
              <div className="pl-6 text-emerald-400">&lt;div className=&quot;grid grid-cols-1 md:grid-cols-2&quot;&gt;</div>
              <div className="pl-9 text-slate-400">&lt;!-- Pixel-conscious layouts --&gt;</div>
              <div className="pl-3 text-slate-300">);</div>
              <div className="text-purple-400">&#125;</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Desktop</div>
                <div className="text-[10px] text-emerald-600 font-semibold">1440px ✓</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Tablet</div>
                <div className="text-[10px] text-emerald-600 font-semibold">768px ✓</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Mobile</div>
                <div className="text-[10px] text-emerald-600 font-semibold">390px ✓</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.value}
              </div>
              <div className="text-[10px] text-slate-400">{badge.tag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "wordpress-development") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-700 text-white font-bold text-xs">
                <Globe className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                WordPress Administration
              </span>
            </div>
            <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
              Block Editor Ready
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Custom Page Templates
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  Corporate Overview
                </div>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  Service Portfolio
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Security Hardening</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  SSL &amp; Backups
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Content Publishing</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Client Editable
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Layers className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.value}
              </div>
              <div className="text-[10px] text-slate-400">{badge.tag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "seo-services") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                <Search className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Search Engine Snippet Preview
              </span>
            </div>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
              Verified Schema
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="text-[11px] text-slate-400 truncate">
                https://nexusagency.com › services › seo-services
              </div>
              <div className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                Technical &amp; On-Page SEO Services | NexusAgency
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                Ethical on-page optimization, clean metadata hierarchy, schema markup, and site structure enhancements.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Crawl Efficiency</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Clean XML &amp; Robots
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Core Web Vitals</span>
                <div className="font-bold text-emerald-600 mt-0.5">
                  Fast &amp; Responsive
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.value}
              </div>
              <div className="text-[10px] text-slate-400">{badge.tag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "custom-website-development") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                <Code2 className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Custom Architecture
              </span>
            </div>
            <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
              Modern Full-Stack
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {/* Code / Architecture preview */}
            <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1.5 mb-1.5 border-b border-slate-800/80">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  AppArchitecture.tsx
                </span>
                <span className="text-slate-400">TypeScript / Next.js</span>
              </div>
              <p className="text-slate-400">
                <span className="text-purple-400">export const</span>{" "}
                <span className="text-blue-300">CustomApp</span> = &#123;
              </p>
              <p className="pl-3 text-emerald-400">
                stack: <span className="text-amber-300">&quot;React / Next.js + Tailwind&quot;</span>,
              </p>
              <p className="pl-3 text-emerald-400">
                integrations: [<span className="text-amber-300">&quot;CRM&quot;</span>, <span className="text-amber-300">&quot;Analytics&quot;</span>, <span className="text-amber-300">&quot;APIs&quot;</span>],
              </p>
              <p className="pl-3 text-emerald-400">
                performance: <span className="text-sky-300">99</span>,
              </p>
              <p className="text-slate-400">&#125;;</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Component Design</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Modular &amp; Scalable
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">Core Web Vitals</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  Sub-Second Load
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics Badge */}
        <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.value}
              </div>
              <div className="text-[10px] text-slate-400">{badge.tag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for ads-management
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
              <Megaphone className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Campaign Attribution
            </span>
          </div>
          <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600">
            Conversion Tracking
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-500 font-medium">Channel Distribution</span>
              <span className="text-indigo-600 font-bold">Google &amp; Meta</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
              <div className="h-full bg-blue-600 w-3/5" title="Google Search" />
              <div className="h-full bg-indigo-500 w-2/5" title="Meta Ads" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Google Search (60%)</span>
              <span>Meta Social (40%)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400">Audience Targeting</span>
              <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                Intent-Based
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400">Event Attribution</span>
              <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                Verified Pixels
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
            <BarChart2 className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {badge.value}
            </div>
            <div className="text-[10px] text-slate-400">{badge.tag}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

