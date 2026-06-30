"use client";

import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isStar: boolean;
  delay: number;
  duration: number;
}

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isStar: boolean;
}

// Exactly the colors from the user's reference image
const SPARKLE_COLORS = [
  "#ffffff", // Clean White
  "#f3cb52", // Warm Gold / Yellow
  "#73a596", // Dusty Jade / Muted Sage Green
];

// Custom 4-Pointed Pinched Star SVG Component
function Star4Point({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 3px ${color}80)` }}
    >
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill={color}
      />
    </svg>
  );
}

export function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorSparkles, setCursorSparkles] = useState<CursorSparkle[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    // Generate 120 randomized background floating orbs and stars matching the style guide
    const newParticles = Array.from({ length: 120 }).map((_, i) => {
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      const isStar = Math.random() > 0.55; // 45% stars, 55% circles
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 98 + 1,
        size: isStar ? Math.random() * 10 + 10 : Math.random() * 8 + 4, // stars: 10px-20px, circles: 4px-12px
        color,
        isStar,
        delay: Math.random() * 10,
        duration: Math.random() * 12 + 8, // gentle float
      };
    });
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      // Spawn a trail particle whenever the mouse travels 12px for high-density feel
      if (dist < 12) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      const isStar = Math.random() > 0.45; // 55% stars, 45% circles

      const newSparkle = {
        id: idCounter.current++,
        x: e.pageX,
        y: e.pageY,
        size: isStar ? Math.random() * 12 + 12 : Math.random() * 8 + 5, // size range
        color,
        isStar,
      };

      // Restrict buffer size to max 50 trailing sparkles for perfect performance
      setCursorSparkles((prev) => [...prev.slice(-50), newSparkle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20 select-none">
      
      {/* Background Floating Sparkles */}
      {particles.map((p) => {
        if (p.isStar) {
          return (
            <div
              key={p.id}
              className="absolute animate-[fairyFloat_15s_infinite] select-none pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              <Star4Point color={p.color} size={p.size} />
            </div>
          );
        } else {
          return (
            <div
              key={p.id}
              className="absolute rounded-full animate-[fairyFloat_15s_infinite] select-none pointer-events-none opacity-60"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 1.5}px ${p.color}80`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          );
        }
      })}

      {/* Interactive Mouse Move Sparkles Trail */}
      {cursorSparkles.map((s) => {
        if (s.isStar) {
          return (
            <div
              key={s.id}
              className="absolute pointer-events-none select-none animate-cursor-sparkle"
              style={{
                left: s.x,
                top: s.y,
              }}
            >
              <Star4Point color={s.color} size={s.size} className="-translate-x-1/2 -translate-y-1/2" />
            </div>
          );
        } else {
          return (
            <div
              key={s.id}
              className="absolute rounded-full pointer-events-none select-none animate-cursor-sparkle opacity-85"
              style={{
                left: s.x,
                top: s.y,
                width: `${s.size}px`,
                height: `${s.size}px`,
                backgroundColor: s.color,
                boxShadow: `0 0 ${s.size * 1.5}px ${s.color}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        }
      })}
      
    </div>
  );
}

export default FairyDust;
