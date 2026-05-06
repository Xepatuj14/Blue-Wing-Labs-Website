import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  appLibraryTotals,
  appStoreHref,
  getAllKnowledgeRoutes,
  getPageMetadata,
  getPageSchemas,
  publicFlyRollout,
  siteOrigin,
  siteName,
  supportEmail,
} from "../src/knowledgeCore.js";
import { buildFlyEducationalCallouts } from "../src/data/educationalCallouts.js";
import { getAppShellRoutes } from "../src/siteRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDirectory = path.resolve(__dirname, "..");
const distDirectory = path.join(rootDirectory, "dist");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPills(items) {
  return items
    .map((item) => `<span class="rounded-full border border-stone-900/8 bg-white/70 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stone-700">${escapeHtml(item)}</span>`)
    .join("");
}

function renderFlyImage(fly, className = "h-40") {
  if (!fly?.image) {
    return "";
  }

  return `
    <a href="/flies/${fly.slug}" class="mb-5 block overflow-hidden rounded-[1.2rem] border border-stone-900/8 bg-[#f5f1e8]">
      <img src="${escapeHtml(fly.image)}" alt="${escapeHtml(`${fly.name} fly pattern`)}" class="${className} w-full object-cover" loading="lazy" />
    </a>`;
}

function renderFlyCards(flies) {
  return flies
    .map(
      (fly) => `
        <li class="rounded-[1.65rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
          ${renderFlyImage(fly)}
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">${escapeHtml(fly.categorySlug.replace(/-/g, " "))}</p>
          <h3 class="mt-3 text-xl font-semibold tracking-tight text-stone-950"><a href="/flies/${fly.slug}" class="transition hover:text-emerald-950">${escapeHtml(fly.name)}</a></h3>
          <p class="mt-4 text-sm leading-7 text-stone-700">${escapeHtml(fly.summary)}</p>
          <div class="mt-4 rounded-[1.2rem] bg-[#f5f1e8] px-4 py-4">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Why it matters</p>
            <p class="mt-2 text-sm leading-6 text-stone-700">${escapeHtml(fly.whyItMatters)}</p>
          </div>
          <div class="mt-3 rounded-[1.2rem] border border-stone-900/8 bg-white px-4 py-4">
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">When it fits</p>
            <p class="mt-2 text-sm leading-6 text-stone-700">${escapeHtml(fly.whenToUse)}</p>
          </div>
        </li>`,
    )
    .join("");
}

function renderGuideCards(guides) {
  return guides
    .map((guide) => {
      const leadFly = guide.entries?.find((fly) => fly.image);

      return `
        <article class="rounded-[1.55rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
          ${renderFlyImage(leadFly, "h-36")}
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Guide</p>
          <h3 class="mt-3 text-xl font-semibold tracking-tight text-stone-950"><a href="/guides/${guide.slug}" class="transition hover:text-emerald-950">${escapeHtml(guide.title)}</a></h3>
          <p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(guide.description)}</p>
        </article>`;
    })
    .join("");
}

function renderFaq(items = []) {
  return items
    .map(
      (item) => `
        <details class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
          <summary class="cursor-pointer list-none text-lg font-semibold tracking-tight text-stone-950">${escapeHtml(item.question)}</summary>
          <p class="mt-4 text-sm leading-7 text-stone-700">${escapeHtml(item.answer)}</p>
        </details>`,
    )
    .join("");
}

function renderTextPanels(items = [], tone = "white") {
  const toneClass =
    tone === "tint"
      ? "border border-emerald-900/10 bg-[#eef5ea]"
      : "border border-stone-900/8 bg-white/82 shadow-[0_14px_36px_rgba(35,40,25,0.05)]";

  return items
    .map(
      (item) => `
        <article class="rounded-[1.45rem] p-5 ${toneClass}">
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">${escapeHtml(item.eyebrow)}</p>
          <h3 class="mt-3 text-xl font-semibold tracking-tight text-stone-950">${escapeHtml(item.title)}</h3>
          <p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(item.body)}</p>
        </article>`,
    )
    .join("");
}

function renderBulletList(items = []) {
  return items
    .map(
      (item) => `
        <li class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 px-5 py-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
          <p class="text-sm leading-7 text-stone-700">${escapeHtml(item)}</p>
        </li>`,
    )
    .join("");
}

