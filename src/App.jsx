import { useRef, useState } from "react";
import ClarkiiHome from "./ClarkiiHome";
import KnowledgeRouter from "./KnowledgePages";
import { usePageAnimations } from "./lib/animations";
import EducationalCallout from "./components/EducationalCallout";
import { blueWingLabsCallouts } from "./data/educationalCallouts";
import {
  blueWingFeaturesHref,
  blueWingFlyLibraryHref,
  blueWingHomeHref,
  blueWingPrivacyPageHref,
  blueWingSupportPageHref,
  blueWingTermsPageHref,
  appStoreHref,
  homeHref,
  normalizePath,
  supportEmail,
} from "./siteRoutes";
import { useRouteHead, useSectionJump } from "./routeHead";

const downloadHref = appStoreHref;
const supportHref = `mailto:${supportEmail}`;
const supportLabel = supportEmail;
const supportPageHref = blueWingSupportPageHref;
const primaryCtaStyle = { color: "#ffffff", WebkitTextFillColor: "#ffffff" };
const libraryTotals = {
  activeFlies: 334,
  dryFlies: 54,
  nymphs: 42,
  streamers: 54,
  categories: 9,
};
const appBrandStatement = "Built to feel calm at the bench and useful on the water.";
const availabilityFacts = ["iPhone and iPad app", "Release updates by email", "Direct support from Blue Wing Labs"];
const workflowSnapshots = [
  {
    title: "Browse patterns without the usual clutter",
    body: "Start with organized categories and pattern pages instead of piecing the fly together from videos, screenshots, and saved tabs.",
  },
  {
    title: "Follow the tying flow at the bench",
    body: "Keep the recipe, materials, and steps close together so the app stays useful once the vise is loaded and tying has started.",
  },
  {
    title: "Come back later without starting over",
    body: "Return to saved and in-progress flies with the same structure still in place, so repeat tying feels easier and more dependable.",
  },
];

const conversionPoints = [
  "Download on the App Store",
  "Built for iPhone and iPad",
  "Direct support from Blue Wing Labs",
];
const footerStatus = [
  "Current status: iPhone and iPad app",
  "Requests handled directly by email",
  "Product screenshots reflect the current app",
];

const navLinks = [
  { label: "Home", href: blueWingHomeHref },
  { label: "Fly Library", href: blueWingFlyLibraryHref },
  { label: "What You Get", href: blueWingFeaturesHref },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why It Exists", href: "#why-this-app-exists" },
  { label: "Support", href: supportPageHref },
];

const knowledgeEntryCards = [
  {
    eyebrow: "Knowledge hub",
    title: "Browse the public Blue Wing Labs learning hub",
    body: "Start with structured fly-tying guides, category pages, and fly references built to be easy for anglers to read and easy to revisit later.",
    href: blueWingFlyLibraryHref,
    cta: "Open Fly Library",
  },
  {
    eyebrow: "Categories",
    title: "Explore organized fly categories",
    body: "Jump into dry flies, nymphs, streamers, emergers, terrestrials, wet flies, and euro nymphs without digging around the site.",
    href: "/flies/dry-flies",
    cta: "Browse Categories",
  },
  {
    eyebrow: "Guides",
    title: "Read practical fly pattern guides",
    body: "Open pages like Best Trout Flies, Best Dry Flies for Trout, and Best Beginner Fly Patterns to compare patterns faster.",
    href: "/guides/best-trout-flies",
    cta: "Read Guides",
  },
];

const knowledgeQuickLinks = [
  { label: "Best Trout Flies", href: "/guides/best-trout-flies" },
  { label: "Best Beginner Fly Patterns", href: "/guides/best-beginner-fly-patterns" },
  { label: "Dry Flies", href: "/flies/dry-flies" },
  { label: "Nymphs", href: "/flies/nymphs" },
  { label: "Parachute Adams", href: "/flies/parachute-adams" },
  { label: "Zebra Midge", href: "/flies/zebra-midge" },
];

const trustPoints = [`${libraryTotals.activeFlies} active flies`, "Guided tying steps", `${libraryTotals.categories} fly categories`];
const trustPointLabels = ["Library", "Steps", "Categories"];

const heroProof = [
  `${libraryTotals.activeFlies} active fly patterns`,
  "Step-by-step tying guides",
  "Materials tracking built in",
];

const featureCards = [
  {
    eyebrow: `${libraryTotals.activeFlies} active fly patterns`,
    title: "A real library you can actually work from",
    body: "Browse dry flies, nymphs, streamers, emergers, and more in a format that stays organized when you come back later.",
  },
  {
    eyebrow: "Step-by-step tying guides",
    title: "Clear instructions written for bench use",
    body: "Follow a sequence that is easy to scan mid-tie, without scrubbing back through a video to recover your place.",
  },
  {
    eyebrow: "Materials tracking",
    title: "Know what is on hand before you start",
    body: "Review hooks, thread, dubbing, hackle, and other recipe details alongside your materials workflow so prep feels easier.",
  },
  {
    eyebrow: "Bench workflow optimization",
    title: "Spend more time tying and less time reconstructing",
    body: "Blue Wing Labs reduces the tab-switching, screenshot-hunting, and note-matching that usually slows down a tying session.",
  },
];

const comparisonRows = [
  {
    title: "Less jumping between sources",
    oldWay: "Pause a YouTube video, check a screenshot, then reopen notes to confirm the next material.",
    newWay: "Keep the pattern, recipe, and steps together in one screen flow built for bench use.",
  },
  {
    title: "Better organization",
    oldWay: "Pattern details live across browser tabs, saved posts, photos, and half-finished notes.",
    newWay: "Blue Wing Labs keeps the fly name, recipe labels, and tying sequence in a dependable format.",
  },
  {
    title: "Easier repeat tying",
    oldWay: "A fly that made sense last month takes ten minutes to reconstruct when you sit down again.",
    newWay: "Return to the same pattern later and pick up the recipe quickly without starting over.",
  },
  {
    title: "More confidence at the bench",
    oldWay: "You second-guess the order, forget a material, or wonder whether the taper is right.",
    newWay: "Clear steps and cleaner pattern pages help you stay focused on the tie in front of you.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose a pattern",
    body: "Start with a fly like Parachute Adams, Zebra Midge, Blue Winged Olive, or Elk Hair Caddis and review the recipe before you begin.",
  },
  {
    step: "02",
    title: "Follow the steps",
    body: "Move through concise tying instructions that are easy to reference when your hands are full and the vise is already loaded.",
  },
  {
    step: "03",
    title: "Tie with confidence",
    body: "Stay organized through the session and return to the same pattern later without hunting for materials or rebuilding the sequence.",
  },
];

const audience = [
  "New fly tiers learning reliable patterns for the first time",
  "Anglers who want clearer instruction than scattered videos and notes",
  "Tiers building a more consistent bench workflow across sessions",
  "Anyone who wants recipe details, steps, and materials in one format",
];

