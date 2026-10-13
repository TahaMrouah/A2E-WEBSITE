
import { useMemo, useState } from "react";
import "../Style/projects.css";
import ScrollToTopButton from "../Components/scrollToTop";
const greenLotus = [
  ["CC-01-08", 1, "Angle BD", "6,5 × 8,4 m", 57, 28, 85, 71, 2440000, 34366],
  ["CC-01-09", 1, "Voie", "6,39 m", 57, 28, 85, 71, 1760000, 24789],
  ["CC-20-01", 2, "BD", "3,5 m", 53, 26, 79, 66, 1630000, 24697],
  ["CC-20-02", 2, "BD", "3,5 m", 54, 27, 81, 67.5, 1670000, 24741],
  ["CC-20-03", 2, "BD", "3,5 m", 54, 27, 81, 67.5, 1670000, 24741],
  ["CC-20-04", 2, "BD", "3,5 m", 54, 27, 81, 67.5, 1670000, 24741],
  ["CC-20-08", 2, "Angle BD", "8,8 × 6 m", 56, 28, 84, 70, 2410000, 34429],
  ["CC-20-09", 2, "Voie", "7,3 m", 49, 24, 73, 61, 1510000, 24754],
  ["CC-20-10", 2, "Voie", "6,7 m", 58, 29, 87, 72.5, 1570000, 21655],
].map(([id, phase, location, frontage, rdc, mezzanine, total, weighted, price, priceM2]) => ({
  id, phase, location, frontage, rdc, mezzanine, total, weighted, price, priceM2,
}));

const money = (n) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " DH";

const num = (n) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(n);

function makeOffice(building, floor, number) {
  const id = `BB${building}-${floor === "RDC" ? "0" : floor.slice(2)}-${String(number).padStart(2, "0")}`;

  if (building === 1) {
    const data = {
      1: [70, 86, 80, 1140000, 14250, "SE"],
      2: [64, 80, 74, 1050000, 14189, "SE"],
      3: [67, 83, 77, 1060000, 13766, "NO"],
      4: [64, 80, 74, 1030000, 13919, "NO"],
      5: [64, 80, 74, 1030000, 13919, "NO"],
      6: [64, 80, 74, 1030000, 13919, "NO"],
      7: [64, 80, 74, 1030000, 13919, "NO"],
      10: [61, 77, 71, 1010000, 14225, "SE"],
    }[number];

    if (!data) return null;

    const [habitable, total, saleable, price, priceM2, orientation] = data;
    return {
      id, building, floor, number, habitable, total, saleable, price, priceM2,
      orientation, facades: 1, covered: 4, courtyard: 0, parking: 12,
    };
  }

  const data = {
    1: [59, 63, 63, 890000, 14127, "SE", 1, null],
    2: [59, 63, 63, 890000, 14127, "SE", 1, null],
    3: [60, 64, 64, 910000, 14219, "SE-NE", 2, null],
    4: [57, 73, 67, 960000, 14328, "NE-NO", 2, 12],
    5: [64, 80, 74, 1030000, 13919, "NO", 1, 12],
    6: [64, 80, 74, 1030000, 13919, "NO", 1, 12],
    7: [64, 80, 74, 1030000, 13919, "NO", 1, 12],
    8: [64, 80, 74, 1030000, 13919, "NO", 1, 12],
    9: [67, 83, 77, 1060000, 13766, "NO", 1, 12],
  }[number];

  if (!data) return null;
  const [habitable, total, saleable, price, priceM2, orientation, facades, parking] = data;

  // Special ground-floor offices are defined separately below.
  if (floor === "RDC") return null;

  // R+4 office 4 is not listed as available in the supplied inventory.
  if (floor === "R+4" && number === 4) return null;

  return {
    id, building, floor, number, habitable, total, saleable, price, priceM2,
    orientation, facades, covered: 4, courtyard: 0, parking,
  };
}

const officeFloorNumbers = {
  1: {
    "R+1": [1, 2, 3, 4, 5, 6, 7, 10],
    "R+2": [1, 2, 3, 4, 5, 6],
    "R+3": [1, 2, 3, 4, 5, 6, 7, 10],
    "R+4": [2, 3, 6, 7],
    "R+5": [1, 2, 3, 4, 5, 6, 10],
    "R+6": [1, 2, 3, 4, 10],
  },
  2: {
    "R+1": [3, 5, 6, 7, 8, 9],
    "R+2": [4, 5, 6, 7, 8, 9],
    "R+3": [3, 5, 6, 7, 8, 9],
    "R+4": [1, 3, 5, 6, 7, 8, 9],
    "R+5": [1, 2, 5, 6, 7, 8, 9],
    "R+6": [5, 6, 7, 8, 9],
  },
};

