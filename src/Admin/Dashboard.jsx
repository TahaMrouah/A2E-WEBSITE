import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaKey,
  FaPlus,
  FaArrowRight,
  FaSignOutAlt,
  FaChartLine,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaEdit,
  FaRulerCombined,
  FaHandshake,
  FaLeaf,
} from "react-icons/fa";

import API_URL from "../configs/api";
import useProperties from "../hooks/useProperties";
import { resolvePropertyImage } from "../Data/propertyImage";
import "../Style/Admin/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const { properties = [], loading, error } = useProperties();

  const [collaborations, setCollaborations] = useState([]);
  const [collaborationsLoading, setCollaborationsLoading] = useState(true);
  const [collaborationsError, setCollaborationsError] = useState("");

  // Property statistics
  const totalProperties = properties.length;

  const propertiesForSale = properties.filter((property) =>
    property.status?.toLowerCase().includes("vendre"),
  ).length;

  const propertiesForRent = properties.filter((property) =>
    property.status?.toLowerCase().includes("louer"),
  ).length;

  // Load collaboration requests
  useEffect(() => {
    const controller = new AbortController();

    const fetchCollaborations = async () => {
      try {
        setCollaborationsError("");

        const response = await fetch(`${API_URL}/collaboration`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || "Impossible de charger les demandes.",
          );
        }

        setCollaborations(data.collaborations || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setCollaborationsError(err.message || "Une erreur est survenue.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCollaborationsLoading(false);
        }
      }
    };

    fetchCollaborations();

    return () => controller.abort();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Impossible de se déconnecter.");
      }

      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      window.alert(err.message || "Erreur lors de la déconnexion.");
    }
  };

  if (loading) {
    return (
      <main className="admin-dashboard">
        <section className="admin-dashboard-content">
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              color: "#292620",
            }}
          >
            Chargement des données...
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span>A2E</span>
          <small>IMMOBILIER</small>
        </div>

        <nav className="admin-sidebar-nav">
          <span className="admin-nav-title">ADMINISTRATION</span>

          <Link to="/admin" className="admin-nav-link active">
            <FaChartLine />
            <span>Dashboard</span>
          </Link>

          <Link to="/admin/properties" className="admin-nav-link">
            <FaBuilding />
            <span>Propriétés</span>
          </Link>

          <Link to="/admin/collaborations" className="admin-nav-link">
            <FaHandshake />
            <span>Collaborations</span>
          </Link>
          <Link to="/admin/projects" className="admin-nav-link">
            <FaLeaf />
            <span>Nos Projets</span>
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/properties" className="admin-view-site">
            <span>Voir le site</span>
            <FaArrowRight />
          </Link>

          <button type="button" className="admin-logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="admin-dashboard-content">
        <header className="admin-dashboard-header">
          <div>
            <span className="admin-dashboard-label">A2E IMMOBILIER</span>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-header-actions">
            <span className="admin-welcome">Administration</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        {/* PROPERTY ERROR */}
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: 25,
              padding: "15px 20px",
              border: "1px solid #eadbd7",
              borderRadius: 7,
              background: "#fff9f7",
              color: "#a45b50",
              fontSize: 13,
            }}
          >
            Impossible de charger les propriétés : {error}
          </div>
        )}

        {/* STATISTICS */}
        <section
          className="admin-statistics"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaBuilding />
            </div>
            <div className="admin-stat-content">
              <span>TOTAL PROPRIÉTÉS</span>
              <strong>{totalProperties}</strong>
              <small>Biens dans votre catalogue</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaHome />
            </div>
            <div className="admin-stat-content">
              <span>À VENDRE</span>
              <strong>{propertiesForSale}</strong>
              <small>Propriétés à vendre</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaKey />
            </div>
            <div className="admin-stat-content">
              <span>À LOUER</span>
              <strong>{propertiesForRent}</strong>
              <small>Propriétés à louer</small>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaHandshake />
            </div>
            <div className="admin-stat-content">
              <span>COLLABORATIONS</span>
              <strong>
                {collaborationsLoading ? "..." : collaborations.length}
              </strong>
              <small>Demandes de propriétaires reçues</small>
            </div>
          </div>
        </section>

        {/* DASHBOARD GRID */}
        <section className="admin-dashboard-grid">
          {/* RECENT PROPERTIES */}
          <div className="admin-recent-properties">
            <div className="admin-section-header">
              <div>
                <span className="admin-section-label">CATALOGUE</span>
                <h2>Propriétés récentes</h2>
              </div>

              <Link to="/admin/properties" className="admin-section-link">
                Voir tout <FaArrowRight />
              </Link>
            </div>

            <div className="admin-property-list">
              {properties.length === 0 ? (
                <p>Aucune propriété disponible.</p>
              ) : (
                properties.slice(0, 5).map((property) => {
                  const propertyImage =
                    Array.isArray(property.images) && property.images.length > 0
                      ? resolvePropertyImage(property.images[0])
                      : null;

                  return (
                    <div className="admin-property-row" key={property._id}>
                      <div className="admin-property-image">
                        {propertyImage ? (
                          <img
                            src={propertyImage}
                            alt={property.title || "Propriété A2E"}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaHome />
                          </div>
                        )}
                      </div>

                      <div className="admin-property-info">
                        <h3>{property.title}</h3>

                        <div className="admin-property-location">
                          <FaMapMarkerAlt />
                          <span>{property.location}</span>
                        </div>

                        <div className="admin-property-meta">
                          <span>
                            <FaBed /> {property.bedrooms ?? 0}
                          </span>
                          <span>
                            <FaBath /> {property.bathrooms ?? 0}
                          </span>
                          <span>
                            <FaRulerCombined /> {property.surface ?? 0} m²
                          </span>
                        </div>

                        <div className="admin-property-price">
                          <small>PRIX</small>
                          <strong>
                            {Number(property.price || 0).toLocaleString(
                              "fr-FR",
                            )}{" "}
                            MAD
                          </strong>
                        </div>
                      </div>

                      <div className="admin-property-status">
                        <span
                          className={
                            property.status?.toLowerCase().includes("vendre")
                              ? "for-sale"
                              : "for-rent"
                          }
                        >
                          {property.status || "Non précisé"}
                        </span>
                      </div>

                      <Link
                        to={`/admin/properties/${property._id}/edit`}
                        className="admin-property-edit"
                      >
                        <FaEdit />
                        <span>Modifier</span>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="admin-quick-actions">
            <div className="admin-section-header">
              <div>
                <span className="admin-section-label">ACTIONS</span>
                <h2>Accès rapide</h2>
              </div>
            </div>

            <div className="admin-actions-list">
              <Link
                to="/admin/properties/new"
                className="admin-action-card primary"
              >
                <div className="admin-action-icon">
                  <FaPlus />
                </div>
                <div>
                  <strong>Ajouter une propriété</strong>
                  <span>Créer une nouvelle annonce</span>
                </div>
                <FaArrowRight className="admin-action-arrow" />
              </Link>

              <Link to="/admin/properties" className="admin-action-card">
                <div className="admin-action-icon">
                  <FaBuilding />
                </div>
                <div>
                  <strong>Gérer les propriétés</strong>
                  <span>Modifier les annonces</span>
                </div>
                <FaArrowRight className="admin-action-arrow" />
              </Link>

              <Link to="/properties" className="admin-action-card">
                <div className="admin-action-icon">
                  <FaHome />
                </div>
                <div>
                  <strong>Voir le site</strong>
                  <span>Consulter le site public</span>
                </div>
                <FaArrowRight className="admin-action-arrow" />
              </Link>
            </div>

            {/* COLLABORATION SUMMARY */}
            <section
              style={{
                marginTop: 30,
                padding: 22,
                background: "#fff",
                border: "1px solid #e9e5dc",
                borderRadius: 10,
              }}
            >
              <span className="admin-section-label">CONTACTS CLIENTS</span>

              <h2 style={{ margin: "8px 0" }}>Demandes de collaboration</h2>

              <p style={{ color: "#777", fontSize: 13 }}>
                Consultez les propriétaires souhaitant confier leur bien à A2E.
              </p>

              {collaborationsError && (
                <p role="alert" style={{ color: "#a4473c" }}>
                  {collaborationsError}
                </p>
              )}

              <p>
                <strong>
                  {collaborationsLoading ? "..." : collaborations.length}
                </strong>{" "}
                demande(s) reçue(s)
              </p>

              <Link to="/admin/collaborations" className="admin-section-link">
                Gérer les demandes <FaArrowRight />
              </Link>

              {!collaborationsLoading &&
                !collaborationsError &&
                collaborations.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    style={{
                      padding: "12px 0",
                      borderTop: "1px solid #eee9df",
                    }}
                  >
                    <strong>
                      {item.firstName} {item.lastName}
                    </strong>
                    <div style={{ color: "#777", fontSize: 13 }}>
                      {item.propertyType || "Type de bien non précisé"}
                    </div>
                    <small>Statut : {item.status || "pending"}</small>
                  </div>
                ))}
            </section>
          </div>
        </section>
        {/* PROJECT MANAGEMENT */}
        <section className="admin-projects-section" style={{ marginTop: 40 }}>
          <div className="admin-section-header">
            <div>
              <span className="admin-section-label">
                GESTION DES PROGRAMMES
              </span>
              <h2>Projets immobiliers</h2>
              <p>Gérez les lots, les bureaux et leur disponibilité.</p>
            </div>
          </div>

          <div className="admin-projects-grid">
            <Link
              to="/admin/projects/green-lotus"
              className="admin-project-card"
            >
              <div className="admin-project-icon">
                <FaLeaf />
              </div>

              <div className="admin-project-info">
                <span>PROJET IMMOBILIER</span>
                <h3>Green Lotus</h3>
                <p>Gérer les magasins commerciaux, les prix et les statuts.</p>
              </div>

              <FaArrowRight className="admin-project-arrow" />
            </Link>

            <Link
              to="/admin/projects/central-hills"
              className="admin-project-card"
            >
              <div className="admin-project-icon">
                <FaBuilding />
              </div>

              <div className="admin-project-info">
                <span>PROJET IMMOBILIER</span>
                <h3>Central Hills</h3>
                <p>Gérer les bureaux, les surfaces, les prix et les statuts.</p>
              </div>

              <FaArrowRight className="admin-project-arrow" />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="admin-dashboard-footer">
          <span>A2E IMMOBILIER</span>
          <span>Administration</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}
