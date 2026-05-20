"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE;

type SplineProps = { scene: string; className?: string };

/**
 * Loads a Spline 3D scene when NEXT_PUBLIC_SPLINE_SCENE is set.
 * Otherwise renders a brand-styled CSS fallback so the layout never
 * looks empty in development.
 */
export default function SplineScene() {
  const [Spline, setSpline] = useState<ComponentType<SplineProps> | null>(null);

  useEffect(() => {
    if (!SCENE_URL) return;
    let cancelled = false;
    import("@splinetool/react-spline").then((mod) => {
      if (!cancelled) setSpline(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (SCENE_URL && Spline) {
    return <Spline scene={SCENE_URL} className="!h-full !w-full" />;
  }
  return <HeroFallback />;
}

function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="pointer-events-none absolute h-[120%] w-[120%] rounded-full bg-brand-gradient opacity-15 blur-3xl"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-dl-orange/30 animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full border border-dl-navy/50"
        style={{ animation: "float 8s ease-in-out infinite reverse" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute h-[220px] w-[220px] rounded-full border-2 border-dl-peach/20"
        style={{ animation: "float 10s ease-in-out infinite" }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ animation: "spin 28s linear infinite" }}
        aria-hidden
      >
        <span className="absolute left-1/2 top-[8%] h-3 w-3 -translate-x-1/2 rounded-full bg-dl-orange shadow-[0_0_14px_#FF5B04]" />
        <span className="absolute right-[10%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-dl-peach" />
        <span className="absolute bottom-[10%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-dl-orange/80" />
        <span className="absolute left-[12%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-dl-peach/70" />
      </div>

      <div
        className="relative h-44 w-44 rounded-full bg-brand-gradient shadow-[0_0_80px_rgba(255,91,4,0.45)] md:h-56 md:w-56"
        aria-hidden
      >
        <span className="absolute left-6 top-4 h-12 w-12 rounded-full bg-white/30 blur-md" />
        <span className="absolute left-4 top-3 h-5 w-5 rounded-full bg-white/70 blur-sm" />
        <span className="absolute inset-2 rounded-full ring-1 ring-inset ring-white/15" />
      </div>
    </div>
  );
}
