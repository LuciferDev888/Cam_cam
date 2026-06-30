"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQSectionProps } from "@/types/landing";

export function FAQSection({ title, subtitle, items, className }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cn("py-20 px-4 bg-slate-50 dark:bg-slate-950", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title || "Câu hỏi thường gặp"}
          </h2>
          {subtitle && (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors focus:outline-none"
                >
                  <span className="pr-4 text-base md:text-lg">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 shrink-0",
                      isOpen && "transform rotate-180 text-orange-500"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden max-h-0",
                    isOpen && "max-h-[300px] border-t border-slate-50 dark:border-slate-800/80"
                  )}
                >
                  <p className="p-6 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