const regularOffices = Object.entries(officeFloorNumbers).flatMap(([building, floors]) =>
  Object.entries(floors).flatMap(([floor, numbers]) =>
    numbers.map((n) => makeOffice(Number(building), floor, n)).filter(Boolean)
  )
);

const groundOffices = [
  ["BB2-0-01", 1, "SE", 1, 62, 0, 52, 12, 126, 85, 1210000, 14180],
  ["BB2-0-02", 2, "SE", 1, 63, 0, 38, 12, 113, 82, 1160000, 14204],
  ["BB2-0-03", 3, "SE-NE", 2, 63, 0, 94, 12, 169, 100, 1430000, 14252],
  ["BB2-0-04", 4, "NE-NO", 2, 43, 20, 119, null, 182, 103, 1470000, 14318],
  ["BB2-0-05", 5, "NO", 1, 48, 20, 34, null, 102, 79, 1100000, 13866],
  ["BB2-0-06", 6, "NO", 1, 48, 20, 34, null, 102, 79, 1100000, 13866],
  ["BB2-0-07", 7, "NO", 1, 61, 26, 42, 12, 141, 107, 1480000, 13832],
  ["BB2-0-09", 9, "SE", 1, 57, 0, 51, null, 108, 74, 1050000, 14189],
].map(([id, number, orientation, facades, habitable, covered, courtyard, parking, total, saleable, price, priceM2]) => ({
  id, building: 2, floor: "RDC", number, orientation, facades, habitable, covered,
  courtyard, parking, total, saleable, price, priceM2,
}));

const centralHills = [...groundOffices, ...regularOffices];

function MediaSlot({ title, video = false }) {
  return (
    <div className={`projects-media ${video ? "projects-media-video" : ""}`}>
      <span className="media-plus">{video ? "▶" : "+"}</span>
      <span>{title}</span>
      <small>Remplacez ce bloc par votre {video ? "vidéo" : "image"}</small>
    </div>
  );
}

function StoreCard({ item }) {
  return (
    <article className="projects-unit-card">
        
      <div className="unit-card-meta">
        <span>LOCAL COMMERCIAL</span>
        <span>Phase {item.phase}</span>
      </div>
      <h3>{item.id}</h3>
      <p className="unit-location">{item.location} · Façade {item.frontage}</p>
      <p className="unit-price">{money(item.price)}</p>
      <div className="unit-specs">
        <div><span>Surface RDC</span><strong>{num(item.rdc)} m²</strong></div>
        <div><span>Mezzanine</span><strong>{num(item.mezzanine)} m²</strong></div>
        <div><span>Surface totale</span><strong>{num(item.total)} m²</strong></div>
        <div><span>Surface pondérée</span><strong>{num(item.weighted)} m²</strong></div>
        <div><span>Prix/m² indiqué</span><strong>{num(item.priceM2)} DH</strong></div>
      </div>
      <a className="projects-unit-link" href={`https://wa.me/+212602991215?text=${encodeURIComponent(`Bonjour A2E, je souhaite des informations sur le local ${item.id} du projet Green Lotus.`)}`} target="_blank" rel="noreferrer">
        Demander des informations <span>↗</span>
      </a>
    </article>
  );
}

