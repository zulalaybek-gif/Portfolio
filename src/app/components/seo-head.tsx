import { useEffect } from "react";
import { useLang } from "./lang-context";

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
}

const seoData = {
  home: {
    fr: {
      title: "Zulâl AYBEK — Direction Artistique & Design Graphique & Web",
      description:
        "Portfolio de Zulâl AYBEK, directrice artistique et designer graphique. Identité visuelle, branding, web design et création de contenu visuel sur-mesure.",
    },
    en: {
      title: "Zulâl AYBEK — Art Direction & Graphic Design & Web",
      description:
        "Portfolio of Zulâl AYBEK, art director and graphic designer. Visual identity, branding, web design and bespoke visual content creation.",
    },
  },
  projets: {
    fr: {
      title: "Projets — Zulâl AYBEK",
      description:
        "Sélection de travaux en direction artistique, design graphique, branding, web design et création visuelle par Zulâl AYBEK.",
    },
    en: {
      title: "Work — Zulâl AYBEK",
      description:
        "Selected works in art direction, graphic design, branding, web design and visual creation by Zulâl AYBEK.",
    },
  },
  mentions: {
    fr: {
      title: "Mentions légales — Zulâl AYBEK",
      description: "Mentions légales du site portfolio de Zulâl AYBEK.",
    },
    en: {
      title: "Legal Notice — Zulâl AYBEK",
      description: "Legal notice for Zulâl AYBEK's portfolio website.",
    },
  },
  confidentialite: {
    fr: {
      title: "Politique de confidentialité — Zulâl AYBEK",
      description: "Politique de confidentialité du site portfolio de Zulâl AYBEK.",
    },
    en: {
      title: "Privacy Policy — Zulâl AYBEK",
      description: "Privacy policy for Zulâl AYBEK's portfolio website.",
    },
  },
} as const;

export type SEOPage = keyof typeof seoData;

export function SEOHead({ page }: { page: SEOPage }) {
  const { lang } = useLang();

  useEffect(() => {
    const data = seoData[page]?.[lang] ?? seoData[page]?.fr;
    if (!data) return;

    document.title = data.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", data.description);

    // Open Graph
    setMeta("og:title", data.title);
    setMeta("og:description", data.description);
    setMeta("og:type", "website");
    setMeta("og:locale", lang === "fr" ? "fr_FR" : "en_US");
  }, [page, lang]);

  return null;
}

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
