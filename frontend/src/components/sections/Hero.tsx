import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-8 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Full-Stack Digital Solutions & Product Studio</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          We build modern digital experiences that{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            scale your business.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          From full-stack web applications and robust cloud backends to high-conversion product design, we help startups and modern enterprises launch faster.
        </p>

        {/* Call to actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/portfolio">
            <Button size="lg" variant="primary">
              Explore Our Work <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline">
              Our Services
            </Button>
          </Link>
        </div>

        {/* Highlights / Social Proof */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 text-left sm:text-center">
          <div>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">50+</div>
            <div className="text-sm text-zinc-500 mt-1">Projects Launched</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">99.9%</div>
            <div className="text-sm text-zinc-500 mt-1">Client Satisfaction</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center sm:justify-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="text-sm text-zinc-500 mt-1">5-Star Rated Agency</div>
          </div>
        </div>
      </div>
    </section>
  );
}

