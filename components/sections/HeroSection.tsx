"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DrinkItem {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  ingredients: string[];
  ingredientsEn: string[];
  bgColor: string; // Dynamic background color for each drink
}

const DRINK_DATA: DrinkItem[] = [
  {
    id: "hero1",
    name: "Cà Phê Muối CAM CAM",
    nameEn: "CAM CAM Salted Coffee",
    price: "25.000đ",
    badge: "Món Bán Chạy",
    badgeEn: "Best Seller",
    description: "Vị cà phê phin Robusta đậm đà truyền thống kết hợp hài hòa cùng lớp kem sữa mặn béo ngậy mịn màng đặc trưng.",
    descriptionEn: "Rich traditional drip Robusta coffee harmoniously blended with CAM CAM's signature smooth and savory salted cream foam.",
    imageUrl: "/images/item/ca_phe_muoi.png",
    ingredients: ["Robusta hạt mộc rang tay", "Sữa đặc béo", "Kem sữa mặn độc quyền", "Muối biển hồng tinh khiết"],
    ingredientsEn: ["Hand-roasted Robusta", "Sweet Condensed Milk", "Signature Savory Foam", "Pure Pink Sea Salt"],
    bgColor: "#FAF6EC" // Soft warm beige (Default)
  },
  {
    id: "hero2",
    name: "Matcha Latte Uji",
    nameEn: "Uji Matcha Latte",
    price: "35.000đ",
    badge: "Món Mới Nên Thử",
    badgeEn: "New Arrival",
    description: "Bột trà xanh matcha Uji nguyên chất Nhật Bản, quyện sữa tươi thanh trùng béo ngậy giữ nguyên màu xanh tươi tự nhiên.",
    descriptionEn: "Premium Japanese Uji matcha whisked with pasteurized fresh milk, preserving its vibrant natural green hue and rich earthy taste.",
    imageUrl: "/images/item/matcha_latte.png",
    ingredients: ["Bột Matcha Uji Nhật Bản", "Sữa tươi thanh trùng", "Kem sữa béo nhẹ", "Hạnh nhân nướng lát"],
    ingredientsEn: ["Japanese Uji Matcha", "Pasteurized Fresh Milk", "Light Creamy Foam", "Toasted Almond Slices"],
    bgColor: "#E5ECE5" // Muted pastel matcha green
  },
  {
    id: "hero3",
    name: "Trà Blao Cốm Non Yến Mạch",
    nameEn: "Blao Tea w/ Oats & Green Rice",
    price: "30.000đ",
    badge: "Món Đặc Trưng",
    badgeEn: "Signature Drink",
    description: "Trà sữa Blao Bảo Lộc thơm ngát hương hoa nhài thanh khiết, kết hợp cốm non dẻo bùi Hà Nội và yến mạch hữu cơ béo ngậy.",
    descriptionEn: "Jasmine-infused Blao tea blended with milk, combined with chewy young green rice grains and rich organic rolled oats.",
    imageUrl: "/images/item/Tra_Blao_com_non_yen_mach.png",
    ingredients: ["Trà lài Bảo Lộc ủ lạnh", "Cốm non tươi dẻo bùi", "Yến mạch hữu cơ", "Sữa tươi béo ngậy"],
    ingredientsEn: ["Cold-brewed Jasmine Tea", "Chewy Young Green Rice", "Organic Rolled Oats", "Creamy Fresh Milk"],
    bgColor: "#ECE8E0" // Soft creamy taro beige
  },
  {
    id: "hero4",
    name: "Trà Sen Vàng Kem Sữa",
    nameEn: "Golden Lotus Oolong",
    price: "35.000đ",
    badge: "Được Yêu Thích",
    badgeEn: "Customer Favorite",
    description: "Cốt trà ô long Lâm Đồng đậm vị chát dịu kết hợp hạt sen ninh đường phèn bùi ngọt, củ năng giòn sần sật và kem sữa muối.",
    descriptionEn: "Rich Oolong tea served with sweet caramelized lotus seeds, crunchy water chestnut cubes, and thick salted cream foam.",
    imageUrl: "/images/item/tra_sen_vang.png",
    ingredients: ["Trà ô long Lâm Đồng chát dịu", "Hạt sen ninh đường phèn", "Củ năng giòn sần sật", "Kem sữa mặn béo ngậy"],
    ingredientsEn: ["Lâm Đồng Oolong Tea", "Caramelized Lotus Seeds", "Crunchy Water Chestnut", "Salted Cream Foam"],
    bgColor: "#F5EDE7" // Soft warm peach amber
  }
];

