import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { faqsData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Nexus Agency",
  description: "Get in touch with Nexus Agency. Request a project proposal or schedule a free discovery consultation.",
};

const contactDetails = [
  {
    icon: Mail,
    title: "Direct Email",
    value: "hello@nexusagency.com",
    sub: "Average reply time: under 4 hours",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "San Francisco, CA",
    sub: "Global Remote Team across US & Europe",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM EST",
    sub: "Weekend emergency on-call for active clients",
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
              <Card key={item.title} className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5">
                    {item.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{item.sub}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Embedded Form Component */}
        <Contact />

        {/* FAQs */}
        <div className="mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

