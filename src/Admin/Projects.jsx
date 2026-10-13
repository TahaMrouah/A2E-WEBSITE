import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaTrash,
  FaBuilding,
  FaSearch,
} from "react-icons/fa";

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

function getCategoryLabel(category) {
  const labels = {
    store: "Local commercial",
    commercial: "Local commercial",
    office: "Bureau",
    bureau: "Bureau",
  };

  return (
    labels[String(category || "").trim().toLowerCase()] ||
    category ||
    "—"
  );
}

function formatMoney(value) {
  if (value == null || value === "") return "—";

  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(Number(value)) + " DH"
  );
}

function formatArea(value) {
  if (value == null || value === "") return "—";

  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 2,
    }).format(Number(value)) + " m²"
  );
}

export default function ProjectUnitsAdmin() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [filter, setFilter] = useState("Tous");
  const [projectFilter, setProjectFilter] = useState("Tous");
  const [referenceFilter, setReferenceFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState("");

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

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message || "Impossible de charger les lots."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "L'API n'a pas retourné une liste de lots valide."
          );
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
    return [
      ...new Set(
        units
          .filter(
            (unit) =>
              projectFilter === "Tous" ||
              unit.projectKey === projectFilter
          )
          .map((unit) => unit.reference)
          .filter(Boolean)
      ),
    ].sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
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
        getCategoryLabel(unit.category),
        unit.category,
        unit.status,
        unit.location,
        unit.building,
        unit.floor,
        unit.orientation,
        unit.frontage,
      ]
        .filter((value) => value != null)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesReference =
        referenceFilter === "Tous" ||
        unit.reference === referenceFilter;

      return (
        matchesStatus &&
        matchesProject &&
        matchesSearch &&
        matchesReference
      );
    });
  }, [
    units,
    filter,
    projectFilter,
    search,
    referenceFilter,
  ]);

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
          headers: {
            "Content-Type": "application/json",
          },
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
            ? {
                ...item,
                status: data.unit?.status || status,
              }
            : item
        )
      );

      setNotice(`Statut de ${unit.reference} mis à jour.`);
    } catch (err) {
      setError(
        err.message || "Erreur lors de la modification du statut."
      );
    } finally {
      setBusyId("");
    }
  }

  async function deleteUnit(unit) {
    const confirmed = window.confirm(
      `Supprimer définitivement ${unit.reference} (${unit.project}) ?`
    );

    if (!confirmed) return;

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

      if (referenceFilter === unit.reference) {
        setReferenceFilter("Tous");
      }

      setNotice(`Le lot ${unit.reference} a été supprimé.`);
    } catch (err) {
      setError(
        err.message || "Erreur lors de la suppression du lot."
      );
    } finally {
      setBusyId("");
    }
  }

  function handleProjectChange(value) {
    setProjectFilter(value);
    setReferenceFilter("Tous");
    setNotice("");
  }

  function resetFilters() {
    setSearch("");
    setFilter("Tous");
    setProjectFilter("Tous");
    setReferenceFilter("Tous");
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
          <p>
            Green Lotus : locaux commerciaux. Central Hills :
            bureaux professionnels.
          </p>
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
          onClick={() => handleProjectChange("green")}
          className={projectFilter === "green" ? "selected" : ""}
        >
          <span>GREEN LOTUS</span>
          <strong>{greenCount}</strong>
          <small>locaux commerciaux</small>
        </button>

        <button
          type="button"
          onClick={() => handleProjectChange("central")}
          className={projectFilter === "central" ? "selected" : ""}
        >
          <span>CENTRAL HILLS</span>
          <strong>{centralCount}</strong>
          <small>bureaux professionnels</small>
        </button>

        <button
          type="button"
          onClick={() => handleProjectChange("Tous")}
          className={projectFilter === "Tous" ? "selected" : ""}
        >
          <span>TOUS LES PROJETS</span>
          <strong>{units.length}</strong>
          <small>tous les lots</small>
        </button>
      </div>

      {error && (
        <div role="alert" className="project-admin-error">
          {error}
        </div>
      )}

      {notice && (
        <div role="status" className="project-admin-notice">
          {notice}
        </div>
      )}

      <div className="project-admin-search">
        <span className="project-admin-search-icon">
          <FaSearch aria-hidden="true" />
        </span>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
            onChange={(event) =>
              setReferenceFilter(event.target.value)
            }
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
            onChange={(event) =>
              handleProjectChange(event.target.value)
            }
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
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="projects-reset"
          onClick={resetFilters}
        >
          Réinitialiser
        </button>
      </div>

      {loading ? (
        <p role="status">Chargement des lots...</p>
      ) : visibleUnits.length === 0 ? (
        <div className="project-admin-empty">
          Aucun lot trouvé. Vérifiez les filtres et les données
          renvoyées par l'API.
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
                    {PROJECT_NAMES[unit.projectKey] ||
                      unit.project ||
                      "Projet inconnu"}
                  </td>

                  <td>
                    <strong>{unit.reference || "—"}</strong>
                  </td>

                  <td>{getCategoryLabel(unit.category)}</td>

                  <td>
                    {formatArea(
                      unit.total ?? unit.saleable ?? unit.habitable
                    )}
                  </td>

                  <td>{formatMoney(unit.price)}</td>

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
                        <option key={status} value={status}>
                          {status}
                        </option>
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

      {!loading && (
        <p className="project-admin-results-count">
          {visibleUnits.length} résultat(s) affiché(s) sur{" "}
          {units.length} lot(s).
        </p>
      )}
    </main>
  );
}