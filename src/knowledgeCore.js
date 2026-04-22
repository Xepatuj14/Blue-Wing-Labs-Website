import { flyLibrary } from "./flyLibrary.js";
import { guideConfigs } from "./guideConfigs.js";

export const siteOrigin = "https://www.clarkiioutdoors.com";
export const siteName = "Blue Wing Labs";
export const supportEmail = "clarkiioutdoors@gmail.com";
export const supportPageHref = "/support.html";
export const appWaitlistHref = "/#access";
export const homeHref = "/";

export const appLibraryTotals = {
  activeFlies: 334,
  categories: 9,
};

export const knowledgeCategories = [
  {
    slug: "dry-flies",
    name: "Dry Flies",
    shortDescription: "Surface flies for mayflies, caddis, midges, and attractor moments.",
    intro:
      "Dry flies matter because they turn visible feeding into easier decisions. Blue Wing Labs keeps this category organized so anglers can compare surface patterns without losing the logic of the box.",
    longDescription:
      "A strong dry-fly box usually balances hatch-matching confidence with a few dependable generalists that stay visible, fish well, and remain easy to revisit later.",
    whenItShines: "Dry flies shine during rises, calmer lanes, and any session where presentation and visibility both matter.",
    faq: [
      {
        question: "What makes a dry fly worth carrying all season?",
        answer:
          "A strong dry-fly pattern usually offers visibility, a clear identity, and enough versatility to keep earning space outside of one narrow hatch.",
      },
      {
        question: "Are dry flies only for advanced anglers?",
        answer:
          "No. Many of the best dry flies stay useful because they are readable, repeatable, and easier to fish with confidence once you understand where they fit.",
      },
    ],
  },
  {
    slug: "nymphs",
    name: "Nymphs",
    shortDescription: "Subsurface patterns that anchor everyday trout boxes and most practical trout coverage.",
    intro:
      "Nymphs are the workhorses of many trout boxes. Blue Wing Labs uses this category to keep dependable subsurface patterns grouped so anglers can move from slim confidence flies to broader searching nymphs without rebuilding the logic every time.",
    longDescription:
      "Good nymph selections usually include compact technical flies, broader searching patterns, and a few classics that keep earning space because they remain easy to trust.",
    whenItShines: "Nymphs shine in runs, seams, colder conditions, and any session where trout are feeding below the surface.",
    faq: [
      {
        question: "Why are nymphs so important in a trout box?",
        answer:
          "They cover the subsurface feeding window anglers see most often, which makes them one of the most practical categories for building a reliable box.",
      },
      {
        question: "What kind of nymph selection stays useful?",
        answer:
          "A useful selection combines slim patterns, all-purpose searching flies, and a couple of easy-to-repeat classics instead of endless near-duplicates.",
      },
    ],
  },
  {
    slug: "streamers",
    name: "Streamers",
    shortDescription: "Movement-driven flies that add profile, range, and stronger decisions to the box.",
    intro:
      "Streamers give anglers a different toolset than dries or nymphs. Blue Wing Labs keeps larger movement-oriented flies organized so baitfish, sculpin, and all-purpose streamers are easier to compare and revisit.",
    longDescription:
      "A practical streamer selection usually includes a mix of all-purpose confidence flies, a few bigger-fish options, and enough variety to cover small streams, general trout water, and movement-driven sessions.",
    whenItShines: "Streamers shine when anglers want to cover water, move fish, or fish a stronger profile with intent.",
    faq: [
      {
        question: "Do streamers belong in every trout box?",
        answer:
          "For many anglers, yes. Even a small streamer row adds movement, profile, and a different decision point that complements dries and nymphs.",
      },
      {
        question: "What makes a streamer versatile?",
        answer:
          "Versatile streamers tend to hold a clear outline, cover more than one water type, and stay useful whether you are prospecting or searching for a stronger response.",
      },
    ],
  },
  {
    slug: "emergers",
    name: "Emergers",
    shortDescription: "Transition-zone patterns for trout feeding between classic nymphing and true surface fishing.",
    intro:
      "Emergers matter because many feeding fish are not fully committed to the top or the bottom. Blue Wing Labs keeps this category structured so the film-focused part of a hatch is easier to understand and easier to fish confidently.",
    longDescription:
      "Good emerger options often stay slim, restrained, and easy to rotate through when trout look selective but surface clues are still incomplete.",
    whenItShines: "Emergers shine during mixed rises, technical feeding, and any session where trout seem close to the film.",
    faq: [
      {
        question: "Why keep emergers separate from dry flies and nymphs?",
        answer:
          "Because they solve a different problem. Emergers help when fish are keyed on insects transitioning into the film instead of fully submerged nymphs or fully floating adults.",
      },
      {
        question: "Are emergers only for technical water?",
        answer:
          "They are especially useful there, but any time trout are feeding between levels, a few emergers can make a box more complete and easier to trust.",
      },
    ],
  },
  {
    slug: "terrestrials",
    name: "Terrestrials",
    shortDescription: "Visible summer patterns that keep hopper, ant, beetle, and foam-fly logic easy to manage.",
    intro:
      "Terrestrials earn their place because they are practical, visible, and often easier to fish with confidence than tiny hatch-matching patterns. Blue Wing Labs keeps them grouped so summer confidence flies stay simple and accessible.",
    longDescription:
      "A dependable terrestrial row often reduces decision fatigue because these flies are readable, seasonal, and portable across different trout water.",
    whenItShines: "Terrestrials shine in summer, along banks, in meadow water, and on small streams where visible confidence flies matter.",
    faq: [
      {
        question: "Why are terrestrials good confidence flies?",
        answer:
          "They are often easy to see, easy to understand, and tied to broad seasonal windows, which makes them especially helpful when you want a box that feels straightforward.",
      },
      {
        question: "Do terrestrials only matter in late summer?",
        answer:
          "That is when many anglers lean on them most, but a few strong terrestrial patterns can stay useful whenever bank-oriented food sources and visible dry-fly fishing overlap.",
      },
    ],
  },
  {
    slug: "wet-flies",
    name: "Wet Flies",
    shortDescription: "Classic wet flies and soft hackles that keep movement, swing value, and traditional trout patterns visible.",
    intro:
      "Wet flies stay relevant because they remain simple, mobile, and dependable. Blue Wing Labs groups them into a cleaner reference category so anglers can keep classic soft hackles and traditional wets together without losing track of where each pattern fits.",
    longDescription:
      "This category centers on traditional wet-fly logic: subtle movement, softer profiles, and patterns that stay useful because they cover more than one moment in the water.",
    whenItShines: "Wet flies shine when anglers want a softer silhouette, a classic swing option, or a smaller category of proven patterns.",
    faq: [
      {
        question: "Are wet flies still relevant in a modern fly box?",
        answer:
          "Yes. They continue to offer movement, simplicity, and a different look than many modern confidence patterns, which keeps them useful for anglers who want a rounded box.",
      },
      {
        question: "What is the difference between wet flies and soft hackles?",
        answer:
          "Soft hackles are a major part of the wet-fly family, but the broader category can also include winged wets and other classic subsurface patterns with a similar role.",
      },
    ],
  },
  {
    slug: "euro-nymphs",
    name: "Euro Nymphs",
    shortDescription: "Lean tactical nymphs that reward organization, repeatability, and clear box discipline.",
    intro:
      "Euro nymphs are easiest to manage when they are grouped with clear logic. Blue Wing Labs uses this category to keep tactical confidence flies organized for anglers who want a simpler way to compare anchor patterns and everyday euro standards.",
    longDescription:
      "A strong euro row usually balances quick-sinking confidence flies with simple standards that are easy to tie, replace, and rotate through.",
    whenItShines: "Euro nymphs shine in tactical subsurface fishing, fast seams, and any workflow where order and repeatability matter.",
    faq: [
      {
        question: "What makes a euro nymph box feel organized instead of cluttered?",
        answer:
          "Keeping a small group of proven shapes, weight profiles, and confidence patterns together makes the whole system easier to read and easier to fish with intent.",
      },
      {
        question: "Do euro nymphs overlap with standard nymphs?",
        answer:
          "They can, but euro-oriented boxes usually emphasize tactical profile, direct subsurface control, and a more disciplined approach to repeated pattern use.",
      },
    ],
  },
];

