import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaHome,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaArrowLeft,
} from "react-icons/fa";

import useProperties from "../hooks/useProperties";

import { deleteProperty } from "../Data/propertyApi";
import { resolvePropertyImage } from "../Data/propertyImage";

import "../Style/Admin/properties.css";

function Properties() {
  /* ========================================================
       LOAD PROPERTIES FROM MONGODB
    ======================================================== */

  const { properties, loading, error, refreshProperties } = useProperties();

  /* ========================================================
       DELETE STATE
    ======================================================== */

  const [deletingId, setDeletingId] = useState(null);

  /* ========================================================
       DELETE PROPERTY
    ======================================================== */

  const handleDelete = async (property) => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer "${property.title}" ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(property._id);

      await deleteProperty(property._id);

      await refreshProperties();
    } catch (deleteError) {
      console.error("Delete property error:", deleteError);

      alert(deleteError.message || "Impossible de supprimer cette propriété.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ========================================================
       FORMAT PRICE
    ======================================================== */

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Prix sur demande";
    }

    return `${Number(price).toLocaleString("fr-FR")} MAD`;
  };

  /* ========================================================
       GET PROPERTY IMAGE
       USE THE SAME IMAGE SYSTEM AS PROPERTY DETAILS
    ======================================================== */

  const getPropertyImage = (property) => {
    if (
      !property ||
      !Array.isArray(property.images) ||
      property.images.length === 0
    ) {
      return null;
    }

    return resolvePropertyImage(property.images[0]);
  };

  /* ========================================================
       LOADING
    ======================================================== */

  if (loading) {
    return (
      <main className="admin-properties-page">
        <div className="admin-properties-container">
          <div className="admin-properties-loading">
            <div className="admin-loading-spinner"></div>

            <span>Chargement des propriétés...</span>

            <small>Connexion à la base de données</small>
          </div>
        </div>
      </main>
    );
  }

  /* ========================================================
       PAGE
    ======================================================== */

  return (
    <main className="admin-properties-page">
      <div className="admin-properties-container">
        {/* ==================================================
                    HEADER
                ================================================== */}

        <header className="admin-properties-header">
          <Link to="/admin" className="admin-properties-back-button">
            <FaArrowLeft />

            <span>Retour au dashboard</span>
          </Link>

          <div className="admin-properties-header-content">
            <span className="admin-properties-label">A2E IMMOBILIER</span>

            <h1>Gestion des propriétés</h1>

            <p>
              Gérez les biens immobiliers enregistrés dans votre base de
              données.
            </p>
          </div>

          <Link
            to="/admin/properties/new"
            className="admin-properties-add-button"
          >
            <FaPlus />

            <span>Ajouter un bien</span>
          </Link>
        </header>

        {/* ==================================================
                    PAGE INFORMATION
                ================================================== */}

        <div className="admin-properties-toolbar">
          <div className="admin-properties-count">
            <span className="admin-properties-count-number">
              {properties.length}
            </span>

            <span>
              {properties.length === 1 ? " propriété" : " propriétés"}
            </span>
          </div>

          <div className="admin-properties-toolbar-line"></div>

          <span className="admin-properties-toolbar-text">
            Base de données MongoDB
          </span>
        </div>

        {/* ==================================================
                    ERROR
                ================================================== */}

        {error && (
          <div className="admin-properties-error">
            <div className="admin-error-icon">!</div>

            <div>
              <strong>Impossible de charger les propriétés</strong>

              <span>{error}</span>
            </div>
          </div>
        )}

        {/* ==================================================
                    EMPTY STATE
                ================================================== */}

        {!error && properties.length === 0 && (
          <div className="admin-properties-empty">
            <div className="admin-empty-icon">
              <FaHome />
            </div>

            <span className="admin-empty-label">A2E IMMOBILIER</span>

            <h2>Aucune propriété</h2>

            <p>
              Vous n'avez encore ajouté aucun bien immobilier dans votre base de
              données.
            </p>

            <Link
              to="/admin/properties/new"
              className="admin-properties-empty-button"
            >
              <FaPlus />
              Ajouter votre premier bien
            </Link>
          </div>
        )}

        {/* ==================================================
                    PROPERTY GRID
                ================================================== */}

        {properties.length > 0 && (
          <section className="admin-properties-grid">
            {properties.map((property) => {
              const propertyImage = getPropertyImage(property);

              return (
                <article className="admin-property-card" key={property._id}>
                  {/* ==================================
                                        IMAGE
                                    ================================== */}

                  <div className="admin-property-image">
                    {propertyImage ? (
                      <img
                        src={propertyImage}
                        alt={property.title || "Propriété"}
                      />
                    ) : (
                      <div className="admin-property-no-image">
                        <FaHome />

                        <span>Aucune image</span>
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}

                    <div className="admin-property-image-overlay"></div>

                    {/* STATUS */}

                    {property.status && (
                      <span className="admin-property-status">
                        {property.status}
                      </span>
                    )}
                  </div>

                  {/* ==================================
                                        CONTENT
                                    ================================== */}

                  <div className="admin-property-content">
                    {/* TYPE */}

                    <span className="admin-property-type">
                      {property.type || "Immobilier"}
                    </span>

                    {/* TITLE */}

                    <h2>{property.title || "Sans titre"}</h2>

                    {/* LOCATION */}

                    {property.location && (
                      <div className="admin-property-location">
                        <FaMapMarkerAlt />

                        <span>{property.location}</span>
                      </div>
                    )}

                    {/* PRICE */}

                    <div className="admin-property-price">
                      <FaMoneyBillWave />

                      <span>{formatPrice(property.price)}</span>
                    </div>

                    {/* DETAILS */}

                    <div className="admin-property-details">
                      {property.surface && (
                        <span>
                          <FaRulerCombined />

                          {property.surface}
                        </span>
                      )}

                      {property.bedrooms !== undefined &&
                        property.bedrooms !== null && (
                          <span>
                            <FaBed />
                            {property.bedrooms} chambre
                            {property.bedrooms > 1 ? "s" : ""}
                          </span>
                        )}

                      {property.bathrooms !== undefined &&
                        property.bathrooms !== null && (
                          <span>
                            <FaBath />
                            {property.bathrooms} salle
                            {property.bathrooms > 1 ? "s" : ""} de bain
                          </span>
                        )}
                    </div>

                    {/* ACTIONS */}

                    <div className="admin-property-actions">
                      {/* VIEW */}

                      <Link
                        to={`/properties/${property._id}`}
                        className="admin-property-view"
                        title="Voir la propriété"
                      >
                        <FaEye />

                        <span>Voir</span>
                      </Link>

                      {/* EDIT */}

                      <Link
                        to={`/admin/properties/${property._id}/edit`}
                        className="admin-property-edit"
                        title="Modifier la propriété"
                      >
                        <FaEdit />

                        <span>Modifier</span>
                      </Link>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="admin-property-delete"
                        onClick={() => handleDelete(property)}
                        disabled={deletingId === property._id}
                        title="Supprimer la propriété"
                      >
                        <FaTrash />

                        <span>
                          {deletingId === property._id
                            ? "Suppression..."
                            : "Supprimer"}
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default Properties;
