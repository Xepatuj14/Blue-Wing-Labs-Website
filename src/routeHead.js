import { useEffect } from "react";
import { getAppShellMetadata } from "./siteRoutes";

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

export function useRouteHead(pathname) {
  useEffect(() => {
    const metadata = getAppShellMetadata(pathname);

    if (!metadata) {
      return;
    }

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
  }, [pathname]);
}

export function useSectionJump(sectionId) {
  useEffect(() => {
    if (!sectionId) {
      return;
    }

    const node = document.getElementById(sectionId);

    if (!node) {
      return;
    }

    node.scrollIntoView({ block: "start" });
  }, [sectionId]);
}
