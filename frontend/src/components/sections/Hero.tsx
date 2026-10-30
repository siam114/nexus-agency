import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-24">
      {/* Soft blue radial background glow with gentle breathing animation */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none rounded-full animate-soft-glow" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full animate-soft-glow" style={{ animationDelay: "-4s" }} />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-7 2xl:space-y-8 text-left">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>DIGITAL GROWTH &amp; WEB DEVELOPMENT AGENCY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] 2xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              We Build Better Websites That{" "}
              <span className="text-blue-600 dark:text-blue-500">Help Your Business Grow.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl 2xl:max-w-2xl">
              From high-converting Shopify stores and custom Figma-to-website development
              to WordPress solutions, SEO, and paid advertising, we help businesses build a stronger online presence and reach their growth goals.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/services" className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-3.5 text-sm font-semibold shadow-md shadow-blue-500/25 transition-transform hover:-translate-y-0.5"
                >
                  Explore Our Services <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-center rounded-full px-6 py-3.5 text-sm font-semibold border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Composition Mockup */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] 2xl:max-w-[640px]">
              {/* Desktop Browser Window Mockup */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mx-auto flex items-center justify-center rounded-md bg-white dark:bg-slate-900 px-4 py-0.5 text-[11px] font-mono text-slate-400 border border-slate-200/70 dark:border-slate-800 w-44 text-center truncate">
                    purelife-organic.store
                  </div>
                </div>

                {/* Browser Content (Shopify Store Preview) */}
                <div className="p-5 bg-gradient-to-b from-stone-50/70 to-white dark:from-slate-900 dark:to-slate-950">
                  {/* Store Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200/50 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-md bg-emerald-600 text-white font-serif flex items-center justify-center text-xs font-bold">
                        P
                      </span>
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 tracking-tight">
                        PureLife
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500">
                      <span>Shop</span>
                      <span>Story</span>
                      <span>Journal</span>
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-medium">
                        Cart (2)
                      </span>
                    </div>
                  </div>

                  {/* Store Hero */}
                  <div className="mt-4 grid grid-cols-2 gap-4 items-center">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-emerald-600 uppercase">
                        Organic Living
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                        Better Products for a Healthier You
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        Certified pure ingredients, packaged sustainably for modern living.
                      </p>
                      <button className="mt-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-medium px-3 py-1">
                        Shop Collection
                      </button>
                    </div>

                    {/* Product visual container */}
                    <div className="relative h-28 rounded-xl bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-end justify-center gap-2">
                        {/* Minimalist bottle illustrations */}
                        <div className="w-7 h-16 rounded-md bg-amber-700/80 shadow-md relative flex flex-col items-center">
                          <span className="w-3 h-2 rounded-t-sm bg-stone-300 -mt-2" />
                          <span className="w-5 h-6 bg-white/90 rounded-sm mt-3 text-[5px] text-slate-700 flex items-center justify-center font-bold">
                            SERUM
                          </span>
                        </div>
                        <div className="w-9 h-20 rounded-md bg-stone-100 border border-stone-200 shadow-md relative flex flex-col items-center">
                          <span className="w-4 h-3 rounded-t-sm bg-stone-800 -mt-2.5" />
                          <span className="w-7 h-8 bg-amber-100/80 rounded-sm mt-4 text-[5px] text-amber-900 flex items-center justify-center font-bold">
                            ORGANIC
                          </span>
                        </div>
                        <div className="w-6 h-12 rounded-md bg-emerald-800/80 shadow-md relative flex flex-col items-center">
                          <span className="w-2.5 h-2 rounded-t-sm bg-stone-300 -mt-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Collection Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <span>Featured Collection</span>
                      <span className="text-blue-600 text-[9px]">View all</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { title: "Glow Oil", price: "$34", color: "bg-amber-100/70" },
                        { title: "Hydra Mist", price: "$28", color: "bg-sky-100/70" },
                        { title: "Cleanse Balm", price: "$42", color: "bg-emerald-100/70" },
                        { title: "Night Serum", price: "$56", color: "bg-indigo-100/70" },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-lg p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center"
                        >
                          <div className={`h-10 rounded-md ${item.color} mb-1 flex items-center justify-center`}>
                            <span className="text-[9px] font-mono text-slate-600">✦</span>
                          </div>
                          <div className="text-[9px] font-medium text-slate-800 dark:text-slate-200 truncate">
                            {item.title}
                          </div>
                          <div className="text-[8px] text-slate-500 font-semibold">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Analytics Card (Top-Right of composition) */}
              <div className="absolute -top-7 -right-3 sm:-right-6 w-52 sm:w-56 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl z-20 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">Total Sales</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <TrendingUp className="h-2.5 w-2.5" /> +18.2%
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  $13,420
                </div>

                {/* Smooth Sparkline Line Chart */}
                <div className="mt-2 h-10 w-full">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 24 Q 15 20, 25 22 T 50 14 T 75 16 T 100 5 L 100 30 L 0 30 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0 24 Q 15 20, 25 22 T 50 14 T 75 16 T 100 5"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-slate-400">Orders</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      242 <span className="text-emerald-500 text-[9px] font-normal">+12%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Conv. Rate</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      3.24% <span className="text-emerald-500 text-[9px] font-normal">+1.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Storefront Preview (Bottom-Right of composition) */}
              <div className="absolute -bottom-8 right-2 sm:right-6 w-36 sm:w-40 rounded-[28px] border-4 border-slate-900 bg-white dark:bg-slate-900 p-2 shadow-2xl z-10 hidden sm:block">
                {/* Speaker notch */}
                <div className="mx-auto h-2 w-10 rounded-full bg-slate-800 mb-2" />
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-2 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[7px] text-slate-500 pb-1 border-b border-slate-200">
                    <span className="font-bold text-slate-800 dark:text-white">PureLife</span>
                    <span>🛒</span>
                  </div>
                  <div className="py-2 text-center">
                    <div className="text-[8px] font-bold text-slate-900 dark:text-white leading-tight">
                      Better Products for You
                    </div>
                    <div className="mt-1.5 h-12 w-full rounded-md bg-gradient-to-r from-amber-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-xs">🧴</span>
                    </div>
                    <div className="mt-1.5 text-[7px] bg-slate-900 text-white rounded-full py-0.5">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
