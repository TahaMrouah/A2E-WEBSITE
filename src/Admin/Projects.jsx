
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaBuilding } from "react-icons/fa";
import API_URL from "../configs/api";
import "../Style/Admin/projects.css";
import ScrollToTopButton from "../Components/scrollToTop";

const STATUSES = [
  "Libre",
  "Réservé",
  "Paiement en attente",
  "Vendu",
];

const PROJECT_NAMES = {
  green: "Green Lotus",
  central: "Central Hills",
};

export default function ProjectUnitsAdmin() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [projectFilter, setProjectFilter] = useState("Tous");
  const [busyId, setBusyId] = useState("");
  const [search, setSearch] = useState("");
  const [referenceFilter, setReferenceFilter] = useState("Tous");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUnits() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/projects`, {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json().catch(() => []);

        if (!response.ok) {
          throw new Error(
            data.message || "Impossible de charger les lots."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Format de données inattendu.");
        }

        setUnits(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Une erreur est survenue.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUnits();
    return () => controller.abort();
  }, []);
const references = useMemo(() => {
  return [...new Set(
    units
      .filter((unit) => {
        return (
          projectFilter === "Tous" ||
          unit.projectKey === projectFilter
        );
      })
      .map((unit) => unit.reference)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  }));
}, [units, projectFilter]);
  const visibleUnits = useMemo(() => {
  const query = search.trim().toLowerCase();

  return units.filter((unit) => {
    const matchesStatus =
      filter === "Tous" || unit.status === filter;

    const matchesProject =
      projectFilter === "Tous" ||
      unit.projectKey === projectFilter;

    const searchableText = [
      unit.reference,
      unit.project,
      PROJECT_NAMES[unit.projectKey],
      unit.category,
      unit.status,
      unit.location,
      unit.building,
      unit.floor,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);
const matchesReference =
      referenceFilter === "Tous" ||
      unit.reference === referenceFilter;
    return matchesStatus && matchesProject && matchesSearch && matchesReference;
  });
}, [units, filter, projectFilter, search, referenceFilter]);

  async function updateStatus(unit, status) {
    try {
      setBusyId(String(unit._id));
      setError("");
      setNotice("");

      const response = await fetch(
        `${API_URL}/projects/${unit._id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de modifier le statut."
        );
      }

      setUnits((previous) =>
        previous.map((item) =>
          item._id === unit._id
            ? { ...item, status: data.unit?.status || status }
            : item
        )
      );

      setNotice(`Statut de ${unit.reference} mis à jour.`);
    } catch (err) {
      setError(err.message || "Erreur lors de la modification.");
    } finally {
      setBusyId("");
    }
  }

  async function deleteUnit(unit) {
    if (
      !window.confirm(
        `Supprimer définitivement ${unit.reference} (${unit.project}) ?`
      )
    ) {
      return;
    }

    try {
      setBusyId(String(unit._id));
      setError("");
      setNotice("");

      const response = await fetch(
        `${API_URL}/projects/${unit._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de supprimer ce lot."
        );
      }

      setUnits((previous) =>
        previous.filter((item) => item._id !== unit._id)
      );

      setNotice(`Le lot ${unit.reference} a été supprimé.`);
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression.");
    } finally {
      setBusyId("");
    }
  }

  const greenCount = units.filter(
    (unit) => unit.projectKey === "green"
  ).length;

  const centralCount = units.filter(
    (unit) => unit.projectKey === "central"
  ).length;

  return (
    <main className="project-admin-page">
        <ScrollToTopButton />
      <Link to="/admin" className="project-admin-back">
        <FaArrowLeft /> Retour au dashboard
      </Link>

      <header className="project-admin-header">
        <div>
          <span>GESTION DES PROGRAMMES</span>
          <h1>Projets immobiliers</h1>
          <p>Green Lotus et Central Hills : gestion des lots.</p>
        </div>

        <div className="project-admin-count">
          <FaBuilding />
          <strong>{units.length}</strong>
          <span>lot(s)</span>
        </div>
      </header>

      <div className="project-admin-summary">
        <button
          type="button"
          onClick={() => setProjectFilter("green")}
          className={
            projectFilter === "green" ? "selected" : ""
          }
        >
          <span>GREEN LOTUS</span>
          <strong>{greenCount}</strong>
          <small>lots commerciaux</small>
        </button>

        <button
          type="button"
          onClick={() => setProjectFilter("central")}
          className={
            projectFilter === "central" ? "selected" : ""
          }
        >
          <span>CENTRAL HILLS</span>
          <strong>{centralCount}</strong>
          <small>lots et bureaux</small>
        </button>

        <button
          type="button"
          onClick={() => setProjectFilter("Tous")}
          className={projectFilter === "Tous" ? "selected" : ""}
        >
          <span>TOUS LES PROJETS</span>
          <strong>{units.length}</strong>
          <small>tous les lots</small>
        </button>
      </div>

      {error && <div role="alert" className="project-admin-error">{error}</div>}
      {notice && <div role="status" className="project-admin-notice">{notice}</div>}

<div className="project-admin-search">
  <span className="project-admin-search-icon">
    <icon name="search" size="18px" />
  </span>

  <input
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Rechercher par référence, projet, type..."
    aria-label="Rechercher un lot immobilier"
  />

  {search && (
    <button
      type="button"
      className="project-admin-search-clear"
      onClick={() => setSearch("")}
      aria-label="Effacer la recherche"
    >
      Effacer
    </button>
  )}
</div>

      <div className="project-admin-toolbar">
        
<label>
  Référence du lot
  <select
    value={referenceFilter}
    onChange={(e) => setReferenceFilter(e.target.value)}
  >
    <option value="Tous">Toutes les références</option>

    {references.map((reference) => (
      <option key={reference} value={reference}>
        {reference}
      </option>
    ))}
  </select>
</label>

        <label>
          Projet
          <select
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
          >
            <option value="Tous">Tous les projets</option>
            <option value="green">Green Lotus</option>
            <option value="central">Central Hills</option>
          </select>
        </label>

        <label>
          Statut
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="Tous">Tous les statuts</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Chargement des lots...</p>
      ) : visibleUnits.length === 0 ? (
        <div className="project-admin-empty">
          Aucun lot trouvé. Vérifiez les filtres et les données de l'API.
        </div>
      ) : (
        <div className="project-admin-table-wrap">
          <table className="project-admin-table">
            <thead>
              <tr>
                <th>Projet</th>
                <th>Référence</th>
                <th>Type</th>
                <th>Surface</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleUnits.map((unit) => (
                <tr key={unit._id}>
                  <td>
                    {PROJECT_NAMES[unit.projectKey] || unit.project || "Projet inconnu"}
                  </td>
                  <td><strong>{unit.reference}</strong></td>
                  <td>{unit.category || "—"}</td>
                  <td>
                    {unit.total != null
                      ? `${unit.total} m²`
                      : unit.saleable != null
                        ? `${unit.saleable} m²`
                        : "—"}
                  </td>
                  <td>
                    {unit.price != null
                      ? `${Number(unit.price).toLocaleString("fr-FR")} DH`
                      : "—"}
                  </td>
                  <td>
                    <select
                      aria-label={`Statut du lot ${unit.reference}`}
                      value={unit.status || "Libre"}
                      disabled={busyId === String(unit._id)}
                      onChange={(event) =>
                        updateStatus(unit, event.target.value)
                      }
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="project-admin-delete"
                      disabled={busyId === String(unit._id)}
                      onClick={() => deleteUnit(unit)}
                    >
                      <FaTrash /> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
