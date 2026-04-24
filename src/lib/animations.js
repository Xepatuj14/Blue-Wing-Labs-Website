import { useEffect, useLayoutEffect } from "react";
import { animate } from "animejs/animation";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";

const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function asElements(targets) {
  if (!targets) {
    return [];
  }

  if (typeof targets === "string") {
    return Array.from(document.querySelectorAll(targets));
  }

  if (targets instanceof Element) {
    return [targets];
  }

  return Array.from(targets).filter((target) => target instanceof Element);
}

function setVisible(elements) {
  elements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.willChange = "";
  });
}

function prepareFadeUp(elements, { y = 24, scale = 1 } = {}) {
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = `translateY(${y}px) scale(${scale})`;
    element.style.willChange = "transform, opacity";
  });
}

function clearWillChange(elements) {
  elements.forEach((element) => {
    element.style.willChange = "";
  });
}

function onceInView(target, callback, options = {}) {
  if (!(target instanceof Element)) {
    return () => {};
  }

  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    callback();
    return () => {};
  }

  let hasPlayed = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (hasPlayed || !entry.isIntersecting) {
          return;
        }

        hasPlayed = true;
        observer.unobserve(entry.target);
        callback(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.18,
      ...options,
    },
  );

  observer.observe(target);

  return () => observer.disconnect();
}

export function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function fadeUpReveal(targets, options = {}) {
  const elements = asElements(targets);

  if (!elements.length) {
    return null;
  }

  if (prefersReducedMotion()) {
    setVisible(elements);
    return null;
  }

  const y = options.y ?? 24;
  const scale = options.scale ?? 1;
  prepareFadeUp(elements, { y, scale });

  const animationOptions = {
    opacity: [0, 1],
    y: [y, 0],
    duration: options.duration ?? 680,
    delay: options.delay ?? 0,
    ease: options.ease ?? "outExpo",
    onComplete: () => clearWillChange(elements),
  };

  if (scale !== 1) {
    animationOptions.scale = [scale, 1];
  }

  return animate(elements, animationOptions);
}

export function staggerCards(targets, options = {}) {
  const elements = asElements(targets);

  if (!elements.length) {
    return null;
  }

  if (prefersReducedMotion()) {
    setVisible(elements);
    return null;
  }

  const y = options.y ?? 22;
  const scale = options.scale ?? 0.985;
  prepareFadeUp(elements, { y, scale });

  return animate(elements, {
    opacity: [0, 1],
    y: [y, 0],
    scale: [scale, 1],
    delay: stagger(options.stagger ?? 90, { start: options.delay ?? 0 }),
    duration: options.duration ?? 700,
    ease: options.ease ?? "outExpo",
    onComplete: () => clearWillChange(elements),
  });
}

export function subtleHoverLift(targets, options = {}) {
  const elements = asElements(targets);

  if (!elements.length || prefersReducedMotion()) {
    return () => {};
  }

  const cleanups = [];
  const liftedShadow = options.shadow ?? "0 18px 36px rgba(18, 24, 18, 0.14)";

  elements.forEach((element) => {
    const baseShadow = window.getComputedStyle(element).boxShadow;

    const animateTo = (boxShadow) =>
      animate(element, {
        boxShadow,
        duration: 220,
        ease: "outExpo",
      });

    const handleEnter = () => {
      animateTo(liftedShadow);
    };

    const handleLeave = () => {
      animateTo(baseShadow);
    };

    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointerleave", handleLeave);
    element.addEventListener("focus", handleEnter);
    element.addEventListener("blur", handleLeave);

    cleanups.push(() => {
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointerleave", handleLeave);
      element.removeEventListener("focus", handleEnter);
      element.removeEventListener("blur", handleLeave);
      element.style.boxShadow = baseShadow;
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

export function numberCountUp(target, options = {}) {
  if (!(target instanceof Element)) {
    return null;
  }

  const endValue = Number(options.to ?? target.dataset.countTo ?? 0);
  const startValue = Number(options.from ?? target.dataset.countFrom ?? 0);
  const prefix = options.prefix ?? target.dataset.countPrefix ?? "";
  const suffix = options.suffix ?? target.dataset.countSuffix ?? "";

  if (prefersReducedMotion()) {
    target.textContent = `${prefix}${Math.round(endValue)}${suffix}`;
    return null;
  }

  const counter = { value: startValue };

  return animate(counter, {
    value: endValue,
    duration: options.duration ?? 900,
    ease: options.ease ?? "outExpo",
    onUpdate: () => {
      target.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
    },
  });
}

function createHeroTimeline(root, sequence = []) {
  const groups = sequence
    .map((selector) => Array.from(root.querySelectorAll(selector)))
    .filter((elements) => elements.length);

  if (!groups.length) {
    return null;
  }

  if (prefersReducedMotion()) {
    groups.flat().forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    return null;
  }

  groups.flat().forEach((element) => {
    element.style.opacity = "0";
    element.style.willChange = "transform, opacity";
  });

  const timeline = createTimeline({
    defaults: {
      duration: 700,
      ease: "outExpo",
    },
  });

  groups.forEach((elements, index) => {
    const animationOptions = {
      opacity: [0, 1],
      y: [index >= sequence.length - 1 ? 18 : 28, 0],
    };

    if (index >= sequence.length - 1) {
      animationOptions.scale = [0.985, 1];
    }

    timeline.add(
      elements,
      animationOptions,
      index === 0 ? 0 : "-=520",
    );
  });

  timeline.call(() => clearWillChange(groups.flat()));
  return timeline;
}

export function initPageAnimations(root, options = {}) {
  if (!(root instanceof Element)) {
    return () => {};
  }

  const cleanups = [];

  if (options.heroSequence?.length) {
    const heroTimeline = createHeroTimeline(root, options.heroSequence);
    if (heroTimeline?.cancel) {
      cleanups.push(() => heroTimeline.cancel());
    }
  }

  root.querySelectorAll("[data-motion-group]").forEach((group) => {
    const items = Array.from(group.querySelectorAll("[data-motion-item]"));

    if (!items.length) {
      return;
    }

    cleanups.push(
      onceInView(group, () => {
        staggerCards(items, {
          duration: group.dataset.motionDuration ? Number(group.dataset.motionDuration) : undefined,
          stagger: group.dataset.motionStagger ? Number(group.dataset.motionStagger) : undefined,
          y: group.dataset.motionY ? Number(group.dataset.motionY) : undefined,
          scale: group.dataset.motionScale ? Number(group.dataset.motionScale) : undefined,
        });
      }),
    );
  });

  root.querySelectorAll('[data-motion="reveal"]').forEach((element) => {
    if (element.closest("[data-motion-group]")) {
      return;
    }

    cleanups.push(
      onceInView(element, () => {
        fadeUpReveal(element, {
          y: element.dataset.motionY ? Number(element.dataset.motionY) : undefined,
          duration: element.dataset.motionDuration ? Number(element.dataset.motionDuration) : undefined,
        });
      }),
    );
  });

  root.querySelectorAll("[data-count-to]").forEach((element) => {
    cleanups.push(onceInView(element, () => numberCountUp(element)));
  });

  const hoverCleanup = subtleHoverLift(root.querySelectorAll('[data-hover="lift"]'));
  cleanups.push(hoverCleanup);

  return () => {
    cleanups.forEach((cleanup) => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    });
  };
}

export function usePageAnimations(rootRef, options, deps = []) {
  useSafeLayoutEffect(() => {
    if (!rootRef.current) {
      return undefined;
    }

    return initPageAnimations(rootRef.current, options);
  }, deps);
}
