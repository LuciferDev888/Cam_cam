"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const visibleHeight = rect.height + windowHeight;
      const progress = (rect.top - windowHeight) / visibleHeight;
      
      // Normalize progress between -1 and 1
      setScrollProgress(Math.max(-1, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Row 1 starts centered-offset (-15%) and slides left/right based on scroll progress
  const row1Translate = `calc(-15% + ${scrollProgress * 200}px)`;
  // Row 2 starts centered-offset (-25%) and slides right/left based on scroll progress
  const row2Translate = `calc(-25% - ${scrollProgress * 200}px)`;

  // Triple the arrays to ensure they fully cover the viewport on all screen sizes (including 4K resolutions)
  const row1Items = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
  const row2Items = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

  return (
    <section
      ref={containerRef}
      className="py-12 bg-beige-vintage border-t border-b border-border-taupe/30 overflow-hidden relative select-none"
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/background/2.png"
          alt="Vintage background texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Gallery Rows Container - opposite direction translation on scroll */}
        <div className="space-y-4 md:space-y-6 relative">
          
          {/* Row 1 - Moves Left */}
          <div
            style={{
              transform: `translateX(${row1Translate})`,
              transition: "transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)",
            }}
            className="flex gap-4 md:gap-6 flex-nowrap w-max transition-transform duration-300"
          >
            {row1Items.map((img, idx) => (
              <div
                key={idx}
                className="w-[180px] h-[125px] md:w-[250px] md:h-[170px] flex-shrink-0 relative overflow-hidden rounded-2xl border border-border-taupe/40 bg-paper-warm/65 shadow-vintage-sm flex items-center justify-center p-3 group hover:border-olive-primary/50 transition-colors"
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
              transition: "transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)",
            }}
            className="flex gap-4 md:gap-6 flex-nowrap w-max transition-transform duration-300"
          >
            {row2Items.map((img, idx) => (
              <div
                key={idx}
                className="w-[180px] h-[125px] md:w-[250px] md:h-[170px] flex-shrink-0 relative overflow-hidden rounded-2xl border border-border-taupe/40 bg-paper-warm/65 shadow-vintage-sm flex items-center justify-center p-3 group hover:border-olive-primary/50 transition-colors"
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
