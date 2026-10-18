import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { ServiceFaqAccordion } from "@/components/sections/ServiceFaqAccordion";
import { faqsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";
import { personalLinks } from "@/data/personalLinks";
import { WhatsappIcon, PortfolioIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us | NexusAgency",
  description:
    "Get in touch with NexusAgency. Request a proposal for Shopify Development, Figma to Website Conversion, WordPress Development, Custom Website Development, SEO Services, or Ads Management.",
};

const contactDetails = [
  {
    icon: Mail,
    title: "Direct Email",
    value: personalLinks.email,
    sub: "Average reply time: within 24 hours",
    link: `mailto:${personalLinks.email}`,
    actionLabel: "Send an email",
  },
  {
    icon: WhatsappIcon,
    title: "WhatsApp Chat",
    value: personalLinks.phoneDisplay,
    sub: "Direct messaging with Siam",
    link: personalLinks.whatsapp,
    actionLabel: "Chat with me on WhatsApp",
  },
  {
    icon: PortfolioIcon,
    title: "Lead Portfolio",
    value: "Siam's Portfolio",
    sub: "Explore individual work & case studies",
    link: personalLinks.portfolio,
    actionLabel: "Explore personal portfolio",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    sub: "Serving clients worldwide remotely",
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactDetails.map((item) => {
            const Icon = item.icon;
            const cardContent = (
              <Card className="p-6 flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all h-full">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{item.sub}</div>
                  {item.actionLabel && (
                    <div className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                      {item.actionLabel} &rarr;
                    </div>
                  )}
                </div>
              </Card>
            );

            if (item.link) {
              return (
                <a
                  key={item.title}
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="block focus:outline-none group"
                  aria-label={item.actionLabel || item.title}
                >
                  {cardContent}
                </a>
              );
            }

            return <div key={item.title}>{cardContent}</div>;
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
