"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const SERVICES = [
  { label: "Web Development", href: "#services" },
  { label: "iOS Development", href: "#services" },
  { label: "Android Development", href: "#services" },
  { label: "UI/UX Design", href: "#services" },
  { label: "DevOps & Cloud", href: "#services" },
  { label: "AI Integration", href: "#services" },
] as const;

const COMPANY = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
] as const;

const CONTACT_EMAIL = "hello@devoralabs.io";

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIALS: ReadonlyArray<{
  label: string;
  href: string;
  Icon: SocialIcon;
}> = [
  { label: "GitHub", href: "https://github.com/", Icon: GithubMark },
  { label: "LinkedIn", href: "https://linkedin.com/", Icon: LinkedinMark },
  { label: "X (Twitter)", href: "https://x.com/", Icon: XMark },
  { label: "Instagram", href: "https://instagram.com/", Icon: InstagramMark },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-dl-slate bg-dl-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-dl-orange/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5"
        >
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Link href="/" className="flex w-fit items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-dl-navy/40">
                <Image
                  src="/logo.svg"
                  alt="Devora Laabs"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-syne text-lg font-bold text-brand-gradient">
                  Devora Laabs
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-dl-muted">
                  BY KRONYX GROUP
                </span>
              </span>
            </Link>

            <p className="max-w-sm font-inter text-sm leading-relaxed text-dl-muted">
              An IT product studio shipping web, mobile, AI, and SaaS
              platforms for startups and enterprises around the world.
            </p>

            <ul className="flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-dl-navy/40 bg-dl-slate/50 text-dl-muted transition-colors hover:border-dl-orange/60 hover:text-dl-orange"
                  >
                    <Icon width={14} height={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Services" items={SERVICES} />
          <FooterColumn title="Company" items={COMPANY} />

          <div className="flex flex-col gap-4">
            <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-dl-warm-white">
              Contact
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-inter text-sm text-dl-muted transition-colors hover:text-dl-orange"
            >
              <Mail size={14} />
              {CONTACT_EMAIL}
            </a>
            <a
              href="#cta"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-dl-orange px-4 py-2 font-inter text-sm font-semibold text-dl-deep transition-all hover:bg-dl-peach hover:shadow-[0_0_20px_rgba(212,175,55,0.45)]"
            >
              Start a Project
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <p className="font-inter text-xs leading-relaxed text-dl-muted">
              We respond within 24 hours.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-dl-slate pt-8 sm:flex-row sm:items-center">
          <p className="font-inter text-xs text-dl-muted">
            © <span suppressHydrationWarning>{year}</span> Devora Laabs · Part
            of Kronyx Group · All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-inter text-xs text-dl-muted">
            <li>
              <a href="#" className="transition-colors hover:text-dl-orange">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-dl-orange">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-dl-orange">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { readonly label: string; readonly href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-dl-warm-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="font-inter text-sm text-dl-muted transition-colors hover:text-dl-orange"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
