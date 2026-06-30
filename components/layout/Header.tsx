"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = {
    vi: [
      { label: "Trang chủ", href: "#trang-chu" },
      { label: "Giới thiệu", href: "#ve-chung-toi" },
      { label: "Sản phẩm", href: "#san-pham-noi-bat" },
      { label: "Thực đơn", href: "#thuc-don" },
      { label: "Liên hệ", href: "#lien-he" },
    ],
    en: [
      { label: "Home", href: "#trang-chu" },
      { label: "About", href: "#ve-chung-toi" },
      { label: "Products", href: "#san-pham-noi-bat" },
      { label: "Menu", href: "#thuc-don" },
      { label: "Contact", href: "#lien-he" },
    ],
  };

  const ctaLabel = lang === "vi" ? "Đặt Bàn Ngay" : "Book a Table";
  const currentLinks = navLinks[lang];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans",
        isScrolled
          ? "bg-paper-warm/95 backdrop-blur-md shadow-vintage-md border-b border-border-taupe/40 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Logo - slides in from left to right at mount (no delay) */}
        <a
          href="#trang-chu"
          onClick={(e) => handleScrollToSection(e, "#trang-chu")}
          className={cn(
            "flex items-center gap-2 group cursor-pointer animate-slide-in-left duration-700",
            isMounted && "in-view"
          )}
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/images/logo/logo.png"
              alt="CAM CAM Logo"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <span className="text-2xl font-serif font-black uppercase tracking-widest text-espresso-dark">
            Cam Cam
          </span>
        </a>

        {/* Desktop Navigation - slides down sequentially AFTER logo & CTA mount */}
        <nav className="hidden md:flex items-center gap-8">
          {currentLinks.map((link, index) => {
            // Sequential delay starts at 200ms and increments by 150ms for each item
            const delayTime = `${200 + index * 150}ms`;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                style={{ transitionDelay: delayTime }}
                className={cn(
                  "text-sm font-bold text-espresso-dark/95 hover:text-olive-primary transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-olive-primary after:transition-all hover:after:w-full animate-slide-down duration-700",
                  isMounted && "in-view"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Group: Lang Toggle + CTA - slides in-right simultaneously with logo (no delay) */}
        <div
          className={cn(
            "hidden md:flex items-center gap-4 animate-slide-in-right duration-700",
            isMounted && "in-view"
          )}
        >
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-taupe/40 text-xs font-bold text-espresso-dark hover:border-olive-primary hover:text-olive-primary transition-all duration-300"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "vi" ? "EN" : "VI"}
          </button>

          <a
            href="#lien-he"
            onClick={(e) => handleScrollToSection(e, "#lien-he")}
            className="px-6 py-2.5 bg-olive-primary hover:bg-moss-dark text-paper-warm font-bold rounded-xl text-sm shadow-vintage-sm hover:shadow-vintage-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-espresso-dark focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-paper-warm border-b border-border-taupe/40 shadow-vintage-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
        )}
      >
        <div className="flex flex-col px-4 space-y-4">
          {currentLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-espresso-dark font-bold text-base hover:text-olive-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="flex items-center gap-2 text-espresso-dark font-bold text-base hover:text-olive-primary transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === "vi" ? "English" : "Tiếng Việt"}
          </button>

          <a
            href="#lien-he"
            onClick={(e) => handleScrollToSection(e, "#lien-he")}
            className="w-full py-3 bg-olive-primary hover:bg-moss-dark text-paper-warm font-bold rounded-xl text-center shadow-vintage-sm"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
