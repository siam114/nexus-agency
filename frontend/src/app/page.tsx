import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonialsData } from "@/data/mockData";
import { ArrowRight, Quote, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />

      {/* Testimonials & About Teaser */}
      <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Loved by Founders & Product Leaders
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              See what our partners have to say about working with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonialsData.map((t) => (
              <Card key={t.id} className="p-8 relative">
                <Quote className="h-8 w-8 text-blue-600/20 absolute top-6 right-6" />
                <p className="text-base italic text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More About Our Team & Values <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Contact Form Banner */}
      <Contact />
    </>
  );
}
