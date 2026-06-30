"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StorySectionProps {
  bgImage: string;
  className?: string;
}

export function StorySection({
  bgImage,
  className,
}: StorySectionProps) {
  const { lang } = useLanguage();
  const t = translations[lang].story;
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="cau-chuyen"
      className={cn(
        "relative py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/background/3.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Large Space Photo (Columns 1-6 - Slide in Left) */}
          <div
            style={{ transitionDelay: "0ms" }}
            className={cn(
              "lg:col-span-6 relative flex justify-center animate-slide-in-left duration-700 group",
              isInView && "in-view"
            )}
          >
            {/* Glowing Aura Sparkle behind image */}
            <div className="aura-sparkle opacity-100 scale-105 pointer-events-none" />

            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-vintage-lg border-[6px] border-paper-warm z-10">
              <Image
                src={bgImage}
                alt="CAM CAM Cozy Space"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Story Card (Columns 7-12 - Slide in Right with sequential text delays) */}
          <div className="lg:col-span-6 p-8 md:p-10 bg-paper-warm rounded-3xl border border-border-taupe/40 shadow-vintage-md space-y-6">
            <span
              style={{ transitionDelay: "200ms" }}
              className={cn(
                "text-xs font-bold tracking-widest uppercase text-olive-primary block animate-slide-in-right duration-700",
                isInView && "in-view"
              )}
            >
              {t.subtitle}
            </span>
            <h2
              style={{ transitionDelay: "400ms" }}
              className={cn(
                "text-2xl md:text-4xl font-serif font-bold text-espresso-dark leading-tight animate-slide-in-right duration-700",
                isInView && "in-view"
              )}
            >
              {t.title}
            </h2>
            <div
              style={{ transitionDelay: "550ms" }}
              className={cn(
                "w-16 h-[2px] bg-olive-primary animate-slide-in-right duration-700",
                isInView && "in-view"
              )}
            ></div>
            <p
              style={{ transitionDelay: "700ms" }}
              className={cn(
                "text-taupe-gray leading-relaxed text-sm md:text-base font-medium font-sans animate-slide-in-right duration-700",
                isInView && "in-view"
              )}
            >
              {t.content}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StorySection;
