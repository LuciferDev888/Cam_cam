"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay entry by 2 seconds (2000ms) after entering the viewport
          timeoutId = setTimeout(() => {
            setIsInView(true);
          }, 2000);
        } else {
          // Reset immediately when leaving viewport
          clearTimeout(timeoutId);
          setIsInView(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before it exits
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(timeoutId);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return { ref, isInView };
}
