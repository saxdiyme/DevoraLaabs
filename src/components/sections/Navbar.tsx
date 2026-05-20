"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Stack", href: "#tech" },
  { label: "Contact", href: "#cta" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-dl-deep/80 backdrop-blur-md border-b border-dl-navy/30"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:h-20 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-lg ring-1 ring-dl-navy/40 transition-all group-hover:ring-dl-orange/60">
            <Image
              src="/logo.svg"
              alt="Devora Laabs logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-syne text-base font-bold text-brand-gradient md:text-lg">
              Devora Laabs
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-dl-muted">
              BY KRONYX GROUP
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-inter text-sm text-dl-warm-white/80 transition-colors hover:text-dl-orange"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="hidden items-center justify-center rounded-full bg-dl-orange px-5 py-2.5 font-inter text-sm font-semibold text-dl-deep transition-all hover:bg-dl-peach hover:shadow-[0_0_20px_rgba(201,162,74,0.4)] sm:inline-flex"
          >
            Get in Touch
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md p-2 text-dl-warm-white transition-colors hover:text-dl-orange md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-dl-navy/30 bg-dl-deep/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-inter text-dl-warm-white/90 transition-colors hover:text-dl-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-dl-orange px-5 py-3 font-inter font-semibold text-dl-deep transition-colors hover:bg-dl-peach"
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
