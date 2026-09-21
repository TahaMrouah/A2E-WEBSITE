
import React, { useState } from "react";
import "../Style/properties.css";
import properties from "../Data/properties";

import {
    FaMapMarkerAlt,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaPhoneAlt,
    FaWhatsapp,
    FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHome, FaCar, FaTree, FaSwimmingPool, FaCouch, FaUtensils, FaDoorOpen, FaWarehouse, FaKey, } from "react-icons/fa";
const characteristicIcons = { bed: FaBed, bath: FaBath, surface: FaRulerCombined, home: FaHome, car: FaCar, tree: FaTree, pool: FaSwimmingPool, living: FaCouch, kitchen: FaUtensils, door: FaDoorOpen, warehouse: FaWarehouse, key: FaKey, };
function Properties() {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open lightbox
    const openLightbox = (property, index) => {
        setSelectedProperty(property);
        setSelectedImage(index);
    };

    // Close lightbox
    const closeLightbox = () => {
        setSelectedProperty(null);
        setSelectedImage(null);
    };

    // Previous image
    const showPreviousImage = (e) => {
        e.stopPropagation();

        setSelectedImage((current) => {
            if (current === 0) {
                return selectedProperty.images.length - 1;
            }

            return current - 1;
        });
    };

    // Next image
    const showNextImage = (e) => {
        e.stopPropagation();

        setSelectedImage((current) => {
            if (current === selectedProperty.images.length - 1) {
                return 0;
            }

            return current + 1;
        });
    };

    return (
        <main className="properties-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="properties-hero">

                <div className="properties-hero-overlay"></div>

                <div className="properties-hero-content">

                    <span className="properties-label">
                        A2E IMMOBILIER
                    </span>

                    <h1>
                        Nos propriétés
                    </h1>

                    <p>
                        Découvrez une sélection de biens d'exception,
                        soigneusement choisis pour répondre à vos exigences.
                    </p>

                </div>

            </section>


            {/* =====================================================
                PROPERTY LIST
            ===================================================== */}

            <section className="properties-section">

                {/* SECTION HEADING */}

                <div className="properties-heading">

                    <div>

                        <span className="section-label">
                            NOTRE SÉLECTION
                        </span>

                        <h2>
                            Des propriétés qui vous ressemblent
                        </h2>

                    </div>

                    <p>
                        Villas, appartements et propriétés haut standing
                        sélectionnés par notre équipe.
                    </p>

                </div>


                {/* =================================================
                    PROPERTY GRID
                ================================================= */}

                <div className="properties-grid">

                    {properties.map((property) => (

                        <article
                            className="property-card"
                            key={property.id}
                        >

                            {/* =================================================
                                IMAGE GALLERY
                            ================================================= */}

                            <div className="property-image-wrapper">

                                <div className="property-gallery">

                                    {property.images
                                        .slice(0, 3)
                                        .map((image, index) => (

                                            <button
                                                key={index}
                                                className={`gallery-item gallery-item-${index}`}
                                                onClick={() =>
                                                    openLightbox(property, index)
                                                }
                                                type="button"
                                                aria-label={`Voir image ${index + 1}`}
                                            >

                                                <img
                                                    src={image}
                                                    alt={`${property.title} - ${index + 1}`}
                                                    className="property-image"
                                                    loading={
                                                        index === 0
                                                            ? "eager"
                                                            : "lazy"
                                                    }
                                                    decoding="async"
                                                />

                                            </button>

                                        ))}

                                </div>


                                {/* STATUS */}

                                <span className="property-status">
                                    {property.status}
                                </span>


                                {/* TYPE */}

                                <span className="property-type">
                                    {property.type}
                                </span>

                            </div>


                            {/* =================================================
                                CARD CONTENT
                            ================================================= */}

                            <div className="property-content">

                                {/* LOCATION */}

                                <div className="property-location">

                                    <FaMapMarkerAlt
                                        className="location-icon"
                                        aria-hidden="true"
                                    />

                                    <span>
                                        {property.location}
                                    </span>

                                </div>


                                {/* TITLE */}

                                <h3>
                                    {property.title}
                                </h3>


                                {/* DESCRIPTION */}

                                <p className="property-description">
                                    {property.description}
                                </p>


                                {/* =================================================
                                    PROPERTY DETAILS
                                ================================================= */}

                                <div className="property-details">

                                    {/* SURFACE */}

                                    <div className="property-detail">

                                        <span className="detail-icon">
                                            <FaRulerCombined
                                                aria-hidden="true"
                                            />
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


                                    {/* BEDROOMS */}

                                    <div className="property-detail">

                                        <span className="detail-icon">
                                            <FaBed
                                                aria-hidden="true"
                                            />
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


                                    {/* BATHROOMS */}

                                    <div className="property-detail">

                                        <span className="detail-icon">
                                            <FaBath
                                                aria-hidden="true"
                                            />
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

                                </div>


                                {/* =================================================
                                    FOOTER
                                ================================================= */}

                                <div className="property-footer">

                                    {/* PRICE */}

                                    <div className="property-price">

                                        <small>
                                            Prix
                                        </small>

                                        <strong>
                                            {Number(property.price).toLocaleString(
                                                "fr-FR"
                                            )}{" "}
                                            MAD
                                        </strong>

                                    </div>


                                    {/* =================================================
                                        ACTION BUTTONS
                                    ================================================= */}

                                    <div className="property-actions">

                                        {/* APPELER */}

                                        <a
                                            href="tel:+212602991215"
                                            className="property-action call-action"
                                            aria-label="Appelez-nous"
                                        >

                                            <span className="action-icon">
                                                <FaPhoneAlt
                                                    aria-hidden="true"
                                                />
                                            </span>

                                            <span className="action-text">
                                                Appelez-nous
                                            </span>

                                        </a>


                                        {/* WHATSAPP */}

                                        <a
                                            href="https://wa.me/212602991215"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="property-action whatsapp-action"
                                            aria-label="WhatsApp"
                                        >

                                            <span className="action-icon">
                                                <FaWhatsapp
                                                    aria-hidden="true"
                                                />
                                            </span>

                                            <span className="action-text">
                                                WhatsApp
                                            </span>

                                        </a>


                                        {/* DETAILS */}

                                        <Link to={`/properties/${property.id}`} className="property-action details-action" aria-label={`Voir les détails de ${property.title}`} >
                                            <span className="action-text"> Détails </span>
                                            <span className="action-arrow">
                                                <FaArrowRight aria-hidden="true" />
                                            </span>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </section>


            {/* =====================================================
                SINGLE LIGHTBOX
                IMPORTANT: OUTSIDE THE MAP
            ===================================================== */}

            {selectedProperty && selectedImage !== null && (

                <div
                    className="image-lightbox"
                    onClick={closeLightbox}
                >

                    {/* CLOSE */}

                    <button
                        className="lightbox-close"
                        onClick={closeLightbox}
                        type="button"
                        aria-label="Fermer"
                    >
                        ×
                    </button>


                    {/* PREVIOUS */}

                    <button
                        className="lightbox-prev"
                        onClick={showPreviousImage}
                        type="button"
                        aria-label="Image précédente"
                    >
                        ‹
                    </button>


                    {/* IMAGE */}

                    <img
                        src={selectedProperty.images[selectedImage]}
                        alt={`${selectedProperty.title} - ${selectedImage + 1}`}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />


                    {/* NEXT */}

                    <button
                        className="lightbox-next"
                        onClick={showNextImage}
                        type="button"
                        aria-label="Image suivante"
                    >
                        ›
                    </button>


                    {/* COUNTER */}

                    <div
                        className="lightbox-counter"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedImage + 1} /{" "}
                        {selectedProperty.images.length}
                    </div>

                </div>

            )}

        </main>
    );
}

export default Properties;

