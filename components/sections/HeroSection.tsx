"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TYPING_MESSAGES = {
  vi: [
    "Chậm lại, thưởng thức từng khoảnh khắc ☕",
    "Nơi hạt cà phê kể câu chuyện tự nhiên 🌿",
    "Mỗi ly trà là một bức thư tay gửi tới bạn 🍃",
    "Organic · Handcrafted · Soulful 🧡",
    "Bình yên giữa lòng phố thị 🏡",
  ],
  en: [
    "Slow down, savor every single moment ☕",
    "Where coffee beans tell natural stories 🌿",
    "Every cup of tea is a hand-written letter for you 🍃",
    "Organic · Handcrafted · Soulful 🧡",
    "Peaceful retreat in the heart of the city 🏡",
  ]
};

export function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const currentMessages = TYPING_MESSAGES[lang];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll animations
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    // Reset message index when language changes
    setCurrentMessageIndex(0);
    setDisplayedText("");
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const currentFullText = currentMessages[currentMessageIndex];
    if (!currentFullText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentFullText.length) {
            setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentMessageIndex((prev) => (prev + 1) % currentMessages.length);
          }
        }
      },
      isDeleting ? 25 : 55
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentMessageIndex, currentMessages]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#thuc-don");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#lien-he");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="relative py-36 md:py-48 px-4 overflow-hidden min-h-[95vh] flex items-center bg-paper-warm"
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

      {/* Smoke Effect - right side */}
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
          
          {/* Badge animation - slides in left, delay: 150ms */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={cn(
              "animate-slide-in-left duration-700",
              isInView && "in-view"
            )}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-olive-primary/10 text-olive-primary border border-olive-primary/20">
              {t.badge}
            </span>
          </div>

          {/* Headline animations - slides in left. Dòng 1 (350ms) ➔ Dòng 2 (600ms) */}
          <h1 className="font-serif font-black text-espresso-dark leading-[1.25] tracking-tight pb-2">
            <span
              style={{ transitionDelay: "350ms" }}
              className={cn(
                "block text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-normal md:whitespace-nowrap animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.headlineLine1}
            </span>
            <span
              style={{ transitionDelay: "600ms" }}
              className={cn(
                "block text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-normal md:whitespace-nowrap mt-2 text-olive-primary animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.headlineLine2}
            </span>
          </h1>

          {/* Subheadline animation - slides in left, delay: 850ms */}
          <div
            style={{ transitionDelay: "850ms" }}
            className={cn(
              "animate-slide-in-left duration-700",
              isInView && "in-view"
            )}
          >
            <p className="text-lg md:text-xl text-taupe-gray leading-relaxed max-w-xl font-medium">
              {t.subheadline}
            </p>
          </div>

          {/* Typing Effect - slides in left, delay: 1050ms */}
          <div
            style={{ transitionDelay: "1050ms" }}
            className={cn(
              "h-10 flex items-center animate-slide-in-left duration-700",
              isInView && "in-view"
            )}
          >
            <span className="font-serif text-lg md:text-xl text-olive-primary italic font-medium">
              {displayedText}
              <span className="inline-block w-[2px] h-5 bg-olive-primary ml-1 animate-pulse" />
            </span>
          </div>

          {/* Buttons animation - slides in left, delay: 1250ms */}
          <div
            style={{ transitionDelay: "1250ms" }}
            className={cn(
              "pt-2 flex flex-col sm:flex-row gap-4 animate-slide-in-left duration-700",
              isInView && "in-view"
            )}
          >
            <a
              href="#lien-he"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-primary hover:bg-moss-dark text-paper-warm font-serif font-bold rounded-xl shadow-vintage-sm hover:shadow-vintage-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#thuc-don"
              onClick={handleScrollToMenu}
              className="inline-flex items-center justify-center px-8 py-4 bg-beige-vintage hover:bg-latte-light text-espresso-dark font-semibold rounded-xl border border-border-taupe/40 transition-all duration-300 text-center shadow-vintage-sm"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
