import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://a2eimmo.ma";

const pages = {
  "/": {
    title: "A2E Immobilier | Agence immobilière à Casablanca",
    description:
      "Découvrez villas, appartements, bureaux et locaux commerciaux à vendre à Casablanca et Bouskoura avec A2E Immobilier.",
  },
  "/properties": {
    title: "Biens immobiliers à vendre à Casablanca | A2E Immobilier",
    description:
      "Découvrez notre sélection de biens immobiliers à vendre à Casablanca et ses environs : villas, appartements et propriétés de qualité.",
  },
  "/properties/villas-a-vendre": {
    title: "Villas à vendre à Casablanca et Bouskoura | A2E Immobilier",
    description:
      "Découvrez nos villas à vendre à Casablanca et Bouskoura. Consultez les photos, prix, superficies et caractéristiques des biens disponibles.",
  },
  "/properties/appartements-a-vendre": {
    title: "Appartements à vendre à Casablanca | A2E Immobilier",
    description:
      "Découvrez nos appartements à vendre à Casablanca et ses environs. Consultez les prix, superficies, photos et caractéristiques.",
  },
  "/bureaux-a-vendre-casablanca": {
    title: "Bureaux à vendre à Casablanca | Green Lotus | A2E Immobilier",
    description:
      "Découvrez les bureaux du projet Green Lotus avec A2E Immobilier. Consultez les surfaces, prix et disponibilités des unités proposées.",
  },
  "/locaux-commerciaux-a-vendre-casablanca": {
    title: "Locaux commerciaux à vendre à Casablanca | Central Hills",
    description:
      "Découvrez les locaux commerciaux du projet Central Hills. Consultez les surfaces, prix et disponibilités auprès d’A2E Immobilier.",
  },
  "/projects": {
    title: "Projets immobiliers à Casablanca | A2E Immobilier",
    description:
      "Explorez Green Lotus et Central Hills : bureaux et locaux commerciaux à vendre à Casablanca avec A2E Immobilier.",
  },
  "/about": {
    title: "À propos d'A2E Immobilier | Casablanca",
    description:
      "Découvrez A2E Immobilier, votre partenaire immobilier pour l'achat, la vente et la commercialisation de biens à Casablanca.",
  },
  "/contact": {
    title: "Contacter A2E Immobilier | Casablanca",
    description:
      "Contactez A2E Immobilier pour vos projets immobiliers à Casablanca, vos demandes d'information et vos collaborations.",
  },
  "/collaboration": {
    title: "Collaborer avec A2E Immobilier | Casablanca",
    description:
      "Confiez la commercialisation de votre bien à A2E Immobilier et échangez avec notre équipe au sujet de votre projet.",
  },
  "/financer-mon-bien": {
    title: "Simulateur de financement immobilier | A2E Immobilier",
    description:
      "Estimez vos mensualités et préparez votre financement immobilier avec le simulateur d'A2E Immobilier.",
  },
};

function ensureMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function ensureCanonical(url) {
  let element = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = url;
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname];

    const isPropertyDetail =
      /^\/properties\/[^/]+$/.test(pathname) &&
      ![
        "/properties/villas-a-vendre",
        "/properties/appartements-a-vendre",
      ].includes(pathname);

    const title = page?.title ||
      (isPropertyDetail
        ? "Détail d'une propriété | A2E Immobilier"
        : "A2E Immobilier | Agence immobilière à Casablanca");

    const description = page?.description ||
      "Découvrez les opportunités immobilières proposées par A2E Immobilier à Casablanca et ses environs.";

    const canonical = `${SITE}${pathname}`;

    document.documentElement.lang = "fr";
    document.title = title;

    ensureMeta("name", "description", description);
    ensureMeta("name", "robots", "index, follow");
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", canonical);
    ensureMeta("property", "og:type", "website");
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);

    ensureCanonical(canonical);
  }, [pathname]);

  return null;
}