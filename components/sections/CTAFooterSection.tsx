"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CTAFooterSectionProps } from "@/types/landing";
import { trackCTAClick } from "@/lib/analytics";

export function CTAFooterSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  className,
}: CTAFooterSectionProps) {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTAClick(ctaText, "footer");
    const contactSection = document.querySelector("#lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={cn("bg-espresso-dark text-paper-warm relative overflow-hidden", className)}>
      
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
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-paper-warm/80 max-w-2xl mx-auto leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
          <div className="pt-4">
            <a
              href={ctaHref}
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-primary hover:bg-moss-dark text-paper-warm font-serif font-bold rounded-xl shadow-vintage-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Actual Footer Info */}
      <div className="py-12 px-4 relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-paper-warm/60">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍊</span>
          <div>
            <span className="font-serif font-black text-white text-lg tracking-widest uppercase">CAM CAM</span>
            <p className="mt-0.5 text-xs text-paper-warm/50 font-medium">Cà phê & Trà boutique mộc mạc</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-2 text-center md:text-left font-medium text-xs">
          <div>
            <span className="block font-bold text-paper-warm/80 mb-1">ĐỊA CHỈ</span>
            <p>123 Đường Cam Cam, Quận 1, TP. HCM</p>
          </div>
          <div>
            <span className="block font-bold text-paper-warm/80 mb-1">LIÊN HỆ</span>
            <p>Hotline: 1900 1234 &middot; ciao@camcam.vn</p>
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
