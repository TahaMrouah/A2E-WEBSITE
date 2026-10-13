
import { useEffect, useMemo, useState } from "react";
import "../Style/projects.css";
import ScrollToTopButton from "../Components/scrollToTop";

const API_URL = "http://localhost:5000/api/projects";
const WHATSAPP_NUMBER = "212602991215";

const money = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  if (!Number.isFinite(number)) return "—";

  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(number) + " DH"
  );
};

const num = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  if (!Number.isFinite(number)) return "—";

  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(number);
};

const surface = (value) => {
  const formatted = num(value);
  return formatted === "—" ? "—" : `${formatted} m²`;
};

function normalizeUnit(unit) {
  const reference = String(unit.reference || unit.id || "").trim();
  const category = String(unit.category || "").toLowerCase();
  const projectName = String(unit.project || "").toLowerCase();
  const referenceLower = reference.toLowerCase();

  const isCommercial =
    referenceLower.startsWith("lot commercial") ||
    referenceLower.startsWith("cc-") ||
    category.includes("commercial") ||
    category.includes("magasin") ||
    category.includes("local");

  const isOffice =
    referenceLower.startsWith("bureau building") ||
    referenceLower.startsWith("bureau ") ||
    referenceLower.startsWith("bb-") ||
    category.includes("bureau") ||
    category.includes("office");

  let displayType = "unknown";

  if (isCommercial) {
    displayType = "commercial";
  } else if (isOffice) {
    displayType = "office";
  }

  // Correct project association:
  // Central Hills = commercial units
  // Green Lotus = offices
  let projectKey = unit.projectKey;

  if (displayType === "commercial") {
    projectKey = "central";
  } else if (displayType === "office") {
    projectKey = "green";
  } else if (projectName.includes("central hills")) {
    projectKey = "central";
  } else if (projectName.includes("green lotus")) {
    projectKey = "green";
  }

  return {
    ...unit,
    id: reference,
    reference,
    displayType,
    projectKey,
  };
}

