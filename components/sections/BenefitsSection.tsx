"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import * as LucideIcons from "lucide-react";

interface BenefitsSectionProps {
  className?: string;
}

export function BenefitsSection({
  className,
}: BenefitsSectionProps) {
  const { lang } = useLanguage();
  const t = translations[lang].benefits;
  const { ref, isInView } = useScrollAnimation();

  // Consistent icons matching the 4 values
  const icons = [LucideIcons.CheckCircle, LucideIcons.Wand2, LucideIcons.Heart, LucideIcons.Eye];

  return (
    <section
      ref={ref}
      id="gia-tri"
      className={cn(
        "relative py-24 px-4 bg-paper-warm border-t border-border-taupe/30 overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/background/4.png"
          alt="Vintage background texture"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Block - Slide Up animation */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 space-y-4 animate-slide-up duration-700",
            isInView && "in-view"
          )}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-espresso-dark tracking-tight">
            {t.title}
          </h2>
          {t.description && (
            <p className="text-base text-taupe-gray max-w-xl mx-auto font-medium font-sans">
              {t.description}
            </p>
          )}
          <div className="w-12 h-[2px] bg-olive-primary mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item, index) => {
            const IconComponent = icons[index] || LucideIcons.HelpCircle;

            return (
              <div
                key={index}
                className={cn(
                  "p-6 bg-latte-light/30 backdrop-blur-sm rounded-2xl border border-border-taupe/40 shadow-vintage-sm hover:border-olive-primary/50 transition-vintage hover:shadow-vintage-md group animate-slide-up duration-700",
                  index === 0 && "delay-100",
                  index === 1 && "delay-200",
                  index === 2 && "delay-300",
                  index === 3 && "delay-400",
                  isInView && "in-view"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-olive-primary/10 text-olive-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-espresso-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-taupe-gray text-sm leading-relaxed font-medium font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
