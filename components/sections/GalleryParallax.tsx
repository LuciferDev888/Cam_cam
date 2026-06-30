"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/context/LanguageContext";

const ROW_1_IMAGES = [
  { name: "Cà phê muối", src: "/images/item/ca_phe_muoi.png" },
  { name: "Matcha Latte", src: "/images/item/matcha_latte.png" },
  { name: "Trà sen vàng", src: "/images/item/tra_sen_vang.png" },
  { name: "Trà Blao cốm non", src: "/images/item/Tra_Blao_com_non_yen_mach.png" },
  { name: "Cà phê sữa", src: "/images/item/ca_phe_sua.png" },
  { name: "Cacao muối", src: "/images/item/cacao_da.png" },
];

const ROW_2_IMAGES = [
  { name: "Blao full topping", src: "/images/item/Tra_Blao_full_topping.png" },
  { name: "Trà gạo rang", src: "/images/item/tra_gao_rang_tran_chau_den.png" },
  { name: "Trà gạo rang full", src: "/images/item/Tra_gao_rang_full_topping.png" },
  { name: "Cà phê kem trứng", src: "/images/item/ca_phe_kem_muoi.png" },
  { name: "Sữa chua đá", src: "/images/item/sua_chua_da.png" },
  { name: "Trà đặc thơm", src: "/images/item/tra_sen_vang.png" },
];

export function GalleryParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { lang } = useLanguage();
  const { ref: animRef, isInView } = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 when entering bottom, 1 when exiting top)
      const visibleHeight = rect.height + windowHeight;
      const progress = (rect.top - windowHeight) / visibleHeight;
      
      // Clamp between -1 and 0 (or normalized progress)
      setScrollProgress(Math.max(-1, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Row 1 translations (moves left as you scroll down)
  const row1Translate = `${scrollProgress * 250}px`;
  // Row 2 translations (moves right as you scroll down)
  const row2Translate = `${-scrollProgress * 250 - 150}px`;

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 bg-beige-vintage border-t border-border-taupe/30 overflow-hidden relative"
    >
      {/* Background Texture overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/background/2.png"
          alt="Vintage background texture"
          fill
          className="object-cover"
        />
      </div>

      <div ref={animRef} className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block with sequential entry delays */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span
            style={{ transitionDelay: "0ms" }}
            className={cn(
              "text-xs font-bold tracking-widest uppercase text-olive-primary block animate-slide-up duration-700",
              isInView && "in-view"
            )}
          >
            {lang === "vi" ? "BỘ SƯU TẬP ĐỒ UỐNG" : "BEVERAGE COLLECTION"}
          </span>
          <h2
            style={{ transitionDelay: "200ms" }}
            className={cn(
              "text-3xl md:text-5xl font-serif font-black text-espresso-dark leading-tight uppercase animate-slide-up duration-700",
              isInView && "in-view"
            )}
          >
            {lang === "vi" ? "Hương Vị Tươi Mát" : "Fresh Aesthetics"}
          </h2>
          <div
            style={{ transitionDelay: "350ms" }}
            className={cn(
              "w-12 h-[2px] bg-olive-primary mx-auto animate-slide-up duration-700",
              isInView && "in-view"
            )}
          ></div>
        </div>

        {/* Gallery Rows Container - opposite direction translation on scroll */}
        <div className="space-y-6 md:space-y-8 relative py-4">
          
          {/* Row 1 - Moves Left */}
          <div
            style={{
              transform: `translateX(${row1Translate})`,
              transition: "transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)",
            }}
            className="flex gap-4 md:gap-6 w-[200%] md:w-[150%] transition-transform duration-300"
          >
            {/* Double array to make row look wider/continuous */}
            {[...ROW_1_IMAGES, ...ROW_1_IMAGES].map((img, idx) => (
              <div
                key={idx}
                className="w-[200px] h-[140px] md:w-[260px] md:h-[185px] flex-shrink-0 relative overflow-hidden rounded-3xl border border-border-taupe/40 bg-paper-warm/65 shadow-vintage-sm flex items-center justify-center p-3 group hover:border-olive-primary/50 transition-colors"
              >
                {/* Glowing Aura Sparkle behind image */}
                <div className="aura-sparkle opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Centered Image */}
                <div className="relative w-4/5 h-4/5 z-10 flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    sizes="200px"
                    className="object-contain p-1 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Moves Right */}
          <div
            style={{
              transform: `translateX(${row2Translate})`,
              transition: "transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)",
            }}
            className="flex gap-4 md:gap-6 w-[200%] md:w-[150%] transition-transform duration-300"
          >
            {[...ROW_2_IMAGES, ...ROW_2_IMAGES].map((img, idx) => (
              <div
                key={idx}
                className="w-[200px] h-[140px] md:w-[260px] md:h-[185px] flex-shrink-0 relative overflow-hidden rounded-3xl border border-border-taupe/40 bg-paper-warm/65 shadow-vintage-sm flex items-center justify-center p-3 group hover:border-olive-primary/50 transition-colors"
              >
                {/* Glowing Aura Sparkle behind image */}
                <div className="aura-sparkle opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Centered Image */}
                <div className="relative w-4/5 h-4/5 z-10 flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    sizes="200px"
                    className="object-contain p-1 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default GalleryParallax;
