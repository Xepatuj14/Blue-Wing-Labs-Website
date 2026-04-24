import { useEffect, useRef } from "react";
import { usePageAnimations } from "./lib/animations";
import EducationalCallout from "./components/EducationalCallout";
import { buildFlyEducationalCallouts } from "./data/educationalCallouts";
import {
  appLibraryTotals,
  appWaitlistHref,
  blueWingFlyLibraryHref,
  blueWingHomeHref,
  getPageMetadata,
  getPageSchemas,
  homeHref,
  knowledgeCategories,
  publicFlyRollout,
  resolveKnowledgeRoute,
  siteName,
  supportEmail,
  supportPageHref,
} from "./knowledgeCore";

function setMeta(selector, attribute, value) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, selector.includes("property=") ? selector.match(/property="([^"]+)"/)[1] : selector.match(/name="([^"]+)"/)[1]);
    document.head.appendChild(node);
  }

  node.setAttribute("content", value);
}

function setLink(selector, rel, href) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }

  node.setAttribute("href", href);
}

function usePageHead(page) {
  useEffect(() => {
    const metadata = getPageMetadata(page);
    const schemas = getPageSchemas(page);

    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", metadata.description);
    setMeta('meta[property="og:title"]', "property", metadata.title);
    setMeta('meta[property="og:description"]', "property", metadata.description);
    setMeta('meta[property="og:type"]', "property", metadata.type);
    setMeta('meta[property="og:url"]', "property", metadata.canonical);
    setMeta('meta[property="og:image"]', "property", metadata.ogImage);
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", metadata.description);
    setLink('link[rel="canonical"]', "canonical", metadata.canonical);

    document.querySelectorAll('script[data-schema="blue-wing-labs"]').forEach((node) => node.remove());
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = "blue-wing-labs";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [page]);
}

function SectionHeading({ eyebrow, title, body, center = false }) {
  return (
    <div data-motion="reveal" className={`max-w-[48rem] ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-amber-800">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">{title}</h2>
      <p className="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">{body}</p>
    </div>
  );
}

function Breadcrumbs({ items }) {
  return (
    <nav data-motion="reveal" aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-stone-600">
      {items.map((item, index) => (
        <span key={item.href} className="inline-flex items-center gap-2">
          <a href={item.href} className="transition hover:text-stone-950">
            {item.label}
          </a>
          {index < items.length - 1 ? <span className="text-stone-400">/</span> : null}
        </span>
      ))}
    </nav>
  );
}

function Pill({ children, muted = false }) {
  return (
    <span className={`rounded-full px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${muted ? "border border-stone-900/8 bg-white/70 text-stone-600" : "bg-emerald-900 text-emerald-50"}`}>
      {children}
    </span>
  );
}

function CategoryCard({ category }) {
  const leadFly = category.flies.find((fly) => fly.image);

  return (
    <article data-motion-item data-hover="lift" className="rounded-[1.55rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
      {leadFly ? (
        <a href={`/flies/${leadFly.slug}`} className="mb-5 block overflow-hidden rounded-[1.2rem] border border-stone-900/8 bg-[#f5f1e8]">
          <img src={leadFly.image} alt={`${leadFly.name} fly pattern`} className="h-36 w-full object-cover transition duration-300 hover:scale-[1.03]" loading="lazy" />
        </a>
      ) : null}
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">{category.flyCount} featured flies</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
        <a href={`/flies/${category.slug}`} className="transition hover:text-emerald-950">
          {category.name}
        </a>
      </h3>
      <p className="mt-3 text-sm leading-7 text-stone-700">{category.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {category.flies.slice(0, 3).map((fly) => (
          <a key={fly.slug} href={`/flies/${fly.slug}`} className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-stone-900/18 hover:bg-white">
            {fly.name}
          </a>
        ))}
      </div>
      <a href={`/flies/${category.slug}`} className="mt-5 inline-flex text-sm font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
        Explore {category.name.toLowerCase()}
      </a>
    </article>
  );
}

function GuideCard({ guide }) {
  const leadFly = guide.entries?.find((fly) => fly.image);

  return (
    <article data-motion-item data-hover="lift" className="rounded-[1.55rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
      {leadFly ? (
        <a href={`/flies/${leadFly.slug}`} className="mb-5 block overflow-hidden rounded-[1.2rem] border border-stone-900/8 bg-[#f5f1e8]">
          <img src={leadFly.image} alt={`${leadFly.name} fly pattern`} className="h-36 w-full object-cover transition duration-300 hover:scale-[1.03]" loading="lazy" />
        </a>
      ) : null}
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Guide</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
        <a href={`/guides/${guide.slug}`} className="transition hover:text-emerald-950">
          {guide.title}
        </a>
      </h3>
      <p className="mt-3 text-sm leading-7 text-stone-700">{guide.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.entries?.slice(0, 3).map((fly) => (
          <a key={fly.slug} href={`/flies/${fly.slug}`} className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-stone-900/18 hover:bg-white">
            {fly.name}
          </a>
        ))}
      </div>
      <a href={`/guides/${guide.slug}`} className="mt-5 inline-flex text-sm font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
        Read the guide
      </a>
    </article>
  );
}

function FlyCard({ fly, showCategory = true }) {
  return (
    <li data-motion-item data-hover="lift" className="rounded-[1.65rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
      {fly.image ? (
        <a href={`/flies/${fly.slug}`} className="mb-5 block overflow-hidden rounded-[1.2rem] border border-stone-900/8 bg-[#f5f1e8]">
          <img src={fly.image} alt={`${fly.name} fly pattern`} className="h-40 w-full object-cover transition duration-300 hover:scale-[1.03]" loading="lazy" />
        </a>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          {showCategory ? (
            <a href={`/flies/${fly.categorySlug}`} className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800 transition hover:text-amber-900">
              {fly.categorySlug.replace(/-/g, " ")}
            </a>
          ) : (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Pattern</p>
          )}
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
            <a href={`/flies/${fly.slug}`} className="transition hover:text-emerald-950">
              {fly.name}
            </a>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Difficulty</p>
          <p className="mt-1 text-sm font-medium text-stone-800">{fly.difficulty}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-stone-700">{fly.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {fly.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
            {tag.replace(/-/g, " ")}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-[1.2rem] bg-[#f5f1e8] px-4 py-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Why it matters</p>
        <p className="mt-2 text-sm leading-6 text-stone-700">{fly.whyItMatters}</p>
      </div>
      <div className="mt-3 rounded-[1.2rem] border border-stone-900/8 bg-white px-4 py-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">When it fits</p>
        <p className="mt-2 text-sm leading-6 text-stone-700">{fly.whenToUse}</p>
      </div>
    </li>
  );
}

function FAQBlock({ items }) {
  return (
    <div data-motion-group="faq-items" data-motion-stagger="70" className="grid gap-4">
      {items.map((item) => (
        <details key={item.question} data-motion-item className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
          <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-stone-950">{item.question}</summary>
          <p className="mt-4 text-sm leading-7 text-stone-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function TextPanel({ eyebrow, title, body, tone = "white" }) {
  const toneClass =
    tone === "tint"
      ? "border border-emerald-900/10 bg-[#eef5ea]"
      : "border border-stone-900/8 bg-white/82 shadow-[0_14px_36px_rgba(35,40,25,0.05)]";

  return (
    <article data-motion="reveal" data-hover="lift" className={`rounded-[1.45rem] p-5 ${toneClass}`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-700">{body}</p>
    </article>
  );
}

function BulletList({ items }) {
  return (
    <ul data-motion-group="bullet-list" className="grid gap-4">
      {items.map((item) => (
        <li key={item} data-motion-item className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 px-5 py-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
          <p className="text-sm leading-7 text-stone-700">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function AppCallout({ title, body, primaryLabel = "Join the Waiting List", secondaryLabel = "Support", secondaryHref = supportPageHref }) {
  return (
    <aside data-motion="reveal" data-hover="lift" className="rounded-[1.8rem] border border-emerald-900/10 bg-[linear-gradient(135deg,#173126_0%,#1e3a2c_100%)] px-6 py-6 text-stone-50 shadow-[0_24px_60px_rgba(24,38,30,0.18)]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-amber-200/85">Blue Wing Labs</p>
      <h3 className="mt-4 max-w-[18ch] font-serif text-3xl leading-[0.98] tracking-[-0.04em]">{title}</h3>
      <p className="mt-4 max-w-[38rem] text-base leading-7 text-stone-300">{body}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={appWaitlistHref} data-hover="lift" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-stone-100">
          {primaryLabel}
        </a>
        <a href={secondaryHref} data-hover="lift" className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-white/10">
          {secondaryLabel}
        </a>
      </div>
    </aside>
  );
}

function KnowledgeHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/8 bg-[#f5f1e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <div>
          <a href={homeHref} className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-stone-600 transition hover:text-stone-950">
            Back to Clarkii Outdoors
          </a>
          <a href={blueWingHomeHref} className="mt-2 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-stone-900/8 bg-white p-1 shadow-[0_8px_20px_rgba(18,21,17,0.08)]">
              <img src="/brand/blue-winged-olive-icon.png" alt="Blue Wing Labs icon" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-serif text-xl tracking-tight text-stone-950">{siteName}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-600">Fly tying knowledge hub</p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <nav aria-label="Knowledge" className="hidden items-center gap-7 text-sm text-stone-700 md:flex">
            <a href={blueWingHomeHref} className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Product Home
            </a>
            <a href={blueWingFlyLibraryHref} className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Fly Library
            </a>
            <a href={`${blueWingFlyLibraryHref}#categories`} className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Categories
            </a>
            <a href={`${blueWingFlyLibraryHref}#featured-guides`} className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Guides
            </a>
            <a href={supportPageHref} className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Support
            </a>
          </nav>

          <a href={appWaitlistHref} data-hover="lift" className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-stone-950 px-4 py-2.5 text-sm font-semibold text-stone-50 shadow-[0_10px_28px_rgba(18,21,17,0.16)] transition hover:-translate-y-0.5 hover:bg-stone-800">
            Join the Waiting List
          </a>
        </div>
      </div>
    </header>
  );
}

function KnowledgeFooter() {
  return (
    <footer className="border-t border-stone-900/8 bg-[linear-gradient(180deg,#f1ede3_0%,#ebe4d4_100%)] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 text-sm text-stone-600 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-semibold text-stone-950">{siteName}</p>
          <p className="mt-2 max-w-[24rem] leading-6">
            Public fly-tying guides, fly categories, and pattern pages designed to be useful both on the web and inside the Blue Wing Labs app workflow.
          </p>
          <div className="mt-4 rounded-[1.2rem] border border-stone-900/8 bg-white/65 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Knowledge hub</p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-sm leading-6 text-stone-700">{appLibraryTotals.activeFlies} active flies in the app</p>
              <p className="text-sm leading-6 text-stone-700">{knowledgeCategories.length} public categories on the site</p>
              <p className="text-sm leading-6 text-stone-700">Guides, fly pages, and category pages linked together for easier retrieval</p>
            </div>
          </div>
        </div>

        <nav aria-label="Knowledge hub">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Blue Wing Labs</p>
          <div className="mt-3 flex flex-col gap-3">
            <a href={blueWingHomeHref} className="transition hover:text-stone-950">
              Product home
            </a>
            <a href={blueWingFlyLibraryHref} className="transition hover:text-stone-950">
              Fly library
            </a>
            <a href="/guides/best-trout-flies" className="transition hover:text-stone-950">
              Best trout flies
            </a>
            <a href="/guides/classic-fly-patterns" className="transition hover:text-stone-950">
              Classic fly patterns
            </a>
            <a href="/guides/fly-patterns-every-angler-should-know" className="transition hover:text-stone-950">
              Must-know patterns
            </a>
          </div>
        </nav>

        <nav aria-label="Categories">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Categories</p>
          <div className="mt-3 flex flex-col gap-3">
            {knowledgeCategories.slice(0, 5).map((category) => (
              <a key={category.slug} href={`/flies/${category.slug}`} className="transition hover:text-stone-950">
                {category.name}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Contact</p>
          <a href={homeHref} className="mt-3 block transition hover:text-stone-950">
            Clarkii Outdoors
          </a>
          <a href={`mailto:${supportEmail}`} className="mt-3 inline-block font-medium text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
            {supportEmail}
          </a>
          <a href={supportPageHref} className="mt-2 block transition hover:text-stone-950">
            Support page
          </a>
          <p className="mt-3 leading-6">Blue Wing Labs is a product operated by Clarkii Outdoors LLC.</p>
        </div>
      </div>
    </footer>
  );
}

function HubPage({ page }) {
  return (
    <>
      <section className="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: "Clarkii Outdoors", href: homeHref }, { label: "Blue Wing Labs", href: blueWingHomeHref }, { label: "Fly Library", href: blueWingFlyLibraryHref }]} />
          <p data-motion="hub-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Blue Wing Labs Learn</p>
          <h1 data-motion="hub-title" className="mt-5 max-w-[12ch] font-serif text-[3.1rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">
            Fly tying guides built to be read, searched, and reused.
          </h1>
          <p data-motion="hub-copy" className="mt-6 max-w-[42rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">{page.intro}</p>
          <div data-motion="hub-proof" className="mt-6 flex flex-wrap gap-3">
            <Pill>{appLibraryTotals.activeFlies} flies in the app</Pill>
            <Pill muted>{page.featuredCategories.length} public categories</Pill>
            <Pill muted>{page.featuredGuides.length}+ featured guides</Pill>
            <Pill muted>{publicFlyRollout.publishedCount} source-backed fly pages live now</Pill>
          </div>
        </div>
      </section>

      <section id="categories" className="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Categories" title="Browse the public fly categories first." body="Each category page explains what the group is for, highlights representative patterns, and links back into related guides and fly detail pages." />
          <div data-motion-group="categories" className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.featuredCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured-guides" className="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Guides" title="Long-form pages for anglers, tiers, and AI retrieval." body="These guide pages are written to be useful first: clear headings, practical summaries, related patterns, and enough structure to support both search indexing and real decision-making." />
          <div data-motion-group="featured-guides" className="mt-10 grid gap-5 lg:grid-cols-2">
            {page.featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <AppCallout
            title="Organize your fly box with Blue Wing Labs."
            body="The public hub helps anglers discover patterns. Blue Wing Labs helps organize those patterns inside a calmer workflow for learning, materials tracking, and repeat tying."
            primaryLabel="Learn this pattern step by step in the app"
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="FAQ" title="Quick answers about the knowledge hub." body="These answers clarify how the public content hub connects to the broader Blue Wing Labs app and fly library." />
          <div className="mt-10">
            <FAQBlock items={page.faq} />
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryPage({ page }) {
  const { category, flies, relatedGuides } = page;

  return (
    <>
      <section className="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: "Clarkii Outdoors", href: homeHref }, { label: "Blue Wing Labs", href: blueWingHomeHref }, { label: "Fly Library", href: blueWingFlyLibraryHref }, { label: category.name, href: page.path }]} />
          <p data-motion="hub-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Fly category</p>
          <h1 data-motion="hub-title" className="mt-5 max-w-[12ch] font-serif text-[3.1rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">{category.name}</h1>
          <p data-motion="hub-copy" className="mt-6 max-w-[44rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">{category.intro}</p>
          <div data-motion="hub-proof" className="mt-6 flex flex-wrap gap-3">
            <Pill>{flies.length} featured patterns</Pill>
            <Pill muted>{relatedGuides.length} related guides</Pill>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="What this category covers" title={`Why ${category.name.toLowerCase()} stay useful.`} body={category.longDescription} />
            <div className="mt-6 rounded-[1.45rem] border border-stone-900/8 bg-[#f5f1e8] px-5 py-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">When anglers reach for them</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{category.whenItShines}</p>
            </div>
          </div>

          <div data-motion="reveal" data-hover="lift" className="rounded-[1.7rem] border border-emerald-900/10 bg-[#eef5ea] p-5 shadow-[0_16px_36px_rgba(35,40,25,0.05)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-900">Blue Wing Labs angle</p>
            <p className="mt-3 text-lg font-semibold tracking-tight text-stone-950">
              Organize this category in the app, then use the public guide pages to compare patterns and related fly groups.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={blueWingFlyLibraryHref} data-hover="lift" className="rounded-full bg-stone-950 px-4 py-2.5 text-sm font-semibold text-stone-50 transition hover:bg-stone-800">
                Explore the hub
              </a>
              <a href={appWaitlistHref} data-hover="lift" className="rounded-full border border-stone-900/10 bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-50">
                Explore this pattern in Blue Wing Labs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Pattern list" title={`Featured ${category.name.toLowerCase()} in the public hub.`} body="These fly pages are linked so anglers can move from category overview to individual pattern details without losing context." />
          <ol data-motion-group="pattern-list" className="mt-10 grid gap-5 md:grid-cols-2">
            {flies.map((fly) => (
              <FlyCard key={fly.slug} fly={fly} showCategory={false} />
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <AppCallout
            title="Learn this category step by step in the app."
            body={`Use Blue Wing Labs to keep ${category.name.toLowerCase()} organized, compare related patterns, and return to the same flies later without starting over.`}
            primaryLabel="Organize your fly box with Blue Wing Labs"
          />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Related guides" title={`Guides that connect to ${category.name.toLowerCase()}.`} body="These long-form guides link the category back into broader trout-box questions, beginner pathways, and pattern comparisons." />
          <div data-motion-group="related-guides" className="mt-10 grid gap-5 lg:grid-cols-2">
            {relatedGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="FAQ" title={`${category.name} questions anglers ask most.`} body="These answers help clarify what belongs in the category and why Blue Wing Labs keeps it organized as a separate reference group." />
          <div className="mt-10">
            <FAQBlock items={category.faq} />
          </div>
        </div>
      </section>
    </>
  );
}

function GuidePage({ page }) {
  const { guide, entries, relatedCategories, relatedGuides } = page;

  return (
    <>
      <section className="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: "Clarkii Outdoors", href: homeHref }, { label: "Blue Wing Labs", href: blueWingHomeHref }, { label: "Fly Library", href: blueWingFlyLibraryHref }, { label: "Guides", href: `${blueWingFlyLibraryHref}#featured-guides` }, { label: guide.title, href: page.path }]} />
          <p data-motion="hub-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Guide</p>
          <h1 data-motion="hub-title" className="mt-5 max-w-[14ch] font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">{guide.title}</h1>
          <p data-motion="hub-copy" className="mt-6 max-w-[46rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">{guide.intro}</p>
          <div data-motion="hub-proof" className="mt-6 flex flex-wrap gap-3">
            <Pill>{entries.length} recommended flies</Pill>
            <Pill muted>{relatedCategories.length} linked categories</Pill>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="How to use this guide" title="Use the list to simplify the box, not expand it forever." body="The goal is not to carry everything. The goal is to identify the patterns that cover the clearest jobs, then keep them easy to find, easy to compare, and easy to tie again later." />
            <div data-motion-group="guide-principles" className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Clear box role",
                  body: "Each fly made the list because it solves a recognizable job instead of only adding another name to memorize.",
                },
                {
                  title: "Repeatable use case",
                  body: "The guide favors patterns anglers can return to across real sessions, not one-off novelties that never become part of the workflow.",
                },
                {
                  title: "Organized next step",
                  body: "Every recommendation links to a fly page, category page, or related guide so the page works like a reference system instead of a dead-end article.",
                },
              ].map((item) => (
                <article key={item.title} data-motion-item data-hover="lift" className="rounded-[1.3rem] border border-stone-900/8 bg-white/82 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
                  <h3 className="text-base font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div data-motion="reveal" data-hover="lift" className="rounded-[1.7rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_36px_rgba(35,40,25,0.05)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Linked categories</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedCategories.map((category) => (
                <a key={category.slug} href={`/flies/${category.slug}`} data-hover="lift" className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-stone-900/18 hover:bg-white">
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Recommended patterns" title="The flies that make this guide worth opening." body="Each pattern below links to its own fly page and category page so the guide never becomes a dead-end content piece." />
          <ol data-motion-group="recommended-patterns" className="mt-10 grid gap-5 md:grid-cols-2">
            {entries.map((fly) => (
              <FlyCard key={fly.slug} fly={fly} />
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <AppCallout
            title="Explore this pattern in Blue Wing Labs."
            body="The guide page helps you choose a fly. Blue Wing Labs helps you keep that choice organized, learn the pattern step by step, and return to it later without rebuilding the whole process."
          />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Related guides" title="Keep moving through the knowledge graph." body="These connected guides share flies or category logic so you can continue exploring without losing context." />
          <div data-motion-group="related-guides" className="mt-10 grid gap-5 lg:grid-cols-2">
            {relatedGuides.map((relatedGuide) => (
              <GuideCard key={relatedGuide.slug} guide={relatedGuide} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="FAQ" title="Short answers that make the guide more usable." body="These answers focus on why the patterns made the list and how to keep the category useful instead of bloated." />
          <div className="mt-10">
            <FAQBlock items={guide.faq} />
          </div>
        </div>
      </section>
    </>
  );
}

function FlyPage({ page }) {
  const { fly, category, relatedFlies, relatedGuides, faq, aboutParagraphs, whenToUsePoints, whyItWorksPoints, similarPatternsIntro, displayMaterials, displaySteps, learnBullets, supportLabel, imitationTags, recipe, videoUrl, videoThumbnail, appWhyItWorks } = page;
  const flyTags = [...new Set([...fly.tags, ...imitationTags])];
  const educationalCallouts = buildFlyEducationalCallouts(page);

  return (
    <>
      <section className="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <Breadcrumbs items={[{ label: "Clarkii Outdoors", href: homeHref }, { label: "Blue Wing Labs", href: blueWingHomeHref }, { label: "Fly Library", href: blueWingFlyLibraryHref }, { label: category.name, href: `/flies/${category.slug}` }, { label: fly.name, href: page.path }]} />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p data-motion="hub-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Fly pattern</p>
              <h1 data-motion="hub-title" className="mt-5 max-w-[12ch] font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">{fly.name}</h1>
              <p data-motion="hub-copy" className="mt-6 max-w-[40rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">{page.intro}</p>
              {supportLabel ? <p data-motion="hub-copy" className="mt-4 max-w-[38rem] text-sm font-medium uppercase tracking-[0.18em] text-emerald-900/78">{supportLabel}</p> : null}
              <div data-motion="hub-proof" className="mt-6 flex flex-wrap gap-3">
                <Pill>{category.name}</Pill>
                <Pill muted>{fly.difficulty}</Pill>
                {fly.sizeRange ? <Pill muted>{fly.sizeRange}</Pill> : null}
              </div>
              {learnBullets.length ? (
                <div data-motion-group="learn-bullets" className="mt-6 grid gap-3 sm:grid-cols-2">
                  {learnBullets.map((bullet) => (
                    <div key={bullet} data-motion-item className="rounded-[1.1rem] border border-stone-900/8 bg-[#f5f1e8] px-4 py-4 text-sm leading-6 text-stone-700">
                      {bullet}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div data-motion="reveal" data-hover="lift" className="rounded-[1.8rem] border border-stone-900/8 bg-[#f5f1e8] p-5">
              {fly.image ? (
                <img src={fly.image} alt={`${fly.name} fly pattern`} className="h-56 w-full rounded-[1.4rem] object-cover" />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#efe0c5_0%,#dfe8d8_100%)]">
                  <div className="text-center">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-900/70">{category.name}</p>
                    <p className="mt-3 font-serif text-3xl tracking-tight text-stone-950">{fly.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Overview"
            title={`${fly.name} in one organized view.`}
            body="This page is structured to stay useful as a real reference source: what the fly is, where it fits, what materials or steps are publicly available, why anglers keep it around, and where to go next in the Blue Wing Labs knowledge graph."
          />
          <div data-motion-group="fly-overview" className="mt-10 grid gap-5 lg:grid-cols-3">
            <article data-motion-item data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Why it matters</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{fly.whyItMatters}</p>
            </article>
            <article data-motion-item data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">When to use it</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{fly.whenToUse}</p>
            </article>
            <article data-motion-item data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Category link</p>
              <a href={`/flies/${category.slug}`} className="mt-3 inline-flex text-lg font-semibold tracking-tight text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
                Browse more {category.name.toLowerCase()}
              </a>
              <div className="mt-4 flex flex-wrap gap-2">
                {flyTags.slice(0, 8).map((tag) => (
                  <span key={tag} className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {recipe ? (
        <section className="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Recipe Snapshot" title={`What the app keeps with ${fly.name}`} body="This section brings over the same recipe-shape context the app uses: hook guidance, core material logic, substitutions, and tying-sequence checkpoints." />
            <div data-motion-group="recipe-panels" className="mt-10 grid gap-5 lg:grid-cols-3">
              <TextPanel eyebrow="Hook" title={recipe.hook?.style || "Hook guidance"} body={[recipe.hook?.model, recipe.hook?.sizeRange, recipe.hook?.notes].filter(Boolean).join(" • ")} />
              <TextPanel eyebrow="Core materials" title="What stays consistent" body={recipe.coreMaterials.join(", ")} />
              <TextPanel eyebrow="Substitutions" title="Accepted swaps" body={recipe.acceptedSubstitutions?.length ? recipe.acceptedSubstitutions.join(", ") : "This public page does not list extra substitutions for this pattern yet."} />
            </div>
            {recipe.tyingSequence?.length || recipe.notes?.length ? (
              <div data-motion-group="recipe-details" className="mt-8 grid gap-5 lg:grid-cols-2">
                {recipe.tyingSequence?.length ? <TextPanel eyebrow="Sequence" title="Canonical tying flow" body={recipe.tyingSequence.join(", ")} tone="tint" /> : null}
                {recipe.notes?.length ? <TextPanel eyebrow="Recipe notes" title="Additional notes" body={recipe.notes.join(" ")} tone="tint" /> : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="About This Fly" title={`About ${fly.name}`} body="This section keeps the explanation practical and source-backed, using the structured library data plus broad category context without inventing unsupported technical detail." />
          <div data-motion-group="about-panels" className="mt-10 grid gap-5 lg:grid-cols-2">
            {aboutParagraphs.map((paragraph, index) => (
              <TextPanel
                key={paragraph}
                eyebrow={index === 0 ? "Overview" : "Context"}
                title={index === 0 ? `${fly.name} at a glance` : index === 1 ? "Box role" : "Pattern context"}
                body={paragraph}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="When To Use It" title={`When to use ${fly.name}`} body="The public site only states broad usage windows, but those windows still help anglers keep the fly in the right part of the mental and physical box." />
            <div className="mt-10">
              <BulletList items={whenToUsePoints} />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Why It Works" title={`Why ${fly.name} works`} body="These points focus on the fly's role, visibility, versatility, and category logic rather than overly specific claims the public dataset does not support." />
            <div className="mt-8">
              <EducationalCallout {...educationalCallouts.condition} />
            </div>
            {appWhyItWorks ? (
              <div data-motion-group="why-panels" className="mt-10 grid gap-4">
                {imitationTags.length ? <div className="flex flex-wrap gap-2">{imitationTags.map((tag) => <Pill key={tag} muted>{tag.replace(/-/g, " ")}</Pill>)}</div> : null}
                <TextPanel eyebrow="Imitates" title="What it represents" body={appWhyItWorks.imitates} />
                <TextPanel eyebrow="Where it excels" title="Best situations" body={appWhyItWorks.whereItExcels} />
                <TextPanel eyebrow="Common mistakes" title="What to watch for" body={appWhyItWorks.commonMistakes} />
              </div>
            ) : (
              <div className="mt-10">
                <BulletList items={whyItWorksPoints} />
              </div>
            )}
          </div>
        </div>
      </section>

      {videoUrl ? (
        <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Video Lesson" title={`Watch ${fly.name} in motion`} body="When the app includes a lesson video, the public page links to it directly so anglers can move from reference reading into step-by-step watching." />
            <article data-motion="reveal" data-hover="lift" className="mt-10 overflow-hidden rounded-[1.8rem] border border-stone-900/8 bg-white/82 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
              {videoThumbnail ? <img src={videoThumbnail} alt={`${fly.name} video lesson thumbnail`} className="h-64 w-full object-cover" loading="lazy" /> : null}
              <div className="p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Blue Wing Labs lesson</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Learn this pattern step by step</h3>
                <p className="mt-3 max-w-[42rem] text-sm leading-7 text-stone-700">Open the linked lesson to compare the public recipe, the tying sequence, and the app’s guided teaching flow for {fly.name}.</p>
                <a href={videoUrl} target="_blank" rel="noreferrer" data-hover="lift" className="mt-5 inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-stone-800">
                  Watch the video lesson
                </a>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {displayMaterials?.length ? (
        <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Materials" title={`Materials for ${fly.name}`} body="These materials come from the app-backed fly record when available, which lets the public page mirror the practical tying list more closely." />
            <div className="mt-8 max-w-[44rem]">
              <EducationalCallout {...educationalCallouts.material} />
            </div>
            <div data-motion-group="materials" data-motion-stagger="80" className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {displayMaterials.map((material) => (
                <article key={`${material.name}-${material.note || "material"}`} data-motion-item data-hover="lift" className="rounded-[1.35rem] border border-stone-900/8 bg-white/84 p-5 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Material</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-stone-900">{material.name}</p>
                  {material.note ? <p className="mt-2 text-sm leading-6 text-stone-700">{material.note}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {displaySteps?.length ? (
        <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="How To Tie It" title={`How to tie ${fly.name}`} body="The website now uses the app-backed step list where available so the public page follows a fuller tying sequence instead of only a short summary." />
            <div className="mt-8 max-w-[44rem]">
              <EducationalCallout {...educationalCallouts.tying} />
            </div>
            <ol data-motion-group="steps" data-motion-stagger="90" className="mt-10 grid gap-4">
              {displaySteps.map((step, index) => (
                <li key={step} data-motion-item data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 px-5 py-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Step {index + 1}</p>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Variations And Similar Patterns" title={`Variations and similar patterns for ${fly.name}`} body="The public fly library does not invent named variations where the source data is thin. Instead, it connects this pattern to nearby flies so anglers can see the surrounding shape of the category." />
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="grid gap-5">
              <TextPanel eyebrow="Comparison note" title="How to read this section" body={similarPatternsIntro} tone="tint" />
              {recipe?.variantNotes?.length
                ? recipe.variantNotes.map((note) => <TextPanel key={note.title} eyebrow="Variant note" title={note.title} body={note.bullets.join(" ")} tone="tint" />)
                : null}
            </div>
            <div className="grid gap-5">
              <ol data-motion-group="related-flies" className="grid gap-5 md:grid-cols-2">
                {relatedFlies.map((relatedFly) => (
                  <FlyCard key={relatedFly.slug} fly={relatedFly} />
                ))}
              </ol>
              {recipe?.sourceLog?.length ? (
                <div data-motion="reveal" data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Source notes</p>
                  <div data-motion-group="source-notes" className="mt-4 grid gap-3">
                    {recipe.sourceLog.map((source) => (
                      <a key={`${source.label}-${source.url}`} href={source.url} target="_blank" rel="noreferrer" data-motion-item data-hover="lift" className="rounded-[1rem] border border-stone-900/8 bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-700 transition hover:bg-white">
                        <span className="font-semibold text-stone-950">{source.label}</span>
                        {source.notes ? <span>{` - ${source.notes}`}</span> : null}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <AppCallout
            title="Learn and organize this pattern in Blue Wing Labs."
            body={`Use Blue Wing Labs to keep ${fly.name} connected to category pages, related guides, materials planning, and the calmer bench workflow the app is built around.`}
          />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Related Guides" title={`Related guides for ${fly.name}`} body="These guides connect the pattern back into broader beginner, trout, seasonal, and category-level decisions." />
          <div data-motion-group="related-guides" className="mt-10 grid gap-5 lg:grid-cols-2">
            {relatedGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="FAQ" title={`${fly.name} questions that help AI and anglers alike.`} body="These short answers make the pattern page easier to extract, easier to summarize, and easier to reuse as a practical reference source." />
          <div className="mt-10">
            <FAQBlock items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div data-motion="reveal" data-hover="lift" className="mx-auto max-w-4xl rounded-[2rem] border border-stone-900/8 bg-white/82 px-6 py-8 text-center shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
        <p data-motion="hub-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Not found</p>
        <h1 data-motion="hub-title" className="mt-5 font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">This guide or fly page is not available yet.</h1>
        <p data-motion="hub-copy" className="mt-6 text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">
          Return to the Blue Wing Labs learning hub to browse available categories, guides, and public fly detail pages.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={blueWingFlyLibraryHref} data-hover="lift" className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-stone-50 transition hover:bg-stone-800">
            Open Fly Library
          </a>
          <a href="/" data-hover="lift" className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-50">
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default function KnowledgeRouter({ path }) {
  const page = resolveKnowledgeRoute(path);
  const pageRef = useRef(null);
  usePageHead(page);
  usePageAnimations(
    pageRef,
    {
      heroSequence: [
        '[data-motion="hub-eyebrow"]',
        '[data-motion="hub-title"]',
        '[data-motion="hub-copy"]',
        '[data-motion="hub-proof"]',
      ],
    },
    [path],
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f5f1e8] text-stone-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(112,140,93,0.2),transparent_36%),linear-gradient(180deg,#edf1e6_0%,#f5f1e8_58%)]" />
      <KnowledgeHeader />
      <main id="main-content">
        {page?.type === "hub" ? <HubPage page={page} /> : null}
        {page?.type === "category" ? <CategoryPage page={page} /> : null}
        {page?.type === "guide" ? <GuidePage page={page} /> : null}
        {page?.type === "fly" ? <FlyPage page={page} /> : null}
        {!page ? <NotFoundPage /> : null}
      </main>
      <KnowledgeFooter />
    </div>
  );
}
