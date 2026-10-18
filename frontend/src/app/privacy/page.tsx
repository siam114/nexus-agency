import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { personalLinks } from "@/data/personalLinks";
import {
  ChevronRight,
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Mail,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NexusAgency",
  description:
    "Read the NexusAgency Privacy Policy to understand how we collect, use, and protect your information when using our website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-semibold text-slate-900 dark:text-white" aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12 pb-10 border-b border-slate-100 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            At NexusAgency, we respect your privacy and are committed to protecting the information you share with us. This policy explains what data we collect, how we handle it, and your rights as a visitor or client.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Last Updated: October 2025</span>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We collect information that you voluntarily provide to us when inquiring about our agency services, requesting project proposals, or communicating directly with our team:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>
                <strong>Contact Information:</strong> Your name, email address, phone number, and company name when submitted via our contact forms, direct email, or WhatsApp.
              </li>
              <li>
                <strong>Project Specifications:</strong> Details regarding your website requirements, platform preferences (Shopify, WordPress, custom code), design files, timelines, and business goals.
              </li>
              <li>
                <strong>Technical &amp; Device Data:</strong> Standard server logs including browser type, operating system, IP address, referring URLs, and pages visited on our site.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We use the collected information strictly for legitimate commercial and project delivery purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>To evaluate project scope, prepare formal proposals, and answer client inquiries.</li>
              <li>To execute contract deliverables across web development, design conversion, SEO audits, or advertising setups.</li>
              <li>To provide customer support, ongoing maintenance, and project milestone updates.</li>
              <li>To monitor website performance, secure our digital infrastructure, and enhance user experience.</li>
            </ul>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We do <strong>not</strong> sell, rent, or trade your personal information to third-party data brokers or marketing lists under any circumstances.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. Third-Party Services &amp; Platform Integrations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              In the course of delivering our services, we may work with reputable third-party platforms with your permission:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>
                <strong>E-commerce &amp; CMS Platforms:</strong> Shopify and WordPress for storefront and content management setup.
              </li>
              <li>
                <strong>Advertising &amp; Analytics Tools:</strong> Google Ads, Google Tag Manager, Google Analytics, and Meta Ads Manager for client campaign configuration and tracking verification.
              </li>
              <li>
                <strong>Communication Channels:</strong> Email service providers and WhatsApp for direct client collaboration.
              </li>
            </ul>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each third-party platform operates under its own privacy policy and security protocols.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Data Storage, Security &amp; Retention
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We implement industry-standard administrative and technical security measures to protect your information against unauthorized access, alteration, or disclosure. Client project repositories and communications are stored on secure, authenticated platforms.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We retain project records only as long as necessary to fulfill agreed services, maintain legal accounting compliance, and provide continued warranty and maintenance support.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. Cookies &amp; Local Storage
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Our website uses minimal browser storage mechanisms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>
                <strong>Theme Preferences:</strong> We use browser <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</code> to remember your selected display mode (Dark or Light mode) across visits.
              </li>
              <li>
                <strong>Essential Analytics:</strong> We may use basic privacy-friendly performance telemetry to monitor site speed and identify broken links.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Your Rights &amp; Choices
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Depending on your location, you have rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>The right to request a copy of the personal information we hold about you.</li>
              <li>The right to request correction of inaccurate contact or project details.</li>
              <li>The right to request deletion of your contact records from our active communications.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7. Updates to This Policy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We may periodically update this Privacy Policy to reflect changes in our operational practices, new service offerings, or legal obligations. Any updates will be published on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </section>
        </div>

        {/* Contact Banner Card */}
        <Card className="mt-16 p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <Mail className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Contact Our Team</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Have questions about our privacy practices?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                Feel free to contact us anytime at{" "}
                <a
                  href="mailto:hello@nexusagency.com"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
                >
                  hello@nexusagency.com
                </a>{" "}
                or chat directly with our founder on WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/contact">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-6">
                  Contact Us <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href={personalLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-full border-slate-200 dark:border-slate-800 text-xs sm:text-sm px-5"
                >
                  WhatsApp Chat
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