const proofCards = [
  {
    heading: `${libraryTotals.activeFlies} active flies`,
    title: "A real pattern library, not a thin landing-page demo.",
    body: "Dry flies, nymphs, streamers, emergers, terrestrials, and more are already organized in a format that is easier to return to later.",
  },
  {
    heading: `${libraryTotals.categories} categories`,
    title: "Browsing stays cleaner when the library has structure.",
    body: "Pattern pages, recipe labels, and tying sequences stay consistent across the library, so users spend less time reconstructing information.",
  },
  {
    heading: "Bench-first use",
    title: "Made to stay useful once the vise is loaded.",
    body: "The app keeps materials, steps, and fly details in one dependable place so tying sessions feel calmer and easier to repeat.",
  },
];

const launchNotes = [
  {
    title: "Built from a real bench problem",
    body: "Blue Wing Labs exists because learning a fly often means bouncing between paused videos, screenshots, saved posts, and notes that stop being useful once tying actually starts.",
  },
  {
    title: "Shaped around the tying session",
    body: "The product keeps the fly image, recipe context, steps, and materials close together so the app still helps after the vise is loaded and your hands are busy.",
  },
  {
    title: "iPhone and iPad release path",
    body: "Blue Wing Labs is available for iPhone and iPad, with support and product updates handled directly through Blue Wing Labs.",
  },
];

const whyItExistsCards = [
  {
    eyebrow: "Built by an angler",
    title: "This started on a real bench, not in a marketing brainstorm.",
    body: "Blue Wing Labs was built by someone who actually ties flies and got tired of messy benches, scattered materials, and piecing patterns back together from too many different places.",
  },
  {
    eyebrow: "The frustration",
    title: "Most fly-tying guidance falls apart once tying actually starts.",
    body: "A pattern might make sense while you are browsing, but the moment the vise is loaded you are suddenly juggling videos, screenshots, notes, and half-remembered steps.",
  },
  {
    eyebrow: "The response",
    title: "So the app was designed to make tying feel calmer and more repeatable.",
    body: "Blue Wing Labs puts the fly image, recipe context, materials, and steps together so you can stay with the fly in front of you instead of rebuilding the process every time.",
  },
];

const faqItems = [
  {
    question: "What makes Blue Wing Labs different from YouTube or saved notes?",
    answer:
      "Blue Wing Labs is organized for tying, not passive watching. It keeps the fly, recipe, materials, and steps together so you do not have to reconstruct the pattern from multiple sources each time you sit down.",
  },
  {
    question: "What can I actually do inside the app?",
    answer:
      "You can browse flies, open a pattern page, review the recipe, follow tying steps, check materials, and keep track of flies you want to tie or return to later.",
  },
  {
    question: "Who is the app for?",
    answer:
      "It is built for anglers and fly tiers who want clearer instruction, better organization, and a calmer workflow at the bench, whether they are learning foundational flies or repeating familiar patterns.",
  },
  {
    question: "Does Blue Wing Labs include materials and fly pattern content?",
    answer:
      "Yes. The app is built around organized fly pattern content, including recipe context, materials, and guided tying steps for real flies in the library.",
  },
  {
    question: "How do I get access?",
    answer:
      "Blue Wing Labs is available on the App Store. Use the App Store link on this page, visit the support page, or email clarkiioutdoors@gmail.com if you have questions.",
  },
  {
    question: "What platforms are planned first?",
    answer:
      "Blue Wing Labs is built for iPhone and iPad. The website reflects the product direction and current app experience, while availability details are shared directly by Blue Wing Labs.",
  },
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Blue Wing Labs Home", href: blueWingHomeHref },
      { label: "Fly Library", href: blueWingFlyLibraryHref },
      { label: "What You Get", href: blueWingFeaturesHref },
      { label: "How it works", href: "#how-it-works" },
      { label: "Support", href: supportPageHref },
    ],
  },
  {
    title: "Fly Library",
    links: [
      { label: "Dry Flies", href: "/flies/dry-flies" },
      { label: "Nymphs", href: "/flies/nymphs" },
      { label: "Streamers", href: "/flies/streamers" },
      { label: "Best Trout Flies", href: "/guides/best-trout-flies" },
    ],
  },
  {
    title: "Blue Wing Labs",
    links: [
      { label: "Why It Exists", href: "#why-this-app-exists" },
      { label: "Who it's for", href: "#who-its-for" },
      { label: "App Store", href: downloadHref },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Support", href: supportPageHref },
      { label: "Privacy", href: blueWingPrivacyPageHref },
      { label: "Terms", href: blueWingTermsPageHref },
    ],
  },
];

const screenshotCards = [
  {
    variant: "detail",
    eyebrow: "Fly detail",
    title: "Open a real fly detail view while you tie",
    description: "The fly detail screen brings the pattern image, recipe snapshot, materials, tabs, and tying flow into one screen instead of splitting them across notes and videos.",
  },
  {
    variant: "my-flies",
    eyebrow: "My Flies",
    title: "Track saved, in-progress, and completed flies",
    description: "My Flies gives tiers a cleaner way to see what they are working on now, what they saved for later, and what they have already finished.",
  },
  {
    variant: "materials",
    eyebrow: "Materials",
    title: "Use the materials view to prep the bench",
    description: "The Materials tab helps users track inventory, see what they can tie, and stay organized before they sit down to work through a fly.",
  },
];

const patternMaterials = [
  ["Hook", "Dai-Riki 305, #16-24"],
  ["Thread", "Olive 6/0 or 140D"],
  ["Wing", "Two natural CDC feathers"],
  ["Hackle", "Dun dry-fly hackle"],
];

const tyingSteps = [
  "Start the thread just behind the eye and tie in the wing-post material at the front of the hook.",
  "Wrap tightly around the base of the post so it stands straight, narrow, and stable.",
  "Tie in the tail and dub a slim gray body below the post.",
  "Wrap the hackle parachute-style and finish below the post.",
];

const elkHairMaterials = [
  ["Hook", "TMC 100 or Daiichi 1180"],
  ["Thread", "Brown or olive 6/0-8/0"],
  ["Body", "Tan or olive superfine dubbing"],
  ["Wing", "Natural elk hair"],
];

function SectionHeading({ eyebrow, title, body, dark = false, center = false }) {
  return (
    <div data-motion="reveal" className={`max-w-[42rem] ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.32em] ${dark ? "text-amber-200/90" : "text-amber-800"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 max-w-[13ch] font-serif text-[2.1rem] leading-[1.01] tracking-[-0.04em] sm:text-[2.65rem] ${
          dark ? "text-stone-50" : "text-stone-950"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-5 max-w-[33rem] text-[1rem] leading-7 sm:text-[1.05rem] sm:leading-8 ${dark ? "text-stone-300" : "text-stone-700"}`}>
        {body}
      </p>
    </div>
  );
}

