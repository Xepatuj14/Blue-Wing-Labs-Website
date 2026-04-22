const beginnerFaq = [
  {
    question: "What makes a fly pattern beginner friendly?",
    answer:
      "Beginner-friendly patterns usually stay easy to understand, easy to organize, and useful often enough that tying or fishing them teaches something repeatable instead of one narrow trick.",
  },
  {
    question: "Should beginners build around one category first?",
    answer:
      "A balanced starter box is usually better. One or two dependable flies from several categories teaches pattern logic faster than stacking a box with only one style.",
  },
];

const troutFaq = [
  {
    question: "How many trout patterns does an angler really need to start?",
    answer:
      "Not many. A smaller group of dependable flies that cover dries, nymphs, streamers, and seasonal terrestrials usually stays more useful than an oversized box with no organizing logic.",
  },
  {
    question: "Why does organization matter as much as fly count?",
    answer:
      "Because a box only helps if you can find and trust the right pattern when conditions change. That is one reason Blue Wing Labs focuses so heavily on structure and retrieval.",
  },
];

const classicFaq = [
  {
    question: "Why keep classic flies in a modern fly box?",
    answer:
      "Classic flies endure because they teach fly-category logic, stay recognizable, and keep working across generations of anglers. They also make a box easier to understand.",
  },
  {
    question: "Are classics only useful for tradition's sake?",
    answer:
      "No. Many classics remain practical because they cover foundational situations clearly and predictably, which is valuable both on the water and at the tying bench.",
  },
];

