
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaBuilding,
    FaChartLine,
    FaPlus,
    FaArrowRight,
    FaSignOutAlt,
    FaSearch,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaHome,
    FaKey,
    FaTimes,
} from "react-icons/fa";

import {
    getProperties,
    deleteProperty,
} from "../Data/getProperties";

import "../Style/Admin/properties.css";


function AdminProperties() {
    const navigate = useNavigate();


    /* ============================================================
       STATE
    ============================================================ */

    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    const [deletePropertyData, setDeletePropertyData] =
        useState(null);


    /* ============================================================
       LOAD PROPERTIES
    ============================================================ */

    const loadProperties = () => {
        try {
            const data = getProperties();

            setProperties(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (error) {
            console.error(
                "Erreur lors du chargement des propriétés :",
                error
            );

            setProperties([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadProperties();
    }, []);


    /* ============================================================
       SEARCH + FILTER
    ============================================================ */

    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {

            const searchValue =
                search.trim().toLowerCase();

            const matchesSearch =
                !searchValue ||
                property.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                property.location
                    ?.toLowerCase()
                    .includes(searchValue) ||
                property.type
                    ?.toLowerCase()
                    .includes(searchValue);


            const status =
                property.status
                    ?.toLowerCase()
                    .trim() || "";


            let matchesFilter = true;


            if (filter === "sale") {
                matchesFilter =
                    status.includes("vendre");
            }


            if (filter === "rent") {
                matchesFilter =
                    status.includes("louer");
            }


            if (filter === "sold") {
                matchesFilter =
                    status === "vendu";
            }


            if (filter === "rented") {
                matchesFilter =
                    status === "loué" ||
                    status === "loue";
            }


            return (
                matchesSearch &&
                matchesFilter
            );
        });
    }, [
        properties,
        search,
        filter,
    ]);


    /* ============================================================
       DELETE
    ============================================================ */

    const handleDelete = () => {

        if (!deletePropertyData) {
            return;
        }


        try {

            const updatedProperties =
                deleteProperty(
                    deletePropertyData.id
                );


            setProperties(
                Array.isArray(updatedProperties)
                    ? updatedProperties
                    : []
            );


            setDeletePropertyData(null);

        } catch (error) {

            console.error(
                "Erreur lors de la suppression :",
                error
            );

        }
    };


    /* ============================================================
       LOGOUT
    ============================================================ */

    const handleLogout = () => {

        localStorage.removeItem(
            "a2e_admin"
        );

        navigate(
            "/admin/login"
        );
    };


    /* ============================================================
       FORMAT PRICE
    ============================================================ */

    const formatPrice = (price) => {

        if (
            price === "" ||
            price === null ||
            price === undefined
        ) {
            return "Prix sur demande";
        }


        const numericPrice =
            Number(price);


        if (Number.isNaN(numericPrice)) {
            return price;
        }


        return new Intl.NumberFormat(
            "fr-FR"
        ).format(numericPrice) + " MAD";
    };


    /* ============================================================
       RENDER
    ============================================================ */

    return (
        <div className="admin-properties-page">


            {/* ====================================================
                SIDEBAR
            ==================================================== */}

            <aside className="admin-sidebar">

                <div className="admin-sidebar-logo">

                    <span>
                        A2E
                    </span>

                    <small>
                        IMMOBILIER
                    </small>

                </div>


                <nav className="admin-sidebar-nav">

                    <Link
                        to="/admin"
                        className="admin-nav-link"
                    >
                        <FaChartLine />

                        <span>
                            Tableau de bord
                        </span>
                    </Link>


                    <Link
                        to="/admin/properties"
                        className="admin-nav-link active"
                    >
                        <FaBuilding />

                        <span>
                            Propriétés
                        </span>
                    </Link>

                </nav>


                <div className="admin-sidebar-bottom">

                    <Link
                        to="/properties"
                        className="admin-view-site"
                    >
                        <FaArrowRight />

                        <span>
                            Voir le site
                        </span>
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


            {/* ====================================================
                MAIN
            ==================================================== */}

            <main className="admin-main">


                {/* ==================================================
                    HEADER
                ================================================== */}

                <header className="admin-header">

                    <div className="admin-header-left">

                        <span className="admin-label">
                            A2E IMMOBILIER
                        </span>

                        <h1>
                            Propriétés
                        </h1>

                        <p>
                            Gérez les biens immobiliers
                            de votre agence.
                        </p>

                    </div>


                    <Link
                        to="/admin/properties/new"
                        className="admin-add-property"
                    >
                        <FaPlus />

                        <span>
                            Ajouter un bien
                        </span>
                    </Link>

                </header>


                {/* ==================================================
                    FILTERS
                ================================================== */}

                <section className="admin-filters">


                    <div className="admin-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Rechercher un bien..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="admin-filter-buttons">

                        <button
                            type="button"
                            className={
                                filter === "all"
                                    ? "admin-filter-button active"
                                    : "admin-filter-button"
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            Tous
                        </button>


                        <button
                            type="button"
                            className={
                                filter === "sale"
                                    ? "admin-filter-button active"
                                    : "admin-filter-button"
                            }
                            onClick={() =>
                                setFilter("sale")
                            }
                        >
                            À vendre
                        </button>


                        <button
                            type="button"
                            className={
                                filter === "rent"
                                    ? "admin-filter-button active"
                                    : "admin-filter-button"
                            }
                            onClick={() =>
                                setFilter("rent")
                            }
                        >
                            À louer
                        </button>


                        <button
                            type="button"
                            className={
                                filter === "sold"
                                    ? "admin-filter-button active"
                                    : "admin-filter-button"
                            }
                            onClick={() =>
                                setFilter("sold")
                            }
                        >
                            Vendus
                        </button>


                        <button
                            type="button"
                            className={
                                filter === "rented"
                                    ? "admin-filter-button active"
                                    : "admin-filter-button"
                            }
                            onClick={() =>
                                setFilter("rented")
                            }
                        >
                            Loués
                        </button>

                    </div>

                </section>


                {/* ==================================================
                    RESULTS COUNT
                ================================================== */}

                {!loading && (

                    <div className="admin-results-count">

                        <span>
                            {filteredProperties.length}
                        </span>

                        {filteredProperties.length > 1
                            ? " biens trouvés"
                            : " bien trouvé"}

                    </div>

                )}


                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading && (

                    <div className="admin-empty-state">

                        <p>
                            Chargement des propriétés...
                        </p>

                    </div>

                )}


                {/* ==================================================
                    EMPTY
                ================================================== */}

                {!loading &&
                    filteredProperties.length === 0 && (

                        <div className="admin-empty-state">

                            <FaBuilding />

                            <h2>
                                Aucun bien trouvé
                            </h2>

                            <p>
                                {search
                                    ? "Aucun bien ne correspond à votre recherche."
                                    : "Commencez par ajouter votre premier bien."
                                }
                            </p>


                            {!search && (

                                <Link
                                    to="/admin/properties/new"
                                    className="admin-add-property"
                                >
                                    <FaPlus />

                                    Ajouter un bien
                                </Link>

                            )}

                        </div>

                    )}


                {/* ==================================================
                    PROPERTY GRID
                ================================================== */}

                {!loading &&
                    filteredProperties.length > 0 && (

                        <section className="admin-properties-grid">

                            {filteredProperties.map(
                                (property) => (

                                    <article
                                        className="admin-property-card"
                                        key={property.id}
                                    >


                                        {/* IMAGE */}

                                        <div className="admin-property-image">

                                            {property.images?.length > 0 ? (

                                                <img
                                                    src={
                                                        property.images[0]
                                                    }
                                                    alt={
                                                        property.title
                                                    }
                                                />

                                            ) : (

                                                <div className="admin-property-no-image">

                                                    <FaBuilding />

                                                    <span>
                                                        Aucune photo
                                                    </span>

                                                </div>

                                            )}


                                            <span className="admin-property-status">

                                                {property.status ||
                                                    "—"}

                                            </span>

                                        </div>


                                        {/* INFO */}

                                        <div className="admin-property-info">


                                            <span className="admin-property-type">

                                                {property.type ||
                                                    "Bien immobilier"}

                                            </span>


                                            <h2>
                                                {property.title ||
                                                    "Sans titre"}
                                            </h2>


                                            <div className="admin-property-location">

                                                <FaMapMarkerAlt />

                                                <span>
                                                    {property.location ||
                                                        "Localisation non renseignée"}
                                                </span>

                                            </div>


                                            <div className="admin-property-details">


                                                {property.surface && (

                                                    <span>

                                                        <FaHome />

                                                        {property.surface}

                                                    </span>

                                                )}


                                                {property.bedrooms !==
                                                    "" &&
                                                    property.bedrooms !==
                                                        null &&
                                                    property.bedrooms !==
                                                        undefined && (

                                                        <span>

                                                            <FaBed />

                                                            {property.bedrooms}

                                                        </span>

                                                    )}


                                                {property.bathrooms !==
                                                    "" &&
                                                    property.bathrooms !==
                                                        null &&
                                                    property.bathrooms !==
                                                        undefined && (

                                                        <span>

                                                            <FaBath />

                                                            {
                                                                property.bathrooms
                                                            }

                                                        </span>

                                                    )}

                                            </div>


                                            {/* CUSTOM CHARACTERISTICS */}

                                            {Array.isArray(
                                                property.characteristics
                                            ) &&
                                                property.characteristics
                                                    .length >
                                                    0 && (

                                                    <div className="admin-property-custom-characteristics">

                                                        {property.characteristics
                                                            .slice(
                                                                0,
                                                                3
                                                            )
                                                            .map(
                                                                (
                                                                    characteristic,
                                                                    index
                                                                ) => (

                                                                    <span
                                                                        key={
                                                                            characteristic.id ||
                                                                            index
                                                                        }
                                                                    >

                                                                        {
                                                                            characteristic.name
                                                                        }

                                                                        {characteristic.value
                                                                            ? ` : ${characteristic.value}`
                                                                            : ""}

                                                                    </span>

                                                                )
                                                            )}

                                                    </div>

                                                )}


                                            <div className="admin-property-price">

                                                {formatPrice(
                                                    property.price
                                                )}

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="admin-property-actions">


                                                <Link
                                                    to={`/admin/properties/${property.id}/edit`}
                                                    className="admin-edit-button"
                                                    title="Modifier"
                                                    aria-label={`Modifier ${
                                                        property.title ||
                                                        "ce bien"
                                                    }`}
                                                >
                                                    <FaEdit />

                                                    <span>
                                                        Modifier
                                                    </span>

                                                </Link>


                                                <button
                                                    type="button"
                                                    className="admin-delete-button"
                                                    title="Supprimer"
                                                    aria-label={`Supprimer ${
                                                        property.title ||
                                                        "ce bien"
                                                    }`}
                                                    onClick={() =>
                                                        setDeletePropertyData(
                                                            property
                                                        )
                                                    }
                                                >
                                                    <FaTrash />

                                                    <span>
                                                        Supprimer
                                                    </span>

                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </section>

                    )}

            </main>


            {/* ====================================================
                DELETE MODAL
            ==================================================== */}

            {deletePropertyData && (

                <div className="admin-delete-overlay">

                    <div className="admin-delete-modal">


                        <button
                            type="button"
                            className="admin-delete-close"
                            onClick={() =>
                                setDeletePropertyData(
                                    null
                                )
                            }
                            aria-label="Fermer"
                        >
                            <FaTimes />
                        </button>


                        <div className="admin-delete-icon">

                            <FaTrash />

                        </div>


                        <span className="admin-delete-label">
                            Confirmation
                        </span>


                        <h2>
                            Supprimer ce bien ?
                        </h2>


                        <p>

                            Êtes-vous sûr de vouloir
                            supprimer{" "}

                            <strong>
                                {deletePropertyData.title}
                            </strong>

                            {" "}?

                            Cette action est
                            irréversible.

                        </p>


                        <div className="admin-delete-actions">

                            <button
                                type="button"
                                className="admin-delete-cancel"
                                onClick={() =>
                                    setDeletePropertyData(
                                        null
                                    )
                                }
                            >
                                Annuler
                            </button>


                            <button
                                type="button"
                                className="admin-delete-confirm"
                                onClick={
                                    handleDelete
                                }
                            >
                                <FaTrash />

                                Supprimer
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


export default AdminProperties;

