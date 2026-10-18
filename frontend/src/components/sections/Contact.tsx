"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, CheckCircle2 } from "lucide-react";
import { personalLinks } from "@/data/personalLinks";
import { WhatsappIcon, PortfolioIcon } from "@/components/ui/SocialIcons";

const SERVICE_PARAM_MAP: Record<string, string> = {
  "shopify development": "Shopify Development",
  "shopify-development": "Shopify Development",
  shopify: "Shopify Development",
  "figma to website conversion": "Figma to Website Conversion",
  "figma-to-website-conversion": "Figma to Website Conversion",
  "figma-to-website": "Figma to Website Conversion",
  figma: "Figma to Website Conversion",
  "wordpress development": "WordPress Development",
  "wordpress-development": "WordPress Development",
  wordpress: "WordPress Development",
  "seo services": "SEO Services",
  "seo-services": "SEO Services",
  seo: "SEO Services",
  "ads management": "Ads Management",
  "ads-management": "Ads Management",
  ads: "Ads Management",
  "custom website development": "Custom Website Development",
  "custom-website-development": "Custom Website Development",
  "custom website": "Custom Website Development",
  "custom-website": "Custom Website Development",
  "custom web development": "Custom Website Development",
  "custom-web-development": "Custom Website Development",
  custom: "Custom Website Development",
};

function ContactFormContent() {
  const searchParams = useSearchParams();
  const rawService = searchParams?.get("service");
  const queryService = React.useMemo(() => {
    if (!rawService) return "";
    const decoded = decodeURIComponent(rawService).trim().toLowerCase();
    return SERVICE_PARAM_MAP[decoded] || "";
  }, [rawService]);

  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState(() => ({
    name: "",
    email: "",
    service: queryService,
    message: "",
  }));
  const [prevQueryService, setPrevQueryService] = React.useState(queryService);

  if (queryService !== prevQueryService) {
    setPrevQueryService(queryService);
    if (queryService) {
      setFormData((prev) => ({ ...prev, service: queryService }));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Let&apos;s Collaborate
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Have a Project in Mind?
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Tell us about your project goals and let&apos;s discuss your Shopify, WordPress, Figma conversion, custom website development, SEO, or advertising needs.
          </p>
        </div>

        {/* Direct Contact Options */}
        <div className="mx-auto max-w-2xl text-center mb-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={personalLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-sm"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span>Chat with me on WhatsApp</span>
          </a>
          <a
            href={personalLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors shadow-sm"
          >
            <PortfolioIcon className="h-4 w-4 text-blue-600" />
            <span>Explore Personal Portfolio</span>
          </a>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Message Sent!
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name || "friend"}! We will review your request regarding{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {formData.service || "our services"}
                  </span>{" "}
                  and get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", service: "", message: "" });
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Service</option>
                    <option value="Shopify Development">Shopify Development</option>
                    <option value="Figma to Website Conversion">Figma to Website Conversion</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="Custom Website Development">Custom Website Development</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="Ads Management">Ads Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Briefly describe your project, timeline, and goals..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" /> Send Proposal Request
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <React.Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" />
        </div>
      }
    >
      <ContactFormContent />
    </React.Suspense>
  );
}
