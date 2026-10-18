"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
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
    <div className="w-full space-y-3 sm:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className={cn(
              "w-full overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-200",
              isOpen
                ? "border-blue-500/40 bg-white dark:bg-slate-900 shadow-sm sm:shadow-md ring-1 ring-blue-500/10"
                : "border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-start sm:items-center justify-between gap-3 p-4 sm:p-5 md:p-6 text-left transition-colors cursor-pointer select-none"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug sm:leading-normal pr-1 break-words flex-1">
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-all duration-200 mt-0.5 sm:mt-0",
                  isOpen && "rotate-180 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${index}`}
                role="region"
                className="px-4 pb-4 sm:px-6 sm:pb-6 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 break-words"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
