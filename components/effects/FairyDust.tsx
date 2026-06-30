"use client";

import { useEffect, useState } from "react";

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
      
    </div>
  );
}

export default FairyDust;
