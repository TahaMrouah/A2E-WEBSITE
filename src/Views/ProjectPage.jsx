
import { useEffect, useMemo, useState } from "react";
import "../Style/projects.css";
import ScrollToTopButton from "../Components/scrollToTop";

const API_URL = "http://localhost:5000/api/projects";
const WHATSAPP_NUMBER = "212602991215";

const money = (value) =>
  new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0) + " DH";

const num = (value) =>
  value == null
    ? "—"
    : new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 1,
      }).format(Number(value) || 0);

function normalizeUnit(unit) {
  const projectName = String(unit.project || "").toLowerCase();
  const category = String(unit.category || "").toLowerCase();

  let projectKey = unit.projectKey;

  if (!projectKey) {
    if (
      projectName.includes("green lotus") ||
      projectName.includes("greenlotus")
    ) {
      projectKey = "green";
    } else if (
      projectName.includes("central hills") ||
      projectName.includes("centralhills")
    ) {
      projectKey = "central";
    } else if (
      category.includes("commercial") ||
      category.includes("store") ||
      category.includes("magasin") ||
      category.includes("local")
    ) {
      projectKey = "green";
    } else if (
      category.includes("office") ||
      category.includes("bureau")
    ) {
      projectKey = "central";
    }
  }

  return {
    ...unit,
    id: unit.reference || unit.id,
    projectKey,
  };
}

