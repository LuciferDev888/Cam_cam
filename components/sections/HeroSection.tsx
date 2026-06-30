"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeroSectionProps } from "@/types/landing";
import { trackCTAClick } from "@/lib/analytics";

const TYPING_MESSAGES = [
  "Chậm lại, thưởng thức từng khoảnh khắc ☕",
  "Nơi hạt cà phê kể câu chuyện tự nhiên 🌿",
  "Mỗi ly trà là một bức thư tay gửi tới bạn 🍃",
  "Organic · Handcrafted · Soulful 🧡",
  "Bình yên giữa lòng phố thị 🏡",
];

export function HeroSection({
  subheadline,
  ctaText,
  ctaHref,
  className,
}: HeroSectionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = TYPING_MESSAGES[currentMessageIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentFullText.length) {
            setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentMessageIndex((prev) => (prev + 1) % TYPING_MESSAGES.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentMessageIndex]);

  const handleCtaClick = () => {
    trackCTAClick(ctaText, "hero");
  };

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#thuc-don");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="trang-chu"
      className={cn(
        "relative py-36 md:py-48 px-4 overflow-hidden min-h-[95vh] flex items-center bg-paper-warm",
        className
      )}
    >
      {/* Background Image & Soft Vintage Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background/background_hero.png"
          alt="CAM CAM Vintage Coffee Banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4EFDC]/95 via-[#F4EFDC]/75 to-[#F4EFDC]/40" />
      </div>

      {/* Smoke Effect - right side, using global CSS keyframes */}
      <div className="absolute right-0 top-0 bottom-0 w-2/3 z-[5] pointer-events-none overflow-hidden">
        <div
          className="absolute right-[12%] bottom-[20%] w-28 h-64 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.55) 0%, rgba(167,159,137,0.15) 40%, transparent 70%)",
            animation: "smokeRise1 7s ease-in-out infinite",
            filter: "blur(18px)",
          }}
        />
        <div
          className="absolute right-[22%] bottom-[15%] w-24 h-52 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.45) 0%, rgba(167,159,137,0.1) 40%, transparent 70%)",
            animation: "smokeRise2 9s ease-in-out infinite 1.5s",
            filter: "blur(22px)",
          }}
        />
        <div
          className="absolute right-[16%] bottom-[25%] w-20 h-48 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.4) 0%, transparent 65%)",
            animation: "smokeRise3 11s ease-in-out infinite 3s",
            filter: "blur(26px)",
          }}
        />
        <div
          className="absolute right-[8%] bottom-[10%] w-36 h-44 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.3) 0%, transparent 60%)",
            animation: "smokeRise4 13s ease-in-out infinite 0.5s",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="max-w-4xl space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-olive-primary/10 text-olive-primary border border-olive-primary/20">
            🌱 Handcrafted & Sensory Cafe Boutique
          </span>

          {/* Headline - each phrase on its own line, responsive sizing */}
          <h1 className="font-serif font-black text-espresso-dark leading-[1.1] tracking-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap">
              Mộc Mạc Hương Vị
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap mt-2 text-olive-primary">
              Ấm Áp Không Gian
            </span>
          </h1>

          {subheadline && (
            <p className="text-lg md:text-xl text-taupe-gray leading-relaxed max-w-xl font-medium">
              {subheadline}
            </p>
          )}

          {/* Typing Effect */}
          <div className="h-10 flex items-center">
            <span className="font-serif text-lg md:text-xl text-olive-primary italic font-medium">
              {displayedText}
              <span className="inline-block w-[2px] h-5 bg-olive-primary ml-1 animate-pulse" />
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <a
              href={ctaHref}
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-primary hover:bg-moss-dark text-paper-warm font-serif font-bold rounded-xl shadow-vintage-sm hover:shadow-vintage-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              {ctaText}
            </a>
            <a
              href="#thuc-don"
              onClick={handleScrollToMenu}
              className="inline-flex items-center justify-center px-8 py-4 bg-beige-vintage hover:bg-latte-light text-espresso-dark font-semibold rounded-xl border border-border-taupe/40 transition-all duration-300 text-center shadow-vintage-sm"
            >
              Xem Thực Đơn Mộc
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
