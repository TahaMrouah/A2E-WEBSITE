
import React from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../Data/properties";
import "../Style/property-details.css";

function PropertyDetails() {
    const { id } = useParams();

    // Find the property matching the URL
    const property = properties.find(
        (item) => String(item.id) === String(id)
    );

    // Property doesn't exist
    if (!property) {
        return (
            <main className="property-not-found">

                <div className="property-not-found-content">

                    <span className="details-label">
                        A2E IMMOBILIER
                    </span>

                    <h1>
                        Bien introuvable
                    </h1>

                    <p>
                        Cette propriété n'existe pas ou n'est plus
                        disponible dans notre sélection.
                    </p>

                    <Link
                        to="/properties"
                        className="back-properties-button"
                    >
                        ← Retour aux propriétés
                    </Link>

                </div>

            </main>
        );
    }

    return (
        <main className="property-details-page">

            {/* =====================================================
                HERO IMAGE
            ===================================================== */}

            <section className="property-details-hero">

                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="property-details-hero-image"
                />

                <div className="property-details-hero-overlay"></div>

                <div className="property-details-hero-content">

                    <span className="details-label">
                        {property.status}
                    </span>

                    <h1>
                        {property.title}
                    </h1>

                    <div className="details-location">
                        <span>⌖</span>
                        {property.location}
                    </div>

                </div>

            </section>


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <section className="property-details-container">

                {/* BACK */}

                <Link
                    to="/properties"
                    className="back-properties"
                >
                    ← Toutes les propriétés
                </Link>


                <div className="property-details-layout">

                    {/* =================================================
                        LEFT — PROPERTY INFORMATION
                    ================================================= */}

                    <div className="property-details-main">

                        {/* INTRO */}

                        <div className="details-introduction">

                            <span className="section-label">
                                À PROPOS DU BIEN
                            </span>

                            <h2>
                                {property.title}
                            </h2>

                            <p>
                                {property.description}
                            </p>

                        </div>


                        {/* =================================================
                            KEY INFORMATION
                        ================================================= */}

                        <div className="details-info-grid">

                            <div className="info-box">

                                <span className="info-icon">
                                    ⌂
                                </span>

                                <div>
                                    <small>
                                        Surface
                                    </small>

                                    <strong>
                                        {property.surface}
                                    </strong>
                                </div>

                            </div>


                            <div className="info-box">

                                <span className="info-icon">
                                    ▱
                                </span>

                                <div>
                                    <small>
                                        Chambres
                                    </small>

                                    <strong>
                                        {property.bedrooms}
                                    </strong>
                                </div>

                            </div>


                            <div className="info-box">

                                <span className="info-icon">
                                    ♢
                                </span>

                                <div>
                                    <small>
                                        Salles de bain
                                    </small>

                                    <strong>
                                        {property.bathrooms}
                                    </strong>
                                </div>

                            </div>


                            <div className="info-box">

                                <span className="info-icon">
                                    ◇
                                </span>

                                <div>
                                    <small>
                                        Type
                                    </small>

                                    <strong>
                                        {property.type}
                                    </strong>
                                </div>

                            </div>


                            {property.landArea &&
                                property.landArea !== "—" && (

                                    <div className="info-box">

                                        <span className="info-icon">
                                            ▧
                                        </span>

                                        <div>
                                            <small>
                                                Terrain
                                            </small>

                                            <strong>
                                                {property.landArea}
                                            </strong>
                                        </div>

                                    </div>

                                )}

                        </div>


                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        <div className="details-section">

                            <span className="section-label">
                                DESCRIPTION
                            </span>

                            <h2>
                                Un bien pensé pour votre quotidien
                            </h2>

                            <p>
                                {property.description}
                            </p>

                            <p>
                                Cette propriété bénéficie d'une
                                localisation privilégiée et offre des
                                espaces conçus pour conjuguer confort,
                                fonctionnalité et qualité de vie.
                            </p>

                        </div>


                        {/* =================================================
                            FEATURES
                        ================================================= */}

                        {property.features &&
                            property.features.length > 0 && (

                                <div className="details-section">

                                    <span className="section-label">
                                        CARACTÉRISTIQUES
                                    </span>

                                    <h2>
                                        Les atouts du bien
                                    </h2>

                                    <div className="features-list">

                                        {property.features.map(
                                            (feature, index) => (

                                                <div
                                                    className="feature-item"
                                                    key={index}
                                                >
                                                    <span className="feature-check">
                                                        ✓
                                                    </span>

                                                    <span>
                                                        {feature.replace(
                                                            /^[^\p{L}\p{N}]*/u,
                                                            ""
                                                        )}
                                                    </span>
                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}


                        {/* =================================================
                            INTRO / COMPOSITION
                        ================================================= */}

                        {property.intro && (

                            <div className="details-section">

                                <span className="section-label">
                                    COMPOSITION
                                </span>

                                <h2>
                                    Les espaces de la propriété
                                </h2>

                                <p>
                                    {property.intro}
                                </p>

                            </div>

                        )}


                        {/* =================================================
                            GALLERY
                        ================================================= */}

                        {property.images &&
                            property.images.length > 1 && (

                                <div className="details-section">

                                    <span className="section-label">
                                        GALERIE
                                    </span>

                                    <h2>
                                        Découvrez la propriété
                                    </h2>

                                    <div className="details-gallery">

                                        {property.images.map(
                                            (image, index) => (

                                                <div
                                                    className={
                                                        index === 0
                                                            ? "details-gallery-image large"
                                                            : "details-gallery-image"
                                                    }
                                                    key={index}
                                                >

                                                    <img
                                                        src={image}
                                                        alt={`${property.title} - photo ${index + 1}`}
                                                        loading={
                                                            index === 0
                                                                ? "eager"
                                                                : "lazy"
                                                        }
                                                        decoding="async"
                                                    />

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}

                    </div>


                    {/* =================================================
                        RIGHT — CONTACT CARD
                    ================================================= */}

                    <aside className="property-contact-card">

                        <div className="contact-card-inner">

                            <span className="contact-label">
                                A2E IMMOBILIER
                            </span>

                            <h2>
                                Intéressé par ce bien ?
                            </h2>

                            <p>
                                Notre équipe est à votre disposition
                                pour vous fournir davantage
                                d'informations ou organiser une visite.
                            </p>


                            {/* PRICE */}

                            <div className="contact-price">

                                <small>
                                    PRIX DE VENTE
                                </small>

                                <strong>
                                    {Number(property.price).toLocaleString(
                                        "fr-FR"
                                    )}{" "}
                                    MAD
                                </strong>

                            </div>


                            {/* CALL */}

                            <a
                                href="tel:+212600000000"
                                className="details-contact-button call"
                            >
                                <span>☎</span>
                                Appelez-nous
                            </a>


                            {/* WHATSAPP */}

                            <a
                                href="https://wa.me/212600000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="details-contact-button whatsapp"
                            >
                                <span>◉</span>
                                Contactez-nous sur WhatsApp
                            </a>


                            <div className="contact-note">
                                Référence du bien : A2E-
                                {property.id}
                            </div>

                        </div>

                    </aside>

                </div>

            </section>

        </main>
    );
}

export default PropertyDetails;