function OfficeCard({ item }) {
  return (
    <article className="projects-unit-card">
      <div className="unit-card-meta">
        <span>BUREAU · IMM{item.building}</span>
        <span>Libre selon la liste reçue</span>
      </div>
      <h3>{item.id}</h3>
      <p className="unit-location">{item.floor} · Orientation {item.orientation}</p>
      <p className="unit-price">{money(item.price)}</p>
      <div className="unit-specs">
        <div><span>Habitable</span><strong>{num(item.habitable)} m²</strong></div>
        <div><span>Surface totale</span><strong>{num(item.total)} m²</strong></div>
        <div><span>Surface vendable</span><strong>{num(item.saleable)} m²</strong></div>
        <div><span>Terrasse couverte</span><strong>{num(item.covered)} m²</strong></div>
        <div><span>Terrasse cour</span><strong>{num(item.courtyard)} m²</strong></div>
        <div><span>Parking</span><strong>{item.parking == null ? "Non précisé" : `${num(item.parking)} m²`}</strong></div>
        <div><span>Façades</span><strong>{item.facades}</strong></div>
        <div><span>Prix/m² indiqué</span><strong>{num(item.priceM2)} DH</strong></div>
      </div>
      <a className="projects-unit-link" href={`https://wa.me/+212602991215?text=${encodeURIComponent(`Bonjour A2E, je souhaite des informations sur le bureau ${item.id} du projet Central Hills.`)}`} target="_blank" rel="noreferrer">
        Demander des informations <span>↗</span>
      </a>
    </article>
  );
}

