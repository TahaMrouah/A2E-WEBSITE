
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaHome,
    FaTree,
    FaPhoneAlt,
    FaWhatsapp,
    FaCheck,
    FaArrowLeft,
} from "react-icons/fa";

import { getProperty } from "../Data/propertyApi";

import "../Style/property-details.css";

function PropertyDetails() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProperty(id);

                setProperty(data);
            } catch (err) {
                console.error(
                    "Error loading property:",
                    err
                );

                setError(
                    "Cette propriété n'existe pas ou n'est plus disponible."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <main className="property-not-found">
                <div className="property-not-found-content">
                    <span className="details-label">
                        A2E IMMOBILIER
                    </span>

                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            margin: "25px auto",
                            border: "3px solid #e5dfd3",
                            borderTop:
                                "3px solid #b08a36",
                            borderRadius: "50%",
                            animation:
                                "propertyDetailsSpin 0.8s linear infinite",
                        }}
                    />

                    <h1>Chargement...</h1>

                    <p>
                        Nous récupérons les informations
                        de cette propriété.
                    </p>
                </div>
            </main>
        );
    }

    /* =====================================================
       PROPERTY NOT FOUND
    ===================================================== */

    if (error || !property) {
        return (
            <main className="property-not-found">
                <div className="property-not-found-content">
                    <span className="details-label">
                        A2E IMMOBILIER
                    </span>

                    <h1>Bien introuvable</h1>

                    <p>
                        Cette propriété n'existe pas ou
                        n'est plus disponible dans notre
                        sélection.
                    </p>

                    <Link
                        to="/properties"
                        className="back-properties-button"
                    >
                        <FaArrowLeft />
                        Retour aux propriétés
                    </Link>
                </div>
            </main>
        );
    }

    const images =
        Array.isArray(property.images) &&
        property.images.length > 0
            ? property.images
            : [];

    return (
        <main className="property-details-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="property-details-hero">

                {images.length > 0 ? (
                    <img
                        src={images[0]}
                        alt={property.title}
                        className="property-details-hero-image"
                    />
                ) : (
                    <div
                        className="property-details-hero-image"
                        style={{
                            background:
                                "linear-gradient(135deg, #292620, #4a453b)",
                        }}
                    />
                )}

                <div className="property-details-hero-overlay"></div>

                <div className="property-details-hero-content">

                    <span className="details-label">
                        {property.status}
                    </span>

                    <h1>{property.title}</h1>

                    <div className="details-location">
                        <FaMapMarkerAlt />

                        <span>
                            {property.location}
                        </span>
                    </div>

                </div>
            </section>

            {/* =====================================================
                MAIN PROPERTY AREA
            ===================================================== */}

            <section className="property-details-container">

                <Link
                    to="/properties"
                    className="back-properties"
                >
                    <FaArrowLeft />
                    Toutes les propriétés
                </Link>

                <div className="property-details-layout">

                    {/* =================================================
                        LEFT — GALLERY
                    ================================================= */}

                    <div className="property-gallery-column">

                        <div className="property-details-gallery">

                            {images.length > 0 ? (
                                images.map(
                                    (image, index) => (
                                        <div
                                            className={
                                                index === 0
                                                    ? "property-details-gallery-image property-details-gallery-image-main"
                                                    : "property-details-gallery-image"
                                            }
                                            key={index}
                                        >
                                            <img
                                                src={image}
                                                alt={`${property.title} - photo ${
                                                    index + 1
                                                }`}
                                                loading={
                                                    index ===
                                                    0
                                                        ? "eager"
                                                        : "lazy"
                                                }
                                                decoding="async"
                                            />
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="property-details-gallery-image property-details-gallery-image-main">
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            minHeight:
                                                "300px",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            background:
                                                "#e9e3d8",
                                            color: "#777",
                                        }}
                                    >
                                        Aucune image
                                        disponible
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* =================================================
                        RIGHT — INFORMATION
                    ================================================= */}

                    <div className="property-information-column">

                        {/* INTRODUCTION */}

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

                        {/* PROPERTY INFORMATION */}

                        <div className="details-info-grid">

                            <div className="info-box">

                                <span className="info-icon">
                                    <FaRulerCombined />
                                </span>

                                <div className="info-content">

                                    <small>
                                        Surface
                                    </small>

                                    <strong>
                                        {property.surface ||
                                            "—"}
                                    </strong>

                                </div>

                            </div>

                            <div className="info-box">

                                <span className="info-icon">
                                    <FaBed />
                                </span>

                                <div className="info-content">

                                    <small>
                                        Chambres
                                    </small>

                                    <strong>
                                        {property.bedrooms ??
                                            "—"}
                                    </strong>

                                </div>

                            </div>

                            <div className="info-box">

                                <span className="info-icon">
                                    <FaBath />
                                </span>

                                <div className="info-content">

                                    <small>
                                        Salles de bain
                                    </small>

                                    <strong>
                                        {property.bathrooms ??
                                            "—"}
                                    </strong>

                                </div>

                            </div>

                            <div className="info-box">

                                <span className="info-icon">
                                    <FaHome />
                                </span>

                                <div className="info-content">

                                    <small>
                                        Type
                                    </small>

                                    <strong>
                                        {property.type ||
                                            "—"}
                                    </strong>

                                </div>

                            </div>

                            {property.landArea &&
                                property.landArea !==
                                    "—" && (
                                    <div className="info-box">

                                        <span className="info-icon">
                                            <FaTree />
                                        </span>

                                        <div className="info-content">

                                            <small>
                                                Terrain
                                            </small>

                                            <strong>
                                                {
                                                    property.landArea
                                                }
                                            </strong>

                                        </div>

                                    </div>
                                )}

                        </div>

                        {/* DESCRIPTION */}

                        <div className="details-section">

                            <span className="section-label">
                                DESCRIPTION
                            </span>

                            <h2>
                                Un bien pensé pour votre
                                quotidien
                            </h2>

                            <p>
                                {property.description}
                            </p>

                            <p>
                                Cette propriété bénéficie
                                d'une localisation
                                privilégiée et offre des
                                espaces conçus pour
                                conjuguer confort,
                                fonctionnalité et qualité
                                de vie.
                            </p>

                        </div>

                        {/* FEATURES */}

                        {property.features &&
                            property.features.length >
                                0 && (
                                <div className="details-section">

                                    <span className="section-label">
                                        CARACTÉRISTIQUES
                                    </span>

                                    <h2>
                                        Les atouts du bien
                                    </h2>

                                    <div className="features-list">

                                        {property.features.map(
                                            (
                                                feature,
                                                index
                                            ) => (
                                                <div
                                                    className="feature-item"
                                                    key={
                                                        index
                                                    }
                                                >

                                                    <span className="feature-check">
                                                        <FaCheck />
                                                    </span>

                                                    <span>
                                                        {String(
                                                            feature
                                                        ).replace(
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

                        {/* COMPOSITION */}

                        {property.intro && (
                            <div className="details-section">

                                <span className="section-label">
                                    COMPOSITION
                                </span>

                                <h2>
                                    Les espaces de la
                                    propriété
                                </h2>

                                <p>
                                    {property.intro}
                                </p>

                            </div>
                        )}

                        {/* =================================================
                            CONTACT CARD
                        ================================================= */}

                        <aside className="property-contact-card">

                            <div className="contact-card-inner">

                                <span className="contact-label">
                                    A2E IMMOBILIER
                                </span>

                                <h2>
                                    Intéressé par ce
                                    bien ?
                                </h2>

                                <p>
                                    Notre équipe est à
                                    votre disposition pour
                                    vous fournir davantage
                                    d'informations ou
                                    organiser une visite.
                                </p>

                                <div className="contact-price">

                                    <small>
                                        PRIX DE VENTE
                                    </small>

                                    <strong>
                                        {Number(
                                            property.price ||
                                                0
                                        ).toLocaleString(
                                            "fr-FR"
                                        )}{" "}
                                        MAD
                                    </strong>

                                </div>

                                <a
                                    href="tel:+212602991215"
                                    className="details-contact-button call"
                                >
                                    <FaPhoneAlt />

                                    <span>
                                        Appelez-nous
                                    </span>
                                </a>

                                <a
                                    href="https://wa.me/212602991215"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="details-contact-button whatsapp"
                                >
                                    <FaWhatsapp />

                                    <span>
                                        Contactez-nous
                                        sur WhatsApp
                                    </span>
                                </a>

                                <div className="contact-note">

                                    Référence du bien :{" "}

                                    <strong>
                                        A2E-
                                        {property._id}
                                    </strong>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

            <style>
                {`
                    @keyframes propertyDetailsSpin {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>

        </main>
    );
}

export default PropertyDetails;
