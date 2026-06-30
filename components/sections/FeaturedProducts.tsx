"use client";

import { useState } from "react";
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

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

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
          
          {/* Column 1: Info and Story (Columns 1-4) */}
          <div
            className={cn(
              "lg:col-span-4 space-y-6 animate-slide-in-left duration-700",
              isInView && "in-view"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-border-taupe/40 flex items-center justify-center font-serif font-black text-sm text-olive-primary bg-paper-warm/50 shadow-vintage-sm">
                02
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
                {t.subtitle}
              </span>
            </div>
            
            {/* Display active item's name as headline */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-olive-primary">
                {activeItem.badge || "SIGNATURE"}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-espresso-dark leading-[1.15] tracking-tight uppercase">
                {activeItem.name}
              </h2>
            </div>

            <p className="text-taupe-gray text-sm leading-relaxed font-medium font-sans">
              {activeItem.description}
            </p>

            <div className="pt-2">
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

          {/* Column 2: Center Circular Carousel (Columns 5-8) */}
          <div className="lg:col-span-4 flex justify-center py-6">
            <div
              className={cn(
                "relative w-[290px] h-[290px] md:w-[340px] md:h-[340px] rounded-full border border-border-taupe/50 flex items-center justify-center bg-paper-warm/30 shadow-vintage-lg backdrop-blur-sm p-4 animate-fade-in duration-1000",
                isInView && "in-view"
              )}
            >
              
              {/* Outer decorative ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-border-taupe/30 pointer-events-none" />
              
              {/* Arrow: Prev */}
              <button
                onClick={handlePrev}
                className="absolute left-4 z-20 w-10 h-10 rounded-full border border-border-taupe/40 bg-paper-warm hover:bg-olive-primary text-espresso-dark hover:text-paper-warm flex items-center justify-center shadow-vintage-sm hover:scale-105 transition-all duration-300"
                aria-label="Previous signature drink"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central active product image wrapper */}
              <div className="relative w-4/5 h-4/5 flex items-center justify-center transition-all duration-500 transform hover:scale-105">
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
              <span className="absolute bottom-4 px-4 py-1.5 rounded-full text-xs font-bold bg-olive-primary text-paper-warm shadow-vintage-sm font-sans">
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

            {/* Values content list */}
            <div className="col-span-12 lg:col-span-10 space-y-6 flex flex-col justify-center">
              {signatureValues.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex gap-4 items-start group animate-slide-in-right duration-700",
                      idx === 0 && "delay-100",
                      idx === 1 && "delay-300",
                      idx === 2 && "delay-500",
                      idx === 3 && "delay-700",
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
