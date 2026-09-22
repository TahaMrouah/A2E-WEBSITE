
import React, { useState } from "react";
import "../Style/properties.css";

import {
    FaMapMarkerAlt,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaPhoneAlt,
    FaWhatsapp,
    FaArrowRight,
    FaHome,
    FaCar,
    FaTree,
    FaSwimmingPool,
    FaCouch,
    FaUtensils,
    FaDoorOpen,
    FaWarehouse,
    FaKey,
} from "react-icons/fa";
import { resolvePropertyImage } from "../Data/propertyImage";
import { Link } from "react-router-dom";

import useProperties from "../hooks/useProperties";


/* =========================================================
   CHARACTERISTIC ICONS

   Used later if you add custom characteristics
   from the admin property form.
========================================================= */

const characteristicIcons = {
    bed: FaBed,
    bath: FaBath,
    surface: FaRulerCombined,
    home: FaHome,
    car: FaCar,
    tree: FaTree,
    pool: FaSwimmingPool,
    living: FaCouch,
    kitchen: FaUtensils,
    door: FaDoorOpen,
    warehouse: FaWarehouse,
    key: FaKey,
};


function Properties() {

    /* =====================================================
       LOAD PROPERTIES FROM MONGODB
    ===================================================== */

    const {
        properties,
        loading,
        error,
    } = useProperties();


    /* =====================================================
       LIGHTBOX STATE
    ===================================================== */

    const [selectedProperty, setSelectedProperty] =
        useState(null);

    const [selectedImage, setSelectedImage] =
        useState(null);


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    const openLightbox = (property, index) => {

        setSelectedProperty(property);
        setSelectedImage(index);

    };


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    const closeLightbox = () => {

        setSelectedProperty(null);
        setSelectedImage(null);

    };


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    const showPreviousImage = (e) => {
    e.stopPropagation();

    if (
        !selectedProperty ||
        !selectedProperty.images ||
        selectedProperty.images.length === 0
    ) {
        return;
    }

    setSelectedImage((current) => {
        if (current === 0) {
            return selectedProperty.images.length - 1;
        }

        return current - 1;
    });
};


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    const showNextImage = (e) => {

        e.stopPropagation();

        if (
            !selectedProperty ||
            !selectedProperty.images ||
            selectedProperty.images.length === 0
        ) {
            return;
        }

        setSelectedImage((current) => {

            if (
                current ===
                selectedProperty.images.length - 1
            ) {

                return 0;

            }

            return current + 1;

        });

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main className="properties-page">

                <section className="properties-section">

                    <div
                        style={{
                            minHeight: "400px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                        }}
                    >

                        <h2>
                            Chargement des propriétés...
                        </h2>

                        <p>
                            Connexion à notre sélection immobilière.
                        </p>

                    </div>

                </section>

            </main>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        return (

            <main className="properties-page">

                <section className="properties-section">

                    <div
                        style={{
                            minHeight: "400px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            gap: "10px",
                        }}
                    >

                        <span className="section-label">
                            A2E IMMOBILIER
                        </span>

                        <h2>
                            Impossible de charger les propriétés
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </section>

            </main>

        );

    }


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


                {/* =================================================
                    SECTION HEADING
                ================================================= */}

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
                    EMPTY STATE
                ================================================= */}

                {properties.length === 0 && (

                    <div
                        style={{
                            padding: "80px 20px",
                            textAlign: "center",
                        }}
                    >

                        <FaHome
                            style={{
                                fontSize: "40px",
                                color: "#b08a36",
                                marginBottom: "15px",
                            }}
                        />

                        <h3>
                            Aucune propriété disponible
                        </h3>

                        <p>
                            Nos nouvelles propriétés seront bientôt disponibles.
                        </p>

                    </div>

                )}


                {/* =================================================
                    PROPERTY GRID
                ================================================= */}

                {properties.length > 0 && (

                    <div className="properties-grid">

                        {properties.map((property) => (

                            <article
                                className="property-card"
                                key={property._id}
                            >


                                {/* =================================================
                                    IMAGE GALLERY
                                ================================================= */}

                                <div className="property-image-wrapper">

                                    <div className="property-gallery">

                                        {property.images &&
                                        property.images.length > 0 ? (

                                            property.images
                                                .slice(0, 3)
                                                .map((image, index) => (

                                                    <button
                                                        key={index}
                                                        className={`gallery-item gallery-item-${index}`}
                                                        onClick={() =>
                                                            openLightbox(
                                                                property,
                                                                index
                                                            )
                                                        }
                                                        type="button"
                                                        aria-label={`Voir image ${
                                                            index + 1
                                                        }`}
                                                    >

                                                        <img
                                                            src={resolvePropertyImage(image)}
                                                            alt={`${property.title} - ${
                                                                index + 1
                                                            }`}
                                                            className="property-image"
                                                            loading={
                                                                index === 0
                                                                    ? "eager"
                                                                    : "lazy"
                                                            }
                                                            decoding="async"
                                                        />

                                                    </button>

                                                ))

                                        ) : (

                                            <div
                                                className="gallery-item gallery-item-0"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: "#e4ded3",
                                                }}
                                            >

                                                <FaHome
                                                    style={{
                                                        fontSize: "45px",
                                                        color: "#b08a36",
                                                    }}
                                                />

                                            </div>

                                        )}

                                    </div>


                                    {/* =================================================
                                        STATUS
                                    ================================================= */}

                                    {property.status && (

                                        <span className="property-status">
                                            {property.status}
                                        </span>

                                    )}


                                    {/* =================================================
                                        TYPE
                                    ================================================= */}

                                    {property.type && (

                                        <span className="property-type">
                                            {property.type}
                                        </span>

                                    )}

                                </div>


                                {/* =================================================
                                    CARD CONTENT
                                ================================================= */}

                                <div className="property-content">


                                    {/* LOCATION */}

                                    {property.location && (

                                        <div className="property-location">

                                            <FaMapMarkerAlt
                                                className="location-icon"
                                                aria-hidden="true"
                                            />

                                            <span>
                                                {property.location}
                                            </span>

                                        </div>

                                    )}


                                    {/* TITLE */}

                                    <h3>
                                        {property.title}
                                    </h3>


                                    {/* DESCRIPTION */}

                                    {property.description && (

                                        <p className="property-description">
                                            {property.description}
                                        </p>

                                    )}


                                    {/* =================================================
                                        PROPERTY DETAILS
                                    ================================================= */}

                                    <div className="property-details">


                                        {/* SURFACE */}

                                        {property.surface && (

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

                                        )}


                                        {/* BEDROOMS */}

                                        {property.bedrooms !==
                                            undefined &&
                                            property.bedrooms !==
                                                null && (

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

                                            )}


                                        {/* BATHROOMS */}

                                        {property.bathrooms !==
                                            undefined &&
                                            property.bathrooms !==
                                                null && (

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

                                            )}

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

                                                {property.price !==
                                                    undefined &&
                                                property.price !==
                                                    null &&
                                                property.price !==
                                                    "" ? (

                                                    <>
                                                        {Number(
                                                            property.price
                                                        ).toLocaleString(
                                                            "fr-FR"
                                                        )}{" "}
                                                        MAD
                                                    </>

                                                ) : (

                                                    "Prix sur demande"

                                                )}

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

                                            <Link
                                                to={`/properties/${property._id}`}
                                                className="property-action details-action"
                                                aria-label={`Voir les détails de ${property.title}`}
                                            >

                                                <span className="action-text">
                                                    Détails
                                                </span>

                                                <span className="action-arrow">

                                                    <FaArrowRight
                                                        aria-hidden="true"
                                                    />

                                                </span>

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>


            {/* =====================================================
                SINGLE LIGHTBOX
            ===================================================== */}

            {selectedProperty &&
                selectedImage !== null &&
                selectedProperty.images &&
                selectedProperty.images.length > 0 && (

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

                        {selectedProperty.images.length > 1 && (

                            <button
                                className="lightbox-prev"
                                onClick={showPreviousImage}
                                type="button"
                                aria-label="Image précédente"
                            >
                                ‹
                            </button>

                        )}


                        {/* IMAGE */}

                        <img
                            src={resolvePropertyImage(
        selectedProperty.images[selectedImage]
    )}
                            alt={`${selectedProperty.title} - ${
                                selectedImage + 1
                            }`}
                            className="lightbox-image"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        />


                        {/* NEXT */}

                        {selectedProperty.images.length > 1 && (

                            <button
                                className="lightbox-next"
                                onClick={showNextImage}
                                type="button"
                                aria-label="Image suivante"
                            >
                                ›
                            </button>

                        )}


                        {/* COUNTER */}

                        <div
                            className="lightbox-counter"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
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

