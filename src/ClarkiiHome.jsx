import {
  blueWingHomeHref,
  homeHref,
  supportEmail,
} from "./siteRoutes";
import { useRouteHead } from "./routeHead";

const contactHref = `mailto:${supportEmail}`;
const instagramHref = "https://www.instagram.com/clarkii_outdoors?igsh=ajZiaG9kbHVvNGdl&utm_source=qr";

function SectionIntro({ eyebrow, title, body }) {
  return (
    <div className="max-w-[42rem]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-emerald-900">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-[2.45rem] leading-[0.98] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">{title}</h2>
      <p className="mt-4 text-[1rem] leading-7 text-stone-700 sm:text-[1.05rem] sm:leading-8">{body}</p>
    </div>
  );
}

export default function ClarkiiHome() {
  useRouteHead(homeHref);

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-stone-900">
      <a href="#main-content" className="sr-only absolute left-4 top-4 z-50 rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-stone-50 focus:not-sr-only">
        Skip to content
      </a>

      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(58,94,76,0.28),transparent_36%),linear-gradient(180deg,#e8efe7_0%,#f4f1e8_58%)]" />

      <header className="sticky top-0 z-30 border-b border-stone-900/8 bg-[#f4f1e8]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href={homeHref} className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-stone-900/8 bg-[#183227] text-xs font-semibold uppercase tracking-[0.22em] text-stone-50 shadow-[0_10px_28px_rgba(24,38,30,0.16)]">
              CO
            </div>
            <div>
              <p className="font-serif text-xl tracking-tight text-stone-950">Clarkii Outdoors</p>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-600">Parent brand for field-tested fishing tools</p>
            </div>
          </a>

          <nav aria-label="Clarkii" className="hidden items-center gap-7 text-sm text-stone-700 md:flex">
            <a href={homeHref} className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Home
            </a>
            <a href={blueWingHomeHref} className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Blue Wing Labs
            </a>
            <a href="#about-clarkii" className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              About Clarkii
            </a>
            <a href="#contact" className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="px-5 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-18">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-[36rem]">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-emerald-900">Clarkii Outdoors</p>
              <h1 className="mt-5 max-w-[11ch] font-serif text-[3.35rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4.4rem] lg:text-[5rem]">
                Practical tools for anglers and outdoor creators.
              </h1>
              <p className="mt-6 max-w-[34rem] text-[1.04rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">
                Clarkii Outdoors is the parent brand behind a growing lineup of simple, practical products for people who fish, tie, film, and build in the field.
              </p>
              <p className="mt-4 max-w-[32rem] text-[1rem] leading-7 text-stone-700">
                The mission is straightforward: build simple, practical tools for anglers and outdoor creators without the clutter, feature bloat, or fragile workflows that slow down real days outside.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={blueWingHomeHref} className="inline-flex items-center justify-center rounded-full bg-[#183227] px-6 py-3.5 text-sm font-semibold text-stone-50 shadow-[0_18px_40px_rgba(24,38,30,0.22)] transition hover:-translate-y-0.5 hover:bg-[#214031]">
                  Explore Blue Wing Labs
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-white">
                  Contact Clarkii
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-10 right-10 top-10 h-72 rounded-full bg-[radial-gradient(circle,rgba(83,120,105,0.22),transparent_70%)] blur-3xl" />
              <div className="relative grid gap-4 rounded-[2.4rem] border border-stone-900/8 bg-[linear-gradient(145deg,rgba(24,50,39,0.94),rgba(15,31,24,0.98))] p-5 shadow-[0_28px_75px_rgba(18,28,22,0.24)] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <div className="grid gap-4">
                  <div className="flex h-44 items-end rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,#314e3f_0%,#22382d_58%,#17271f_100%)] p-5 shadow-[0_18px_34px_rgba(10,16,12,0.24)]">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-200/90">Clarkii system</p>
                      <p className="mt-3 max-w-[14rem] font-serif text-3xl leading-[0.95] tracking-[-0.04em] text-stone-50">
                        Outdoor tools with cleaner workflows.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 text-stone-50">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-200/90">Field-tested</p>
                    <p className="mt-3 text-lg font-semibold tracking-tight">Built for real sessions, not polished mock workflows.</p>
                    <p className="mt-3 text-sm leading-6 text-stone-300">
                      Clarkii products are designed to stay useful on the water, at the bench, and back at camp.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4">
                  <div className="mx-auto grid w-full max-w-[22rem] gap-3 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,#f5f1e8_0%,#e8e0cf_100%)] p-5 text-stone-900 shadow-[0_24px_55px_rgba(10,16,12,0.24)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Clarkii roadmap</p>
                      <span className="rounded-full bg-[#183227] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-50">
                        Parent brand
                      </span>
                    </div>
                    <div className="rounded-[1.25rem] border border-stone-900/8 bg-white/75 p-4">
                      <p className="text-sm font-semibold text-stone-950">Blue Wing Labs</p>
                      <p className="mt-2 text-sm leading-6 text-stone-700">Fly tying companion app for organized recipes, materials, and bench workflow.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.15rem] bg-white/75 px-4 py-3">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Current focus</p>
                        <p className="mt-2 text-sm font-medium text-stone-900">Angler utility products</p>
                      </div>
                      <div className="rounded-[1.15rem] bg-white/75 px-4 py-3">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Next up</p>
                        <p className="mt-2 text-sm font-medium text-stone-900">More creator and outdoor tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-clarkii" className="px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {[
              ["Parent brand", "Clarkii Outdoors connects products, guides, and future outdoor tools under one practical identity."],
              ["Field-tested tone", "The brand stays grounded in real fishing and outdoor use cases: clean systems, durable decisions, and no extra noise."],
              ["Built for creators too", "Clarkii is also for outdoor creators who need simpler ways to organize knowledge, workflows, and useful product systems."],
            ].map(([title, body], index) => (
              <article key={title} className={`rounded-[1.7rem] border p-6 shadow-[0_16px_36px_rgba(35,40,25,0.05)] ${index === 1 ? "border-emerald-900/12 bg-[#e9f0e8]" : "border-stone-900/8 bg-white/82"}`}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Brand mission</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-700">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#e9efe6] px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="Featured Products"
              title="Tools coming together under the Clarkii Outdoors umbrella."
              body="Blue Wing Labs is the first live product inside the Clarkii ecosystem, with more outdoor and creator-focused tools planned next."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-[2rem] border border-stone-900/8 bg-white/84 p-6 shadow-[0_22px_50px_rgba(32,38,28,0.08)] sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                  <div className="rounded-[1.7rem] border border-stone-900/8 bg-[#f5f1e8] p-4">
                    <div className="mx-auto grid w-full max-w-[22rem] gap-3 rounded-[1.7rem] border border-stone-900/8 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Featured product</p>
                        <span className="rounded-full bg-[#183227] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-50">
                          Live now
                        </span>
                      </div>
                      <div className="rounded-[1.2rem] bg-[#eef2e8] px-4 py-4">
                        <p className="text-sm font-semibold text-stone-950">Blue Wing Labs</p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">Fly tying companion app</p>
                      </div>
                      <div className="grid gap-3">
                        {["Organized recipes", "Materials tracking", "Smarter bench workflow"].map((item) => (
                          <div key={item} className="rounded-[1rem] border border-stone-900/8 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-900">Featured app</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">Blue Wing Labs</h2>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Fly tying companion app</p>
                    <p className="mt-4 max-w-[34rem] text-base leading-7 text-stone-700">
                      A fly tying companion for anglers who want organized recipes, material tracking, and smarter time at the bench.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-600">
                      <span className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5">Fly recipes</span>
                      <span className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5">Materials tracking</span>
                      <span className="rounded-full border border-stone-900/8 bg-stone-50 px-3 py-1.5">Bench workflow</span>
                    </div>
                    <a href={blueWingHomeHref} className="mt-6 inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-stone-800">
                      Explore Blue Wing Labs
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-[2rem] border border-stone-900/8 bg-[linear-gradient(145deg,#1d3127_0%,#213b2f_100%)] p-6 text-stone-50 shadow-[0_22px_55px_rgba(24,38,30,0.22)] sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-200/90">Coming next</p>
                <h2 className="mt-4 max-w-[12ch] font-serif text-[2.6rem] leading-[0.95] tracking-[-0.04em]">Future Clarkii Outdoors products.</h2>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  Additional Clarkii apps and outdoor workflow tools are planned here. The next releases will follow the same practical standard: useful in the field, simple to navigate, and built to support anglers and outdoor creators without extra noise.
                </p>
                <div className="mt-6 grid gap-3">
                  {["Outdoor creator workflow tools", "Additional angler utility apps", "Practical field-tested releases"].map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/7 px-4 py-3 text-sm leading-6 text-stone-200">
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-stone-900/8 bg-[linear-gradient(135deg,#f6f2e8_0%,#e7ddc9_100%)] px-6 py-8 shadow-[0_28px_70px_rgba(35,40,25,0.1)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <SectionIntro
                eyebrow="Contact"
                title="Want to follow Clarkii Outdoors as new tools launch?"
                body="Email is the best place to reach Clarkii today for product questions, partnership conversations, or early interest in future outdoor tools."
              />

              <div className="rounded-[1.7rem] border border-stone-900/8 bg-white/80 p-6 shadow-[0_14px_36px_rgba(35,40,25,0.05)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Reach out</p>
                <a href={contactHref} className="mt-4 inline-block text-2xl font-semibold tracking-tight text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
                  {supportEmail}
                </a>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  Use this for Clarkii Outdoors inquiries, Blue Wing Labs product questions, or to stay close to future releases as the product lineup grows.
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  You can also follow Clarkii Outdoors on{" "}
                  <a
                    href={instagramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700"
                  >
                    Instagram
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={contactHref} className="inline-flex items-center justify-center rounded-full bg-[#183227] px-6 py-3.5 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-[#214031]">
                    Email Clarkii Outdoors
                  </a>
                  <a
                    href={instagramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-stone-50"
                  >
                    Follow on Instagram
                  </a>
                  <a href={blueWingHomeHref} className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-stone-50">
                    Visit Blue Wing Labs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
