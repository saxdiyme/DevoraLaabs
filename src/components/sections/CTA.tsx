"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App (iOS)",
  "Mobile App (Android)",
  "Cross-platform Mobile",
  "UI/UX Design",
  "AI Integration",
  "DevOps & Cloud",
  "SaaS Platform",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateForm(
  name: string,
  email: string,
  message: string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }
  if (!message.trim()) errors.message = "Message is required";
  return errors;
}

type CTAProps = {
  eyebrow: string;
  headingStart: string;
  headingEnd: string;
  subhead: string;
  contactEmail?: string;
};

export default function CTA({
  eyebrow,
  headingStart,
  headingEnd,
  subhead,
}: CTAProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const errors = validateForm(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType: data.get("projectType"),
          message,
        }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error ?? "Submission failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-dl-deep py-24 md:py-32"
    >
      <Spotlight />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-dl-navy/40 bg-dl-slate/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dl-peach backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-dl-orange animate-glow-pulse" />
            {eyebrow}
          </span>
          <h2 className="mt-5 font-syne text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-dl-warm-white">{headingStart} </span>
            <span className="text-brand-gradient">{headingEnd}</span>
          </h2>
          <p className="mt-5 font-inter text-base text-dl-muted md:text-lg">
            {subhead}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-dl-navy/30 bg-glass p-6 md:p-8"
        >
          {status === "success" ? (
            <SuccessState onReset={() => setStatus("idle")} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              noValidate
            >
              <Field
                label="Name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                required
                error={fieldErrors.name}
              />
              <Field
                label="Email"
                name="email"
                type="text"
                placeholder="jane@company.com"
                autoComplete="email"
                required
                error={fieldErrors.email}
              />
              <SelectField
                label="Project type"
                name="projectType"
                options={PROJECT_TYPES}
                className="md:col-span-2"
              />
              <TextareaField
                label="Message"
                name="message"
                placeholder="A few sentences about your idea, timeline, and goals…"
                required
                className="md:col-span-2"
                error={fieldErrors.message}
              />

              {status === "error" && (
                <p
                  className="font-inter text-sm text-red-400 md:col-span-2"
                  role="alert"
                >
                  {serverError || "Submission failed. Please try again."}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2 md:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center gap-2 rounded-full bg-dl-orange px-6 py-3 font-inter font-semibold text-dl-deep transition-all hover:bg-dl-peach hover:shadow-[0_0_32px_rgba(230,210,168,0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-dl-orange disabled:hover:shadow-none"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  error?: string;
};

function Field({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  required,
  className,
  error,
}: FieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-inter text-sm font-medium text-dl-warm-white">
        {label}
        {required && <span className="text-dl-orange"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`rounded-lg border bg-dl-deep/60 px-4 py-3 font-inter text-sm text-dl-warm-white placeholder:text-dl-muted/60 transition-colors focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-dl-navy/40 focus:border-dl-orange"
        }`}
      />
      {error && (
        <span className="font-inter text-xs text-red-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  className,
}: {
  label: string;
  name: string;
  options: readonly string[];
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-inter text-sm font-medium text-dl-warm-white">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="rounded-lg border border-dl-navy/40 bg-dl-deep/60 px-4 py-3 font-inter text-sm text-dl-warm-white transition-colors focus:border-dl-orange focus:outline-none"
      >
        <option value="" disabled className="bg-dl-deep">
          Select a service…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-dl-deep">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  required,
  className,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-inter text-sm font-medium text-dl-warm-white">
        {label}
        {required && <span className="text-dl-orange"> *</span>}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className={`resize-none rounded-lg border bg-dl-deep/60 px-4 py-3 font-inter text-sm text-dl-warm-white placeholder:text-dl-muted/60 transition-colors focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-dl-navy/40 focus:border-dl-orange"
        }`}
      />
      {error && (
        <span className="font-inter text-xs text-red-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dl-orange/15 text-dl-orange">
        <Check size={26} strokeWidth={2.5} />
      </div>
      <h3 className="font-syne text-2xl font-bold text-dl-warm-white">
        Message received.
      </h3>
      <p className="max-w-md font-inter text-dl-muted">
        Thanks for reaching out — we&apos;ll get back to you within 24 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 font-inter text-sm text-dl-orange underline-offset-4 hover:underline"
      >
        Send another message
      </button>
    </div>
  );
}

function Spotlight() {
  return (
    <svg
      aria-hidden
      className="animate-spotlight pointer-events-none absolute -top-40 left-0 z-0 h-[169%] w-[138%] opacity-0 lg:left-60 lg:w-[84%]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#cta-spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="#E6D2A8"
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="cta-spotlight-blur"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
