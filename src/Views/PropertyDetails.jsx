import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "../Style/property-details.css";

import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaPhoneAlt,
    FaWhatsapp,
    FaHome,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
    FaExpand,
} from "react-icons/fa";

import { getProperty } from "../Data/propertyApi";
import { resolvePropertyImage } from "../Data/propertyImage";

function PropertyDetails() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProperty(id);

                setProperty(data);
                setSelectedImage(0);
            } catch (err) {
                console.error("Error loading property:", err);

                setError(
                    "Impossible de charger cette propriété."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    const images = useMemo(() => {
        if (!Array.isArray(property?.images)) {
            return [];
        }

        return property.images.filter(Boolean);
    }, [property]);

    const resolvedImages = useMemo(() => {
        return images.map((image) =>
            resolvePropertyImage(image)
        );
    }, [images]);

    const currentImage =
        resolvedImages.length > 0
            ? resolvedImages[selectedImage]
            : "";

    const heroImage =
        resolvedImages.length > 0
            ? resolvedImages[0]
            : "";

    const showPreviousImage = () => {
        if (resolvedImages.length === 0) {
            return;
        }

        setSelectedImage((current) => {
            if (current === 0) {
                return resolvedImages.length - 1;
            }

            return current - 1;
        });
    };

    const showNextImage = () => {
        if (resolvedImages.length === 0) {
            return;
        }

        setSelectedImage((current) => {
            if (current === resolvedImages.length - 1) {
                return 0;
            }

            return current + 1;
        });
    };

    const selectImage = (index) => {
        setSelectedImage(index);
    };

    const openLightbox = (index = selectedImage) => {
        setSelectedImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "";
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (!lightboxOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [lightboxOpen, resolvedImages.length]);

    const whatsappMessage = encodeURIComponent(
        `Bonjour, je suis intéressé(e) par la propriété "${property?.title || ""}".`
    );

    if (loading) {
        return (
            <main className="property-details-page">
                <div className="property-details-loading">
                    <div className="property-loading-spinner"></div>

                    <p>
                        Chargement de la propriété...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !property) {
        return (
            <main className="property-details-page">
                <div className="property-details-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>
                        {error
                            ? "Une erreur est survenue"
                            : "Propriété introuvable"}
                    </h2>

                    <p>
                        {error ||
                            "Cette propriété n'existe pas ou n'est plus disponible."}
                    </p>

                    <Link
                        to="/properties"
                        className="back-properties"
                    >
                        <FaArrowLeft />
                        Retour aux propriétés
                    </Link>

                </div>
            </main>
        );
    }

    return (
        <main className="property-details-page">

            {/* HERO */}

            <section
                className="property-details-hero"
                style={
                    heroImage
                        ? {
                              backgroundImage: `
                                  linear-gradient(
                                      90deg,
                                      rgba(20, 18, 15, 0.82) 0%,
                                      rgba(20, 18, 15, 0.48) 45%,
                                      rgba(20, 18, 15, 0.12) 100%
                                  ),
                                  url("${heroImage}")
                              `,
                          }
                        : {}
                }
            >

                <div className="property-hero-inner">

                    <Link
                        to="/properties"
                        className="property-hero-back"
                    >
                        <FaArrowLeft />

                        <span>
                            Retour aux propriétés
                        </span>
                    </Link>

                    <div className="property-hero-content">

                        <span className="property-hero-status">
                            {property.status || "À VENDRE"}
                        </span>

                        <h1>
                            {property.title}
                        </h1>

                        {property.location && (
                            <div className="property-hero-location">

                                <FaMapMarkerAlt />

                                <span>
                                    {property.location}
                                </span>

                            </div>
                        )}

                        <div className="property-hero-price">

                            <span>
                                Prix
                            </span>

                            <strong>
                                {Number(
                                    property.price || 0
                                ).toLocaleString("fr-FR")}{" "}
                                MAD
                            </strong>

                        </div>

                    </div>

                    {resolvedImages.length > 0 && (
                        <button
                            type="button"
                            className="hero-view-button"
                            onClick={() =>
                                openLightbox(0)
                            }
                        >
                            <FaExpand />

                            <span>
                                Voir les photos
                            </span>
                        </button>
                    )}

                </div>

            </section>


            {/* MAIN CONTENT */}

            <div className="property-details-container">

                {/* GALLERY */}

                <section className="property-gallery-section">

                    <div className="gallery-heading">

                        <div>

                            <span className="section-eyebrow">
                                Galerie
                            </span>

                            <h2>
                                Découvrez la propriété
                            </h2>

                        </div>

                        {resolvedImages.length > 0 && (
                            <span className="gallery-count">
                                {resolvedImages.length}{" "}
                                {resolvedImages.length === 1
                                    ? "photo"
                                    : "photos"}
                            </span>
                        )}

                    </div>


                    {resolvedImages.length > 0 ? (
                        <>

                            {/* MAIN IMAGE */}

                            <div className="property-main-gallery">

                                <button
                                    type="button"
                                    className="main-gallery-image-button"
                                    onClick={() =>
                                        openLightbox(
                                            selectedImage
                                        )
                                    }
                                    aria-label="Agrandir l'image"
                                >

                                    <img
                                        src={currentImage}
                                        alt={`${property.title} - photo ${
                                            selectedImage + 1
                                        }`}
                                        className="property-main-image"
                                    />

                                    <div className="main-image-overlay">

                                        <div className="main-image-expand">

                                            <FaExpand />

                                            <span>
                                                Agrandir
                                            </span>

                                        </div>

                                        <span className="main-image-number">
                                            {selectedImage + 1} /{" "}
                                            {resolvedImages.length}
                                        </span>

                                    </div>

                                </button>


                                {resolvedImages.length > 1 && (
                                    <>

                                        <button
                                            type="button"
                                            className="main-gallery-arrow main-gallery-prev"
                                            onClick={
                                                showPreviousImage
                                            }
                                            aria-label="Photo précédente"
                                        >
                                            <FaChevronLeft />
                                        </button>

                                        <button
                                            type="button"
                                            className="main-gallery-arrow main-gallery-next"
                                            onClick={
                                                showNextImage
                                            }
                                            aria-label="Photo suivante"
                                        >
                                            <FaChevronRight />
                                        </button>

                                    </>
                                )}

                            </div>


                            {/* THUMBNAILS */}

                            {resolvedImages.length > 1 && (
                                <div className="property-thumbnail-wrapper">

                                    <button
                                        type="button"
                                        className="thumbnail-scroll-button"
                                        onClick={
                                            showPreviousImage
                                        }
                                        aria-label="Photo précédente"
                                    >
                                        <FaChevronLeft />
                                    </button>

                                    <div className="property-thumbnails">

                                        {resolvedImages.map(
                                            (
                                                image,
                                                index
                                            ) => (

                                                <button
                                                    type="button"
                                                    key={`${image}-${index}`}
                                                    className={`property-thumbnail ${
                                                        selectedImage ===
                                                        index
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        selectImage(
                                                            index
                                                        )
                                                    }
                                                    aria-label={`Voir la photo ${
                                                        index + 1
                                                    }`}
                                                >

                                                    <img
                                                        src={image}
                                                        alt={`${property.title} miniature ${
                                                            index +
                                                            1
                                                        }`}
                                                    />

                                                    <span>
                                                        {index +
                                                            1}
                                                    </span>

                                                </button>

                                            )
                                        )}

                                    </div>

                                    <button
                                        type="button"
                                        className="thumbnail-scroll-button"
                                        onClick={
                                            showNextImage
                                        }
                                        aria-label="Photo suivante"
                                    >
                                        <FaChevronRight />
                                    </button>

                                </div>
                            )}

                        </>
                    ) : (

                        <div className="property-no-image">

                            <FaHome />

                            <p>
                                Aucune image disponible
                            </p>

                        </div>

                    )}

                </section>


                {/* INFORMATION */}

                <section className="property-information-section">

                    <div className="property-main-information">

                        {property.intro && (
                            <div className="property-intro">
                                <p>
                                    {property.intro}
                                </p>
                            </div>
                        )}

                        {property.description && (
                            <div className="property-description">

                                <span className="section-eyebrow">
                                    À propos
                                </span>

                                <h2>
                                    Description
                                </h2>

                                <p>
                                    {property.description}
                                </p>

                            </div>
                        )}

                        {Array.isArray(
                            property.characteristics
                        ) &&
                            property.characteristics.length >
                                0 && (

                                <div className="property-characteristics">

                                    <span className="section-eyebrow">
                                        Détails
                                    </span>

                                    <h2>
                                        Caractéristiques
                                    </h2>

                                    <div className="characteristics-grid">

                                        {property.characteristics.map(
                                            (
                                                characteristic,
                                                index
                                            ) => {

                                                let Icon =
                                                    FaHome;

                                                if (
                                                    characteristic.icon ===
                                                    "FaBed"
                                                ) {
                                                    Icon =
                                                        FaBed;
                                                }

                                                if (
                                                    characteristic.icon ===
                                                    "FaBath"
                                                ) {
                                                    Icon =
                                                        FaBath;
                                                }

                                                if (
                                                    characteristic.icon ===
                                                    "FaRulerCombined"
                                                ) {
                                                    Icon =
                                                        FaRulerCombined;
                                                }

                                                return (
                                                    <div
                                                        className="characteristic-item"
                                                        key={
                                                            characteristic.id ||
                                                            index
                                                        }
                                                    >

                                                        <div className="characteristic-icon">
                                                            <Icon />
                                                        </div>

                                                        <div className="characteristic-text">

                                                            <span>
                                                                {
                                                                    characteristic.name
                                                                }
                                                            </span>

                                                            <strong>
                                                                {
                                                                    characteristic.value
                                                                }
                                                            </strong>

                                                        </div>

                                                    </div>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>
                            )}

                        {Array.isArray(
                            property.features
                        ) &&
                            property.features.length >
                                0 && (

                                <div className="property-features">

                                    <span className="section-eyebrow">
                                        Points forts
                                    </span>

                                    <h2>
                                        Points forts
                                    </h2>

                                    <div className="features-list">

                                        {property.features.map(
                                            (
                                                feature,
                                                index
                                            ) => (

                                                <div
                                                    className="feature-item"
                                                    key={index}
                                                >

                                                    <span className="feature-check">
                                                        ✓
                                                    </span>

                                                    <span>
                                                        {feature}
                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                    </div>


                    {/* SIDEBAR */}

                    <aside className="property-sidebar">

                        <div className="property-quick-details">

                            <span className="section-eyebrow">
                                Informations
                            </span>

                            <h3>
                                Ce bien en détail
                            </h3>

                            {property.type && (
                                <div className="property-detail-row">

                                    <div className="property-detail-icon">
                                        <FaHome />
                                    </div>

                                    <div>
                                        <span>
                                            Type
                                        </span>

                                        <strong>
                                            {property.type}
                                        </strong>
                                    </div>

                                </div>
                            )}

                            {property.surface && (
                                <div className="property-detail-row">

                                    <div className="property-detail-icon">
                                        <FaRulerCombined />
                                    </div>

                                    <div>
                                        <span>
                                            Surface
                                        </span>

                                        <strong>
                                            {property.surface}
                                        </strong>
                                    </div>

                                </div>
                            )}

                            {property.landArea &&
                                property.landArea !== "—" && (
                                    <div className="property-detail-row">

                                        <div className="property-detail-icon">
                                            <FaRulerCombined />
                                        </div>

                                        <div>
                                            <span>
                                                Terrain
                                            </span>

                                            <strong>
                                                {
                                                    property.landArea
                                                }
                                            </strong>
                                        </div>

                                    </div>
                                )}

                            {property.bedrooms > 0 && (
                                <div className="property-detail-row">

                                    <div className="property-detail-icon">
                                        <FaBed />
                                    </div>

                                    <div>
                                        <span>
                                            Chambres
                                        </span>

                                        <strong>
                                            {
                                                property.bedrooms
                                            }
                                        </strong>
                                    </div>

                                </div>
                            )}

                            {property.bathrooms > 0 && (
                                <div className="property-detail-row">

                                    <div className="property-detail-icon">
                                        <FaBath />
                                    </div>

                                    <div>
                                        <span>
                                            Salles de bain
                                        </span>

                                        <strong>
                                            {
                                                property.bathrooms
                                            }
                                        </strong>
                                    </div>

                                </div>
                            )}

                        </div>


                        {/* CONTACT */}

                        <div className="property-contact-card">

                            <span className="section-eyebrow">
                                A2E IMMOBILIER
                            </span>

                            <h3>
                                Intéressé par ce bien ?
                            </h3>

                            <p>
                                Notre équipe est à votre
                                disposition pour vous
                                renseigner et organiser
                                une visite.
                            </p>

                            <a
                                href="tel:+212602991215"
                                className="property-call-button"
                            >
                                <FaPhoneAlt />

                                <span>
                                    Appeler maintenant
                                </span>
                            </a>

                            <a
                                href={`https://wa.me/212602991215?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="property-whatsapp-button"
                            >
                                <FaWhatsapp />

                                <span>
                                    WhatsApp
                                </span>
                            </a>

                        </div>

                    </aside>

                </section>

            </div>


            {/* LIGHTBOX */}

            {lightboxOpen &&
                resolvedImages.length > 0 && (

                    <div
                        className="property-lightbox"
                        onClick={closeLightbox}
                    >

                        <button
                            type="button"
                            className="lightbox-close"
                            onClick={(event) => {
                                event.stopPropagation();
                                closeLightbox();
                            }}
                            aria-label="Fermer"
                        >
                            <FaTimes />
                        </button>

                        <div className="lightbox-counter">
                            {selectedImage + 1} /{" "}
                            {resolvedImages.length}
                        </div>

                        <button
                            type="button"
                            className="lightbox-navigation lightbox-prev"
                            onClick={(event) => {
                                event.stopPropagation();
                                showPreviousImage();
                            }}
                            aria-label="Photo précédente"
                        >
                            <FaChevronLeft />
                        </button>

                        <div
                            className="lightbox-image-container"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            <img
                                src={
                                    resolvedImages[
                                        selectedImage
                                    ]
                                }
                                alt={`${property.title} - photo ${
                                    selectedImage + 1
                                }`}
                                className="lightbox-image"
                            />

                        </div>

                        <button
                            type="button"
                            className="lightbox-navigation lightbox-next"
                            onClick={(event) => {
                                event.stopPropagation();
                                showNextImage();
                            }}
                            aria-label="Photo suivante"
                        >
                            <FaChevronRight />
                        </button>

                    </div>
                )}

        </main>
    );
}

export default PropertyDetails;