const categoryMap = new Map(knowledgeCategories.map((category) => [category.slug, category]));
const flyMap = new Map(flyLibrary.map((fly) => [fly.slug, fly]));
const guideMap = new Map(guideConfigs.map((guide) => [guide.slug, guide]));
const flyPriority = new Map(flyLibrary.map((fly, index) => [fly.slug, flyLibrary.length - index]));

function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withoutIndex = pathname.replace(/\/index\.html$/, "");
  const collapsed = withoutIndex.replace(/\/+$/, "");
  return collapsed || "/";
}

function uniqueBySlug(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.slug)) {
      return false;
    }

    seen.add(item.slug);
    return true;
  });
}

function sortByFeatured(items, featuredSlugs = []) {
  const featuredIndex = new Map(featuredSlugs.map((slug, index) => [slug, index]));

  return [...items].sort((left, right) => {
    const leftFeatured = featuredIndex.has(left.slug);
    const rightFeatured = featuredIndex.has(right.slug);

    if (leftFeatured && rightFeatured) {
      return featuredIndex.get(left.slug) - featuredIndex.get(right.slug);
    }

    if (leftFeatured) {
      return -1;
    }

    if (rightFeatured) {
      return 1;
    }

    return (flyPriority.get(right.slug) || 0) - (flyPriority.get(left.slug) || 0);
  });
}

