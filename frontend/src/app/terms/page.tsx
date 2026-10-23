import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { personalLinks } from "@/data/personalLinks";
import {
  ChevronRight,
  FileCheck,
  Clock,
  ArrowRight,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | NexusAgency",
  description:
    "Review the Terms of Service governing client engagements, deliverables, intellectual property ownership, and website development services with NexusAgency.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
              Terms of Service
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12 pb-10 border-b border-slate-100 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">
            <Scale className="h-3.5 w-3.5" />
            <span>AGREEMENT &amp; POLICIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            These Terms of Service govern the professional engagement between NexusAgency (&quot;Agency,&quot; &quot;we,&quot; &quot;us&quot;) and clients (&quot;Client,&quot; &quot;you&quot;) commissioning digital services, web development, design implementation, search optimization, or advertising management.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Last Updated: October 2025</span>
          </div>
        </div>

        {/* Terms Content Sections */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              By commissioning a project, signing a project proposal, paying an invoice deposit, or using our website, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or organization, you represent that you have legal authority to bind that entity.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. Scope of Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              NexusAgency provides digital agency services agreed upon in written project proposals or statements of work across our core competencies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>
                <strong>Shopify Development:</strong> Theme customization, custom Liquid section creation, storefront setup, and e-commerce optimization.
              </li>
              <li>
                <strong>Figma to Website Conversion:</strong> Responsive translation of approved UI/UX Figma designs into clean, accessible web code.
              </li>
              <li>
                <strong>WordPress Development:</strong> Custom responsive themes, block editor configurations, and business website setup.
              </li>
              <li>
                <strong>Custom Website Development:</strong> Tailored frontend architectures built with modern frameworks (React, Next.js, Tailwind CSS) and API integrations.
              </li>
              <li>
                <strong>SEO Services:</strong> Technical site audits, on-page content alignment, metadata structuring, and crawlability optimization.
              </li>
              <li>
                <strong>Ads Management:</strong> Account setup, audience targeting, conversion event configuration, and optimization across Google and Meta platforms.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. Client Responsibilities &amp; Materials
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              To ensure on-time delivery, the Client agrees to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>Provide all necessary content, brand assets, copywriting, high-resolution imagery, and product data required for project execution.</li>
              <li>Supply required third-party account access (e.g. Shopify collaborator access, domain registrar DNS, Google Tag Manager) in a timely manner.</li>
              <li>Review milestone deliverables and provide consolidated feedback within agreed project timelines.</li>
            </ul>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              The Client warrants that all materials provided are owned by the Client or that appropriate licensing permissions have been obtained.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Intellectual Property &amp; Code Ownership
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Upon receipt of full final payment for completed project milestones:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              <li>
                <strong>Full Ownership:</strong> The Client owns all bespoke code, custom templates, visual layouts, and digital assets specifically designed and developed for the project.
              </li>
              <li>
                <strong>No Proprietary Lock-In:</strong> NexusAgency does not impose proprietary software licensing fees or lock-in requirements. Source code repositories and deployment access are fully transferred to the Client.
              </li>
              <li>
                <strong>Portfolio Display:</strong> Unless expressly agreed otherwise under a mutual Non-Disclosure Agreement (NDA), NexusAgency retains the right to display the completed work in our agency portfolio and case studies.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. Payment Terms &amp; Invoicing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Projects are structured with clear milestone payments agreed upon prior to commencement (e.g., initial deposit, mid-project milestone, and pre-launch final balance). Invoices are payable upon receipt via agreed banking or digital payment methods. Work on subsequent milestones or final production deployment proceeds once milestone payments are cleared.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Revisions &amp; Scope Adjustments
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each project scope includes designated rounds of revisions during design and development phases. Additional features, platform shifts, or substantial modifications requested outside the agreed scope will be evaluated under a written change order with clear cost and timeline estimates before implementation.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7. Warranty &amp; Post-Launch Bug Fixes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              We stand behind the quality of our code. NexusAgency provides a <strong>30-day post-launch warranty period</strong> during which any coding defects, responsive display bugs, or broken functionalities within the agreed scope will be corrected promptly at no additional cost.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              This warranty does not cover issues caused by client-initiated code modifications, unauthorized third-party plugin updates, or external platform outages.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              8. Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              While we adhere to high industry standards in code quality and performance optimization, NexusAgency shall not be held liable for indirect, incidental, or consequential damages resulting from third-party hosting downtimes, platform API policy updates (e.g., Google or Meta algorithm shifts), or store transaction interruptions outside our direct control. In all cases, our total aggregate liability is limited to the fees paid for the specific services rendered.
            </p>
          </section>
        </div>

        {/* Contact Banner Card */}
        <Card className="mt-16 p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <FileCheck className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Service Inquiries</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Have questions about our project terms or contracts?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                We are happy to answer any questions or discuss custom project requirements. Contact us at{" "}
                <a
                  href={`mailto:${personalLinks.email}`}
                  className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
                >
                  {personalLinks.email}
                </a>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/contact">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-6">
                  Discuss a Project <ArrowRight className="h-4 w-4 ml-1.5" />
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

