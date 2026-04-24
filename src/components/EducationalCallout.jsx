const variantStyles = {
  "Fish Behavior": {
    shell: "border-emerald-900/12 bg-[linear-gradient(180deg,#f5f8f1_0%,#eef4ea_100%)]",
    icon: "bg-emerald-900 text-emerald-50",
    eyebrow: "text-emerald-900",
    detail: "border-emerald-900/10 bg-white/72 text-stone-700",
  },
  "River Reading": {
    shell: "border-sky-900/10 bg-[linear-gradient(180deg,#f2f6f7_0%,#eaf0f1_100%)]",
    icon: "bg-slate-700 text-stone-50",
    eyebrow: "text-slate-700",
    detail: "border-slate-700/10 bg-white/72 text-stone-700",
  },
  "Fly Tying": {
    shell: "border-amber-900/12 bg-[linear-gradient(180deg,#faf4e8_0%,#f3ebdc_100%)]",
    icon: "bg-amber-700 text-amber-50",
    eyebrow: "text-amber-900",
    detail: "border-amber-900/10 bg-white/76 text-stone-700",
  },
  "Gear Insight": {
    shell: "border-stone-900/10 bg-[linear-gradient(180deg,#f7f4ef_0%,#f0ece3_100%)]",
    icon: "bg-stone-800 text-stone-50",
    eyebrow: "text-stone-700",
    detail: "border-stone-900/8 bg-white/76 text-stone-700",
  },
  "App Intelligence": {
    shell: "border-[#183227]/12 bg-[linear-gradient(180deg,#edf4ef_0%,#e5efe9_100%)]",
    icon: "bg-[#183227] text-stone-50",
    eyebrow: "text-[#183227]",
    detail: "border-[#183227]/10 bg-white/72 text-stone-700",
  },
};

function defaultIconForVariant(variant) {
  switch (variant) {
    case "Fish Behavior":
      return "FB";
    case "River Reading":
      return "RR";
    case "Fly Tying":
      return "FT";
    case "Gear Insight":
      return "GI";
    default:
      return "AI";
  }
}

export default function EducationalCallout({
  eyebrow,
  title,
  body,
  icon,
  variant = "App Intelligence",
  details = [],
}) {
  const style = variantStyles[variant] || variantStyles["App Intelligence"];
  const detailItems = details.filter(Boolean).slice(0, 3);

  return (
    <article
      data-motion-group="educational-callout"
      data-motion-stagger="55"
      data-hover="lift"
      className={`group rounded-[1.7rem] border p-5 shadow-[0_16px_34px_rgba(35,40,25,0.05)] sm:p-6 ${style.shell}`}
    >
      <div className="flex items-start gap-4">
        <div
          data-motion-item
          aria-hidden="true"
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-200 group-hover:-translate-y-0.5 ${style.icon}`}
        >
          {icon || defaultIconForVariant(variant)}
        </div>

        <div className="min-w-0">
          <p data-motion-item className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${style.eyebrow}`}>
            {eyebrow || variant}
          </p>
          <h3 data-motion-item className="mt-3 text-[1.15rem] font-semibold leading-6 tracking-tight text-stone-950 sm:text-xl">
            {title}
          </h3>
          <p data-motion-item className="mt-3 text-sm leading-7 text-stone-700 sm:text-[0.98rem]">
            {body}
          </p>
        </div>
      </div>

      {detailItems.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {detailItems.map((detail) => (
            <span
              key={detail}
              data-motion-item
              className={`rounded-full border px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.01em] ${style.detail}`}
            >
              {detail}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