function includesAny(tags, wanted = []) {
  if (!wanted.length) {
    return true;
  }

  return wanted.some((tag) => tags.includes(tag));
}

function includesAll(tags, wanted = []) {
  if (!wanted.length) {
    return true;
  }

  return wanted.every((tag) => tags.includes(tag));
}

function matchesSelection(fly, selection = {}) {
  if (selection.categories?.length && !selection.categories.includes(fly.categorySlug)) {
    return false;
  }

  if (selection.excludeCategories?.length && selection.excludeCategories.includes(fly.categorySlug)) {
    return false;
  }

  if (!includesAny(fly.tags, selection.anyTags || [])) {
    return false;
  }

  if (!includesAll(fly.tags, selection.allTags || [])) {
    return false;
  }

  if (selection.excludeTags?.length && selection.excludeTags.some((tag) => fly.tags.includes(tag))) {
    return false;
  }

  return true;
}

export function getCategoryBySlug(slug) {
  return categoryMap.get(slug) || null;
}

export function getFlyBySlug(slug) {
  return flyMap.get(slug) || null;
}

export function getGuideBySlug(slug) {
  return guideMap.get(slug) || null;
}

export function getFliesByCategory(categorySlug) {
  return flyLibrary.filter((fly) => fly.categorySlug === categorySlug);
}

export function getGuideEntries(guide) {
  if (!guide) {
    return [];
  }

  const matches = flyLibrary.filter((fly) => matchesSelection(fly, guide.selection));
  const ordered = sortByFeatured(uniqueBySlug(matches), guide.featuredSlugs);
  return ordered.slice(0, guide.selection?.limit || ordered.length);
}

export function getRelatedGuidesForFly(flySlug, limit = 4) {
  return guideConfigs
    .map((guide) => ({ ...guide, entries: getGuideEntries(guide) }))
    .filter((guide) => guide.entries.some((entry) => entry.slug === flySlug))
    .slice(0, limit);
}

export function getRelatedGuidesForCategory(categorySlug, limit = 4) {
  return guideConfigs
    .map((guide) => ({ ...guide, entries: getGuideEntries(guide) }))
    .filter((guide) => guide.entries.some((entry) => entry.categorySlug === categorySlug))
    .slice(0, limit);
}

export function getRelatedFlies(fly, limit = 4) {
  if (!fly) {
    return [];
  }

  const related = flyLibrary
    .filter((candidate) => candidate.slug !== fly.slug)
    .filter((candidate) => candidate.categorySlug === fly.categorySlug || candidate.tags.filter((tag) => fly.tags.includes(tag)).length >= 2);

  return sortByFeatured(uniqueBySlug(related), []).slice(0, limit);
}

