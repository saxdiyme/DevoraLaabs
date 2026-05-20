export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 gap-12">
      {/* Step 2 verification: brand tokens, fonts, gradients, animations */}
      <section className="text-center space-y-4">
        <p className="font-mono text-xs tracking-widest text-dl-muted uppercase">
          Devora Laabs · Design Tokens
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-brand-gradient leading-tight">
          We Build Digital
          <br />
          Products That Scale
        </h1>
        <p className="font-inter text-dl-muted max-w-xl mx-auto">
          Tokens, fonts, keyframes and gradients are wired in. Step 3 plugs the
          real Hero in here.
        </p>
      </section>

      <section className="flex flex-wrap gap-3 justify-center">
        {(
          [
            ["dl-orange", "bg-dl-orange text-dl-deep"],
            ["dl-peach", "bg-dl-peach text-dl-deep"],
            ["dl-navy", "bg-dl-navy text-dl-warm-white"],
            ["dl-slate", "bg-dl-slate text-dl-warm-white"],
            ["dl-deep", "bg-dl-deep text-dl-warm-white border-brand-soft"],
            ["warm-white", "bg-dl-warm-white text-dl-deep"],
            ["muted", "bg-transparent text-dl-muted border-brand-soft"],
          ] as const
        ).map(([name, cls]) => (
          <span
            key={name}
            className={`${cls} px-4 py-2 rounded-full font-mono text-xs`}
          >
            {name}
          </span>
        ))}
      </section>

      <section className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 rounded-2xl bg-brand-gradient animate-glow-pulse" />
        <div className="w-32 h-32 rounded-full bg-dl-slate border-brand-soft animate-float" />
        <div className="font-mono text-xs text-dl-muted">
          animate-glow-pulse · animate-float
        </div>
      </section>

      <section className="w-full max-w-2xl h-24 bg-dot-grid [background-size:24px_24px] rounded-xl border-brand-soft" />
    </main>
  );
}