export function HeroSection() {
  const { lang } = useLanguage();
  const { ref } = useScrollAnimation();

  // Active Indexes for Carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition Helper (instant cup slide update, rapid details transition)
  const triggerTransition = useCallback((nextIndex: number) => {
    if (isTransitioning || nextIndex === activeIndex) return;
    
    // Update activeIndex immediately for lag-free sliding action
    setActiveIndex(nextIndex);
    
    // Quick fade update for card text
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayIndex(nextIndex);
      setIsTransitioning(false);
    }, 180);
  }, [activeIndex, isTransitioning]);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % DRINK_DATA.length;
    triggerTransition(nextIndex);
  };

  // Autoplay carousel every 8 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % DRINK_DATA.length;
      triggerTransition(nextIndex);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex, triggerTransition]);

  // Compute position relative to active index
  const getPositionClass = (idx: number) => {
    const len = DRINK_DATA.length;
    const diff = (idx - activeIndex + len) % len;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === len - 1) return "left";
    return "hidden";
  };

  const activeDrink = DRINK_DATA[displayIndex] || DRINK_DATA[0];
  // Background transition matches the currently selected drink's index instantly
  const transitionBgColor = DRINK_DATA[activeIndex]?.bgColor || "#FAF6EC";

  const activeName = lang === "vi" ? activeDrink.name : activeDrink.nameEn;
  const activeDesc = lang === "vi" ? activeDrink.description : activeDrink.descriptionEn;
  const activeBadge = lang === "vi" ? activeDrink.badge : activeDrink.badgeEn;
  const activeIngredients = lang === "vi" ? activeDrink.ingredients : activeDrink.ingredientsEn;

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="relative pt-32 pb-24 md:py-36 px-4 overflow-hidden min-h-screen flex items-center transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: transitionBgColor }}
    >
      {/* Background Vintage Texture - Opacity reduced and blended cleanly over dynamic colors */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background/background_hero.png"
          alt="CAM CAM Vintage Coffee Banner"
          fill
          priority
          className="object-cover object-center opacity-[0.16] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EC]/15 via-transparent to-[#FAF6EC]/5 pointer-events-none" />
      </div>

      {/* Sensory Steam Smoke Effects behind the cup carousel */}
      <div className="absolute left-0 lg:left-[10%] top-0 bottom-0 w-full lg:w-1/2 z-[5] pointer-events-none overflow-hidden">
        <div
          className="absolute left-[35%] bottom-[25%] w-24 h-64 rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.45) 0%, rgba(167,159,137,0.1) 45%, transparent 70%)",
            animation: "smokeRise1 8s ease-in-out infinite",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute left-[20%] bottom-[18%] w-20 h-52 rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.4) 0%, transparent 65%)",
            animation: "smokeRise2 10s ease-in-out infinite 2s",
            filter: "blur(24px)",
          }}
        />
        <div
          className="absolute left-[50%] bottom-[20%] w-28 h-48 rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(167,159,137,0.3) 0%, transparent 60%)",
            animation: "smokeRise3 12s ease-in-out infinite 4s",
            filter: "blur(28px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Main Grid Layout - Cups Carousel Left/Center, details card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left/Center Column: Drink Carousel (Columns 1-7) */}
          {/* Increased container height to accommodate larger cup sizes on all viewports */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full h-[450px] md:h-[580px] overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center">
              {DRINK_DATA.map((drink, idx) => {
                const pos = getPositionClass(idx);
                return (
                  <div
                    key={drink.id}
                    className={cn(
                      "absolute transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform flex flex-col items-center justify-center",
                      // Center active cup is 1.35x scale (2x larger than side cups relative size)
                      pos === "center" && "translate-x-0 scale-[1.35] md:scale-[1.4] z-30 opacity-100 pointer-events-auto",
                      // Side cups are scaled down to 0.7x, pushed further apart to prevent overlap, and blurred
                      pos === "left" && "-translate-x-[75%] md:-translate-x-[90%] scale-[0.7] z-10 opacity-30 blur-[0.5px] pointer-events-none",
                      pos === "right" && "translate-x-[75%] md:translate-x-[90%] scale-[0.7] z-10 opacity-30 blur-[0.5px] pointer-events-none",
                      pos === "hidden" && "scale-50 opacity-0 z-0 pointer-events-none"
                    )}
                  >
                    {/* Glowing aura sparkles behind the active center drink */}
                    {pos === "center" && <div className="aura-sparkle opacity-90 scale-95" />}
                    
                    {/* Larger Drink Cup Image (Up 1.5x from previous size) */}
                    <div className="relative w-[180px] h-[260px] md:w-[260px] md:h-[370px] flex items-center justify-center z-10">
                      <Image
                        src={drink.imageUrl}
                        alt={drink.name}
                        fill
                        sizes="(max-width: 768px) 180px, 260px"
                        // All cups float gently up and down by default
                        className="object-contain drop-shadow-[0_15px_30px_rgba(47,36,28,0.22)] animate-float-gentle"
                        priority={idx === 0}
                      />
                    </div>

                    {/* "Món tiếp theo" (Next Drink) Button superimposed below center cup */}
                    {pos === "center" && (
                      <button
                        onClick={handleNext}
                        className="mt-6 px-6 py-2.5 bg-olive-primary/90 hover:bg-olive-primary text-paper-warm font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-vintage-sm hover:shadow-vintage-md hover:scale-105 transition-all duration-300 flex items-center gap-1.5 z-40"
                      >
                        {lang === "vi" ? "Món tiếp theo" : "Next Drink"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Drink Details Card (Columns 8-12) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[400px] bg-[#FAF7F0] border border-border-taupe/35 shadow-vintage-lg rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-paper-warm/45 backdrop-blur-sm">
              
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-border-taupe/30"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-border-taupe/30"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-border-taupe/30"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-border-taupe/30"></div>

              {/* Transition details contents */}
              <div
                className={cn(
                  "transition-all duration-300 transform space-y-6 flex-grow flex flex-col justify-between",
                  isTransitioning
                    ? "opacity-0 translate-x-4 scale-98"
                    : "opacity-100 translate-x-0 scale-100"
                )}
              >
                {/* Top Badge and Counter */}
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-olive-primary border border-olive-primary/25 px-2.5 py-1 rounded-md bg-olive-primary/5">
                    {activeBadge}
                  </span>
                  <span className="text-sm font-serif font-black text-olive-primary/80">
                    0{displayIndex + 1}
                  </span>
                </div>

                {/* Name and Description */}
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-serif font-black text-espresso-dark leading-tight uppercase tracking-tight">
                    {activeName}
                  </h1>
                  {/* Fixed height description to prevent card wiggling */}
                  <div className="min-h-[64px] flex items-center">
                    <p className="text-taupe-gray text-xs md:text-sm leading-relaxed font-sans font-medium">
                      {activeDesc}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="border-t border-b border-border-taupe/20 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-espresso-dark/70 font-sans">
                    {lang === "vi" ? "Giá chuẩn" : "Standard Price"}
                  </span>
                  <span className="text-2xl font-serif font-black text-olive-primary">
                    {activeDrink.price}
                  </span>
                </div>

                {/* Ingredients Bullets list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-espresso-dark/60 block font-sans">
                    {lang === "vi" ? "THÀNH PHẦN CHÍNH" : "MAIN INGREDIENTS"}
                  </span>
                  <ul className="space-y-1.5 pl-1.5">
                    {activeIngredients.map((ing, iIdx) => (
                      <li key={iIdx} className="text-xs font-sans font-semibold text-taupe-gray flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive-primary shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA Action Button */}
                <div className="pt-2">
                  <a
                    href="#lien-he"
                    onClick={handleScrollToContact}
                    className="w-full text-center py-3.5 bg-olive-primary hover:bg-moss-dark text-paper-warm font-sans font-bold text-xs uppercase tracking-widest rounded-xl shadow-vintage-sm hover:shadow-vintage-md hover:-translate-y-0.5 transition-all duration-300 block"
                  >
                    {lang === "vi" ? "Đặt Trải Nghiệm Ngay" : "Book a Table"}
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
