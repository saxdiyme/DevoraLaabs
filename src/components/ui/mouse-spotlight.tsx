"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  color?: string;
  radius?: number;
};

export default function MouseSpotlight({
  className = "",
  color = "rgba(14,61,46,0.10)",
  radius = 520,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [color, radius]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${className}`}
    />
  );
}
