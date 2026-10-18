import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { ServiceFaqAccordion } from "@/components/sections/ServiceFaqAccordion";
import { faqsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | NexusAgency",
  description:
    "Get in touch with NexusAgency. Request a proposal for Shopify Development, Figma to Website Conversion, WordPress Development, SEO Services, or Ads Management.",
};

const contactDetails = [
  {
    icon: Mail,
    title: "Direct Email",
    value: "hello@nexusagency.com",
    sub: "Average reply time: within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    sub: "Serving clients worldwide remotely",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM",
    sub: "Flexible project availability",
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactDetails.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="p-6 flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{item.sub}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Embedded Form Component */}
        <Contact />

        {/* FAQs */}
        <div className="mt-20 sm:mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Everything You Need to Know
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Clear answers regarding our core services, workflows, and standards.
            </p>
          </div>

          <ServiceFaqAccordion faqs={faqsData} />
        </div>
      </div>
    </div>
  );
}