export function getHubPageData() {
  return {
    type: "hub",
    path: "/learn",
    title: "Fly Tying Guides and Fly Pattern Library",
    intro:
      "The Blue Wing Labs learning hub turns a working fly library into public, structured reference pages that are easier to browse, easier to link, and easier for anglers and AI tools to understand.",
    description:
      "Explore the Blue Wing Labs fly-tying knowledge hub with public guides, fly categories, and detailed pattern pages built from the site's structured fly library.",
    featuredCategories: knowledgeCategories.map((category) => ({
      ...category,
      flies: getFliesByCategory(category.slug).slice(0, 4),
      flyCount: getFliesByCategory(category.slug).length,
    })),
    featuredGuides: guideConfigs.slice(0, 8).map((guide) => ({ ...guide, entries: getGuideEntries(guide) })),
    featuredFlies: flyLibrary.slice(0, 8),
    faq: [
      {
        question: "What is the Blue Wing Labs learning hub?",
        answer:
          "It is the public reference side of Blue Wing Labs: a structured set of fly categories, guides, and fly pages designed to help anglers learn patterns and navigate the library more clearly.",
      },
      {
        question: "How does this relate to the app?",
        answer:
          "The public hub is educational and indexable, while Blue Wing Labs itself helps anglers organize, learn, and manage fly patterns inside a calmer app workflow.",
      },
    ],
  };
}

export function getCategoryPageData(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return null;
  }

  return {
    type: "category",
    path: `/flies/${category.slug}`,
    category,
    flies: getFliesByCategory(category.slug),
    relatedGuides: getRelatedGuidesForCategory(category.slug, 6),
    title: `${category.name} Fly Patterns`,
    intro: category.intro,
    description: `Browse ${category.name.toLowerCase()} with structured pattern pages, category guidance, and related Blue Wing Labs references for anglers and fly tiers.`,
  };
}

export function getGuidePageData(guideSlug) {
  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    return null;
  }

  const entries = getGuideEntries(guide);
  const relatedCategories = uniqueBySlug(entries.map((entry) => getCategoryBySlug(entry.categorySlug))).slice(0, 4);

  return {
    type: "guide",
    path: `/guides/${guide.slug}`,
    guide,
    entries,
    relatedCategories,
    relatedGuides: guideConfigs
      .filter((candidate) => candidate.slug !== guide.slug)
      .map((candidate) => ({ ...candidate, entries: getGuideEntries(candidate) }))
      .filter((candidate) => candidate.entries.some((entry) => entries.some((selected) => selected.slug === entry.slug)))
      .slice(0, 4),
    title: guide.title,
    intro: guide.intro,
    description: guide.description,
  };
}

export function getFlyPageData(flySlug) {
  const fly = getFlyBySlug(flySlug);
  if (!fly) {
    return null;
  }

  const category = getCategoryBySlug(fly.categorySlug);

  return {
    type: "fly",
    path: `/flies/${fly.slug}`,
    fly,
    category,
    relatedGuides: getRelatedGuidesForFly(flySlug, 6),
    relatedFlies: getRelatedFlies(fly, 6),
    faq: buildFlyFaq(fly, category),
    title: `${fly.name} Fly Pattern`,
    intro: fly.summary,
    description: `Learn when to use the ${fly.name} fly pattern, see its category, and explore related Blue Wing Labs guides and fly pages.`,
  };
}

export function getAllKnowledgeRoutes() {
  return [
    getHubPageData(),
    ...knowledgeCategories.map((category) => getCategoryPageData(category.slug)),
    ...guideConfigs.map((guide) => getGuidePageData(guide.slug)),
    ...flyLibrary.map((fly) => getFlyPageData(fly.slug)),
  ].filter(Boolean);
}