export const guideConfigs = [
  {
    slug: "best-beginner-fly-patterns",
    title: "Best Beginner Fly Patterns",
    description: "A practical Blue Wing Labs guide to beginner fly patterns that stay useful, understandable, and worth keeping in a first trout box.",
    intro:
      "The best beginner fly patterns are not just easy to tie or easy to fish. They also teach category logic, stay useful in more than one situation, and make it easier to build a box you can still understand later.",
    selection: { anyTags: ["beginner"], limit: 8 },
    featuredSlugs: ["parachute-adams", "elk-hair-caddis", "zebra-midge", "hares-ear-nymph", "woolly-bugger", "foam-ant"],
    faq: beginnerFaq,
  },
  {
    slug: "best-trout-flies",
    title: "Best Trout Flies",
    description: "A broad roundup of trout flies worth knowing, from classic dries and nymphs to streamers, emergers, and terrestrials.",
    intro:
      "A dependable trout box is built around coverage, not clutter. The patterns in this guide help cover surface feeding, everyday subsurface work, tactical moments, and bigger-profile streamer decisions without turning the box into disconnected ideas.",
    selection: { anyTags: ["trout", "box-essential"], limit: 10 },
    featuredSlugs: ["parachute-adams", "blue-winged-olive", "zebra-midge", "pheasant-tail-nymph", "woolly-bugger", "chubby-chernobyl"],
    faq: troutFaq,
  },
  {
    slug: "best-nymphs-for-trout",
    title: "Best Nymphs for Trout",
    description: "A practical guide to trout nymphs that cover slim confidence patterns, classic searching flies, and modern tactical options.",
    intro:
      "A good nymph row should feel ordered, not endless. These trout nymphs give anglers the best mix of broad coverage, classic confidence, and everyday relevance.",
    selection: { categories: ["nymphs", "euro-nymphs"], limit: 9 },
    featuredSlugs: ["zebra-midge", "pheasant-tail-nymph", "hares-ear-nymph", "prince-nymph", "perdigon", "frenchie"],
    faq: troutFaq,
  },
  {
    slug: "best-dry-flies-for-trout",
    title: "Best Dry Flies for Trout",
    description: "An organized guide to trout dry flies that balance hatch matching, surface confidence, visibility, and season-long usefulness.",
    intro:
      "Dry-fly boxes work best when they stay readable. This guide focuses on the dry flies that give anglers broad trout coverage across mayflies, caddis, midges, terrestrials, and attractor situations.",
    selection: { categories: ["dry-flies", "terrestrials"], anyTags: ["dry"], limit: 9 },
    featuredSlugs: ["parachute-adams", "blue-winged-olive", "elk-hair-caddis", "griffiths-gnat", "chubby-chernobyl"],
    faq: troutFaq,
  },
  {
    slug: "best-streamer-patterns",
    title: "Best Streamer Patterns",
    description: "A clear guide to streamer patterns that earn space through movement, versatility, and practical trout-box value.",
    intro:
      "A streamer row does not need dozens of patterns to be useful. It needs the right shapes, movement, and coverage. These are the streamer patterns most worth organizing and learning first.",
    selection: { categories: ["streamers"], limit: 7 },
    featuredSlugs: ["woolly-bugger", "clouser-minnow", "muddler-minnow", "zonker", "sculpzilla"],
    faq: [
      {
        question: "What makes a streamer worth tying regularly?",
        answer:
          "The best streamer patterns stay useful in more than one situation, keep a clear profile, and give anglers a reason to reach for them instead of letting them become box decoration.",
      },
      {
        question: "Do trout anglers need more than one streamer style?",
        answer:
          "Usually yes. A balanced streamer row often benefits from a classic all-purpose fly, a baitfish-style option, and one or two patterns with stronger movement or bulk.",
      },
    ],
  },
  {
    slug: "top-midge-patterns",
    title: "Top Midge Patterns",
    description: "An organized list of midge patterns that help anglers cover both surface and subsurface trout feeding with more confidence.",
    intro:
      "Midge boxes can become confusing fast if every pattern starts to feel interchangeable. These flies give anglers a tighter, more useful midge lineup across dries, nymphs, emergers, and tactical subsurface options.",
    selection: { anyTags: ["midge"], limit: 8 },
    featuredSlugs: ["zebra-midge", "griffiths-gnat", "rs2", "wd-40", "rainbow-warrior"],
    faq: [
      {
        question: "Why do midge patterns deserve a separate guide?",
        answer:
          "Because they often drive technical trout decisions and benefit from clean organization. Surface midges, slim nymphs, and film-oriented emergers all solve slightly different problems.",
      },
      {
        question: "Do midge patterns only matter on tailwaters?",
        answer:
          "No. They are especially famous there, but a compact midge group helps anywhere smaller food sources are part of the year-round trout picture.",
      },
    ],
  },
  {
    slug: "top-caddis-patterns",
    title: "Top Caddis Patterns",
    description: "A practical guide to caddis flies worth keeping in a trout box, from visible dry flies to lower-profile adult choices.",
    intro:
      "Caddis coverage is easiest when a box includes a few patterns that clearly solve different jobs. The flies in this guide give anglers visible adult options and lower-profile choices without duplicating the whole dry-fly row.",
    selection: { anyTags: ["caddis"], limit: 6 },
    featuredSlugs: ["elk-hair-caddis", "x-caddis"],
    faq: [
      {
        question: "How many caddis patterns should a practical trout box hold?",
        answer:
          "Often fewer than people think. A visible adult and a lower-profile adult usually cover a lot of real fishing when they are easy to find and easy to trust.",
      },
      {
        question: "Why is Elk Hair Caddis still so important?",
        answer:
          "Because it remains visible, practical, and easy to understand. It is a strong benchmark for anyone organizing caddis coverage in Blue Wing Labs or in a physical box.",
      },
    ],
  },
  {
    slug: "top-mayfly-patterns",
    title: "Top Mayfly Patterns",
    description: "A structured mayfly-pattern guide covering dries, nymphs, and emergers that belong in a well-organized trout box.",
    intro:
      "Mayfly coverage works best when it spans more than one level in the water. These patterns give anglers a cleaner way to organize mayfly fishing across nymphs, emergers, and dry flies.",
    selection: { anyTags: ["mayfly"], limit: 9 },
    featuredSlugs: ["blue-winged-olive", "parachute-adams", "pheasant-tail-nymph", "sparkle-dun", "barrs-emerger", "rs2"],
    faq: [
      {
        question: "Why should mayfly coverage include nymphs, emergers, and dries together?",
        answer:
          "Because trout do not always feed at only one level. Organizing the category across those stages makes the box easier to trust when conditions shift during a hatch.",
      },
      {
        question: "What is a simple mayfly starter set?",
        answer:
          "A practical mayfly starter set often includes one everyday dry, one dependable nymph, and one emerger that helps bridge the film-focused gap.",
      },
    ],
  },
  {
    slug: "easiest-flies-to-tie",
    title: "Easiest Flies to Tie",
    description: "A useful list of easy fly patterns that still deserve long-term box space instead of being beginner-only throwaways.",
    intro:
      "The easiest flies to tie should still help you build a serious box. This guide prioritizes patterns that stay simple on the vise while remaining valuable in real trout fishing.",
    selection: { anyTags: ["beginner", "easiest"], limit: 8 },
    featuredSlugs: ["woolly-bugger", "foam-ant", "partridge-and-orange", "walts-worm", "zebra-midge"],
    faq: beginnerFaq,
  },
  {
    slug: "most-versatile-fly-patterns",
    title: "Most Versatile Fly Patterns",
    description: "A guide to versatile fly patterns that keep earning box space because they stay useful across seasons, water types, and trout situations.",
    intro:
      "Versatility matters because most anglers want fewer flies they trust more, not more flies they barely understand. These patterns stand out for their ability to stay relevant across changing conditions.",
    selection: { anyTags: ["versatile"], limit: 9 },
    featuredSlugs: ["parachute-adams", "elk-hair-caddis", "hares-ear-nymph", "woolly-bugger", "frenchie"],
    faq: [
      {
        question: "What makes a fly versatile instead of just popular?",
        answer:
          "Versatile patterns tend to cover more than one season, water type, or decision point while still feeling easy to reach for when the day gets uncertain.",
      },
      {
        question: "Why do versatile patterns matter in Blue Wing Labs?",
        answer:
          "They help anglers build cleaner core lists inside the app, which makes pattern organization, materials tracking, and repeat tying more manageable.",
      },
    ],
  },
  {
    slug: "best-euro-nymph-patterns",
    title: "Best Euro Nymph Patterns",
    description: "A clean guide to euro nymph patterns that help anglers build a tactical subsurface row with more structure and less clutter.",
    intro:
      "Euro nymph boxes work best when they are disciplined. This guide focuses on patterns that give anglers a tactical foundation without turning the category into a wall of nearly identical flies.",
    selection: { categories: ["euro-nymphs"], limit: 6 },
    featuredSlugs: ["perdigon", "frenchie", "walts-worm", "rainbow-warrior"],
    faq: [
      {
        question: "How many euro nymphs belong in a starter tactical box?",
        answer:
          "A small group of dependable patterns often works better than a large unfocused collection. The goal is clear roles, not endless variation.",
      },
      {
        question: "Which euro nymph is the easiest starting point?",
        answer:
          "Patterns like the Frenchie and Walt's Worm are strong entry points because they remain approachable while still fitting a tactical euro workflow.",
      },
    ],
  },
  {
    slug: "classic-fly-patterns",
    title: "Classic Fly Patterns",
    description: "A guide to classic fly patterns every angler should recognize, organize, and understand before the box gets too modern or too crowded.",
    intro:
      "Classic fly patterns matter because they teach fly-category logic as much as they fill a box. These are the patterns that help anglers build literacy across dries, nymphs, streamers, wets, and terrestrials.",
    selection: { anyTags: ["classic"], limit: 10 },
    featuredSlugs: ["parachute-adams", "elk-hair-caddis", "pheasant-tail-nymph", "woolly-bugger", "partridge-and-orange"],
    faq: classicFaq,
  },
  {
    slug: "best-flies-to-stock-in-your-box",
    title: "Best Flies to Stock in Your Box",
    description: "A practical fly-box stocking guide built around coverage, category balance, and patterns that earn their place over time.",
    intro:
      "Stocking a fly box well means choosing patterns that cover real decisions, not just filling compartments. This guide highlights the flies most worth carrying if the goal is a compact, organized box.",
    selection: { anyTags: ["box-essential"], limit: 12 },
    featuredSlugs: ["parachute-adams", "blue-winged-olive", "elk-hair-caddis", "zebra-midge", "pheasant-tail-nymph", "woolly-bugger", "chubby-chernobyl"],
    faq: troutFaq,
  },
  {
    slug: "fly-patterns-every-angler-should-know",
    title: "Fly Patterns Every Angler Should Know",
    description: "A broad knowledge guide to fly patterns every angler should recognize, whether the goal is tying confidence, box organization, or trout coverage.",
    intro:
      "Every angler benefits from knowing a small set of patterns that define the major categories clearly. The flies in this guide are useful reference points that make the rest of a box easier to understand.",
    selection: { anyTags: ["box-essential", "classic"], limit: 12 },
    featuredSlugs: ["parachute-adams", "elk-hair-caddis", "zebra-midge", "pheasant-tail-nymph", "woolly-bugger", "partridge-and-orange"],
    faq: classicFaq,
  },
  {
    slug: "best-fly-patterns-for-small-streams",
    title: "Best Fly Patterns for Small Streams",
    description: "A focused small-stream guide covering flies that stay visible, practical, and easy to fish in tighter trout water.",
    intro:
      "Small-stream fly boxes benefit from clarity. The best patterns for tight water are usually visible, forgiving, and compact enough to make quick decisions easier when the water moves fast and the windows are short.",
    selection: { anyTags: ["small-stream"], limit: 8 },
    featuredSlugs: ["parachute-adams", "elk-hair-caddis", "stimulator", "foam-ant", "beetle", "muddler-minnow"],
    faq: troutFaq,
  },
  {
    slug: "best-terrestrial-flies",
    title: "Best Terrestrial Flies",
    description: "A clean terrestrial-fly guide that helps anglers organize hoppers, ants, beetles, and visible summer confidence patterns.",
    intro:
      "Terrestrial boxes should feel intuitive. These flies give anglers a straightforward summer lineup with enough range to cover banks, meadow water, and high-visibility dry-fly decisions without creating a category that is bigger than it needs to be.",
    selection: { categories: ["terrestrials"], limit: 6 },
    featuredSlugs: ["chubby-chernobyl", "foam-ant", "beetle", "daves-hopper"],
    faq: [
      {
        question: "Why are terrestrials such useful guide-page content?",
        answer:
          "Because the category is practical, seasonal, and easy to organize. Anglers often understand the story faster, which makes the content useful for both people and AI retrieval systems.",
      },
      {
        question: "What is the easiest terrestrial box to build?",
        answer:
          "A hopper, an ant, a beetle, and one visible foam attractor-style dry usually create a strong summer foundation without overcomplicating things.",
      },
    ],
  },
  {
    slug: "essential-streamer-patterns",
    title: "Essential Streamer Patterns",
    description: "A practical list of essential streamer patterns for anglers who want movement, profile, and broader trout-box range without guesswork.",
    intro:
      "If a streamer row only has room for a handful of flies, these are the patterns most worth understanding. They cover classic all-purpose utility, baitfish thinking, stronger silhouettes, and movement-driven variety.",
    selection: { categories: ["streamers"], anyTags: ["box-essential", "classic", "versatile"], limit: 6 },
    featuredSlugs: ["woolly-bugger", "clouser-minnow", "muddler-minnow", "zonker"],
    faq: [
      {
        question: "What makes a streamer essential?",
        answer:
          "Essential streamers are the ones that cover clear roles and stay easy to trust. They do not need to do everything, but they should make a box meaningfully more complete.",
      },
      {
        question: "Is Woolly Bugger still the first streamer to learn?",
        answer:
          "For many anglers, yes. It remains one of the clearest first streamers because it is useful, approachable, and easy to organize around.",
      },
    ],
  },
  {
    slug: "top-attractor-patterns",
    title: "Top Attractor Patterns",
    description: "A guide to attractor fly patterns that help anglers simplify decisions and keep confidence flies in easy reach.",
    intro:
      "Attractor patterns matter because not every good fly decision starts with exact imitation. These flies earn their place by staying visible, memorable, and practical enough to help anglers keep fishing instead of overthinking.",
    selection: { anyTags: ["attractor"], limit: 8 },
    featuredSlugs: ["parachute-adams", "stimulator", "prince-nymph", "copper-john", "chubby-chernobyl", "rainbow-warrior"],
    faq: [
      {
        question: "Why do attractor patterns belong in a serious box?",
        answer:
          "Because they create fast confidence when exact matching is not the only path to success. They also help keep a box easier to read in changing conditions.",
      },
      {
        question: "Are attractors only dry flies?",
        answer:
          "No. Attractor logic shows up in dry flies, nymphs, and euro patterns alike, which is why a well-organized library benefits from tagging them clearly.",
      },
    ],
  },
  {
    slug: "best-soft-hackle-patterns",
    title: "Best Soft Hackle Patterns",
    description: "A soft-hackle guide built around classic wet-fly movement, simplicity, and patterns worth understanding long term.",
    intro:
      "Soft hackles are some of the clearest examples of useful simplicity in fly tying. This guide highlights the patterns that keep the category approachable while still teaching anglers how movement and restraint can carry a fly.",
    selection: { anyTags: ["soft-hackle"], limit: 6 },
    featuredSlugs: ["partridge-and-orange", "soft-hackle-hares-ear", "soft-hackle-pheasant-tail"],
    faq: [
      {
        question: "Why are soft hackles good patterns to study?",
        answer:
          "They teach fly design economy. Many soft hackles remain effective because they do not require clutter to create movement and usefulness.",
      },
      {
        question: "Do soft hackles belong only in wet-fly boxes?",
        answer:
          "Not always. Some patterns cross naturally into emerger logic, which is part of what makes them so useful to organize inside Blue Wing Labs.",
      },
    ],
  },
  {
    slug: "fly-patterns-for-year-round-use",
    title: "Fly Patterns for Year-Round Use",
    description: "A guide to year-round fly patterns that keep a trout box useful across seasons without constant rebuilding.",
    intro:
      "Year-round usefulness is one of the best filters for simplifying a fly box. These patterns keep showing up because they remain relevant across changing seasons, which makes them especially valuable for anglers building a more organized core lineup.",
    selection: { anyTags: ["year-round"], limit: 10 },
    featuredSlugs: ["blue-winged-olive", "parachute-adams", "zebra-midge", "woolly-bugger", "perdigon", "walts-worm"],
    faq: troutFaq,
  },
  {
    slug: "must-know-western-fly-patterns",
    title: "Must-Know Western Fly Patterns",
    description: "A western fly-pattern guide covering visible dries, tactical nymphs, streamers, and terrestrials that define a strong regional trout box.",
    intro:
      "Western trout boxes often need range without losing clarity. These patterns help build that range by covering visible dries, technical nymphs, summer terrestrials, and streamers that still feel rooted in practical everyday use.",
    selection: { anyTags: ["western"], limit: 9 },
    featuredSlugs: ["stimulator", "prince-nymph", "copper-john", "chubby-chernobyl", "sculpzilla", "daves-hopper"],
    faq: troutFaq,
  },
  {
    slug: "best-fly-tying-patterns-for-beginners",
    title: "Best Fly Tying Patterns for Beginners",
    description: "A beginner tying guide that emphasizes practical patterns worth learning first because they stay useful on the bench and on the water.",
    intro:
      "The best beginner tying patterns teach more than technique. They also help new tiers build a fly box with structure. This guide emphasizes patterns that are approachable at the vise and meaningful enough to stay in rotation after the first few sessions.",
    selection: { anyTags: ["beginner"], limit: 9 },
    featuredSlugs: ["woolly-bugger", "parachute-adams", "elk-hair-caddis", "zebra-midge", "frenchie", "foam-ant"],
    faq: beginnerFaq,
  },
];
