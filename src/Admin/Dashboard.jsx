
import React from "react";
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
    FaEdit,FaRulerCombined
} from "react-icons/fa";

import useProperties from "../hooks/useProperties";
import { resolvePropertyImage } from "../Data/propertyImage";

import "../Style/Admin/dashboard.css";


function Dashboard() {

    const navigate = useNavigate();


    /* ================================
       LOAD PROPERTIES FROM MONGODB
    ================================= */

    const {
        properties,
        loading,
        error,
    } = useProperties();


    /* ================================
       PROPERTY STATISTICS
    ================================= */

    const totalProperties = properties.length;

    const propertiesForSale = properties.filter(
        (property) =>
            property.status
                ?.toLowerCase()
                .includes("vendre")
    ).length;

    const propertiesForRent = properties.filter(
        (property) =>
            property.status
                ?.toLowerCase()
                .includes("louer")
    ).length;


    /* ================================
       LOGOUT
    ================================= */

  
const handleLogout = async () => {

    try {

        const response = await fetch(
            "/api/auth/logout",
            {
                method: "POST",
                credentials: "include",
            }
        );


        if (!response.ok) {

            throw new Error(
                "Logout failed"
            );

        }


        navigate(
            "/admin/login",
            {
                replace: true,
            }
        );

    }

    catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

};



    /* ================================
       LOADING
    ================================= */

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
                        Chargement des propriétés...
                    </div>

                </section>

            </main>
        );

    }


    return (

        <main className="admin-dashboard">


            {/* ==========================================
                SIDEBAR
            ========================================== */}

            <aside className="admin-sidebar">


                {/* LOGO */}

                <div className="admin-sidebar-logo">

                    <span>A2E</span>

                    <small>
                        IMMOBILIER
                    </small>

                </div>


                {/* NAVIGATION */}

                <nav className="admin-sidebar-nav">

                    <span className="admin-nav-title">
                        ADMINISTRATION
                    </span>


                    <Link
                        to="/admin"
                        className="admin-nav-link active"
                    >

                        <FaChartLine />

                        <span>
                            Dashboard
                        </span>

                    </Link>


                    <Link
                        to="/admin/properties"
                        className="admin-nav-link"
                    >

                        <FaBuilding />

                        <span>
                            Propriétés
                        </span>

                    </Link>

                </nav>


                {/* SIDEBAR BOTTOM */}

                <div className="admin-sidebar-bottom">


                    <Link
                        to="/properties"
                        className="admin-view-site"
                    >

                        <span>
                            Voir le site
                        </span>

                        <FaArrowRight />

                    </Link>


                    <button
                        type="button"
                        className="admin-logout"
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt />

                        <span>
                            Déconnexion
                        </span>

                    </button>

                </div>

            </aside>


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <section className="admin-dashboard-content">


                {/* TOP BAR */}

                <header className="admin-dashboard-header">

                    <div>

                        <span className="admin-dashboard-label">
                            A2E IMMOBILIER
                        </span>

                        <h1>
                            Dashboard
                        </h1>

                    </div>


                    <div className="admin-header-actions">

                        <span className="admin-welcome">
                            Administration
                        </span>

                        <div className="admin-avatar">
                            A
                        </div>

                    </div>

                </header>


                {/* ==========================================
                    DATABASE ERROR
                ========================================== */}

                {error && (

                    <div
                        style={{
                            marginBottom: "25px",
                            padding: "15px 20px",
                            border: "1px solid #eadbd7",
                            borderRadius: "7px",
                            background: "#fff9f7",
                            color: "#a45b50",
                            fontSize: "12px",
                        }}
                    >
                        Impossible de charger les propriétés :
                        {" "}
                        {error}
                    </div>

                )}


                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <section className="admin-statistics">


                    {/* TOTAL */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            <FaBuilding />
                        </div>

                        <div className="admin-stat-content">

                            <span>
                                TOTAL PROPRIÉTÉS
                            </span>

                            <strong>
                                {totalProperties}
                            </strong>

                            <small>
                                Biens dans votre catalogue
                            </small>

                        </div>

                    </div>


                    {/* SALE */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            <FaHome />
                        </div>

                        <div className="admin-stat-content">

                            <span>
                                À VENDRE
                            </span>

                            <strong>
                                {propertiesForSale}
                            </strong>

                            <small>
                                Propriétés disponibles
                            </small>

                        </div>

                    </div>


                    {/* RENT */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            <FaKey />
                        </div>

                        <div className="admin-stat-content">

                            <span>
                                À LOUER
                            </span>

                            <strong>
                                {propertiesForRent}
                            </strong>

                            <small>
                                Propriétés disponibles
                            </small>

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    CONTENT GRID
                ========================================== */}

                <section className="admin-dashboard-grid">


                    {/* ======================================
                        RECENT PROPERTIES
                    ====================================== */}

                    <div className="admin-recent-properties">


                        <div className="admin-section-header">

                            <div>

                                <span className="admin-section-label">
                                    CATALOGUE
                                </span>

                                <h2>
                                    Propriétés récentes
                                </h2>

                            </div>


                            <Link
                                to="/admin/properties"
                                className="admin-section-link"
                            >

                                Voir tout

                                <FaArrowRight />

                            </Link>

                        </div>


                        <div className="admin-property-list">


                            {properties
                                .slice(0, 5)
                                .map((property) => {

                                    const propertyImage =
                                        Array.isArray(
                                            property.images
                                        ) &&
                                        property.images.length > 0
                                            ? resolvePropertyImage(
                                                  property.images[0]
                                              )
                                            : null;


                                    return (

                                        <div
                                            className="admin-property-row"
                                            key={property._id}
                                        >


                                            {/* IMAGE */}

                                            <div className="admin-property-image">

                                                {propertyImage ? (

                                                    <img
                                                        src={
                                                            propertyImage
                                                        }
                                                        alt={
                                                            property.title
                                                        }
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


                                            {/* INFORMATION */}

                                            <div className="admin-property-info">

                                                <h3>
                                                    {
                                                        property.title
                                                    }
                                                </h3>


                                                <div className="admin-property-location">

                                                    <FaMapMarkerAlt />

                                                    <span>
                                                        {
                                                            property.location
                                                        }
                                                    </span>

                                                </div>


                                                <div className="admin-property-meta">

                                                    <span>

                                                        <FaBed />

                                                        {
                                                            property.bedrooms
                                                        }

                                                    </span>


                                                    <span>

                                                        <FaBath />

                                                        {
                                                            property.bathrooms
                                                        }

                                                    </span>


                                                    <span>
                                                        <FaRulerCombined/>
                                                        {
                                                            property.surface
                                                        }
                                                    </span>

                                                </div>
                                                        {/* PRICE */}

                                            <div className="admin-property-price">

                                                <small>
                                                    PRIX
                                                </small>

                                                <strong>

                                                    {Number(
                                                        property.price
                                                    ).toLocaleString(
                                                        "fr-FR"
                                                    )}

                                                    {" "}
                                                    MAD

                                                </strong>

                                            </div>
                                            </div>


                                            


                                            {/* STATUS */}

                                            <div className="admin-property-status">

                                                <span
                                                    className={
                                                        property.status
                                                            ?.toLowerCase()
                                                            .includes(
                                                                "vendre"
                                                            )
                                                            ? "for-sale"
                                                            : "for-rent"
                                                    }
                                                >

                                                    {
                                                        property.status
                                                    }

                                                </span>

                                            </div>


                                            {/* EDIT */}

                                            <Link
                                                to={`/admin/properties/${property._id}/edit`}
                                                className="admin-property-edit"
                                            >

                                                <FaEdit />
<span>Modifier</span>

                                            </Link>

                                        </div>

                                    );

                                })}

                        </div>

                    </div>


                    {/* ======================================
                        QUICK ACTIONS
                    ====================================== */}

                    <div className="admin-quick-actions">


                        <div className="admin-section-header">

                            <div>

                                <span className="admin-section-label">
                                    ACTIONS
                                </span>

                                <h2>
                                    Accès rapide
                                </h2>

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

                                    <strong>
                                        Ajouter une propriété
                                    </strong>

                                    <span>
                                        Créer une nouvelle annonce
                                    </span>

                                </div>

                                <FaArrowRight className="admin-action-arrow" />

                            </Link>


                            <Link
                                to="/admin/properties"
                                className="admin-action-card"
                            >

                                <div className="admin-action-icon">
                                    <FaBuilding />
                                </div>

                                <div>

                                    <strong>
                                        Gérer les propriétés
                                    </strong>

                                    <span>
                                        Modifier ou supprimer un bien
                                    </span>

                                </div>

                                <FaArrowRight className="admin-action-arrow" />

                            </Link>


                            <Link
                                to="/properties"
                                className="admin-action-card"
                            >

                                <div className="admin-action-icon">
                                    <FaHome />
                                </div>

                                <div>

                                    <strong>
                                        Voir le site
                                    </strong>

                                    <span>
                                        Consulter le site public
                                    </span>

                                </div>

                                <FaArrowRight className="admin-action-arrow" />

                            </Link>


                        </div>

                    </div>

                </section>


                {/* ==========================================
                    FOOTER
                ========================================== */}

                <footer className="admin-dashboard-footer">

                    <span>
                        A2E IMMOBILIER
                    </span>

                    <span>
                        Administration
                    </span>

                    <span>
                        © {new Date().getFullYear()}
                    </span>

                </footer>


            </section>

        </main>
    );
}


export default Dashboard;
