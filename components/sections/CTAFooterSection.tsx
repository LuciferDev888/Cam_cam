"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CTAFooterSectionProps {
  className?: string;
}

export function CTAFooterSection({
  className,
}: CTAFooterSectionProps) {
  const { lang } = useLanguage();
  const t = translations[lang].ctaFooter;
  const { ref, isInView } = useScrollAnimation();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer ref={ref} className={cn("bg-espresso-dark text-paper-warm relative overflow-hidden", className)}>
      
      {/* Background overlay texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <Image
          src="/images/background/6.png"
          alt="Vintage background texture"
          fill
          className="object-cover"
        />
      </div>

      {/* CTA Banner */}
      <div className="py-24 px-4 relative z-10 border-b border-border-taupe/20 max-w-6xl mx-auto">
        <div
          style={{ transitionDelay: "0ms" }}
          className={cn(
            "max-w-4xl mx-auto text-center space-y-8 animate-slide-up duration-700",
            isInView && "in-view"
          )}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight uppercase">
            {t.title}
          </h2>
          <p className="text-base md:text-lg text-paper-warm/80 max-w-2xl mx-auto leading-relaxed font-medium font-sans">
            {t.subtitle}
          </p>
          <div className="pt-4">
            <a
              href="#lien-he"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-primary hover:bg-moss-dark text-paper-warm font-serif font-bold rounded-xl shadow-vintage-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              {t.ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Actual Footer Info */}
      <div className="py-12 px-4 relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-paper-warm/60 font-sans">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-taupe/35">
            <Image
              src="/images/logo/logo.png"
              alt="CAM CAM Logo"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-serif font-black text-white text-lg tracking-widest uppercase block">CAM CAM</span>
            <p className="mt-0.5 text-xs text-paper-warm/50 font-medium">
              {lang === "vi" ? "Cà phê & Trà boutique mộc mạc" : "Rustic Coffee & Tea Boutique"}
            </p>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-4 text-center md:text-left font-medium text-xs">
          <div>
            <span className="block font-bold text-paper-warm/80 mb-1">
              {lang === "vi" ? "ĐỊA CHỈ" : "ADDRESS"}
            </span>
            <p>{lang === "vi" ? "01 Võ Văn Đồng, Ngũ Hành Sơn, Đà Nẵng" : "01 Vo Van Dong, Ngu Hanh Son, Da Nang"}</p>
          </div>
          <div>
            <span className="block font-bold text-paper-warm/80 mb-1">
              {lang === "vi" ? "LIÊN HỆ" : "CONTACT"}
            </span>
            <p>Hotline: +84 905 205 205 &middot; ciao@camcam.vn</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-paper-warm/40 font-medium">
          <p>&copy; {new Date().getFullYear()} CAM CAM. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}

export default CTAFooterSection;