function renderMaterialCards(materials = []) {
  return materials
    .map(
      (material) => `
        <article class="rounded-[1.35rem] border border-stone-900/8 bg-white/84 p-5 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Material</p>
          <p class="mt-3 text-sm font-semibold leading-6 text-stone-900">${escapeHtml(material.name)}</p>
          ${material.note ? `<p class="mt-2 text-sm leading-6 text-stone-700">${escapeHtml(material.note)}</p>` : ""}
        </article>`,
    )
    .join("");
}

function renderSourceLog(sourceLog = []) {
  return sourceLog
    .map(
      (source) => `
        <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer" class="rounded-[1rem] border border-stone-900/8 bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-700 transition hover:bg-white">
          <span class="font-semibold text-stone-950">${escapeHtml(source.label)}</span>
          ${source.notes ? `<span> - ${escapeHtml(source.notes)}</span>` : ""}
        </a>`,
    )
    .join("");
}

function renderEducationalCallout(callout) {
  if (!callout) {
    return "";
  }

  const variants = {
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

  const icons = {
    "Fish Behavior": "FB",
    "River Reading": "RR",
    "Fly Tying": "FT",
    "Gear Insight": "GI",
    "App Intelligence": "AI",
  };

  const style = variants[callout.variant] || variants["App Intelligence"];
  const icon = callout.icon || icons[callout.variant] || "AI";
  const details = (callout.details || []).filter(Boolean).slice(0, 3);

  return `
    <article class="rounded-[1.7rem] border p-5 shadow-[0_16px_34px_rgba(35,40,25,0.05)] sm:p-6 ${style.shell}">
      <div class="flex items-start gap-4">
        <div aria-hidden="true" class="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${style.icon}">${escapeHtml(icon)}</div>
        <div class="min-w-0">
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${style.eyebrow}">${escapeHtml(callout.eyebrow || callout.variant || "Insight")}</p>
          <h3 class="mt-3 text-[1.15rem] font-semibold leading-6 tracking-tight text-stone-950 sm:text-xl">${escapeHtml(callout.title)}</h3>
          <p class="mt-3 text-sm leading-7 text-stone-700 sm:text-[0.98rem]">${escapeHtml(callout.body)}</p>
        </div>
      </div>
      ${details.length ? `<div class="mt-5 flex flex-wrap gap-2">${details
        .map(
          (detail) =>
            `<span class="rounded-full border px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.01em] ${style.detail}">${escapeHtml(detail)}</span>`,
        )
        .join("")}</div>` : ""}
    </article>`;
}

function pageShell(page, innerHtml) {
  return `
    <div class="min-h-screen bg-[#f5f1e8] text-stone-900">
      <div class="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(112,140,93,0.2),transparent_36%),linear-gradient(180deg,#edf1e6_0%,#f5f1e8_58%)]"></div>
      <header class="sticky top-0 z-30 border-b border-stone-900/8 bg-[#f5f1e8]/90 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" class="flex items-center gap-3">
            <div class="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-stone-900/8 bg-white p-1 shadow-[0_8px_20px_rgba(18,21,17,0.08)]">
              <img src="/brand/blue-winged-olive-icon.png" alt="Blue Wing Labs icon" class="h-full w-full object-contain" />
            </div>
            <div>
              <p class="font-serif text-xl tracking-tight text-stone-950">${siteName}</p>
              <p class="text-xs uppercase tracking-[0.22em] text-stone-600">Fly tying knowledge hub</p>
            </div>
          </a>
          <a href="${appStoreHref}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-stone-950 px-4 py-2.5 text-sm font-semibold text-stone-50 shadow-[0_10px_28px_rgba(18,21,17,0.16)]">App Store</a>
        </div>
      </header>
      <main id="main-content">${innerHtml}</main>
      <footer class="border-t border-stone-900/8 bg-[linear-gradient(180deg,#f1ede3_0%,#ebe4d4_100%)] px-5 py-10 sm:px-6 lg:px-8">
        <div class="mx-auto grid max-w-6xl gap-8 text-sm text-stone-600 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <p class="font-semibold text-stone-950">${siteName}</p>
            <p class="mt-2 max-w-[24rem] leading-6">Public fly-tying guides, fly categories, and pattern pages designed to be useful both on the web and inside the Blue Wing Labs app workflow.</p>
            <div class="mt-4 rounded-[1.2rem] border border-stone-900/8 bg-white/65 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Knowledge hub</p>
              <div class="mt-3 flex flex-col gap-2">
                <p class="text-sm leading-6 text-stone-700">${appLibraryTotals.activeFlies} active flies in the app</p>
                <p class="text-sm leading-6 text-stone-700">${appLibraryTotals.categories} total app categories</p>
                <p class="text-sm leading-6 text-stone-700">Guides, fly pages, and category pages linked together for easier retrieval</p>
              </div>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Learn</p>
            <div class="mt-3 flex flex-col gap-3">
              <a href="/learn" class="transition hover:text-stone-950">Hub home</a>
              <a href="/guides/best-trout-flies" class="transition hover:text-stone-950">Best trout flies</a>
              <a href="/guides/classic-fly-patterns" class="transition hover:text-stone-950">Classic fly patterns</a>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Categories</p>
            <div class="mt-3 flex flex-col gap-3">
              <a href="/flies/dry-flies" class="transition hover:text-stone-950">Dry Flies</a>
              <a href="/flies/nymphs" class="transition hover:text-stone-950">Nymphs</a>
              <a href="/flies/streamers" class="transition hover:text-stone-950">Streamers</a>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Contact</p>
            <a href="mailto:${supportEmail}" class="mt-3 inline-block font-medium text-stone-950 underline decoration-stone-300 underline-offset-4">${supportEmail}</a>
            <a href="/support.html" class="mt-2 block transition hover:text-stone-950">Support page</a>
            <p class="mt-3 leading-6">Blue Wing Labs is a product operated by Clarkii Outdoors LLC.</p>
          </div>
        </div>
      </footer>
    </div>`;
}

function renderPageBody(page) {
  if (page.type === "hub") {
    return pageShell(
      page,
      `
      <section class="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div class="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <p class="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Blue Wing Labs Learn</p>
          <h1 class="mt-5 max-w-[12ch] font-serif text-[3.1rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">Fly tying guides built to be read, searched, and reused.</h1>
          <p class="mt-6 max-w-[42rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">${escapeHtml(page.intro)}</p>
          <div class="mt-6 flex flex-wrap gap-3">${renderPills([`${appLibraryTotals.activeFlies} flies in the app`, `${page.featuredCategories.length} public categories`, `${page.featuredGuides.length}+ featured guides`, `${publicFlyRollout.publishedCount} source-backed fly pages live now`])}</div>
        </div>
      </section>
      <section class="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Browse the public fly categories first.</h2>
          <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            ${page.featuredCategories
              .map((category) => {
                const leadFly = category.flies.find((fly) => fly.image);

                return `
                <article class="rounded-[1.55rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">
                  ${renderFlyImage(leadFly, "h-36")}
                  <p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">${category.flyCount} featured flies</p>
                  <h3 class="mt-3 text-xl font-semibold tracking-tight text-stone-950"><a href="/flies/${category.slug}">${escapeHtml(category.name)}</a></h3>
                  <p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(category.shortDescription)}</p>
                </article>`;
              })
              .join("")}
          </div>
        </div>
      </section>
      <section class="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Long-form pages for anglers, tiers, and AI retrieval.</h2>
          <div class="mt-10 grid gap-5 lg:grid-cols-2">${renderGuideCards(page.featuredGuides)}</div>
        </div>
      </section>
      <section class="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Quick answers about the knowledge hub.</h2>
          <div class="mt-10 grid gap-4">${renderFaq(page.faq)}</div>
        </div>
      </section>`,
    );
  }

  if (page.type === "category") {
    return pageShell(
      page,
      `
      <section class="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div class="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <p class="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Fly category</p>
          <h1 class="mt-5 max-w-[12ch] font-serif text-[3.1rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">${escapeHtml(page.category.name)}</h1>
          <p class="mt-6 max-w-[44rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">${escapeHtml(page.category.intro)}</p>
        </div>
      </section>
      <section class="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Featured ${escapeHtml(page.category.name.toLowerCase())} in the public hub.</h2>
          <ol class="mt-10 grid gap-5 md:grid-cols-2">${renderFlyCards(page.flies)}</ol>
        </div>
      </section>
      <section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Guides that connect to ${escapeHtml(page.category.name.toLowerCase())}.</h2>
          <div class="mt-10 grid gap-5 lg:grid-cols-2">${renderGuideCards(page.relatedGuides)}</div>
        </div>
      </section>
      <section class="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">${escapeHtml(page.category.name)} questions anglers ask most.</h2>
          <div class="mt-10 grid gap-4">${renderFaq(page.category.faq)}</div>
        </div>
      </section>`,
    );
  }

  if (page.type === "guide") {
    return pageShell(
      page,
      `
      <section class="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
        <div class="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
          <p class="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Guide</p>
          <h1 class="mt-5 max-w-[14ch] font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">${escapeHtml(page.guide.title)}</h1>
          <p class="mt-6 max-w-[46rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">${escapeHtml(page.guide.intro)}</p>
        </div>
      </section>
      <section class="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">How to use this guide well.</h2>
          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <article class="rounded-[1.3rem] border border-stone-900/8 bg-white/82 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]"><h3 class="text-base font-semibold text-stone-950">Clear box role</h3><p class="mt-2 text-sm leading-6 text-stone-700">Each fly here solves a recognizable job instead of only adding another name to memorize.</p></article>
            <article class="rounded-[1.3rem] border border-stone-900/8 bg-white/82 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]"><h3 class="text-base font-semibold text-stone-950">Repeatable use case</h3><p class="mt-2 text-sm leading-6 text-stone-700">The list favors patterns anglers can return to across real sessions, not one-off novelties.</p></article>
            <article class="rounded-[1.3rem] border border-stone-900/8 bg-white/82 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]"><h3 class="text-base font-semibold text-stone-950">Organized next step</h3><p class="mt-2 text-sm leading-6 text-stone-700">Every recommendation links to a fly page, category page, or related guide so the article behaves like a reference system.</p></article>
          </div>
        </div>
      </section>
      <section class="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">The flies that make this guide worth opening.</h2>
          <ol class="mt-10 grid gap-5 md:grid-cols-2">${renderFlyCards(page.entries)}</ol>
        </div>
      </section>
      <section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Keep moving through the knowledge graph.</h2>
          <div class="mt-10 grid gap-5 lg:grid-cols-2">${renderGuideCards(page.relatedGuides)}</div>
        </div>
      </section>
      <section class="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div class="mx-auto max-w-6xl">
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Short answers that make the guide more usable.</h2>
          <div class="mt-10 grid gap-4">${renderFaq(page.guide.faq)}</div>
        </div>
      </section>`,
    );
  }

  return pageShell(
    page,
    `
    <section class="px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14">
      <div class="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p class="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">Fly pattern</p>
            <h1 class="mt-5 max-w-[12ch] font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-stone-950 sm:text-[4rem]">${escapeHtml(page.fly.name)}</h1>
            <p class="mt-6 max-w-[40rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">${escapeHtml(page.intro)}</p>
            ${page.supportLabel ? `<p class="mt-4 max-w-[38rem] text-sm font-medium uppercase tracking-[0.18em] text-emerald-900/78">${escapeHtml(page.supportLabel)}</p>` : ""}
            <div class="mt-6 flex flex-wrap gap-3">${renderPills([page.category.name, page.fly.difficulty, page.fly.sizeRange].filter(Boolean))}</div>
            ${page.learnBullets?.length ? `<div class="mt-6 grid gap-3 sm:grid-cols-2">${page.learnBullets
              .map(
                (bullet) => `<div class="rounded-[1.1rem] border border-stone-900/8 bg-[#f5f1e8] px-4 py-4 text-sm leading-6 text-stone-700">${escapeHtml(bullet)}</div>`,
              )
              .join("")}</div>` : ""}
          </div>
          <div class="rounded-[1.8rem] border border-stone-900/8 bg-[#f5f1e8] p-5">
            ${page.fly.image ? `<img src="${escapeHtml(page.fly.image)}" alt="${escapeHtml(`${page.fly.name} fly pattern`)}" class="h-56 w-full rounded-[1.4rem] object-cover" loading="eager" />` : ""}
          </div>
        </div>
      </div>
    </section>
    <section class="px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">${escapeHtml(page.fly.name)} in one organized view.</h2>
        <p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">This page is structured to stay useful as a real reference source: what the fly is, where it fits, what materials or steps are publicly available, why anglers keep it around, and where to go next in the Blue Wing Labs knowledge graph.</p>
      </div>
      <div class="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
        <article class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Why it matters</p><p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(page.fly.whyItMatters)}</p></article>
        <article class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">When to use it</p><p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(page.fly.whenToUse)}</p></article>
        <article class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Category</p><p class="mt-3 text-sm leading-7 text-stone-700"><a href="/flies/${page.category.slug}" class="font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4">${escapeHtml(page.category.name)}</a></p><div class="mt-4 flex flex-wrap gap-2">${[...page.fly.tags, ...(page.imitationTags || [])]
          .slice(0, 8)
          .map(
            (tag) => `<span class="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">${escapeHtml(tag.replace(/-/g, " "))}</span>`,
          )
          .join("")}</div></article>
      </div>
    </section>
    ${page.recipe ? `<section class="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">What the app keeps with ${escapeHtml(page.fly.name)}</h2><p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">This section brings over the same recipe-shape context the app uses: hook guidance, core material logic, substitutions, and tying-sequence checkpoints.</p><div class="mt-10 grid gap-5 lg:grid-cols-3">${renderTextPanels(
          [
            {
              eyebrow: "Hook",
              title: page.recipe.hook?.style || "Hook guidance",
              body: [page.recipe.hook?.model, page.recipe.hook?.sizeRange, page.recipe.hook?.notes].filter(Boolean).join(" • "),
            },
            {
              eyebrow: "Core materials",
              title: "What stays consistent",
              body: (page.recipe.coreMaterials || []).join(", "),
            },
            {
              eyebrow: "Substitutions",
              title: "Accepted swaps",
              body: page.recipe.acceptedSubstitutions?.length ? page.recipe.acceptedSubstitutions.join(", ") : "This public page does not list extra substitutions for this pattern yet.",
            },
          ],
        )}</div>${page.recipe.tyingSequence?.length || page.recipe.notes?.length ? `<div class="mt-8 grid gap-5 lg:grid-cols-2">${page.recipe.tyingSequence?.length ? renderTextPanels([{ eyebrow: "Sequence", title: "Canonical tying flow", body: page.recipe.tyingSequence.join(", ") }], "tint") : ""}${page.recipe.notes?.length ? renderTextPanels([{ eyebrow: "Recipe notes", title: "Additional notes", body: page.recipe.notes.join(" ") }], "tint") : ""}</div>` : ""}</div></section>` : ""}
    <section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">About ${escapeHtml(page.fly.name)}</h2>
        <p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">This section keeps the explanation practical and source-backed, using the structured library data plus broad category context without inventing unsupported technical detail.</p>
        <div class="mt-10 grid gap-5 lg:grid-cols-2">${renderTextPanels(
          page.aboutParagraphs.map((body, index) => ({
            eyebrow: index === 0 ? "Overview" : "Context",
            title: index === 0 ? `${page.fly.name} at a glance` : index === 1 ? "Box role" : "Pattern context",
            body,
          })),
        )}</div>
      </div>
    </section>
    <section class="bg-[#eef2e8] px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">When to use ${escapeHtml(page.fly.name)}</h2>
          <p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">The public site only states broad usage windows, but those windows still help anglers keep the fly in the right part of the mental and physical box.</p>
          <ol class="mt-10 grid gap-4">${renderBulletList(page.whenToUsePoints)}</ol>
        </div>
        <div>
          <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Why ${escapeHtml(page.fly.name)} works</h2>
          <p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">These points focus on the fly's role, visibility, versatility, and category logic rather than overly specific claims the public dataset does not support.</p>
          <div class="mt-8 max-w-[44rem]">${renderEducationalCallout(buildFlyEducationalCallouts(page).condition)}</div>
          ${page.appWhyItWorks ? `<div class="mt-10 grid gap-4">${page.imitationTags?.length ? `<div class="flex flex-wrap gap-2">${page.imitationTags
            .map(
              (tag) => `<span class="rounded-full border border-stone-900/8 bg-white/70 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stone-700">${escapeHtml(tag.replace(/-/g, " "))}</span>`,
            )
            .join("")}</div>` : ""}${renderTextPanels([
            { eyebrow: "Imitates", title: "What it represents", body: page.appWhyItWorks.imitates },
            { eyebrow: "Where it excels", title: "Best situations", body: page.appWhyItWorks.whereItExcels },
            { eyebrow: "Common mistakes", title: "What to watch for", body: page.appWhyItWorks.commonMistakes },
          ])}</div>` : `<ol class="mt-10 grid gap-4">${renderBulletList(page.whyItWorksPoints)}</ol>`}
        </div>
      </div>
    </section>
    ${page.videoUrl ? `<section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Watch ${escapeHtml(page.fly.name)} in motion</h2><p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">When the app includes a lesson video, the public page links to it directly so anglers can move from reference reading into step-by-step watching.</p><article class="mt-10 overflow-hidden rounded-[1.8rem] border border-stone-900/8 bg-white/82 shadow-[0_16px_40px_rgba(35,40,25,0.05)]">${page.videoThumbnail ? `<img src="${escapeHtml(page.videoThumbnail)}" alt="${escapeHtml(`${page.fly.name} video lesson thumbnail`)}" class="h-64 w-full object-cover" loading="lazy" />` : ""}<div class="p-6"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Blue Wing Labs lesson</p><h3 class="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Learn this pattern step by step</h3><p class="mt-3 max-w-[42rem] text-sm leading-7 text-stone-700">Open the linked lesson to compare the public recipe, the tying sequence, and the app's guided teaching flow for ${escapeHtml(page.fly.name)}.</p><a href="${escapeHtml(page.videoUrl)}" target="_blank" rel="noreferrer" class="mt-5 inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-stone-800">Watch the video lesson</a></div></article></div></section>` : ""}
    ${page.displayMaterials?.length ? `<section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Materials for ${escapeHtml(page.fly.name)}</h2><p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">These materials come from the app-backed fly record when available, which lets the public page mirror the practical tying list more closely.</p><div class="mt-8 max-w-[44rem]">${renderEducationalCallout(buildFlyEducationalCallouts(page).material)}</div><div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">${renderMaterialCards(page.displayMaterials)}</div></div></section>` : ""}
    ${page.displaySteps?.length ? `<section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">How to tie ${escapeHtml(page.fly.name)}</h2><p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">The website now uses the app-backed step list where available so the public page follows a fuller tying sequence instead of only a short summary.</p><div class="mt-8 max-w-[44rem]">${renderEducationalCallout(buildFlyEducationalCallouts(page).tying)}</div><ol class="mt-10 grid gap-4">${page.displaySteps
          .map((step, index) => `<li class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 px-5 py-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Step ${index + 1}</p><p class="mt-3 text-sm leading-7 text-stone-700">${escapeHtml(step)}</p></li>`)
          .join("")}</ol></div></section>` : ""}
    <section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Variations and similar patterns for ${escapeHtml(page.fly.name)}</h2>
        <p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">The public fly library does not invent named variations where the source data is thin. Instead, it connects this pattern to nearby flies so anglers can see the surrounding shape of the category.</p>
        <div class="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div class="grid gap-5">
            ${renderTextPanels([{ eyebrow: "Comparison note", title: "How to read this section", body: page.similarPatternsIntro }], "tint")}
            ${page.recipe?.variantNotes?.length ? page.recipe.variantNotes
              .map((note) => renderTextPanels([{ eyebrow: "Variant note", title: note.title, body: note.bullets.join(" ") }], "tint"))
              .join("") : ""}
          </div>
          <div class="grid gap-5">
            <ol class="grid gap-5 md:grid-cols-2">${renderFlyCards(page.relatedFlies)}</ol>
            ${page.recipe?.sourceLog?.length ? `<div class="rounded-[1.45rem] border border-stone-900/8 bg-white/82 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"><p class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Source notes</p><div class="mt-4 grid gap-3">${renderSourceLog(page.recipe.sourceLog)}</div></div>` : ""}
          </div>
        </div>
      </div>
    </section>
    <section class="px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div class="mx-auto max-w-6xl"><aside class="rounded-[1.8rem] border border-emerald-900/10 bg-[linear-gradient(135deg,#173126_0%,#1e3a2c_100%)] px-6 py-6 text-stone-50 shadow-[0_24px_60px_rgba(24,38,30,0.18)]"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-amber-200/85">Blue Wing Labs</p><h3 class="mt-4 max-w-[18ch] font-serif text-3xl leading-[0.98] tracking-[-0.04em]">Learn and organize this pattern in Blue Wing Labs.</h3><p class="mt-4 max-w-[38rem] text-base leading-7 text-stone-300">Use Blue Wing Labs to keep ${escapeHtml(page.fly.name)} connected to category pages, related guides, materials planning, and the calmer bench workflow the app is built around.</p><div class="mt-5 flex flex-col gap-3 sm:flex-row"><a href="${appStoreHref}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-stone-100">Download on the App Store</a><a href="/support.html" class="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-white/10">Support</a></div></aside></div></section>
    <section class="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">Related guides for ${escapeHtml(page.fly.name)}</h2><p class="mt-4 max-w-[42rem] text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">These guides connect the pattern back into broader beginner, trout, seasonal, and category-level decisions.</p><div class="mt-10 grid gap-5 lg:grid-cols-2">${renderGuideCards(page.relatedGuides)}</div></div></section>
    <section class="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24"><div class="mx-auto max-w-6xl"><h2 class="font-serif text-[2.35rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">${escapeHtml(page.fly.name)} questions that help AI and anglers alike.</h2><div class="mt-10 grid gap-4">${renderFaq(page.faq)}</div></div></section>`,
  );
}

function buildHtml(page, styles, scripts) {
  const metadata = getPageMetadata(page);
  const schemas = getPageSchemas(page)
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="theme-color" content="#13261c" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:type" content="${escapeHtml(metadata.type)}" />
    <meta property="og:url" content="${escapeHtml(metadata.canonical)}" />
    <meta property="og:image" content="${escapeHtml(metadata.ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <link rel="canonical" href="${escapeHtml(metadata.canonical)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    ${styles}
    ${schemas}
  </head>
  <body>
    <div id="root">${renderPageBody(page)}</div>
    ${scripts}
  </body>
</html>`;
}

function buildAppShellHtml(route, styles, scripts) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="theme-color" content="#13261c" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${escapeHtml(route.type)}" />
    <meta property="og:url" content="${escapeHtml(route.canonical)}" />
    <meta property="og:image" content="${escapeHtml(route.ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <link rel="canonical" href="${escapeHtml(route.canonical)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    ${styles}
  </head>
  <body>
    <div id="root"></div>
    ${scripts}
  </body>
</html>`;
}

async function main() {
  const indexHtml = await readFile(path.join(distDirectory, "index.html"), "utf8");
  const styles = [...indexHtml.matchAll(/<link[^>]+href="([^"]+\.css)"[^>]*>/g)].map((match) => `<link rel="stylesheet" crossorigin href="${match[1]}" />`).join("\n");
  const scripts = [...indexHtml.matchAll(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g)].map((match) => `<script type="module" crossorigin src="${match[1]}"></script>`).join("\n");
  const routes = getAllKnowledgeRoutes();
  const appShellRoutes = getAppShellRoutes().filter((route) => route.path !== "/");
  const staticSectionRoutes = ["/blue-wing-labs/support", "/blue-wing-labs/privacy", "/blue-wing-labs/terms"];

  for (const page of routes) {
    if (page.path === "/") {
      continue;
    }

    const pageDirectory = path.join(distDirectory, page.path.replace(/^\/+/, ""));
    await mkdir(pageDirectory, { recursive: true });
    await writeFile(path.join(pageDirectory, "index.html"), buildHtml(page, styles, scripts), "utf8");
  }

  for (const route of appShellRoutes) {
    const pageDirectory = path.join(distDirectory, route.path.replace(/^\/+/, ""));
    await mkdir(pageDirectory, { recursive: true });
    await writeFile(path.join(pageDirectory, "index.html"), buildAppShellHtml(route, styles, scripts), "utf8");
  }

  const sitemapEntries = ["/", ...appShellRoutes.filter((route) => route.includeInSitemap).map((route) => route.path), ...staticSectionRoutes, ...routes.map((page) => page.path)]
    .filter((value, index, items) => items.indexOf(value) === index)
    .map((pathname) => `<url><loc>${siteOrigin}${pathname}</loc></url>`)
    .join("");

  await writeFile(
    path.join(distDirectory, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
