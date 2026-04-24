export const clarkiiHomeCallouts = [
  {
    variant: "River Reading",
    eyebrow: "Outdoor intelligence",
    title: "Why fish hold in seams",
    body:
      "Seams let trout spend less energy while food keeps sliding past. Reading that soft edge first usually leads to cleaner drifts and fewer random casts.",
    details: ["Current break", "Food lane", "Lower effort"],
  },
  {
    variant: "Fish Behavior",
    eyebrow: "Fish behavior",
    title: "How fly choice changes by water column",
    body:
      "Surface, film, and bottom each ask a different question. Good fly choice starts by matching where fish are feeding before you worry about extra pattern complexity.",
    details: ["Surface tells", "Film feeders", "Subsurface clues"],
  },
  {
    variant: "Fly Tying",
    eyebrow: "Bench workflow",
    title: "Why material readiness matters",
    body:
      "A fly ties cleaner when the key materials are already sorted. Less bench friction means fewer rushed tie-ins, better proportions, and more repeatable patterns.",
    details: ["Cleaner starts", "Fewer resets", "Better proportions"],
  },
  {
    variant: "App Intelligence",
    eyebrow: "Clarkii system",
    title: "How Clarkii connects field observations to better decisions",
    body:
      "Clarkii is built around practical loops: notice what fish are doing, organize what matters, and return to the same decision-making framework on the next outing or tying session.",
    details: ["Observe", "Organize", "Return sharper"],
  },
];

export const blueWingLabsCallouts = [
  {
    variant: "App Intelligence",
    eyebrow: "Pattern intelligence",
    title: "A useful pattern page should answer the next question fast",
    body:
      "Blue Wing Labs keeps the fly, materials, and sequence close together so the app helps once tying starts instead of pushing you back into tabs and saved posts.",
    details: ["Pattern context", "Bench-first layout", "Less searching"],
  },
  {
    variant: "Fly Tying",
    eyebrow: "Material readiness",
    title: "Better tying starts before the thread ever touches the hook",
    body:
      "When the hook, thread, wing, and body materials are already set, tiers make fewer rushed choices and keep the fly's shape more consistent from start to finish.",
    details: ["Prep first", "Reduce clutter", "Tie cleaner"],
  },
  {
    variant: "Fish Behavior",
    eyebrow: "Fishing condition insight",
    title: "A stronger bench workflow makes on-water decisions cleaner too",
    body:
      "Understanding what a fly represents, where it rides, and when it shines makes it easier to choose with confidence once current speed and fish position start changing.",
    details: ["Match role", "Read the water", "Fish with confidence"],
  },
];

function buildMaterialDetail(displayMaterials) {
  return displayMaterials
    .slice(0, 3)
    .map((material) => material.name)
    .filter(Boolean);
}

export function buildFlyEducationalCallouts(page) {
  const { fly, category, displayMaterials = [], displaySteps = [], appWhyItWorks } = page;

  const materialCallout = {
    variant: "Fly Tying",
    eyebrow: "Material readiness",
    title: `Prep ${fly.name} before the first wrap`,
    body:
      displayMaterials.length > 0
        ? `Lay out the core ${category.name.toLowerCase()} materials before starting so the fly stays balanced and the sequence feels calmer once the vise is loaded.`
        : `A short material check before tying ${fly.name} keeps the sequence cleaner and makes it easier to stay on pace once the hook is in the vise.`,
    details: buildMaterialDetail(displayMaterials),
  };

  const conditionCallout = {
    variant: appWhyItWorks?.whereItExcels?.match(/seam|riffle|eddy|pool|tailout|run/i) ? "River Reading" : "Fish Behavior",
    eyebrow: "Fishing condition insight",
    title: `When ${fly.name} earns the tie-on`,
    body:
      appWhyItWorks?.whereItExcels ||
      appWhyItWorks?.whenToUse ||
      fly.whenToUse ||
      `${fly.name} stays useful when the fly's role matches the depth, current speed, and food signal trout are already responding to.`,
    details: [category.name, fly.difficulty, fly.sizeRange].filter(Boolean),
  };

  const tyingCallout = {
    variant: "App Intelligence",
    eyebrow: appWhyItWorks?.commonMistakes ? "Common tying mistake" : "Pattern intelligence",
    title: appWhyItWorks?.commonMistakes ? `What to avoid while tying ${fly.name}` : `${fly.name} is easier to repeat when the sequence stays organized`,
    body:
      appWhyItWorks?.commonMistakes ||
      (displaySteps.length
        ? `Work through the published steps in order and keep the fly's key proportions stable. A clean sequence usually matters more than adding extra motion at the bench.`
        : `Keep the major tie-in points predictable and you will spend less time correcting the fly halfway through the build.`),
    details: [
      displaySteps.length ? `${displaySteps.length} visible steps` : null,
      displayMaterials.length ? `${displayMaterials.length} visible materials` : null,
      category.name,
    ].filter(Boolean),
  };

  return {
    material: materialCallout,
    condition: conditionCallout,
    tying: tyingCallout,
  };
}
