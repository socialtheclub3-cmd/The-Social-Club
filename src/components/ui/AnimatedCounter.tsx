import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g., "10x+", "50M+", "98%", "24/7"
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.8,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  // Initialize with value if it shouldn't animate (like 24/7 or non-numeric)
  const isSpecialRatio = value.includes('/');
  const [displayValue, setDisplayValue] = useState(isSpecialRatio ? value : value);

  useEffect(() => {
    // If it's a fixed badge like 24/7, display as is without counting
    if (isSpecialRatio) {
      return;
    }

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Extract numerical part and prefix/suffix
    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const isDecimal = numStr.includes('.');
    const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;

    // Safety timeout: ensure target value is displayed within 2 seconds even if intersection fails
    const safetyTimer = setTimeout(() => {
      setDisplayValue(value);
    }, 2500);

    if (!isInView) {
      return () => clearTimeout(safetyTimer);
    }

    let startTimestamp: number | null = null;
    const durationMs = duration * 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = targetNum * easeProgress;

      setDisplayValue(
        `${prefix}${current.toFixed(decimalPlaces)}${suffix}`
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(safetyTimer);
    };
  }, [isInView, value, duration, isSpecialRatio]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
