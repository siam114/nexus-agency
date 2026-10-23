"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [successInfo, setSuccessInfo] = React.useState({ name: "", service: "" });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

    try {
      const response = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service || undefined,
          message: formData.message.trim(),
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        const errorText =
          resData.message ||
          (Array.isArray(resData.errors) && resData.errors[0]?.message) ||
          "Failed to send your inquiry. Please try again or chat directly on WhatsApp.";
        throw new Error(errorText);
      }

      // Sync immediately into local storage cache for instant admin board visibility
      try {
        const existing = localStorage.getItem("nexus_admin_inquiries");
        const list = existing ? JSON.parse(existing) : [];
        const newRecord = {
          id: resData?.data?.id || `inq-${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service || "General Inquiry",
          message: formData.message.trim(),
          status: "new",
          createdAt: new Date().toISOString(),
        };
        const updated = [newRecord, ...list.filter((x: { id: string }) => x.id !== newRecord.id)];
        localStorage.setItem("nexus_admin_inquiries", JSON.stringify(updated));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("nexus_content_update"));
        }
      } catch {}

      setSuccessInfo({
        name: formData.name.trim(),
        service: formData.service,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Network connection error. Please try again or message directly via WhatsApp.";
      console.error("Contact submission error:", err);
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="mx-auto max-w-2xl text-center mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
          <a
            href={personalLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 px-5 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-sm"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span>Chat with me on WhatsApp</span>
          </a>
          <a
            href={personalLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors shadow-sm"
          >
            <PortfolioIcon className="h-4 w-4 text-blue-600" />
            <span>Explore Personal Portfolio</span>
          </a>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="p-8 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg rounded-3xl">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 shadow-md shadow-emerald-500/20 animate-in zoom-in-75 duration-300">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                  Message Sent to SM SIAM!
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-zinc-900 dark:text-white">{successInfo.name || "friend"}</strong>! An instant email notification has been dispatched to SM SIAM regarding{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {successInfo.service || "your project"}
                  </span>. We will review your goals and reply to your inbox within 24 hours.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-6 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    onClick={() => {
                      setSubmitted(false);
                      setSuccessInfo({ name: "", service: "" });
                      setFormData({ name: "", email: "", service: "", message: "" });
                    }}
                  >
                    Send another inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-2xl border border-red-500/30 bg-red-50/70 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-sm flex items-start gap-3 animate-in fade-in duration-300">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                    <div className="space-y-1">
                      <div className="font-semibold">Unable to send inquiry</div>
                      <div>{errorMsg}</div>
                      <div className="pt-1">
                        <a
                          href={personalLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline hover:text-red-800 dark:hover:text-red-200"
                        >
                          Message directly via WhatsApp &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                )}

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
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
                    minLength={10}
                    placeholder="Briefly describe your project, timeline, and goals..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending Inquiry to SM SIAM...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Proposal Request
                    </>
                  )}
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
