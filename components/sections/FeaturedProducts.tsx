"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Coffee, ChefHat, Leaf, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface FeaturedItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

interface FeaturedProductsProps {
  items: FeaturedItem[];
  className?: string;
}

export function FeaturedProducts({
  items,
  className,
}: FeaturedProductsProps) {
  const { lang } = useLanguage();
  const t = translations[lang].featured;
  const { ref, isInView } = useScrollAnimation();

  // Active indexes for transition animations
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition helper (fades out active item, swaps content, fades back in)
  const triggerTransition = useCallback((nextIndex: number) => {
    if (isTransitioning || nextIndex === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setDisplayIndex(nextIndex);
      setIsTransitioning(false);
    }, 450); // Match CSS transition duration
  }, [activeIndex, isTransitioning]);

  const handlePrev = () => {
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    triggerTransition(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    triggerTransition(nextIndex);
  };

  // Autoplay effect - transitions to next drink every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      triggerTransition(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, items.length, triggerTransition]);

  const activeItem = items[displayIndex] || items[0];

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuSection = document.querySelector("#thuc-don");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 4 consistent signature values on the right column
  const signatureValues = [
    {
      title: t.values[0].title,
      desc: t.values[0].desc,
      icon: Coffee
    },
    {
      title: t.values[1].title,
      desc: t.values[1].desc,
      icon: ChefHat
    },
    {
      title: t.values[2].title,
      desc: t.values[2].desc,
      icon: Leaf
    },
    {
      title: t.values[3].title,
      desc: t.values[3].desc,
      icon: Sparkles
    }
  ];

  return (
    <section
      ref={ref}
      id="san-pham-noi-bat"
      className={cn(
        "py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 relative overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/background/5.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main Grid Layout containing Left Column, Middle Carousel, and Right Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column 1: Info and Story (Columns 1-4) - Sequential left-to-right delays */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Step Indicator */}
            <div
              style={{ transitionDelay: "0ms" }}
              className={cn(
                "flex items-center gap-3 animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              <span className="w-10 h-10 rounded-full border border-border-taupe/40 flex items-center justify-center font-serif font-black text-sm text-olive-primary bg-paper-warm/50 shadow-vintage-sm">
                02
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
                {t.subtitle}
              </span>
            </div>
            
            {/* Active Drink Info Wrapper - fades/slides out, then slides back in cascadingly */}
            <div className="space-y-4">
              
              {/* Badge */}
              <div
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "100ms",
                }}
                className={cn(
                  "transition-all duration-500 transform",
                  isTransitioning
                    ? "opacity-0 -translate-y-2 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                )}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-olive-primary">
                  {activeItem.badge || "SIGNATURE"}
                </span>
              </div>

              {/* Title */}
              <div
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "250ms",
                }}
                className={cn(
                  "transition-all duration-500 transform",
                  isTransitioning
                    ? "opacity-0 -translate-y-2 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                )}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-black text-espresso-dark leading-[1.15] tracking-tight uppercase">
                  {activeItem.name}
                </h2>
              </div>

              {/* Description */}
              <div
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "400ms",
                }}
                className={cn(
                  "transition-all duration-500 transform",
                  isTransitioning
                    ? "opacity-0 -translate-y-2 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                )}
              >
                <p className="text-taupe-gray text-sm leading-relaxed font-medium font-sans">
                  {activeItem.description}
                </p>
              </div>

              {/* CTA and link */}
              <div
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "550ms",
                }}
                className={cn(
                  "pt-2 transition-all duration-500 transform",
                  isTransitioning
                    ? "opacity-0 -translate-y-2 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                )}
              >
                <a
                  href="#thuc-don"
                  onClick={handleScrollToMenu}
                  className="inline-flex items-center gap-2 text-sm font-serif font-bold text-olive-primary hover:text-moss-dark transition-colors group"
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

          {/* Column 2: Center Circular Carousel (Columns 5-8) - Fade/scale in */}
          <div className="lg:col-span-4 flex justify-center py-6">
            <div
              style={{ transitionDelay: "300ms" }}
              className={cn(
                "relative w-[290px] h-[290px] md:w-[340px] md:h-[340px] rounded-full border border-border-taupe/50 flex items-center justify-center bg-paper-warm/30 shadow-vintage-lg backdrop-blur-sm p-4 animate-fade-in duration-1000",
                isInView && "in-view"
              )}
            >
              
              {/* Glowing Aura Sparkle behind image */}
              <div className="aura-sparkle opacity-100" />
              
              {/* Outer decorative ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-border-taupe/30 pointer-events-none z-[1]" />
              
              {/* Arrow: Prev */}
              <button
                onClick={handlePrev}
                className="absolute left-4 z-20 w-10 h-10 rounded-full border border-border-taupe/40 bg-paper-warm hover:bg-olive-primary text-espresso-dark hover:text-paper-warm flex items-center justify-center shadow-vintage-sm hover:scale-105 transition-all duration-300"
                aria-label="Previous signature drink"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central active product image wrapper - sways and floats gently, fades and shrinks on swap */}
              <div
                className={cn(
                  "relative w-4/5 h-4/5 flex items-center justify-center transition-all duration-500 transform z-10",
                  isTransitioning
                    ? "opacity-0"
                    : "opacity-100 animate-float-sway"
                )}
              >
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.name}
                  fill
                  sizes="260px"
                  className="object-contain p-2"
                />
              </div>

              {/* Arrow: Next */}
              <button
                onClick={handleNext}
                className="absolute right-4 z-20 w-10 h-10 rounded-full border border-border-taupe/40 bg-paper-warm hover:bg-olive-primary text-espresso-dark hover:text-paper-warm flex items-center justify-center shadow-vintage-sm hover:scale-105 transition-all duration-300"
                aria-label="Next signature drink"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Tiny Price Tag Badge */}
              <span className="absolute bottom-4 px-4 py-1.5 rounded-full text-xs font-bold bg-olive-primary text-paper-warm shadow-vintage-sm font-sans z-20">
                {activeItem.price}
              </span>

            </div>
          </div>

          {/* Column 3: Vertical Divider and Values List (Columns 9-12) */}
          <div className="lg:col-span-4 grid grid-cols-12 gap-4 items-stretch lg:pl-6">
            
            {/* Divider Line with Diamond (Desktop only) */}
            <div className="hidden lg:flex col-span-2 flex-col items-center relative">
              <div className="w-[1px] flex-grow bg-border-taupe/40" />
              {/* Diamond accent in middle */}
              <div className="w-3 h-3 rotate-45 border border-border-taupe/50 bg-olive-primary my-2" />
              <div className="w-[1px] flex-grow bg-border-taupe/40" />
            </div>

            {/* Values content list - Animates sequentially */}
            <div className="col-span-12 lg:col-span-10 space-y-6 flex flex-col justify-center">
              {signatureValues.map((val, idx) => {
                const IconComponent = val.icon;
                const delayTime = `${500 + idx * 200}ms`;

                return (
                  <div
                    key={idx}
                    style={{ transitionDelay: delayTime }}
                    className={cn(
                      "flex gap-4 items-start group animate-slide-in-right duration-700",
                      isInView && "in-view"
                    )}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-full border border-border-taupe/40 flex items-center justify-center text-olive-primary bg-paper-warm/40 shadow-vintage-sm group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-dark font-sans group-hover:text-olive-primary transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-taupe-gray text-xs leading-relaxed font-medium font-sans">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
