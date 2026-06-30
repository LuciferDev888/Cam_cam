"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorSparkles, setCursorSparkles] = useState<CursorSparkle[]>([]);

  useEffect(() => {
    // Generate 65 randomized background floating sparkles, distributed vertically and horizontally
    const newParticles = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage horizontal placement
      y: Math.random() * 98 + 1, // percentage vertical placement
      size: Math.random() * 9 + 5, // size from 5px to 14px (slightly larger and clearer)
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 6, // slow, gentle float
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate travel distance from the last sparkle spawn to prevent overload
      const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      // Only spawn if mouse has traveled at least 20px
      if (dist < 20) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const newSparkle = {
        id: idCounter++,
        x: e.pageX,
        y: e.pageY,
        size: Math.random() * 10 + 8, // size between 8px and 18px
      };

      // Limit array size to max 35 cursor sparkles for excellent performance
      setCursorSparkles((prev) => [...prev.slice(-35), newSparkle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-20 select-none">
      
      {/* Background Floating Sparkles (opacity increased to 50% for high clarity) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-yellow-400/50 animate-[fairyFloat_12s_infinite] select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Interactive Mouse Move Sparkles */}
      {cursorSparkles.map((s) => (
        <div
          key={s.id}
          className="absolute text-yellow-400 pointer-events-none select-none animate-cursor-sparkle"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
          }}
        >
          ✨
        </div>
      ))}
      
    </div>
  );
}

export default FairyDust;
