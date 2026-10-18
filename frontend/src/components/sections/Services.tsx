import Link from "next/link";
import { servicesData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
  Check,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  ShoppingCart,
  Layout,
  Globe,
  Search,
  Megaphone,
};

export function Services() {
  return (
    <section id="services" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 text-left sm:text-center sm:mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need to Grow Online
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            We combine website development, design implementation, search optimization, and paid advertising to help businesses strengthen their online presence.
          </p>
        </div>

        {/* 5 Service Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon =
              iconMap[service.iconName as keyof typeof iconMap] || ShoppingCart;

            return (
              <Card
                key={service.id}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300"
              >
                <div>
                  {/* Icon */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Checkpoint Features */}
                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={service.link || "/services"}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
