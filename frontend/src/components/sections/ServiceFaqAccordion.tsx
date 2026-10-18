"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFaqAccordionProps {
  faqs: FAQ[];
}

export function ServiceFaqAccordion({ faqs }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <Card
            key={faq.question}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-200",
              isOpen
                ? "border-blue-500/40 bg-white dark:bg-slate-900 shadow-md"
                : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-200",
                  isOpen && "rotate-180 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400"
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${index}`}
                className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4"
              >
                {faq.answer}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