function getWhatsAppLink(item, projectName) {
  const message = `Bonjour A2E, je souhaite des informations sur ${
    item.category?.toLowerCase().includes("bureau") ||
    item.category?.toLowerCase().includes("office")
      ? "le bureau"
      : item.projectKey === "green"
        ? "le local commercial"
        : "le bien"
  } ${item.id} du projet ${projectName}.`;

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
        <span>Phase {item.phase ?? "—"}</span>
      </div>

      <h3>{item.id}</h3>

      <p className="unit-location">
        {item.location || "Emplacement à confirmer"}
        {item.frontage ? ` · Façade ${item.frontage}` : ""}
      </p>

      <p className="unit-price">{money(item.price)}</p>

      <div className="unit-specs">
        <div>
          <span>Surface RDC</span>
          <strong>{num(item.rdc)} m²</strong>
        </div>

        <div>
          <span>Mezzanine</span>
          <strong>{num(item.mezzanine)} m²</strong>
        </div>

        <div>
          <span>Surface totale</span>
          <strong>{num(item.total)} m²</strong>
        </div>

        <div>
          <span>Surface pondérée</span>
          <strong>{num(item.weighted)} m²</strong>
        </div>

        <div>
          <span>Prix/m² indiqué</span>
          <strong>{num(item.priceM2)} DH</strong>
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

function OfficeCard({ item }) {
  return (
    <article className="projects-unit-card">
      <div className="unit-card-meta">
        <span>BUREAU · IMM{item.building ?? "—"}</span>
        <span>{item.status || "Disponibilité à confirmer"}</span>
      </div>

      <h3>{item.id}</h3>

      <p className="unit-location">
        {item.floor || "Étage à confirmer"}
        {item.orientation
          ? ` · Orientation ${item.orientation}`
          : ""}
      </p>

      <p className="unit-price">{money(item.price)}</p>

      <div className="unit-specs">
        <div>
          <span>Habitable</span>
          <strong>{num(item.habitable)} m²</strong>
        </div>

        <div>
          <span>Surface totale</span>
          <strong>{num(item.total)} m²</strong>
        </div>

        <div>
          <span>Surface vendable</span>
          <strong>{num(item.saleable)} m²</strong>
        </div>

        <div>
          <span>Terrasse couverte</span>
          <strong>{num(item.covered)} m²</strong>
        </div>

        <div>
          <span>Terrasse cour</span>
          <strong>{num(item.courtyard)} m²</strong>
        </div>

        <div>
          <span>Parking</span>
          <strong>
            {item.parking == null
              ? "Non précisé"
              : `${num(item.parking)} m²`}
          </strong>
        </div>

        <div>
          <span>Façades</span>
          <strong>{item.facades ?? "—"}</strong>
        </div>

        <div>
          <span>Prix/m² indiqué</span>
          <strong>{num(item.priceM2)} DH</strong>
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

export default function ProjectsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [project, setProject] = useState("all");
  const [search, setSearch] = useState("");
  const [phase, setPhase] = useState("all");
  const [building, setBuilding] = useState("all");
  const [floor, setFloor] = useState("all");
  const [budget, setBudget] = useState("all");

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
          throw new Error(
            `Erreur API : ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "L'API n'a pas retourné une liste de lots."
          );
        }

        setUnits(data.map(normalizeUnit));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Erreur de chargement des projets :",
            error
          );

          setApiError(
            "Impossible de charger les programmes pour le moment. Veuillez réessayer plus tard."
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

  const storesData = useMemo(
    () => units.filter((item) => item.projectKey === "green"),
    [units]
  );

  const officesData = useMemo(
    () => units.filter((item) => item.projectKey === "central"),
    [units]
  );

  const matches = (item) => {
    const query = [
      item.id,
      item.location,
      item.frontage,
      item.floor,
      item.orientation,
      item.building,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = query.includes(
      search.trim().toLowerCase()
    );

    const matchesBudget =
      budget === "all" ||
      Number(item.price) <= Number(budget);

    return matchesSearch && matchesBudget;
  };

  const stores = useMemo(
    () =>
      storesData.filter(
        (item) =>
          matches(item) &&
          (phase === "all" ||
            Number(item.phase) === Number(phase))
      ),
    [storesData, search, phase, budget]
  );

  const offices = useMemo(
    () =>
      officesData.filter(
        (item) =>
          matches(item) &&
          (building === "all" ||
            Number(item.building) === Number(building)) &&
          (floor === "all" || item.floor === floor)
      ),
    [officesData, search, budget, building, floor]
  );

  const resetFilters = () => {
    setSearch("");
    setPhase("all");
    setBuilding("all");
    setFloor("all");
    setBudget("all");
  };

  const storePrices = storesData
    .map((item) => Number(item.price))
    .filter(Number.isFinite);

  const officePrices = officesData
    .map((item) => Number(item.price))
    .filter(Number.isFinite);

  const storeAreas = storesData
    .map((item) => Number(item.total))
    .filter(Number.isFinite);

  const officeAreas = officesData
    .map((item) => Number(item.total))
    .filter(Number.isFinite);

  const range = (values) => {
    if (!values.length) return "—";

    const min = Math.min(...values);
    const max = Math.max(...values);

    if (min === max) return num(min);

    return `${num(min)} – ${num(max)}`;
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
            Découvrez des opportunités immobilières
            sélectionnées pour vos ambitions professionnelles
            et vos investissements.
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
          <span className="projects-kicker">
            LA SÉLECTION A2E
          </span>

          <h2>
            Deux projets.
            <br />
            <em>De nouvelles possibilités.</em>
          </h2>
        </div>

        <p>
          Explorez les locaux commerciaux de Green Lotus et
          les bureaux de Central Hills. Consultez les surfaces
          et les prix, puis contactez notre équipe pour
          confirmer la disponibilité.
        </p>
      </section>

      <div className="projects-tabs" aria-label="Choisir un projet">
        <button
          className={project === "all" ? "selected" : ""}
          onClick={() => setProject("all")}
        >
          Tous les projets
        </button>

        <button
          className={project === "green" ? "selected" : ""}
          onClick={() => setProject("green")}
        >
          Green Lotus <small>Commerces</small>
        </button>

        <button
          className={project === "central" ? "selected" : ""}
          onClick={() => setProject("central")}
        >
          Central Hills <small>Bureaux</small>
        </button>
      </div>

      {(project === "all" || project === "green") && (
        <section className="projects-section" id="green-lotus">
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">
                PROGRAMME COMMERCIAL
              </span>

              <h2>
                Green <em>Lotus</em>
              </h2>

              <p>
                Des espaces commerciaux pour donner de la
                visibilité à votre activité.
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
            <MediaSlot title="Photo principale — Green Lotus" />
            <MediaSlot title="Vue du projet" />
            <MediaSlot
              title="Vidéo de présentation"
              video
            />
          </div>

          <div className="projects-stat-row">
            <div>
              <span>Prix indiqués</span>
              <strong>
                {range(storePrices) === "—"
                  ? "—"
                  : `${money(Math.min(...storePrices))} – ${money(
                      Math.max(...storePrices)
                    )}`}
              </strong>
            </div>

            <div>
              <span>Surfaces totales</span>
              <strong>
                {range(storeAreas) === "—"
                  ? "—"
                  : `${range(storeAreas)} m²`}
              </strong>
            </div>

            <div>
              <span>Phases</span>
              <strong>Selon disponibilité</strong>
            </div>
          </div>

          <div className="projects-list-heading">
            <div>
              <h3>Les locaux commerciaux</h3>
              <p>
                Filtrez par phase, budget ou référence du lot.
              </p>
            </div>

            <span>{stores.length} résultat(s)</span>
          </div>

          <div className="projects-filters">
            <label>
              Référence
              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Ex. CC-20-01"
              />
            </label>

            <label>
              Phase
              <select
                value={phase}
                onChange={(event) =>
                  setPhase(event.target.value)
                }
              >
                <option value="all">Toutes les phases</option>
                <option value="1">Phase 1</option>
                <option value="2">Phase 2</option>
              </select>
            </label>

            <label>
              Budget maximum
              <select
                value={budget}
                onChange={(event) =>
                  setBudget(event.target.value)
                }
              >
                <option value="all">Tous les budgets</option>
                <option value="1600000">1 600 000 DH</option>
                <option value="1800000">1 800 000 DH</option>
                <option value="2500000">2 500 000 DH</option>
              </select>
            </label>

            <button
              className="projects-reset"
              onClick={resetFilters}
            >
              Réinitialiser
            </button>
          </div>

          <div className="projects-units">
            {stores.map((item) => (
              <StoreCard key={item.id} item={item} />
            ))}

            {!loading && !apiError && stores.length === 0 && (
              <p className="projects-empty">
                Aucun lot ne correspond à ces filtres.
              </p>
            )}
          </div>
        </section>
      )}

      {(project === "all" || project === "central") && (
        <section
          className="projects-section projects-section-cream"
          id="central-hills"
        >
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">
                PROGRAMME PROFESSIONNEL
              </span>

              <h2>
                Central <em>Hills</em>
              </h2>

              <p>
                Des bureaux aux configurations variées, avec
                des surfaces et des orientations différentes.
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
            <MediaSlot title="Photo principale — Central Hills" />
            <MediaSlot title="Vue des bureaux" />
            <MediaSlot
              title="Vidéo de présentation"
              video
            />
          </div>

          <div className="projects-stat-row">
            <div>
              <span>Prix indiqués</span>
              <strong>
                {officePrices.length
                  ? `${money(Math.min(...officePrices))} – ${money(
                      Math.max(...officePrices)
                    )}`
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Surfaces totales</span>
              <strong>
                {range(officeAreas) === "—"
                  ? "—"
                  : `${range(officeAreas)} m²`}
              </strong>
            </div>

            <div>
              <span>Immeubles</span>
              <strong>Imm1 & Imm2</strong>
            </div>
          </div>

          <div className="projects-list-heading">
            <div>
              <h3>Les bureaux</h3>
              <p>
                Les disponibilités sont à confirmer auprès
                d’A2E.
              </p>
            </div>

            <span>{offices.length} résultat(s)</span>
          </div>

          <div className="projects-filters projects-filters-office">
            <label>
              Référence
              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Ex. BB2-0-01"
              />
            </label>

            <label>
              Immeuble
              <select
                value={building}
                onChange={(event) =>
                  setBuilding(event.target.value)
                }
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
                onChange={(event) =>
                  setFloor(event.target.value)
                }
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
                value={budget}
                onChange={(event) =>
                  setBudget(event.target.value)
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
              className="projects-reset"
              onClick={resetFilters}
            >
              Réinitialiser
            </button>
          </div>

          <div className="projects-units">
            {offices.map((item) => (
              <OfficeCard key={item.id} item={item} />
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
          <span className="projects-kicker">
            UN PROJET EN TÊTE ?
          </span>

          <h2>
            Parlons de votre
            <br />
            <em>prochain investissement.</em>
          </h2>

          <p>
            Contactez A2E pour confirmer les disponibilités,
            obtenir les documents et organiser une visite.
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
        Prix, surfaces et disponibilités à confirmer auprès
        d’A2E avant publication définitive ou engagement.
      </p>
    </main>
  );
}