export function resolveKnowledgeRoute(pathname) {
  const path = normalizePath(pathname);

  if (path === "/learn") {
    return getHubPageData();
  }

  const flyMatch = path.match(/^\/flies\/([^/]+)$/);
  if (flyMatch) {
    const slug = flyMatch[1];
    return getCategoryBySlug(slug) ? getCategoryPageData(slug) : getFlyPageData(slug);
  }

  const guideMatch = path.match(/^\/guides\/([^/]+)$/);
  if (guideMatch) {
    return getGuidePageData(guideMatch[1]);
  }

  return null;
}

function buildBreadcrumbList(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteOrigin}${item.path}`,
    })),
  };
}

function buildFaqSchema(faq = []) {
  if (!faq.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

function buildItemListSchema(name, items, path) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${siteOrigin}${path}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteOrigin}/flies/${item.slug}`,
      name: item.name,
    })),
  };
}

function buildArticleSchema(headline, description, path, about = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteOrigin}${path}`,
    author: { "@type": "Organization", name: "Clarkii Outdoors LLC" },
    publisher: { "@type": "Organization", name: "Clarkii Outdoors LLC" },
    about: about.map((name) => ({ "@type": "Thing", name })),
  };
}

function buildFlyFaq(fly, category) {
  return [
    {
      question: `What category of fly is ${fly.name}?`,
      answer: `${fly.name} is grouped under ${category.name.toLowerCase()} in the Blue Wing Labs knowledge hub so anglers can compare it with related patterns and broader category guidance.`,
    },
    {
      question: `When should anglers use ${fly.name}?`,
      answer: fly.whenToUse,
    },
    {
      question: `Is ${fly.name} a beginner-friendly pattern?`,
      answer:
        fly.difficulty === "Beginner"
          ? `Yes. ${fly.name} is marked as beginner-friendly in the public library, which means it is one of the clearer patterns to learn, organize, and return to later.`
          : `${fly.name} is listed as ${fly.difficulty.toLowerCase()} in the public library, so it may ask for a little more experience than the simplest entry-point patterns, but it still fits into an organized learning path.`,
    },
    {
      question: `Why does ${fly.name} still deserve space in a fly box?`,
      answer: fly.whyItMatters,
    },
  ];
}

export function getPageMetadata(page) {
  if (!page) {
    return {
      title: "Blue Wing Labs | Fly Tying Companion App",
      description:
        "Blue Wing Labs is a fly tying companion app that helps anglers learn fly patterns, follow tying steps, organize materials, and improve their bench workflow.",
      canonical: `${siteOrigin}/`,
      type: "website",
      ogImage: `${siteOrigin}/brand/blue-winged-olive-icon.png`,
    };
  }

  return {
    title: `${page.title} | Blue Wing Labs`,
    description: page.description,
    canonical: `${siteOrigin}${page.path}`,
    type: page.type === "guide" ? "article" : "website",
    ogImage: `${siteOrigin}/brand/blue-winged-olive-icon.png`,
  };
}

export function getPageSchemas(page) {
  if (!page) {
    return [];
  }

  if (page.type === "hub") {
    return [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
      ]),
      buildItemListSchema("Blue Wing Labs Knowledge Hub", page.featuredFlies, page.path),
      buildFaqSchema(page.faq),
    ].filter(Boolean);
  }

  if (page.type === "category") {
    return [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: page.category.name, path: page.path },
      ]),
      buildItemListSchema(`${page.category.name} Fly Patterns`, page.flies, page.path),
      buildFaqSchema(page.category.faq),
    ].filter(Boolean);
  }

  if (page.type === "guide") {
    return [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: "Guides", path: "/learn" },
        { name: page.guide.title, path: page.path },
      ]),
      buildArticleSchema(page.guide.title, page.guide.description, page.path, page.entries.map((entry) => entry.name)),
      buildFaqSchema(page.guide.faq),
    ].filter(Boolean);
  }

  if (page.type === "fly") {
    return [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: page.category.name, path: `/flies/${page.category.slug}` },
        { name: page.fly.name, path: page.path },
      ]),
      buildArticleSchema(page.fly.name, page.description, page.path, [page.category.name, ...page.fly.tags]),
      buildFaqSchema(page.faq),
    ].filter(Boolean);
  }

  return [];
}