function getWhatsAppLink(item, projectName) {
  const type =
    item.displayType === "commercial"
      ? "le local commercial"
      : "le bureau";

  const message =
    `Bonjour A2E, je souhaite obtenir des informations sur ${type} ` +
    `${item.reference} du projet ${projectName}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function MediaSlot({ title, video = false }) {
  return (
    <div
      className={`projects-media ${
        video ? "projects-media-video" : ""
      }`}
    >
      <span className="media-plus">{video ? "▶" : "+"}</span>
      <span>{title}</span>
      <small>
        Remplacez ce bloc par votre {video ? "vidéo" : "image"}
      </small>
    </div>
  );
}

function StoreCard({ item }) {
  return (
    <article className="projects-unit-card">
      <div className="unit-card-meta">
        <span>LOCAL COMMERCIAL</span>
        <span>{item.status || `Phase ${item.phase ?? "—"}`}</span>
      </div>

      <h3>{item.reference}</h3>

      <p className="unit-location">
        {item.location || "Emplacement à confirmer"}
        {item.frontage ? ` · Façade ${item.frontage}` : ""}
      </p>

      <p className="unit-price">{money(item.price)}</p>

      <div className="unit-specs">
        <div>
          <span>Surface RDC</span>
          <strong>{surface(item.rdc)}</strong>
        </div>

        <div>
          <span>Mezzanine</span>
          <strong>{surface(item.mezzanine)}</strong>
        </div>

        <div>
          <span>Surface totale</span>
          <strong>{surface(item.total)}</strong>
        </div>

        <div>
          <span>Surface pondérée</span>
          <strong>{surface(item.weighted)}</strong>
        </div>

        <div>
          <span>Prix/m²</span>
          <strong>{money(item.priceM2)}</strong>
        </div>
      </div>

      <a
        className="projects-unit-link"
        href={getWhatsAppLink(item, "Central Hills")}
        target="_blank"
        rel="noreferrer"
      >
        Demander des informations <span>↗</span>
      </a>
    </article>
  );
}

function OfficeCard({ item }) {
  return (
    <article className="projects-unit-card">
      <div className="unit-card-meta">
        <span>BUREAU · IMM {item.building ?? "—"}</span>
        <span>{item.status || "Disponibilité à confirmer"}</span>
      </div>

      <h3>{item.reference}</h3>

      <p className="unit-location">
        {item.floor || "Étage à confirmer"}
        {item.orientation ? ` · Orientation ${item.orientation}` : ""}
      </p>

      <p className="unit-price">{money(item.price)}</p>

      <div className="unit-specs">
        <div>
          <span>Surface habitable</span>
          <strong>{surface(item.habitable)}</strong>
        </div>

        <div>
          <span>Surface totale</span>
          <strong>{surface(item.total)}</strong>
        </div>

        <div>
          <span>Surface vendable</span>
          <strong>{surface(item.saleable)}</strong>
        </div>

        <div>
          <span>Terrasse couverte</span>
          <strong>{surface(item.covered)}</strong>
        </div>

        <div>
          <span>Terrasse cour</span>
          <strong>{surface(item.courtyard)}</strong>
        </div>

        <div>
          <span>Parking</span>
          <strong>{surface(item.parking)}</strong>
        </div>

        <div>
          <span>Façades</span>
          <strong>{item.facades ?? "—"}</strong>
        </div>

        <div>
          <span>Prix/m²</span>
          <strong>{money(item.priceM2)}</strong>
        </div>
      </div>

      <a
        className="projects-unit-link"
        href={getWhatsAppLink(item, "Green Lotus")}
        target="_blank"
        rel="noreferrer"
      >
        Demander des informations <span>↗</span>
      </a>
    </article>
  );
}

export default function ProjectsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [project, setProject] = useState("all");
  const [commercialSearch, setCommercialSearch] = useState("");
  const [officeSearch, setOfficeSearch] = useState("");
  const [phase, setPhase] = useState("all");
  const [building, setBuilding] = useState("all");
  const [floor, setFloor] = useState("all");
  const [commercialBudget, setCommercialBudget] = useState("all");
  const [officeBudget, setOfficeBudget] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUnits() {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La réponse de l'API n'est pas une liste.");
        }

        setUnits(data.map(normalizeUnit));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erreur lors du chargement des lots :", error);
          setApiError(
            "Impossible de charger les lots. Vérifiez que votre serveur backend fonctionne."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUnits();

    return () => controller.abort();
  }, []);

  // Central Hills: commercial units.
  const storesData = useMemo(
    () => units.filter((item) => item.displayType === "commercial"),
    [units]
  );

  // Green Lotus: offices.
  const officesData = useMemo(
    () => units.filter((item) => item.displayType === "office"),
    [units]
  );

  const filterItems = (items, search, maxBudget) => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.reference,
        item.project,
        item.category,
        item.status,
        item.location,
        item.frontage,
        item.orientation,
        item.floor,
        item.building,
        item.phase,
      ]
        .filter((value) => value !== null && value !== undefined)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesBudget =
        maxBudget === "all" ||
        (item.price != null &&
          Number.isFinite(Number(item.price)) &&
          Number(item.price) <= Number(maxBudget));

      return matchesSearch && matchesBudget;
    });
  };

  const stores = useMemo(() => {
    return filterItems(
      storesData.filter(
        (item) =>
          phase === "all" || String(item.phase) === phase
      ),
      commercialSearch,
      commercialBudget
    );
  }, [
    storesData,
    commercialSearch,
    commercialBudget,
    phase,
  ]);

  const offices = useMemo(() => {
    return filterItems(
      officesData.filter((item) => {
        const matchesBuilding =
          building === "all" ||
          String(item.building) === building;

        const matchesFloor =
          floor === "all" || String(item.floor) === floor;

        return matchesBuilding && matchesFloor;
      }),
      officeSearch,
      officeBudget
    );
  }, [
    officesData,
    officeSearch,
    officeBudget,
    building,
    floor,
  ]);

  const resetCommercialFilters = () => {
    setCommercialSearch("");
    setPhase("all");
    setCommercialBudget("all");
  };

  const resetOfficeFilters = () => {
    setOfficeSearch("");
    setBuilding("all");
    setFloor("all");
    setOfficeBudget("all");
  };

  const getPriceRange = (items) => {
    const prices = items
      .map((item) => item.price)
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          Number.isFinite(Number(value))
      )
      .map(Number);

    if (prices.length === 0) return "—";

    return `${money(Math.min(...prices))} – ${money(
      Math.max(...prices)
    )}`;
  };

  const getSurfaceRange = (items, field) => {
    const values = items
      .map((item) => item[field])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          Number.isFinite(Number(value))
      )
      .map(Number);

    if (values.length === 0) return "—";

    const min = Math.min(...values);
    const max = Math.max(...values);

    if (min === max) return surface(min);

    return `${surface(min)} – ${surface(max)}`;
  };

  return (
    <main className="a2e-projects">
      <ScrollToTopButton />

      {loading && (
        <p className="projects-empty" role="status">
          Chargement des programmes...
        </p>
      )}

      {apiError && (
        <p className="projects-empty" role="alert">
          {apiError}
        </p>
      )}

      <section className="projects-hero">
        <div className="projects-hero-copy">
          <span className="projects-kicker">
            A2E IMMOBILIER · NOS PROGRAMMES
          </span>

          <h1>
            L’immobilier
            <br />
            <em>d’exception, autrement.</em>
          </h1>

          <p>
            Découvrez nos opportunités immobilières sélectionnées
            pour vos ambitions professionnelles et vos investissements.
          </p>

          <a className="projects-button" href="#nos-projets">
            Découvrir nos projets <span>↓</span>
          </a>
        </div>

        <div className="projects-hero-mark">
          A2E <span>IMMOBILIER</span>
        </div>
      </section>

      <section className="projects-intro" id="nos-projets">
        <div>
          <span className="projects-kicker">LA SÉLECTION A2E</span>

          <h2>
            Deux projets.
            <br />
            <em>De nouvelles possibilités.</em>
          </h2>
        </div>

        <p>
          Découvrez les locaux commerciaux de Central Hills et les
          bureaux de Green Lotus. Consultez les surfaces et les prix,
          puis contactez notre équipe pour plus d’informations.
        </p>
      </section>

      <div className="projects-tabs" aria-label="Choisir un projet">
        <button
          type="button"
          className={project === "all" ? "selected" : ""}
          onClick={() => setProject("all")}
        >
          Tous les projets
        </button>

        <button
          type="button"
          className={project === "central" ? "selected" : ""}
          onClick={() => setProject("central")}
        >
          Central Hills <small>Locaux commerciaux</small>
        </button>

        <button
          type="button"
          className={project === "green" ? "selected" : ""}
          onClick={() => setProject("green")}
        >
          Green Lotus <small>Bureaux</small>
        </button>
      </div>

      {/* CENTRAL HILLS — COMMERCIAL UNITS */}
      {(project === "all" || project === "central") && (
        <section className="projects-section" id="central-hills">
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">
                PROGRAMME COMMERCIAL
              </span>

              <h2>
                Central <em>Hills</em>
              </h2>

              <p>
                Des locaux commerciaux adaptés à vos projets
                professionnels et à vos investissements.
              </p>
            </div>

            <span className="projects-count">
              <strong>
                {String(storesData.length).padStart(2, "0")}
              </strong>{" "}
              lots listés
            </span>
          </div>

          <div className="projects-gallery">
            <MediaSlot title="Photo principale — Central Hills" />
            <MediaSlot title="Vue du projet commercial" />
            <MediaSlot title="Vidéo de présentation" video />
          </div>

          <div className="projects-stat-row">
            <div>
              <span>Fourchette de prix</span>
              <strong>{getPriceRange(storesData)}</strong>
            </div>

            <div>
              <span>Surfaces totales</span>
              <strong>{getSurfaceRange(storesData, "total")}</strong>
            </div>

            <div>
              <span>Surface pondérée</span>
              <strong>{getSurfaceRange(storesData, "weighted")}</strong>
            </div>
          </div>

          <div className="projects-list-heading">
            <div>
              <h3>Les locaux commerciaux</h3>
              <p>
                Recherchez un lot par référence, phase ou budget.
              </p>
            </div>

            <span>{stores.length} résultat(s)</span>
          </div>

          <div className="projects-filters">
            <label>
              Référence du lot
              <input
                value={commercialSearch}
                onChange={(event) =>
                  setCommercialSearch(event.target.value)
                }
                placeholder="Ex. Lot Commercial-20-01"
              />
            </label>

            <label>
              Phase
              <select
                value={phase}
                onChange={(event) => setPhase(event.target.value)}
              >
                <option value="all">Toutes les phases</option>
                <option value="1">Phase 1</option>
                <option value="2">Phase 2</option>
              </select>
            </label>

            <label>
              Budget maximum
              <select
                value={commercialBudget}
                onChange={(event) =>
                  setCommercialBudget(event.target.value)
                }
              >
                <option value="all">Tous les budgets</option>
                <option value="1600000">1 600 000 DH</option>
                <option value="1800000">1 800 000 DH</option>
                <option value="2500000">2 500 000 DH</option>
              </select>
            </label>

            <button
              type="button"
              className="projects-reset"
              onClick={resetCommercialFilters}
            >
              Réinitialiser
            </button>
          </div>

          <div className="projects-units">
            {stores.map((item) => (
              <StoreCard
                key={item._id || item.reference}
                item={item}
              />
            ))}

            {!loading && !apiError && stores.length === 0 && (
              <p className="projects-empty">
                Aucun local commercial ne correspond à ces filtres.
              </p>
            )}
          </div>
        </section>
      )}

      {/* GREEN LOTUS — OFFICES */}
      {(project === "all" || project === "green") && (
        <section
          className="projects-section projects-section-cream"
          id="green-lotus"
        >
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">
                PROGRAMME PROFESSIONNEL
              </span>

              <h2>
                Green <em>Lotus</em>
              </h2>

              <p>
                Des bureaux aux configurations variées pour
                accompagner votre activité professionnelle.
              </p>
            </div>

            <span className="projects-count">
              <strong>
                {String(officesData.length).padStart(2, "0")}
              </strong>{" "}
              bureaux listés
            </span>
          </div>

          <div className="projects-gallery">
            <MediaSlot title="Photo principale — Green Lotus" />
            <MediaSlot title="Vue des bureaux" />
            <MediaSlot title="Vidéo de présentation" video />
          </div>

          <div className="projects-stat-row">
            <div>
              <span>Fourchette de prix</span>
              <strong>{getPriceRange(officesData)}</strong>
            </div>

            <div>
              <span>Surfaces totales</span>
              <strong>{getSurfaceRange(officesData, "total")}</strong>
            </div>

            <div>
              <span>Surfaces vendables</span>
              <strong>{getSurfaceRange(officesData, "saleable")}</strong>
            </div>
          </div>

          <div className="projects-list-heading">
            <div>
              <h3>Les bureaux</h3>
              <p>
                Filtrez par référence, immeuble, étage ou budget.
              </p>
            </div>

            <span>{offices.length} résultat(s)</span>
          </div>

          <div className="projects-filters projects-filters-office">
            <label>
              Référence du bureau
              <input
                value={officeSearch}
                onChange={(event) =>
                  setOfficeSearch(event.target.value)
                }
                placeholder="Ex. Bureau Building2-0-01"
              />
            </label>

            <label>
              Immeuble
              <select
                value={building}
                onChange={(event) => setBuilding(event.target.value)}
              >
                <option value="all">Tous les immeubles</option>
                <option value="1">Immeuble 1</option>
                <option value="2">Immeuble 2</option>
              </select>
            </label>

            <label>
              Étage
              <select
                value={floor}
                onChange={(event) => setFloor(event.target.value)}
              >
                <option value="all">Tous les étages</option>
                {[
                  "RDC",
                  "R+1",
                  "R+2",
                  "R+3",
                  "R+4",
                  "R+5",
                  "R+6",
                ].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Budget maximum
              <select
                value={officeBudget}
                onChange={(event) =>
                  setOfficeBudget(event.target.value)
                }
              >
                <option value="all">Tous les budgets</option>
                <option value="900000">900 000 DH</option>
                <option value="1000000">1 000 000 DH</option>
                <option value="1100000">1 100 000 DH</option>
                <option value="1200000">1 200 000 DH</option>
                <option value="1500000">1 500 000 DH</option>
              </select>
            </label>

            <button
              type="button"
              className="projects-reset"
              onClick={resetOfficeFilters}
            >
              Réinitialiser
            </button>
          </div>

          <div className="projects-units">
            {offices.map((item) => (
              <OfficeCard
                key={item._id || item.reference}
                item={item}
              />
            ))}

            {!loading && !apiError && offices.length === 0 && (
              <p className="projects-empty">
                Aucun bureau ne correspond à ces filtres.
              </p>
            )}
          </div>
        </section>
      )}

      <section className="projects-contact">
        <div>
          <span className="projects-kicker">UN PROJET EN TÊTE ?</span>

          <h2>
            Parlons de votre
            <br />
            <em>prochain investissement.</em>
          </h2>

          <p>
            Contactez A2E pour confirmer les disponibilités,
            obtenir les informations détaillées et organiser une visite.
          </p>
        </div>

        <a
          className="projects-button"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
        >
          Contacter A2E <span>↗</span>
        </a>
      </section>

      <p className="projects-disclaimer">
        Les prix, les surfaces et les disponibilités sont à confirmer
        auprès d’A2E avant tout engagement.
      </p>
    </main>
  );
}
