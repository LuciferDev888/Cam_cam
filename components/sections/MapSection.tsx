"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapSectionProps {
  className?: string;
}

export function MapSection({ className }: MapSectionProps) {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="ban-do"
      className={cn(
        "relative py-24 px-4 bg-paper-warm border-t border-border-taupe/30 overflow-hidden",
        className
      )}
    >
      {/* Background Image Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <Image
          src="/images/background/2.png"
          alt="Contact background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Info and CTA */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-olive-primary block">
              Liên hệ với chúng tôi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-espresso-dark leading-[1.15] tracking-tight">
              Tìm Chúng Tôi Tại <span className="text-olive-primary block">Đà Nẵng</span>
            </h2>
            <p className="text-taupe-gray text-sm leading-relaxed font-medium font-sans">
              Tọa lạc dọc bờ biển Đà Nẵng thanh bình và lộng gió, CAM CAM là điểm hẹn mộc mạc mời bạn ghé thăm để tận hưởng ly trà thơm và tách cà phê rang mộc ấm áp trong không gian đong đầy cảm xúc.
            </p>
            <div className="pt-2">
              <a
                href="#lien-he"
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 text-sm font-serif font-bold text-olive-primary hover:text-moss-dark transition-colors group"
              >
                ĐẶT BÀN NGAY
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Map Iframe wrapper */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full rounded-3xl overflow-hidden border border-border-taupe/40 shadow-vintage-lg bg-paper-warm p-2">
              <div className="rounded-2xl overflow-hidden relative h-[380px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2282.3885309623165!2d108.2538151!3d15.9816594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108e1cf52515%3A0xe9f5888e605b55e0!2zMDEgVsO1IFbEg24gxJDhurduZywgTmfFqSBIw6BuaCBTxqFuLCDEkMOgIE7hurVuZyA1MDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1782815145243!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Contact Details List */}
          <div className="lg:col-span-3 space-y-8">
            {/* Row 1: Address */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border-taupe/40 flex items-center justify-center text-olive-primary bg-beige-vintage/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-dark font-sans">
                  Địa Chỉ
                </h4>
                <p className="text-sm font-serif text-espresso-dark/80 font-bold leading-snug">
                  01 Võ Văn Đồng, Ngũ Hành Sơn, Đà Nẵng
                </p>
              </div>
            </div>

            {/* Row 2: Phone */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border-taupe/40 flex items-center justify-center text-olive-primary bg-beige-vintage/30">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-dark font-sans">
                  Điện Thoại
                </h4>
                <p className="text-sm font-serif text-espresso-dark/80 font-bold font-sans">
                  +84 905 205 205
                </p>
              </div>
            </div>

            {/* Row 3: Email */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border-taupe/40 flex items-center justify-center text-olive-primary bg-beige-vintage/30">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-dark font-sans">
                  Email
                </h4>
                <p className="text-sm font-serif text-espresso-dark/80 font-bold font-sans">
                  ciao@camcam.vn
                </p>
              </div>
            </div>

            {/* Row 4: Open Hours */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border-taupe/40 flex items-center justify-center text-olive-primary bg-beige-vintage/30">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-dark font-sans">
                  Giờ Mở Cửa
                </h4>
                <div className="text-xs font-serif text-espresso-dark/80 font-bold space-y-0.5 font-sans">
                  <p>Thứ 2 – Thứ 6: 7:00 AM – 10:00 PM</p>
                  <p>Thứ 7 – CN: 7:00 AM – 10:30 PM</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default MapSection;
