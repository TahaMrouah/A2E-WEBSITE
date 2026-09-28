import * as React from "react";

import Card from "@mui/material/Card";

import "../Style/cards.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
    FaArrowRight,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaMapMarkerAlt
} from "react-icons/fa";

import useProperties from "../hooks/useProperties";
import { resolvePropertyImage } from "../Data/propertyImage";


function OffersTitle() {
    return (
        <div className="offers-title">
            <h6>Nos Offres</h6>
            <h1>Des Biens d'exception sélectionnés pour vous</h1>
        </div>
    );
}


export default function RecipeReviewCard() {

    const { properties, loading, error } = useProperties();

    if (loading) {
        return (
            <>
                <OffersTitle />
                <section className="cards" id="offres">
                    <p>Chargement des propriétés...</p>
                </section>
            </>
        );
    }

    if (error) {
        return (
            <>
                <OffersTitle />
                <section className="cards" id="offres">
                    <p>Impossible de charger les propriétés.</p>
                </section>
            </>
        );
    }

    return (
        <>
            <OffersTitle />

            <section className="cards" id="offres">

                {properties.map((card) => (

                    <Card key={card._id} className="card">

                        {/* IMAGE */}
                        <div className="card-image">

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={
                                    Array.isArray(card.images) &&
                                    card.images.length > 1
                                }
                                speed={900}
                                className="villa-carousel"
                            >
                                {Array.isArray(card.images) &&
                                card.images.length > 0 ? (
                                    card.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={resolvePropertyImage(image)}
                                                alt={`${card.title} ${index + 1}`}
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <div className="no-image">
                                            Image non disponible
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            <div className="property-badge">
                                {card.status || "À VENDRE"}
                            </div>

                            {card.type && (
                                <div className="property-type">{card.type}</div>
                            )}

                            <div className="property-price">
                                {Number(card.price).toLocaleString("fr-FR")} MAD
                            </div>

                        </div>


                        {/* CONTENT */}
                        <div className="card-content">

                            {(card.location || card.subheader) && (
                                <div className="property-location">
                                    <FaMapMarkerAlt aria-hidden="true" />
                                    <span>{card.location || card.subheader}</span>
                                </div>
                            )}

                            <h3 className="property-title">{card.title}</h3>

                            <p className="description">
                                {card.description ||
                                    "Découvrez cette propriété d'exception proposée par A2E Immobilier."}
                            </p>

                            <div className="property-features">

                                {card.surface && (
                                    <div className="feature">
                                        <FaRulerCombined aria-hidden="true" />
                                        <span>{card.surface} m²</span>
                                    </div>
                                )}

                                {card.bedrooms !== undefined &&
                                    card.bedrooms !== null && (
                                        <div className="feature">
                                            <FaBed aria-hidden="true" />
                                            <span>
                                                {card.bedrooms} ch.
                                            </span>
                                        </div>
                                    )}

                                {card.bathrooms !== undefined &&
                                    card.bathrooms !== null && (
                                        <div className="feature">
                                            <FaBath aria-hidden="true" />
                                            <span>
                                                {card.bathrooms} sdb
                                            </span>
                                        </div>
                                    )}

                            </div>

                            {Array.isArray(card.features) &&
                                card.features.length > 0 && (
                                    <div className="property-tags">
                                        {card.features
                                            .slice(0, 3)
                                            .map((feature, index) => (
                                                <span key={index}>{feature}</span>
                                            ))}
                                    </div>
                                )}

                            <div className="card-footer">
                                <Link
                                    to={`/properties/${card._id}`}
                                    className="property-button"
                                    aria-label={`Découvrir le bien ${card.title}`}
                                >
                                    <span className="action-text">Détails</span>
                                    <span className="action-arrow">
                                        <FaArrowRight aria-hidden="true" />
                                    </span>
                                </Link>
                            </div>

                        </div>

                    </Card>

                ))}

            </section>


            {/* MORE OFFERS */}
            <div className="offers-more-wrapper">
                <Link to="/properties" className="offers-more-button">
                    Plus d'offres
                    <span>→</span>
                </Link>
            </div>
        </>
    );
}
