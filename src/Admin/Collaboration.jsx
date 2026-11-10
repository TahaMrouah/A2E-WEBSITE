
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHandshake,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

import API_URL from "../configs/api";
import "../Style/Admin/collaboration.css";

export default function Collaborations() {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
const [actionNotice, setActionNotice] = useState("");
  // Load all collaboration requests
  const fetchCollaborations = useCallback(async (signal) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/collaboration`, {
        method: "GET",
        credentials: "include",
        signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de charger les demandes."
        );
      }

      setCollaborations(data.collaborations || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Une erreur est survenue.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollaborations(controller.signal);

    return () => controller.abort();
  }, [fetchCollaborations]);

  // Accept a collaboration request
  const handleAccept = async (id) => {
    if (actionLoading) return;
    
    try {
      setActionLoading(id);
      setActionError("");

      const response = await fetch(
        `${API_URL}/collaboration/${id}/accept`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "accepted",
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible d'accepter cette demande."
        );
      }
      setActionNotice(data.message || "Demande traitée.");
      setCollaborations((previous) =>
        previous.map((item) =>
          item._id === id
            ? {
                ...item,
                ...(data.collaboration || {}),
                status: "accepted",
              }
            : item
        )
      );
    } catch (err) {
      setActionError(
        err.message || "Une erreur est survenue lors de l'acceptation."
      );
    } finally {
      setActionLoading("");
    }
  };

  // Delete a collaboration request
  const handleDelete = async (id) => {
    if (actionLoading) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette demande ? Cette action peut être définitive."
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);
      setActionError("");

      const response = await fetch(
        `${API_URL}/collaboration/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de supprimer cette demande."
        );
      }

      setCollaborations((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (err) {
      setActionError(
        err.message || "Une erreur est survenue lors de la suppression."
      );
    } finally {
      setActionLoading("");
    }
  };

  // Format property prices
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") {
      return "Non précisé";
    }

    const number = Number(price);

    return Number.isFinite(number)
      ? `${number.toLocaleString("fr-FR")} DH`
      : "Non précisé";
  };

  // Display a readable status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Acceptée";
      case "rejected":
        return "Refusée";
      default:
        return "En attente";
    }
  };

  return (
    <main className="admin-collaborations-page">
      {/* HEADER */}
      <header className="collaborations-header">
        <div>
          <Link to="/admin" className="collaborations-back">
            <FaArrowLeft /> Retour au dashboard
          </Link>

          <h1>Demandes de collaboration</h1>

          <p>Gérez les demandes reçues des propriétaires.</p>
        </div>

        <div className="collaborations-total">
          <span>Total des demandes</span>
          <strong>
            {loading ? "..." : collaborations.length}
          </strong>
        </div>
      </header>

      {/* PAGE ERROR */}
      {!loading && error && (
        <div className="collaborations-error" role="alert">
          {error}

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchCollaborations();
            }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* ACTION ERROR */}
      {actionError && (
        <div className="collaborations-error" role="alert">
          {actionError}

          <button
            type="button"
            onClick={() => setActionError("")}
          >
            Fermer
          </button>
        </div>
      )}{actionNotice && (
  <div role="status" className="collaborations-notice">
    {actionNotice}
  </div>
)}

      {/* LOADING */}
      {loading && (
        <div className="collaborations-empty">
          <p>Chargement des demandes...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && collaborations.length === 0 && (
        <div className="collaborations-empty">
          <FaHandshake />

          <h2>Aucune demande pour le moment</h2>

          <p>Les nouvelles demandes apparaîtront ici.</p>
        </div>
      )}

      {/* COLLABORATION LIST */}
      {!loading && !error && collaborations.length > 0 && (
        <section className="collaborations-list">
          {collaborations.map((item) => {
            const id = item._id || item.id;
            const isProcessing = actionLoading === id;
            const status = item.status || "pending";

            return (
              <article className="collaboration-card" key={id}>
                {/* CARD HEADER */}
                <div className="collaboration-card-header">
                  <div>
                    <h2>
                      {item.firstName} {item.lastName}
                    </h2>

                    <span className="collaboration-date">
                      Reçue le{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            "fr-FR"
                          )
                        : "Date inconnue"}
                    </span>
                  </div>

                  <div className="collaboration-card-badges">
                    <span
                      className={`collaboration-status status-${status}`}
                    >
                      {getStatusLabel(status)}
                    </span>

                    <span className="collaboration-type">
                      {item.propertyType || "Type non précisé"}
                    </span>
                  </div>
                </div>

                {/* CONTACT INFORMATION */}
                <div className="collaboration-contact">
                  <a
                    href={
                      item.phone
                        ? `tel:${item.phone}`
                        : undefined
                    }
                    onClick={(event) => {
                      if (!item.phone) event.preventDefault();
                    }}
                  >
                    <FaPhone />
                    {item.phone || "Téléphone non renseigné"}
                  </a>

                  <a
                    href={
                      item.email
                        ? `mailto:${item.email}`
                        : undefined
                    }
                    onClick={(event) => {
                      if (!item.email) event.preventDefault();
                    }}
                  >
                    <FaEnvelope />
                    {item.email || "E-mail non renseigné"}
                  </a>

                  <p>
                    <FaMapMarkerAlt />
                    {item.city || "Ville non précisée"}
                  </p>
                </div>

                {/* PROPERTY DETAILS */}
                <div className="collaboration-details">
                  <div>
                    <span>Bien</span>
                    <strong>
                      {item.propertyTitle || "Non précisé"}
                    </strong>
                  </div>

                  <div>
                    <span>Localisation du bien</span>
                    <strong>
                      {item.propertyLocation || "Non précisée"}
                    </strong>
                  </div>

                  <div>
                    <span>Surface du terrain / bien</span>
                    <strong>
                      {item.propertySurface != null
                        ? `${item.propertySurface} m²`
                        : "Non précisée"}
                    </strong>
                  </div>

                  <div>
                    <span>Surface construite</span>
                    <strong>
                      {item.builtSurface != null
                        ? `${item.builtSurface} m²`
                        : "Non précisée"}
                    </strong>
                  </div>

                  <div>
                    <span>Prix estimé</span>
                    <strong>
                      {formatPrice(item.estimatedPrice)}
                    </strong>
                  </div>

                  <div>
                    <span>Disponibilité</span>
                    <strong>
                      {item.availability || "Non précisée"}
                    </strong>
                  </div>

                  <div>
                    <span>Contact préféré</span>
                    <strong>
                      {item.preferredContact || "Non précisé"}
                    </strong>
                  </div>

                  <div>
                    <span>Statut de propriété</span>
                    <strong>
                      {item.ownership || "Non précisé"}
                    </strong>
                  </div>
                </div>

                {/* OWNER DESCRIPTION */}
                {item.description && (
                  <div className="collaboration-description">
                    <h3>Description du propriétaire</h3>
                    <p>{item.description}</p>
                  </div>
                )}

                {/* SELLING REASON */}
                {item.sellingReason && (
                  <p className="collaboration-extra">
                    <strong>Motif de vente :</strong>{" "}
                    {item.sellingReason}
                  </p>
                )}

                {/* ACTION BUTTONS */}
                <div className="collaboration-actions">
                  {status !== "accepted" && (
                    <button
                      type="button"
                      className="collaboration-accept-btn"
                      onClick={() => handleAccept(id)}
                      disabled={Boolean(actionLoading)}
                    >
                      <FaCheck />

                      {isProcessing
                        ? "Traitement..."
                        : "Accepter"}
                    </button>
                  )}

                  <button
                    type="button"
                    className="collaboration-delete-btn"
                    onClick={() => handleDelete(id)}
                    disabled={Boolean(actionLoading)}
                  >
                    <FaTrash />

                    {isProcessing
                      ? "Traitement..."
                      : "Supprimer"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
