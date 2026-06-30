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

export function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 60 randomized floating sparkles distributed across the entire landing page height
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage horizontal placement
      y: Math.random() * 98 + 1, // percentage vertical placement (keep slightly off margins)
      size: Math.random() * 8 + 4, // size from 4px to 12px
      delay: Math.random() * 10, // delay start up to 10s
      duration: Math.random() * 10 + 6, // slow, gentle float taking 6s - 16s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[2] select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-amber-500/25 animate-[fairyFloat_12s_infinite] select-none pointer-events-none"
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
    </div>
  );
}

export default FairyDust;
