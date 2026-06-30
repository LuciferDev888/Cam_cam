"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="ve-chung-toi"
      className="py-24 px-4 bg-paper-warm border-t border-border-taupe/30 relative overflow-hidden"
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <Image
          src="/images/background/1.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Headline & Main Paragraph (Columns 1-4) - Sequential left-to-right animations */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
            <span
              style={{ transitionDelay: "0ms" }}
              className={cn(
                "text-xs font-bold tracking-widest uppercase text-olive-primary animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.subtitle}
            </span>
            <h2
              style={{ transitionDelay: "200ms" }}
              className={cn(
                "text-3xl md:text-5xl font-serif font-black text-espresso-dark leading-tight animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.title}
            </h2>
            <div
              style={{ transitionDelay: "350ms" }}
              className={cn(
                "w-16 h-[2px] bg-olive-primary animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            ></div>
            <p
              style={{ transitionDelay: "500ms" }}
              className={cn(
                "text-taupe-gray leading-relaxed text-sm md:text-base font-medium font-sans animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.description}
            </p>
          </div>

          {/* Handcrafted highlights (Columns 5-12 - Red Box Area) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-10">
            {t.highlights.map((item, index) => {
              // Delay highlights cards to animate in sequence after the text has completed loading
              const delayTime = `${700 + index * 200}ms`;
              return (
                <div
                  key={index}
                  style={{ transitionDelay: delayTime }}
                  className={cn(
                    "p-5 py-8 bg-latte-light/45 rounded-3xl border border-border-taupe/40 shadow-vintage-sm hover:border-olive-primary/50 transition-vintage hover:shadow-vintage-md group flex flex-col justify-between min-h-[300px] animate-slide-up duration-700",
                    isInView && "in-view"
                  )}
                >
                  <div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {index === 0 ? "☕" : index === 1 ? "🍃" : index === 2 ? "🏛️" : "🌱"}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-espresso-dark mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-taupe-gray text-xs leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