function AppScreenshot({ src, alt, className = "", priority = false }) {
  return (
    <div
      data-hover="lift"
      className={`mx-auto w-full max-w-[23rem] rounded-[2.35rem] border border-stone-900/10 bg-white/85 p-2 shadow-[0_28px_80px_rgba(21,27,19,0.16)] ${className}`}
    >
      <div className="overflow-hidden rounded-[2rem] bg-[#f7f3ea]">
        <img
          src={src}
          alt={alt}
          className="block h-auto w-full"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}

function LearnAppScreen({ className = "", priority = false }) {
  return <AppScreenshot src="/app-screens/learn-screen.png" alt="Blue Wing Labs Learn screen" className={className} priority={priority} />;
}

function DetailAppScreen({ className = "", priority = false }) {
  return <AppScreenshot src="/app-screens/detail-screen.png" alt="Blue Wing Labs fly detail screen" className={className} priority={priority} />;
}

function MyFliesAppScreen({ className = "" }) {
  return <AppScreenshot src="/app-screens/my-flies-screen.png" alt="Blue Wing Labs My Flies screen" className={className} />;
}

function MaterialsAppScreen({ className = "" }) {
  return <AppScreenshot src="/app-screens/materials-screen.png" alt="Blue Wing Labs Materials screen" className={className} />;
}

function AccessRequestForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    focus: "Product question or feedback",
    note: "",
  });

  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailIsValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFeedback("");

    const safeName = formState.name.trim();
    const safeEmail = formState.email.trim();
    const safeFocus = formState.focus.trim();
    const safeNote = formState.note.trim();
    const nextFieldErrors = {};

    if (!safeEmail) {
      nextFieldErrors.email = "Enter an email so Blue Wing Labs can follow up.";
    } else if (!emailIsValid(safeEmail)) {
      nextFieldErrors.email = "Enter a valid email address.";
    }

    if (safeName.length > 120) {
      nextFieldErrors.name = "Keep the name under 120 characters.";
    }

    if (safeNote.length > 1200) {
      nextFieldErrors.note = "Keep the note under 1200 characters.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setFieldErrors({});

      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          focus: safeFocus,
          note: safeNote,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to submit the request.");
      }

      setFormState({
        name: "",
        email: "",
        focus: "Product question or feedback",
        note: "",
      });
      setFeedback("Request received. Blue Wing Labs can now follow up by email.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-motion="reveal"
      className="rounded-[1.7rem] border border-stone-900/8 bg-white/82 p-6 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Contact</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Ask a question or get updates.</h3>
      <p className="mt-3 text-sm leading-6 text-stone-700">
        This form sends your note directly to Blue Wing Labs for support, product questions, feedback, or update requests.
      </p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5 text-[0.72rem] font-medium text-emerald-950">
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-emerald-900 text-[0.65rem] font-semibold text-emerald-50">
          OK
        </span>
        Replies are handled directly by Blue Wing Labs.
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-900">Name</span>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`rounded-[1rem] border px-4 py-3 text-sm text-stone-900 outline-none transition focus:bg-white ${
              fieldErrors.name ? "border-rose-300 bg-rose-50/70 focus:border-rose-400" : "border-stone-900/10 bg-stone-50 focus:border-stone-900/30"
            }`}
          />
          {fieldErrors.name ? <span className="text-xs font-medium text-rose-700">{fieldErrors.name}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-900">Email</span>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={`rounded-[1rem] border px-4 py-3 text-sm text-stone-900 outline-none transition focus:bg-white ${
              fieldErrors.email ? "border-rose-300 bg-rose-50/70 focus:border-rose-400" : "border-stone-900/10 bg-stone-50 focus:border-stone-900/30"
            }`}
          />
          {fieldErrors.email ? <span className="text-xs font-medium text-rose-700">{fieldErrors.email}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-900">What are you looking for?</span>
          <select
            name="focus"
            value={formState.focus}
            onChange={handleChange}
            className="rounded-[1rem] border border-stone-900/10 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900/30 focus:bg-white"
          >
            <option>Product question or feedback</option>
            <option>Release updates</option>
            <option>Support question</option>
          </select>
          <span className="text-xs text-stone-500">Choose the closest option and Blue Wing Labs can follow up directly.</span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-900">Note</span>
          <textarea
            name="note"
            value={formState.note}
            onChange={handleChange}
            placeholder="Tell Blue Wing Labs a little about how you tie or what you want to use the app for."
            rows={4}
            className={`resize-none rounded-[1rem] border px-4 py-3 text-sm leading-6 text-stone-900 outline-none transition focus:bg-white ${
              fieldErrors.note ? "border-rose-300 bg-rose-50/70 focus:border-rose-400" : "border-stone-900/10 bg-stone-50 focus:border-stone-900/30"
            }`}
          />
          <div className="flex items-center justify-between gap-3 text-xs text-stone-500">
            <span>Optional, but useful if you want a more relevant reply.</span>
            <span>{formState.note.length}/1200</span>
          </div>
          {fieldErrors.note ? <span className="text-xs font-medium text-rose-700">{fieldErrors.note}</span> : null}
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-stone-800"
          style={primaryCtaStyle}
        >
          {isSubmitting ? "Sending Request..." : "Send Request"}
        </button>
        <a
          href={supportHref}
          className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-white"
        >
          Email Support Directly
        </a>
      </div>

      <p className="mt-4 text-xs leading-5 text-stone-500">
        Blue Wing Labs follows up by email. No account is created on this website.
      </p>
      {feedback ? (
        <p className="mt-3 rounded-[1rem] border border-emerald-900/10 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900" aria-live="polite">
          {feedback}
        </p>
      ) : null}
      {error ? (
        <p className="mt-3 rounded-[1rem] border border-rose-900/10 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800" aria-live="polite">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function PhoneFrame({ children, className = "", compact = false }) {
  return (
    <div
      className={`relative mx-auto w-full border border-stone-900/10 bg-[#121713] shadow-[0_30px_90px_rgba(12,17,13,0.28)] ${
        compact ? "max-w-[17rem] rounded-[2.35rem] p-2.5" : "max-w-[23rem] rounded-[2.7rem] p-3"
      } ${className}`}
    >
      <div className={`absolute inset-x-0 top-0 flex justify-center ${compact ? "pt-2" : "pt-2.5"}`}>
        <div className={`${compact ? "h-5 w-24" : "h-6 w-28"} rounded-full bg-[#0c110d]`} />
      </div>
      <div
        className={`overflow-hidden bg-[linear-gradient(180deg,#162119_0%,#0f1712_100%)] ${
          compact ? "rounded-[1.85rem] pt-7" : "rounded-[2.15rem] pt-8"
        }`}
      >
        <div
          className={`flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-stone-400 ${
            compact ? "px-3.5 pb-2 text-[0.56rem]" : "px-4 pb-2 text-[0.62rem]"
          }`}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
            <span className="rounded-full border border-stone-500 px-1.5 py-0.5 text-[0.52rem] leading-none text-stone-300">
              94%
            </span>
          </div>
        </div>
        {children}
        <div className={`border-t border-white/8 ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}>
          <div
            className={`grid grid-cols-4 gap-2 text-center uppercase tracking-[0.16em] text-stone-500 ${
              compact ? "text-[0.52rem]" : "text-[0.58rem]"
            }`}
          >
            <span className="rounded-full bg-white/6 px-2 py-1 text-stone-200">Library</span>
            <span className="px-2 py-1">Materials</span>
            <span className="px-2 py-1">Steps</span>
            <span className="px-2 py-1">Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenShell({ title, subtitle, children, compact = false }) {
  return (
    <div className={compact ? "px-3 pb-3" : "px-4 pb-4"}>
      <div className={`flex items-center justify-between border-b border-white/8 ${compact ? "pb-2.5" : "pb-3"}`}>
        <div>
          <p className={`font-semibold uppercase tracking-[0.22em] text-stone-400 ${compact ? "text-[0.58rem]" : "text-[0.68rem]"}`}>
            {subtitle}
          </p>
          <p className={`mt-1 font-semibold tracking-[-0.01em] text-stone-100 ${compact ? "text-[0.86rem]" : "text-[0.95rem]"}`}>
            {title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border border-white/8 bg-white/6 uppercase tracking-[0.18em] text-stone-300 ${
              compact ? "px-2.5 py-1 text-[0.56rem]" : "px-3 py-1 text-[0.65rem]"
            }`}
          >
            Blue Wing Labs
          </span>
          <span
            className={`inline-flex items-center justify-center rounded-full bg-white/6 text-stone-300 ${
              compact ? "size-6 text-sm" : "size-7"
            }`}
          >
            +
          </span>
        </div>
      </div>
      <div className={compact ? "mt-3" : "mt-4"}>{children}</div>
    </div>
  );
}

