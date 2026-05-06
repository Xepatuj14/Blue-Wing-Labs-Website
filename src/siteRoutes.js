export const siteOrigin = "https://www.clarkiioutdoors.com";
export const supportEmail = "clarkiioutdoors@gmail.com";
export const clarkiiOutdoorsName = "Clarkii Outdoors";
export const blueWingLabsName = "Blue Wing Labs";

export const homeHref = "/";
export const blueWingHomeHref = "/blue-wing-labs";
export const blueWingFeaturesHref = "/blue-wing-labs/features";
export const blueWingFlyLibraryHref = "/blue-wing-labs/fly-library";
export const blueWingSupportPageHref = "/blue-wing-labs/support";
export const blueWingPrivacyPageHref = "/blue-wing-labs/privacy";
export const blueWingTermsPageHref = "/blue-wing-labs/terms";
export const appStoreHref = "https://apps.apple.com/us/app/blue-wing-labs/id6762320337";

export const legacySupportPageHref = "/support.html";
export const legacyPrivacyPageHref = "/privacy.html";
export const legacyTermsPageHref = "/terms.html";

export function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withoutIndex = pathname.replace(/\/index\.html$/, "");
  const collapsed = withoutIndex.replace(/\/+$/, "");
  return collapsed || "/";
}

const appShellMetadata = new Map([
  [
    homeHref,
    {
      path: homeHref,
      title: "Clarkii Outdoors | Practical tools for anglers and outdoor creators",
      description:
        "Clarkii Outdoors builds simple, practical tools for anglers and outdoor creators, with Blue Wing Labs leading the first product lineup.",
      canonical: `${siteOrigin}${homeHref}`,
      ogImage: `${siteOrigin}/fly-images/parachute-adams.jpg`,
      type: "website",
      includeInSitemap: true,
    },
  ],
  [
    blueWingHomeHref,
    {
      path: blueWingHomeHref,
      title: "Blue Wing Labs | Fly Tying Companion App",
      description:
        "Blue Wing Labs is a fly tying companion app that helps anglers learn fly patterns, follow tying steps, organize materials, and improve their bench workflow.",
      canonical: `${siteOrigin}${blueWingHomeHref}`,
      ogImage: `${siteOrigin}/brand/blue-winged-olive-icon.png`,
      type: "website",
      includeInSitemap: true,
    },
  ],
  [
    blueWingFeaturesHref,
    {
      path: blueWingFeaturesHref,
      title: "Blue Wing Labs Features | Fly Tying Companion App",
      description:
        "Explore how Blue Wing Labs organizes fly recipes, materials tracking, guided steps, and a calmer tying workflow for anglers at the bench.",
      canonical: `${siteOrigin}${blueWingFeaturesHref}`,
      ogImage: `${siteOrigin}/brand/blue-winged-olive-icon.png`,
      type: "website",
      includeInSitemap: true,
    },
  ],
  [
    blueWingFlyLibraryHref,
    {
      path: blueWingFlyLibraryHref,
      title: "Blue Wing Labs Fly Library | Public Fly Guides",
      description:
        "Browse the public Blue Wing Labs fly library with structured fly-tying guides, fly categories, and detailed pattern pages for anglers and outdoor creators.",
      canonical: `${siteOrigin}/learn`,
      ogImage: `${siteOrigin}/brand/blue-winged-olive-icon.png`,
      type: "website",
      includeInSitemap: false,
    },
  ],
]);

export function getAppShellMetadata(pathname) {
  return appShellMetadata.get(normalizePath(pathname)) || null;
}

export function getAppShellRoutes() {
  return [...appShellMetadata.values()];
}
