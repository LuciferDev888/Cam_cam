"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isCircle: boolean;
  delay: number;
  duration: number;
}

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: string;
}

// Curated selection of premium sparkling pastel/gold tones
const PARTICLE_COLORS = [
  "#fbbf24", // Premium Gold
  "#f472b6", // Rose Pink
  "#34d399", // Mint Green / Teal
  "#fb923c", // Vibrant Amber
  "#c084fc", // Lavender Purple
];

const CURSOR_SPARKLE_TYPES = ["✦", "★", "✧", "✶"];

export function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorSparkles, setCursorSparkles] = useState<CursorSparkle[]>([]);

  useEffect(() => {
    // Generate 110 randomized floating orbs and stars distributed across the page
    const newParticles = Array.from({ length: 110 }).map((_, i) => {
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const isCircle = Math.random() > 0.45; // 45% stars, 55% glowing circles
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 98 + 1,
        size: Math.random() * 11 + 6, // 6px to 17px
        color,
        isCircle,
        delay: Math.random() * 10,
        duration: Math.random() * 12 + 8, // Very smooth floating speed (8s to 20s)
      };
    });
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      // Trigger a sparkle whenever cursor travels at least 15px
      if (dist < 15) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const randomColor = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const randomType = CURSOR_SPARKLE_TYPES[Math.floor(Math.random() * CURSOR_SPARKLE_TYPES.length)];

      const newSparkle = {
        id: idCounter++,
        x: e.pageX,
        y: e.pageY,
        size: Math.random() * 12 + 10, // size between 10px and 22px
        color: randomColor,
        type: randomType,
      };

      // Restrict buffer size to max 45 trailing sparkles for perfect framerates
      setCursorSparkles((prev) => [...prev.slice(-45), newSparkle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20 select-none">
      
      {/* Background Floating Sparkles */}
      {particles.map((p) => {
        if (p.isCircle) {
          // Glow circle orb
          return (
            <div
              key={p.id}
              className="absolute rounded-full animate-[fairyFloat_15s_infinite] select-none pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size / 2.2}px`,
                height: `${p.size / 2.2}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size}px ${p.color}, 0 0 ${p.size / 2}px ${p.color}`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          );
        } else {
          // Star symbol (✦)
          return (
            <div
              key={p.id}
              className="absolute animate-[fairyFloat_15s_infinite] select-none pointer-events-none font-serif font-black"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                color: p.color,
                textShadow: `0 0 ${p.size / 2}px ${p.color}`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              ✦
            </div>
          );
        }
      })}

      {/* Interactive Mouse Move Sparkles Trail */}
      {cursorSparkles.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none select-none animate-cursor-sparkle font-serif font-black"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: s.color,
            textShadow: `0 0 10px ${s.color}, 0 0 4px ${s.color}`,
          }}
        >
          {s.type}
        </div>
      ))}
      
    </div>
  );
}

export default FairyDust;