export default function ProjectsPage() {
  const [project, setProject] = useState("all");
  const [search, setSearch] = useState("");
  const [phase, setPhase] = useState("all");
  const [building, setBuilding] = useState("all");
  const [floor, setFloor] = useState("all");
  const [budget, setBudget] = useState("all");

  const matches = (item) => {
    const query = `${item.id} ${item.location || ""} ${item.floor || ""} ${item.orientation || ""}`.toLowerCase();
    return query.includes(search.toLowerCase()) && (budget === "all" || item.price <= Number(budget));
  };

  const stores = useMemo(() => greenLotus.filter((item) =>
    matches(item) && (phase === "all" || item.phase === Number(phase))
  ), [search, phase, budget]);

  const offices = useMemo(() => centralHills.filter((item) =>
    matches(item) &&
    (building === "all" || item.building === Number(building)) &&
    (floor === "all" || item.floor === floor)
  ), [search, budget, building, floor]);

  const resetFilters = () => {
    setSearch("");
    setPhase("all");
    setBuilding("all");
    setFloor("all");
    setBudget("all");
  };

  return (
    <main className="a2e-projects">
        <ScrollToTopButton/>
      <section className="projects-hero">
        <div className="projects-hero-copy">
          <span className="projects-kicker">A2E IMMOBILIER · NOS PROGRAMMES</span>
          <h1>L’immobilier<br /><em>d’exception, autrement.</em></h1>
          <p>Découvrez des opportunités immobilières sélectionnées pour vos ambitions professionnelles et vos investissements.</p>
          <a className="projects-button" href="#nos-projets">Découvrir nos projets <span>↓</span></a>
        </div>
        <div className="projects-hero-mark">A2E <span>IMMOBILIER</span></div>
      </section>

      <section className="projects-intro" id="nos-projets">
        <div>
          <span className="projects-kicker">LA SÉLECTION A2E</span>
          <h2>Deux projets.<br /><em>De nouvelles possibilités.</em></h2>
        </div>
        <p>Explorez les locaux commerciaux de Green Lotus et les bureaux de Central Hills. Consultez les surfaces et les prix, puis contactez notre équipe pour confirmer la disponibilité.</p>
      </section>

      <div className="projects-tabs" aria-label="Choisir un projet">
        <button className={project === "all" ? "selected" : ""} onClick={() => setProject("all")}>Tous les projets</button>
        <button className={project === "green" ? "selected" : ""} onClick={() => setProject("green")}>Green Lotus <small>Commerces</small></button>
        <button className={project === "central" ? "selected" : ""} onClick={() => setProject("central")}>Central Hills <small>Bureaux</small></button>
      </div>

      {(project === "all" || project === "green") && (
        <section className="projects-section" id="green-lotus">
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">PROGRAMME COMMERCIAL</span>
              <h2>Green <em>Lotus</em></h2>
              <p>Des espaces commerciaux pour donner de la visibilité à votre activité.</p>
            </div>
            <span className="projects-count"><strong>09</strong> lots listés</span>
          </div>
          <div className="projects-gallery">
            <MediaSlot title="Photo principale — Green Lotus" />
            <MediaSlot title="Vue du projet" />
            <MediaSlot title="Vidéo de présentation" video />
          </div>
          <div className="projects-stat-row">
            <div><span>Prix indiqués</span><strong>1,51 – 2,44 M DH</strong></div>
            <div><span>Surfaces totales</span><strong>73 – 87 m²</strong></div>
            <div><span>Phases</span><strong>01 & 02</strong></div>
          </div>
          <div className="projects-list-heading">
            <div><h3>Les locaux commerciaux</h3><p>Filtrez par phase, budget ou référence du lot.</p></div>
            <span>{stores.length} résultat(s)</span>
          </div>
          <div className="projects-filters">
            <label>Référence<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ex. CC-20-01" /></label>
            <label>Phase<select value={phase} onChange={(e) => setPhase(e.target.value)}><option value="all">Toutes les phases</option><option value="1">Phase 1</option><option value="2">Phase 2</option></select></label>
            <label>Budget maximum<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="all">Tous les budgets</option><option value="1600000">1 600 000 DH</option><option value="1800000">1 800 000 DH</option><option value="2500000">2 500 000 DH</option></select></label>
            <button className="projects-reset" onClick={resetFilters}>Réinitialiser</button>
          </div>
          <div className="projects-units">
            {stores.map((item) => <StoreCard key={item.id} item={item} />)}
            {!stores.length && <p className="projects-empty">Aucun lot ne correspond à ces filtres.</p>}
          </div>
        </section>
      )}

      {(project === "all" || project === "central") && (
        <section className="projects-section projects-section-cream" id="central-hills">
          <div className="projects-section-heading">
            <div>
              <span className="projects-kicker">PROGRAMME PROFESSIONNEL</span>
              <h2>Central <em>Hills</em></h2>
              <p>Des bureaux aux configurations variées, avec des surfaces et des orientations différentes.</p>
            </div>
            <span className="projects-count"><strong>{String(centralHills.length).padStart(2, "0")}</strong> bureaux listés</span>
          </div>
          <div className="projects-gallery">
            <MediaSlot title="Photo principale — Central Hills" />
            <MediaSlot title="Vue des bureaux" />
            <MediaSlot title="Vidéo de présentation" video />
          </div>
          <div className="projects-stat-row">
            <div><span>Prix indiqués</span><strong>890 000 – 1 480 000 DH</strong></div>
            <div><span>Surfaces totales</span><strong>63 – 182 m²</strong></div>
            <div><span>Immeubles</span><strong>Imm1 & Imm2</strong></div>
          </div>
          <div className="projects-list-heading">
            <div><h3>Les bureaux</h3><p>Les disponibilités sont à confirmer auprès d’A2E.</p></div>
            <span>{offices.length} résultat(s)</span>
          </div>
          <div className="projects-filters projects-filters-office">
            <label>Référence<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ex. BB2-0-01" /></label>
            <label>Immeuble<select value={building} onChange={(e) => setBuilding(e.target.value)}><option value="all">Tous les immeubles</option><option value="1">Immeuble 1</option><option value="2">Immeuble 2</option></select></label>
            <label>Étage<select value={floor} onChange={(e) => setFloor(e.target.value)}><option value="all">Tous les étages</option>{["RDC", "R+1", "R+2", "R+3", "R+4", "R+5", "R+6"].map((f) => <option key={f}>{f}</option>)}</select></label>
            <label>Budget maximum<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="all">Tous les budgets</option><option value="900000">900 000 DH</option><option value="1000000">1 000 000 DH</option><option value="1100000">1 100 000 DH</option><option value="1200000">1 200 000 DH</option><option value="1500000">1 500 000 DH</option></select></label>
            <button className="projects-reset" onClick={resetFilters}>Réinitialiser</button>
          </div>
          <div className="projects-units">
            {offices.map((item) => <OfficeCard key={item.id} item={item} />)}
            {!offices.length && <p className="projects-empty">Aucun bureau ne correspond à ces filtres.</p>}
          </div>
        </section>
      )}

      <section className="projects-contact">
        <div>
          <span className="projects-kicker">UN PROJET EN TÊTE ?</span>
          <h2>Parlons de votre<br /><em>prochain investissement.</em></h2>
          <p>Contactez A2E pour confirmer les disponibilités, obtenir les documents et organiser une visite.</p>
        </div>
        <a className="projects-button" href="https://wa.me/+212602991215" target="_blank" rel="noreferrer">Contacter A2E <span>↗</span></a>
      </section>
      <p className="projects-disclaimer">Prix, surfaces et disponibilités à confirmer auprès d’A2E avant publication définitive ou engagement.</p>
    </main>
  );
}