function LibraryScreen() {
  return (
    <PhoneFrame>
      <ScreenShell title="Fly Patterns" subtitle="Browse">
        <div className="rounded-[1.35rem] bg-white/6 p-3">
          <div className="rounded-2xl border border-white/8 bg-[#111814] px-3 py-2.5 text-sm text-stone-400">
            Search patterns, rivers, or hatches
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#f8f1e6] px-3 py-2.5 text-stone-900">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">{libraryTotals.activeFlies} active flies</p>
              <p className="mt-1 text-sm font-semibold">Recently tied: Parachute Adams</p>
            </div>
            <span className="rounded-full bg-stone-900 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-stone-50">
              Resume
            </span>
          </div>
          <div className="flex gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-stone-300">
            <span className="rounded-full bg-emerald-900/70 px-2.5 py-1 text-emerald-50">Dry Flies {libraryTotals.dryFlies}</span>
            <span className="rounded-full border border-white/8 px-2.5 py-1">Nymphs {libraryTotals.nymphs}</span>
            <span className="rounded-full border border-white/8 px-2.5 py-1">Streamers {libraryTotals.streamers}</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Parachute Adams", "Attractor", "#10-20", "10 steps"],
              ["Blue Winged Olive", "Dry fly", "#16-24", "10 steps"],
              ["Elk Hair Caddis", "Dry fly", "#12-16", "10 steps"],
              ["Zebra Midge", "Nymph", "#16-22", "10 steps"],
            ].map(([name, type, size, steps]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl bg-[#f7f1e7] px-3 py-3 text-stone-900">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{name}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-stone-500">
                    <span>{type}</span>
                    <span>{steps}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500">Typical size</p>
                  <p className="mt-1 text-sm font-medium">{size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  );
}

function PatternScreen({ compact = false, className = "" }) {
  return (
    <PhoneFrame compact={compact} className={className}>
      <ScreenShell title="Blue Winged Olive" subtitle="Pattern detail" compact={compact}>
        <div className="rounded-[1.45rem] bg-[#f5efe4] p-3 text-stone-900">
          <div className="rounded-[1.1rem] bg-[linear-gradient(135deg,#efe0c5_0%,#dfe8d8_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-900/70">Dry fly</p>
                <p className="mt-1 text-lg font-semibold">Blue Winged Olive</p>
              </div>
              <span className="rounded-full bg-stone-900 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-stone-50">
                #16-24
              </span>
            </div>
            <img
              src="/app-assets/blue-winged-olive.jpg"
              alt="Blue Winged Olive fly pattern"
              className="mt-4 h-28 w-full rounded-[1rem] object-cover"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
            <span className="rounded-full bg-white px-2.5 py-1">Baetis</span>
            <span className="rounded-full bg-white px-2.5 py-1">10 steps</span>
            <span className="rounded-full bg-white px-2.5 py-1">Beginner</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {patternMaterials.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white px-3 py-3 shadow-sm shadow-stone-900/5">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">{label}</p>
                <p className="mt-1 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-white px-3 py-3 shadow-sm shadow-stone-900/5">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">Notes</p>
            <p className="mt-1 text-sm leading-6 text-stone-700">
              A dependable first baetis dry with a CDC wing, sparse olive body, and calmer proportions for technical water.
            </p>
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  );
}

function StepsScreen({ compact = false, className = "" }) {
  return (
    <PhoneFrame compact={compact} className={className}>
      <ScreenShell title="Parachute Adams" subtitle="Tying steps" compact={compact}>
        <div className={compact ? "space-y-2.5" : "space-y-3"}>
          {tyingSteps.map((step, index) => (
            <div
              key={step}
              className={`rounded-2xl border ${
                compact ? "px-2.5 py-2.5" : "px-3 py-3"
              } ${
                index === 2 ? "border-amber-300/70 bg-[#f7e7c5] text-stone-900" : "border-white/8 bg-white/6 text-stone-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    index === 2 ? "bg-stone-900 text-stone-50" : "bg-white/10 text-stone-200"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className={`uppercase tracking-[0.18em] text-stone-400 ${compact ? "text-[0.65rem]" : "text-xs"}`}>Step {index + 1}</p>
                  <p className={`mt-1 ${compact ? "text-[0.82rem] leading-5" : "text-sm leading-6"}`}>{step}</p>
                </div>
              </div>
            </div>
          ))}
          <div
            className={`flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 text-stone-300 ${
              compact ? "px-2.5 py-2.5" : "px-3 py-3"
            }`}
          >
            <p className={compact ? "text-[0.82rem]" : "text-sm"}>Progress</p>
            <div className="flex items-center gap-3">
              <div className={`h-2 overflow-hidden rounded-full bg-white/10 ${compact ? "w-20" : "w-28"}`}>
                <div className="h-full w-2/3 rounded-full bg-amber-200" />
              </div>
              <span className="text-xs uppercase tracking-[0.18em]">4 of 6</span>
            </div>
          </div>
          <div className={`rounded-2xl bg-[#f7f1e7] text-stone-900 ${compact ? "px-2.5 py-2.5" : "px-3 py-3"}`}>
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">Next</p>
            <p className={`mt-1 font-medium ${compact ? "text-[0.82rem] leading-5" : "text-sm"}`}>
              Trim the post to a practical height so the fly stays visible and balanced.
            </p>
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  );
}

function MaterialsScreen({ compact = false, className = "" }) {
  return (
    <PhoneFrame compact={compact} className={className}>
      <ScreenShell title="Elk Hair Caddis" subtitle="Materials" compact={compact}>
        <div className={`rounded-[1.3rem] bg-white/6 ${compact ? "p-2.5" : "p-3"}`}>
          <img
            src="/app-assets/elk-hair-caddis.jpg"
            alt="Elk Hair Caddis fly pattern"
            className={`${compact ? "h-24" : "h-26"} w-full rounded-2xl object-cover`}
          />
          <div className={`rounded-2xl bg-[#f8f3eb] text-stone-900 ${compact ? "mt-2.5 px-2.5 py-2.5" : "mt-3 px-3 py-3"}`}>
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">Bench checklist</p>
            <p className={`mt-1 font-medium ${compact ? "text-[0.82rem] leading-5" : "text-sm"}`}>Classic Troth-style adult caddis recipe.</p>
          </div>
          <div
            className={`flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 text-stone-300 ${
              compact ? "mt-2.5 px-2.5 py-2.5" : "mt-3 px-3 py-2.5"
            }`}
          >
            <p className={compact ? "text-[0.82rem]" : "text-sm"}>4 of 4 materials ready</p>
            <span className="rounded-full bg-emerald-900/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-emerald-50">
              Bench set
            </span>
          </div>
          <div className={compact ? "mt-2.5 space-y-2.5" : "mt-3 space-y-3"}>
            {(compact ? elkHairMaterials.slice(0, 3) : elkHairMaterials).map(([label, value]) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-2xl bg-white text-stone-900 shadow-sm shadow-stone-900/5 ${
                  compact ? "px-2.5 py-2.5" : "px-3 py-3"
                }`}
              >
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">{label}</p>
                  <p className={`mt-1 font-medium ${compact ? "text-[0.82rem] leading-5" : "text-sm"}`}>{value}</p>
                </div>
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-emerald-50">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScreenShell>
    </PhoneFrame>
  );
}

function HeroVisual() {
  return (
    <div data-motion="bwl-hero-visual" className="relative mx-auto w-full max-w-[43rem]">
      <div className="absolute left-10 right-10 top-10 h-72 rounded-full bg-[radial-gradient(circle,rgba(121,146,97,0.32),transparent_68%)] blur-3xl" />
      <div className="absolute inset-x-8 top-8 h-[30rem] rounded-[2.6rem] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
      <div className="relative mx-auto min-h-[35rem] w-full max-w-[41rem] sm:min-h-[39rem] lg:min-h-[42rem]">
        <div data-motion-item className="relative z-20 mx-auto max-w-[21.75rem] sm:max-w-[24.5rem]">
          <DetailAppScreen priority />
        </div>
        <div data-motion-item className="absolute left-2 top-[4.6rem] z-10 hidden md:block lg:left-0">
          <MyFliesAppScreen className="max-w-[12.4rem] origin-top-left rotate-[-4deg] opacity-92 shadow-[0_26px_75px_rgba(12,17,13,0.13)]" />
        </div>
        <div data-motion-item className="absolute right-2 top-[3.5rem] z-10 hidden xl:block lg:right-0">
          <MaterialsAppScreen className="max-w-[12.55rem] origin-top-right rotate-[3deg] opacity-90 shadow-[0_26px_75px_rgba(12,17,13,0.13)]" />
        </div>
        <div data-motion-item className="absolute inset-x-0 bottom-2 z-30 mx-auto hidden max-w-[18rem] rounded-full border border-stone-900/8 bg-white/88 px-4 py-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-600 shadow-[0_14px_30px_rgba(26,31,21,0.08)] backdrop-blur sm:block">
          Actual screens from the current Blue Wing Labs app
        </div>
      </div>
    </div>
  );
}

function BlueWingLabsHome({ focusSection = false }) {
  const pageRef = useRef(null);
  useRouteHead(focusSection ? blueWingFeaturesHref : blueWingHomeHref);
  useSectionJump(focusSection ? "features" : "");
  usePageAnimations(
    pageRef,
    {
      heroSequence: [
        '[data-motion="bwl-eyebrow"]',
        '[data-motion="bwl-title"]',
        '[data-motion="bwl-copy"]',
        '[data-motion="bwl-cta"]',
        '[data-motion="bwl-proof"]',
        '[data-motion="bwl-hero-visual"] [data-motion-item]',
      ],
    },
    [],
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f5f1e8] text-stone-900">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-50 rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-stone-50 focus:not-sr-only"
      >
        Skip to content
      </a>

      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(112,140,93,0.2),transparent_36%),linear-gradient(180deg,#edf1e6_0%,#f5f1e8_58%)]" />

      <header className="sticky top-0 z-30 border-b border-stone-900/8 bg-[#f5f1e8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <div>
            <a href={homeHref} className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-stone-600 transition hover:text-stone-950">
              Back to Clarkii Outdoors
            </a>
            <a href={blueWingHomeHref} className="mt-2 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-stone-900/8 bg-white p-1 shadow-[0_8px_20px_rgba(18,21,17,0.08)]">
                <img
                  src="/brand/blue-winged-olive-icon.png"
                  alt="Blue Wing Labs icon"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-xl tracking-tight text-stone-950">Blue Wing Labs</p>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-600">Fly tying companion</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-stone-700 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="motion-nav-link rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-stone-950"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={downloadHref}
              target="_blank"
              rel="noreferrer"
              data-hover="lift"
              className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-stone-950 px-4 py-2.5 text-sm font-semibold shadow-[0_10px_28px_rgba(18,21,17,0.16)] transition hover:-translate-y-0.5 hover:bg-stone-800"
              style={primaryCtaStyle}
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <div id="top" />

        <section className="px-5 pb-12 pt-14 sm:px-6 sm:pt-18 lg:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-[35rem]">
              <p data-motion="bwl-eyebrow" className="text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-amber-800">
                A CALMER WAY TO LEARN, TIE, AND TRUST YOUR FLIES
              </p>
              <h1 data-motion="bwl-title" className="mt-5 max-w-[10ch] font-serif text-[3.3rem] leading-[0.92] tracking-[-0.05em] text-stone-950 sm:text-[4.35rem] lg:text-[4.9rem]">
                Master fly tying. Build better flies. Fish with confidence.
              </h1>
              <p data-motion="bwl-copy" className="mt-6 max-w-[28rem] text-[1.02rem] leading-7 text-stone-700 sm:text-[1.1rem] sm:leading-8">
                Blue Wing Labs helps you move from scattered videos, screenshots, and half-saved notes to a cleaner tying
                process you can trust, so each session feels easier to follow, easier to repeat, and more likely to
                produce flies you are proud to fish.
              </p>

              <div data-motion="bwl-cta" className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  data-hover="lift"
                  className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold shadow-[0_16px_36px_rgba(16,20,15,0.2)] transition hover:-translate-y-0.5 hover:bg-stone-800"
                  style={primaryCtaStyle}
                >
                  Download on the App Store
                </a>
                <a
                  href={blueWingFlyLibraryHref}
                  data-hover="lift"
                  className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore Fly Guides
                </a>
              </div>

              <div data-motion="bwl-proof" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-stone-600">
                {heroProof.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-800/70" />
                    {item}
                  </span>
                ))}
              </div>

              <div data-motion="bwl-proof" className="mt-5 max-w-[31rem] rounded-[1.35rem] border border-stone-900/8 bg-white/70 px-4 py-3 shadow-[0_12px_28px_rgba(31,36,24,0.04)]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stone-600">
                  {availabilityFacts.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-900/70" />
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-700">
                  Questions about Blue Wing Labs? Reach out at{" "}
                  <a href={supportHref} className="font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700">
                    {supportLabel}
                  </a>
                  .
                </p>
              </div>
              <p className="mt-4 text-sm font-medium text-stone-600">iPhone and iPad release. Product replies are handled directly by Blue Wing Labs.</p>
            </div>

            <div className="pt-2 lg:pl-8">
              <HeroVisual />
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 sm:px-6 lg:px-8 lg:pb-18">
          <div data-motion-group="trust-points" className="mx-auto grid max-w-6xl gap-3 rounded-[1.9rem] border border-stone-900/8 bg-white/72 p-4 shadow-[0_18px_40px_rgba(30,36,26,0.05)] sm:grid-cols-3 sm:p-5">
            {trustPoints.map((point, index) => (
              <div
                key={point}
                data-motion-item
                className={`flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 ${
                  index === 1 ? "border-emerald-900/10 bg-[#edf4ea]" : "border-stone-900/6 bg-stone-50/90"
                }`}
              >
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">{trustPointLabels[index]}</p>
                  <p className="mt-1 text-sm font-medium text-stone-800">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-18 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 p-6 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <SectionHeading
                eyebrow="Learn"
                title="The fly pages are live. Now they are visible too."
                body="Blue Wing Labs includes a public learning hub with guides, category pages, and individual fly references. If you want to browse the fly content directly from the website, start here."
              />

              <div data-motion-group="learn-cards" className="grid gap-5 lg:grid-cols-3">
                {knowledgeEntryCards.map((card, index) => (
                  <article
                    key={card.title}
                    data-motion-item
                    data-hover="lift"
                    className={`rounded-[1.6rem] border p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)] ${
                      index === 0 ? "border-emerald-900/10 bg-[#eef5ea]" : "border-stone-900/8 bg-[#f7f3ea]"
                    }`}
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">{card.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{card.body}</p>
                    <a
                      href={card.href}
                      className="mt-5 inline-flex text-sm font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700"
                    >
                      {card.cta}
                    </a>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-stone-900/8 bg-[#fbf8f2] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">Quick links</p>
                  <p className="mt-2 max-w-[42rem] text-sm leading-6 text-stone-700">
                    Use these direct links to jump straight into the new public fly content instead of hunting for the routes manually.
                  </p>
                </div>
                <a
                  href={blueWingFlyLibraryHref}
                  data-hover="lift"
                  className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(18,21,17,0.14)] transition hover:-translate-y-0.5 hover:bg-stone-800"
                  style={primaryCtaStyle}
                >
                  Open the Fly Library
                </a>
              </div>

              <div data-motion-group="quick-links" className="mt-5 flex flex-wrap gap-3">
                {knowledgeQuickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-motion-item
                    data-hover="lift"
                    className="rounded-full border border-stone-900/8 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-stone-900/16 hover:bg-stone-50 hover:text-stone-950"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="what-it-is" className="bg-[#fbf8f2] px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/78 p-6 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <SectionHeading
                eyebrow="What the app is"
                title="Blue Wing Labs is a fly tying companion, built for real use at the bench."
                body="It gives anglers a focused way to study and tie a fly without piecing the process together from multiple sources. Pattern details, materials, and tying steps live in a cleaner format that stays useful across repeat sessions."
              />

              <div data-motion-group="what-it-is-cards" className="grid gap-4 sm:grid-cols-2">
                {[
                  ["What it is", `A mobile app for learning fly patterns, checking materials, and following tying steps across ${libraryTotals.activeFlies} active flies.`],
                  ["Who it is for", "Fly tiers who want clearer instruction, cleaner organization, and less friction once the vise is already loaded."],
                  ["What users do", "Choose a fly, review the recipe, work through the sequence, and return to the same pattern later without rebuilding it."],
                  ["Why it matters", "Because a useful tying reference should help in the moment, not just send you back into more tabs and saved screenshots."],
                ].map(([title, body]) => (
                  <article key={title} data-motion-item data-hover="lift" className="rounded-[1.55rem] bg-stone-50 p-5 ring-1 ring-stone-900/6">
                    <h3 className="text-base font-semibold text-stone-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-stone-700">{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div data-motion-group="proof-cards" className="mt-8 grid gap-4 lg:grid-cols-3">
              {proofCards.map((card, index) => (
                <article
                  key={card.title}
                  data-motion-item
                  data-hover="lift"
                  className={`rounded-[1.5rem] border p-5 shadow-[0_14px_30px_rgba(35,40,25,0.04)] ${
                    index === 1
                      ? "border-emerald-900/10 bg-[#edf4ea]"
                      : index === 2
                        ? "border-stone-900/10 bg-white"
                        : "border-stone-900/8 bg-[#f6f1e8]"
                  }`}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">{card.heading}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-stone-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{card.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 border-t border-stone-900/8 pt-8">
              <div data-motion="reveal" className="max-w-[42rem]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-amber-800">Outdoor intelligence</p>
                <h3 className="mt-4 max-w-[18ch] font-serif text-[2rem] leading-[1.02] tracking-[-0.04em] text-stone-950 sm:text-[2.45rem]">
                  Short insights that make the app feel more useful before the next cast.
                </h3>
                <p className="mt-4 max-w-[38rem] text-sm leading-7 text-stone-700 sm:text-[0.98rem]">
                  These callouts keep the educational side of Blue Wing Labs close to the product story: cleaner pattern logic, calmer material prep, and better decisions once fish position starts changing.
                </p>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {blueWingLabsCallouts.map((callout) => (
                  <EducationalCallout key={callout.title} {...callout} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="How it works"
              title="A simple flow that stays useful from the first look to the finished fly."
              body="Blue Wing Labs keeps the product experience straightforward: choose a pattern, follow the sequence, and tie with fewer interruptions."
            />

            <div data-motion-group="how-it-works" className="mt-10 grid gap-5 lg:grid-cols-3">
              {howItWorks.map((item) => (
                <article
                  key={item.step}
                  data-motion-item
                  data-hover="lift"
                  className="rounded-[1.8rem] border border-stone-900/8 bg-white/72 p-6 shadow-[0_18px_45px_rgba(32,38,28,0.05)]"
                >
                  <div className="inline-flex rounded-full border border-amber-700/20 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                    {item.step}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#eff2e7] px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What You Get"
              title="Everything you need to go from saved idea to finished fly."
              body="Blue Wing Labs brings together the parts of fly tying that usually get scattered across videos, screenshots, browser tabs, and bench notes."
            />

            <div data-motion-group="feature-cards" className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature, index) => (
                <article
                  key={feature.title}
                  data-motion-item
                  data-hover="lift"
                  className={`rounded-[1.75rem] border p-6 shadow-[0_18px_42px_rgba(32,38,28,0.06)] ${
                    index === 0 || index === 3 ? "border-stone-900/8 bg-white/84" : "border-emerald-900/10 bg-[#f4f7ef]"
                  }`}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">{feature.eyebrow}</p>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-stone-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div data-motion="reveal" className="mx-auto max-w-6xl rounded-[2rem] border border-emerald-900/10 bg-[linear-gradient(135deg,#173126_0%,#1e3a2c_100%)] px-6 py-8 text-stone-50 shadow-[0_24px_60px_rgba(24,38,30,0.18)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-amber-200/85">Now on the App Store</p>
                <h2 className="mt-4 max-w-[14ch] font-serif text-3xl leading-[0.98] tracking-[-0.04em] text-stone-50 sm:text-[3.35rem]">
                  Want the calmer version of fly tying in your pocket?
                </h2>
                <p className="mt-4 max-w-[40rem] text-base leading-7 text-stone-300 sm:text-lg sm:leading-8">
                  Download Blue Wing Labs from the App Store and keep the calmer version of fly tying close at the bench.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-stone-200">
                  {conversionPoints.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                      <span className="size-1.5 rounded-full bg-amber-200/90" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  data-hover="lift"
                  className="inline-flex items-center justify-center rounded-full border border-red-200/55 bg-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(16,20,15,0.24)] transition hover:-translate-y-0.5 hover:bg-red-400"
                >
                  Download on the App Store
                </a>
                <a
                  href="#screens"
                  data-hover="lift"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3.5 text-sm font-semibold text-stone-50 transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  See App Screens
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="why-this-app-exists" className="px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#17241d] px-6 py-8 text-stone-50 shadow-[0_28px_70px_rgba(17,24,18,0.22)] sm:px-8 lg:px-10 lg:py-10">
            <SectionHeading
              eyebrow="Why This App Exists"
              title="Built by an angler who was tired of messy benches, scattered materials, and fly patterns that fell apart mid-session."
              body="Blue Wing Labs exists because the problem was real: the hard part was never finding a fly, it was trusting the process once the vise was loaded and your hands were busy."
              dark
            />

            <div data-motion="reveal" className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-200/90">Founder Story</p>
              <p className="mt-3 max-w-[58rem] text-lg leading-8 text-stone-200">
                This app was shaped by someone who actually ties flies and wanted a better way to learn, organize, and repeat patterns without bouncing between paused videos, screenshots, and bench notes.
              </p>
            </div>

            <div data-motion-group="why-cards" className="mt-10 grid gap-4 lg:grid-cols-3">
              {whyItExistsCards.map((card, index) => (
                <article
                  key={card.title}
                  data-motion-item
                  data-hover="lift"
                  className={`rounded-[1.5rem] border p-5 ${
                    index === 1 ? "border-amber-200/14 bg-[#f4ead5] text-stone-900" : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${index === 1 ? "text-amber-900/70" : "text-amber-200/90"}`}>
                    {card.eyebrow}
                  </p>
                  <h3 className={`mt-3 text-xl font-semibold ${index === 1 ? "text-stone-950" : "text-stone-50"}`}>{card.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 1 ? "text-stone-800" : "text-stone-300"}`}>{card.body}</p>
                </article>
              ))}
            </div>

            <div data-motion="reveal" className="mt-8 rounded-[1.5rem] border border-amber-200/15 bg-[#f4ead5] px-5 py-5 text-stone-900">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-900/70">The Promise</p>
              <p className="mt-3 max-w-[56rem] text-lg leading-8">
                Blue Wing Labs exists to make fly tying feel more focused, more repeatable, and less chaotic once tying actually starts.
              </p>
            </div>
          </div>
        </section>

        <section id="screens" className="bg-[#fbf8f2] px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Product screens"
              title="A clearer look at how the app feels in use."
              body="These are actual screens from the current Blue Wing Labs app, shown here so the website reflects the product more honestly."
            />

            <div data-motion-group="screen-cards" className="mt-10 grid gap-8 lg:grid-cols-3">
              {screenshotCards.map((card) => (
                <article key={card.title} data-motion-item className="space-y-5">
                  {card.variant === "detail" ? <DetailAppScreen /> : null}
                  {card.variant === "my-flies" ? <MyFliesAppScreen /> : null}
                  {card.variant === "materials" ? <MaterialsAppScreen /> : null}
                  <div className="px-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-800">{card.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-semibold text-stone-950">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="who-its-for" className="px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Who it's for"
              title="Built for anglers who want a cleaner tying reference and a more dependable bench workflow."
              body="Blue Wing Labs fits people who enjoy tying but want the reference side of the hobby to feel more organized, more repeatable, and easier to trust."
            />

            <div data-motion-group="audience-cards" className="grid gap-4">
              {audience.map((item) => (
                <div
                  key={item}
                  data-motion-item
                  data-hover="lift"
                  className="flex items-start gap-4 rounded-[1.4rem] border border-stone-900/8 bg-white/75 p-5 shadow-[0_14px_36px_rgba(35,40,25,0.05)]"
                >
                  <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-semibold text-emerald-50">
                    BW
                  </span>
                  <p className="text-base leading-7 text-stone-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef2e8] px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-900/8 bg-white/82 px-6 py-8 shadow-[0_20px_55px_rgba(32,38,28,0.06)] sm:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_0.68fr] lg:items-start">
              <SectionHeading
                eyebrow="Trust"
                title="Built to feel dependable when tying time is limited."
                body="This is not a generic fishing content site. Blue Wing Labs is a product focused on helping anglers keep pattern information organized and usable during real tying sessions."
              />

              <aside data-motion="reveal" data-hover="lift" className="rounded-[1.6rem] border border-emerald-900/10 bg-[#eef5ea] p-5 shadow-[0_14px_30px_rgba(35,40,25,0.05)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-900">Why It Lands</p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-stone-950">
                  The product promise is simple: useful at the bench, not just nice to look at on a landing page.
                </p>
                <div data-motion-group="trust-points-detail" className="mt-5 grid gap-3">
                  {[
                    `${libraryTotals.activeFlies} active flies already organized in the library`,
                    `${libraryTotals.categories} categories that keep patterns easier to browse and revisit`,
                    "Current screenshots reflect the app instead of placeholder marketing UI",
                  ].map((item) => (
                    <div key={item} data-motion-item className="flex items-start gap-3 rounded-[1.1rem] bg-white/75 px-4 py-3">
                      <span className="mt-1 inline-flex size-2.5 shrink-0 rounded-full bg-emerald-900" />
                      <p className="text-sm leading-6 text-stone-700">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div data-motion-group="launch-notes" className="mt-10 grid gap-5 lg:grid-cols-3">
              {launchNotes.map((note, index) => (
                <article
                  key={note.title}
                  data-motion-item
                  data-hover="lift"
                  className={`rounded-[1.55rem] border p-6 shadow-[0_14px_30px_rgba(35,40,25,0.04)] ${
                    index === 0
                      ? "border-emerald-950/12 bg-[#18261f] text-stone-50 lg:col-span-2"
                      : "border-stone-900/8 bg-[#f7f3ea]"
                  }`}
                >
                  <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${index === 0 ? "text-amber-200/90" : "text-amber-800"}`}>
                    {index === 0 ? "Signature proof" : "Product note"}
                  </p>
                  <h3 className={`mt-3 text-lg font-semibold tracking-tight ${index === 0 ? "text-stone-50" : "text-stone-950"}`}>{note.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 0 ? "max-w-[40rem] text-stone-300" : "text-stone-700"}`}>{note.body}</p>
                </article>
              ))}
            </div>

            <div data-motion-group="workflow-snapshots" className="mt-10 grid gap-4 border-t border-stone-900/8 pt-8 lg:grid-cols-3">
              {workflowSnapshots.map((item, index) => (
                <article key={item.title} data-motion-item data-hover="lift" className="rounded-[1.45rem] border border-stone-900/8 bg-white/78 p-5 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-900 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-50">
                      0{index + 1}
                    </span>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-800">Real workflow</p>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Clear answers for anglers deciding whether Blue Wing Labs fits their workflow."
              body="These are the practical questions most people ask when they compare Blue Wing Labs with videos, saved notes, or a scattered bench setup."
            />

            <div data-motion-group="faq-items" data-motion-stagger="70" className="mt-10 grid gap-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  data-motion-item
                  className="group rounded-[1.5rem] border border-stone-900/8 bg-white/78 p-5 shadow-[0_16px_40px_rgba(35,40,25,0.05)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold tracking-tight text-stone-950">
                    <span>{item.question}</span>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-900/8 bg-stone-50 text-stone-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[52rem] text-sm leading-7 text-stone-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="px-5 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-stone-900/8 bg-[linear-gradient(135deg,#f7f3ea_0%,#ece3d0_100%)] px-6 py-8 shadow-[0_28px_70px_rgba(35,40,25,0.1)] sm:px-8 lg:px-10 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div data-motion="reveal">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/74 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-emerald-950 shadow-[0_10px_24px_rgba(35,40,25,0.04)]">
                  Support
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-800">Questions And Updates</p>
                <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-stone-950 sm:text-4xl">
                  Need help or want product updates for Blue Wing Labs?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-800 sm:text-lg">
                  Blue Wing Labs helps you learn patterns, stay organized, and return to the bench with less friction. Use this form for support questions, feedback, or product update requests.
                </p>
                <div data-motion-group="access-trust-points" className="mt-5 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-600">
                  {trustPoints.map((point) => (
                    <span key={point} data-motion-item className="rounded-full border border-stone-900/8 bg-white/75 px-3 py-1.5">
                      {point}
                    </span>
                  ))}
                </div>
                <div data-motion-group="availability-cards" className="mt-6 grid gap-3 sm:grid-cols-3">
                  {availabilityFacts.map((item, index) => (
                    <div
                      key={item}
                      data-motion-item
                      data-hover="lift"
                      className={`rounded-[1.15rem] border px-4 py-3 text-sm font-medium shadow-[0_10px_24px_rgba(35,40,25,0.04)] ${
                        index === 0 ? "border-emerald-900/12 bg-[#eef5ea] text-stone-900" : "border-stone-900/8 bg-white/72 text-stone-800"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[34rem] text-sm leading-6 text-stone-700">
                  For install details, use the App Store button above. For questions, feedback, or product update requests, use this form.
                </p>
                <p className="mt-3 text-sm font-medium text-stone-600">Best for people who want a direct product reply from Blue Wing Labs.</p>
              </div>

              <div id="contact">
                <AccessRequestForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-900/8 bg-[linear-gradient(180deg,#f1ede3_0%,#ebe4d4_100%)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm text-stone-600 lg:grid-cols-[1.15fr_0.78fr_0.78fr_0.78fr_0.78fr_1fr]">
          <div>
            <p className="font-semibold text-stone-950">Blue Wing Labs</p>
            <p className="mt-2 max-w-[24rem] leading-6">A fly tying companion app for patterns, steps, and materials.</p>
            <p className="mt-2 max-w-[24rem] leading-6">{appBrandStatement}</p>
            <div className="mt-4 rounded-[1.2rem] border border-stone-900/8 bg-white/65 p-4 shadow-[0_12px_28px_rgba(35,40,25,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Product status</p>
              <div className="mt-3 flex flex-col gap-2">
                {footerStatus.map((item) => (
                  <p key={item} className="text-sm leading-6 text-stone-700">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{group.title}</p>
              <div className="mt-3 flex flex-col gap-3">
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="motion-nav-link transition hover:text-stone-950">
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Contact</p>
            <a href={homeHref} className="mt-3 block transition hover:text-stone-950">
              Clarkii Outdoors
            </a>
            <a
              href={supportHref}
              className="mt-3 inline-block font-medium text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-700"
            >
              {supportLabel}
            </a>
            <a href={supportPageHref} className="mt-2 block transition hover:text-stone-950">
              Support page
            </a>
            <p className="mt-3 leading-6">Built for anglers who want clearer instruction and a more organized bench workflow.</p>
            <p className="mt-2 leading-6">Blue Wing Labs is a product operated by Clarkii Outdoors LLC.</p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-stone-900/8 pt-4 text-sm text-stone-500">
          Copyright 2026 Clarkii Outdoors LLC
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const path = typeof window !== "undefined" ? normalizePath(window.location.pathname) : homeHref;

  if (path === blueWingHomeHref || path === blueWingFeaturesHref) {
    return <BlueWingLabsHome focusSection={path === blueWingFeaturesHref} />;
  }

  if (path === blueWingFlyLibraryHref) {
    return <KnowledgeRouter path="/learn" />;
  }

  if (path !== homeHref && path !== "/index.html") {
    return <KnowledgeRouter path={path} />;
  }

  return <ClarkiiHome />;
}
