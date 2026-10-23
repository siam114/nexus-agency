import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-100 dark:border-blue-950/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/90 dark:from-slate-900/90 dark:via-blue-950/40 dark:to-slate-900/90 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                GROW YOUR ONLINE PRESENCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                Ready to Grow Your Online Business?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you need a Shopify store, a Figma design converted into a website, a WordPress solution, SEO improvements, or advertising management, let&apos;s discuss your project.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <Link href="/contact" className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-3 text-sm font-semibold shadow-md shadow-blue-500/25"
                >
                  Start a Project <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-center rounded-full px-6 py-3 text-sm font-semibold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Mail className="h-4 w-4 mr-2 text-slate-500" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
