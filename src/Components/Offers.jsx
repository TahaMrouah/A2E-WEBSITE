import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "../Style/cards.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaArrowRight } from "react-icons/fa";

import useProperties from "../hooks/useProperties";
import { resolvePropertyImage } from "../Data/propertyImage";


export default function RecipeReviewCard() {

    const {
        properties,
        loading,
        error,
    } = useProperties();


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <>
                <div className="offers-title">
                    <h6>Nos Offres</h6>
                    <h1>
                        Des Biens d'exception sélectionnés pour vous
                    </h1>
                </div>

                <section className="cards" id="offres">
                    <p>Chargement des propriétés...</p>
                </section>
            </>
        );
    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {
        return (
            <>
                <div className="offers-title">
                    <h6>Nos Offres</h6>
                    <h1>
                        Des Biens d'exception sélectionnés pour vous
                    </h1>
                </div>

                <section className="cards" id="offres">
                    <p>
                        Impossible de charger les propriétés.
                    </p>
                </section>
            </>
        );
    }


    return (
        <>
            {/* =================================================
                TITLE
            ================================================= */}

            <div className="offers-title">
                <h6>Nos Offres</h6>

                <h1>
                    Des Biens d'exception sélectionnés pour vous
                </h1>
            </div>


            {/* =================================================
                PROPERTY CARDS
            ================================================= */}

            <section className="cards" id="offres">

                {properties.map((card) => (

                    <Card
                        key={card._id}
                        className="card"
                    >

                        {/* =========================================
                            LEFT — LARGE IMAGE CAROUSEL
                        ========================================= */}

                        <div className="card-image">

                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Autoplay,
                                ]}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
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

                                    card.images.map(
                                        (image, index) => {

                                            const imageUrl =
                                                resolvePropertyImage(
                                                    image
                                                );

                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={`${card.title} ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </SwiperSlide>
                                            );
                                        }
                                    )

                                ) : (

                                    <SwiperSlide>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            Image non disponible
                                        </div>
                                    </SwiperSlide>

                                )}

                            </Swiper>


                            {/* PROPERTY BADGE */}

                            <div className="property-badge">

                                {card.status || "À VENDRE"}

                            </div>

                        </div>


                        {/* =========================================
                            RIGHT — PROPERTY INFORMATION
                        ========================================= */}

                        <div className="card-content">

                            <CardHeader
                                avatar={
                                    <Avatar
                                        className="a2e-avatar"
                                        aria-label="A2E"
                                    >
                                        A2E
                                    </Avatar>
                                }

                                action={
                                    <IconButton
                                        aria-label="settings"
                                        className="property-menu"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }

                                title={card.title}

                                subheader={
                                    card.location ||
                                    card.subheader ||
                                    ""
                                }
                            />


                            {/* =====================================
                                DESCRIPTION
                            ===================================== */}

                            <CardContent className="description">

                                <Typography variant="body2">

                                    {card.description ||
                                        "Découvrez cette propriété d'exception proposée par A2E Immobilier."}

                                </Typography>

                            </CardContent>


                            {/* =====================================
                                PROPERTY DETAILS
                            ===================================== */}

                            <CardContent className="property-details">


                                {/* PRICE */}

                                <Typography className="property-price">

                                    {Number(
                                        card.price
                                    ).toLocaleString("fr-FR")}

                                    {" "}MAD

                                </Typography>


                                {/* INTRO */}

                                <Typography className="property-intro">

                                    ✨ Une propriété sélectionnée
                                    pour vous composée de :

                                </Typography>


                                {/* FEATURES */}

                                <div className="property-features">


                                    {/* BEDROOMS */}

                                    {card.bedrooms !== undefined &&
                                        card.bedrooms !== null && (

                                            <Typography>
                                                🛏️ {card.bedrooms} chambre
                                                {Number(card.bedrooms) > 1
                                                    ? "s"
                                                    : ""}
                                            </Typography>

                                        )}


                                    {/* SURFACE */}

                                    {card.surface && (

                                        <Typography>
                                            📐 {card.surface} m²
                                        </Typography>

                                    )}


                                    {/* BATHROOMS */}

                                    {card.bathrooms !== undefined &&
                                        card.bathrooms !== null && (

                                            <Typography>
                                                🛁 {card.bathrooms} salle
                                                {Number(card.bathrooms) > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                de bain
                                                {Number(card.bathrooms) > 1
                                                    ? "s"
                                                    : ""}
                                            </Typography>

                                        )}


                                    {/* TYPE */}

                                    {card.type && (

                                        <Typography>
                                            🏠 {card.type}
                                        </Typography>

                                    )}


                                    {/* LOCATION */}

                                    {card.location && (

                                        <Typography>
                                            📍 {card.location}
                                        </Typography>

                                    )}


                                    {/* ADDITIONAL FEATURES */}

                                    {Array.isArray(card.features) &&
                                        card.features.map(
                                            (feature, index) => (

                                                <Typography
                                                    key={index}
                                                >
                                                    {feature}
                                                </Typography>

                                            )
                                        )}

                                </div>
                                 <div className="card-footer">

                                <Link
                                    to={`/properties/${card._id}`}
                                    className="property-button"
                                    aria-label={`Découvrir le bien ${card.title}`}
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

                            </CardContent>


                            {/* =====================================
                                FOOTER / DETAILS BUTTON
                            ===================================== */}

                           

                        </div>

                    </Card>

                ))}


                

            </section>
            {/* =============================================
                    MORE OFFERS
                ============================================= */}

                <Link
                    to="/properties"
                    className="offers-more-button"
                >

                    Plus d'offres

                    <span>
                        →
                    </span>

                </Link>
        </>
    );
}