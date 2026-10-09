
import React, { useEffect, useRef, useState } from "react";

import {
    FaArrowLeft,
    FaSave,
    FaImage,
    FaTrash,
    FaPlus,
    FaTimes,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaHome,
    FaBuilding,
    FaCar,
    FaTree,
    FaSwimmingPool,
    FaCouch,
    FaUtensils,
    FaDoorOpen,
    FaWarehouse,
    FaKey,
    FaFire,
    FaSun,
    FaWater,
    FaMapMarkerAlt,
    FaCheck,
} from "react-icons/fa";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getProperty,
    addProperty,
    updateProperty,
} from "../Data/propertyApi";

import "../Style/Admin/property-form.css";


/* ============================================================
   AVAILABLE CHARACTERISTIC ICONS
============================================================ */

const characteristicIcons = [
    {
        name: "FaRulerCombined",
        label: "Surface",
        Icon: FaRulerCombined,
    },
    {
        name: "FaBed",
        label: "Chambre",
        Icon: FaBed,
    },
    {
        name: "FaBath",
        label: "Salle de bain",
        Icon: FaBath,
    },
    {
        name: "FaCar",
        label: "Parking",
        Icon: FaCar,
    },
    {
        name: "FaSwimmingPool",
        label: "Piscine",
        Icon: FaSwimmingPool,
    },
    {
        name: "FaTree",
        label: "Jardin",
        Icon: FaTree,
    },
    {
        name: "FaHome",
        label: "Maison",
        Icon: FaHome,
    },
    {
        name: "FaBuilding",
        label: "Immeuble",
        Icon: FaBuilding,
    },
    {
        name: "FaCouch",
        label: "Salon",
        Icon: FaCouch,
    },
    {
        name: "FaUtensils",
        label: "Cuisine",
        Icon: FaUtensils,
    },
    {
        name: "FaDoorOpen",
        label: "Portes",
        Icon: FaDoorOpen,
    },
    {
        name: "FaWarehouse",
        label: "Garage",
        Icon: FaWarehouse,
    },
    {
        name: "FaKey",
        label: "Clé",
        Icon: FaKey,
    },
    {
        name: "FaFire",
        label: "Cheminée",
        Icon: FaFire,
    },
    {
        name: "FaSun",
        label: "Terrasse",
        Icon: FaSun,
    },
    {
        name: "FaWater",
        label: "Eau",
        Icon: FaWater,
    },
    {
        name: "FaMapMarkerAlt",
        label: "Localisation",
        Icon: FaMapMarkerAlt,
    },
    {
        name: "FaCheck",
        label: "Autre",
        Icon: FaCheck,
    },
];


/* ============================================================
   FIND ICON
============================================================ */

const getIconComponent = (iconName) => {
    const found = characteristicIcons.find(
        (item) => item.name === iconName
    );

    return found ? found.Icon : FaBuilding;
};


/* ============================================================
   EMPTY CHARACTERISTIC
============================================================ */

const createCharacteristic = () => ({
    id:
        typeof crypto !== "undefined" &&
        crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,

    icon: "FaBuilding",

    name: "",

    value: "",
});


/* ============================================================
   EMPTY FORM
============================================================ */

const emptyForm = {
    title: "",
    subheader: "",
    location: "",
    type: "Villa",
    status: "À VENDRE",
    price: "",
    surface: "",
    landArea: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    intro: "",
    features: [],
    images: [],
    characteristics: [],
};


function PropertyForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    const isEditMode = Boolean(id);

    const fileInputRef = useRef(null);


    /* ========================================================
       STATE
    ======================================================== */

    const [formData, setFormData] = useState(emptyForm);

    const [newFeature, setNewFeature] = useState("");

    const [error, setError] = useState("");

    const [saving, setSaving] = useState(false);

    const [loadingProperty, setLoadingProperty] =
        useState(false);


    /* ========================================================
       LOAD PROPERTY WHEN EDITING
    ======================================================== */

    useEffect(() => {
        const loadPropertyForEdit = async () => {
            if (!isEditMode) {
                setFormData(emptyForm);
                return;
            }

            try {
                setLoadingProperty(true);

                setError("");

                const property = await getProperty(id);

                if (!property) {
                    setError(
                        "Cette propriété n'existe pas."
                    );

                    return;
                }

                setFormData({
                    title: property.title || "",

                    subheader:
                        property.subheader || "",

                    location:
                        property.location || "",

                    type:
                        property.type || "Villa",

                    status:
                        property.status || "À VENDRE",

                    price:
                        property.price ?? "",

                    surface:
                        property.surface || "",

                    landArea:
                        property.landArea || "",

                    bedrooms:
                        property.bedrooms ?? "",

                    bathrooms:
                        property.bathrooms ?? "",

                    description:
                        property.description || "",

                    intro:
                        property.intro || "",

                    features:
                        Array.isArray(
                            property.features
                        )
                            ? property.features
                            : [],

                    images:
                        Array.isArray(
                            property.images
                        )
                            ? property.images
                            : [],

                    characteristics:
                        Array.isArray(
                            property.characteristics
                        )
                            ? property.characteristics
                            : [],
                });
            } catch (loadError) {
                console.error(
                    "Error loading property:",
                    loadError
                );

                setError(
                    "Impossible de charger cette propriété."
                );
            } finally {
                setLoadingProperty(false);
            }
        };

        loadPropertyForEdit();
    }, [id, isEditMode]);


    /* ========================================================
       GENERIC INPUT CHANGE
    ======================================================== */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,

            [name]: value,
        }));
    };


    /* ========================================================
       IMAGE FILE PICKER
    ======================================================== */

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    /* ========================================================
       CONVERT FILE TO DATA URL
    ======================================================== */

    const fileToDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(
                    new Error(
                        `Impossible de lire ${file.name}`
                    )
                );
            };

            reader.readAsDataURL(file);
        });
    };


    /* ========================================================
       ADD IMAGES FROM DEVICE
    ======================================================== */

    const handleImageUpload = async (e) => {
        const files = Array.from(
            e.target.files || []
        );

        if (!files.length) {
            return;
        }

        setError("");

        try {
            const imageFiles = files.filter(
                (file) =>
                    file.type.startsWith("image/")
            );

            if (!imageFiles.length) {
                setError(
                    "Veuillez sélectionner des fichiers image."
                );

                return;
            }

            const newImages =
                await Promise.all(
                    imageFiles.map((file) =>
                        fileToDataUrl(file)
                    )
                );

            setFormData((previous) => ({
                ...previous,

                images: [
                    ...previous.images,
                    ...newImages,
                ],
            }));
        } catch (uploadError) {
            console.error(uploadError);

            setError(
                "Une erreur est survenue lors de l'importation des photos."
            );
        }

        e.target.value = "";
    };


    /* ========================================================
       REMOVE IMAGE
    ======================================================== */

    const removeImage = (index) => {
        setFormData((previous) => ({
            ...previous,

            images: previous.images.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            ),
        }));
    };


    /* ========================================================
       ADD CHARACTERISTIC
    ======================================================== */

    const addCharacteristic = () => {
        setFormData((previous) => ({
            ...previous,

            characteristics: [
                ...previous.characteristics,

                createCharacteristic(),
            ],
        }));
    };


    /* ========================================================
       UPDATE CHARACTERISTIC
    ======================================================== */

    const updateCharacteristic = (
        characteristicId,
        field,
        value
    ) => {
        setFormData((previous) => ({
            ...previous,

            characteristics:
                previous.characteristics.map(
                    (characteristic) => {
                        if (
                            characteristic.id ===
                            characteristicId
                        ) {
                            return {
                                ...characteristic,

                                [field]: value,
                            };
                        }

                        return characteristic;
                    }
                ),
        }));
    };


    /* ========================================================
       DELETE CHARACTERISTIC
    ======================================================== */

    const removeCharacteristic = (
        characteristicId
    ) => {
        setFormData((previous) => ({
            ...previous,

            characteristics:
                previous.characteristics.filter(
                    (characteristic) =>
                        characteristic.id !==
                        characteristicId
                ),
        }));
    };


    /* ========================================================
       ADD FEATURE
    ======================================================== */

    const addFeature = () => {
        const feature = newFeature.trim();

        if (!feature) {
            return;
        }

        setFormData((previous) => ({
            ...previous,

            features: [
                ...previous.features,
                feature,
            ],
        }));

        setNewFeature("");
    };


    /* ========================================================
       REMOVE FEATURE
    ======================================================== */

    const removeFeature = (index) => {
        setFormData((previous) => ({
            ...previous,

            features: previous.features.filter(
                (_, featureIndex) =>
                    featureIndex !== index
            ),
        }));
    };


    /* ========================================================
       SAVE PROPERTY
    ======================================================== */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        /* Basic validation */

        if (!formData.title.trim()) {
            setError(
                "Veuillez entrer le titre du bien."
            );

            return;
        }

        if (!formData.location.trim()) {
            setError(
                "Veuillez entrer la localisation."
            );

            return;
        }

        if (!formData.images.length) {
            setError(
                "Veuillez ajouter au moins une photo."
            );

            return;
        }


        /* ====================================================
           CLEAN CHARACTERISTICS
        ==================================================== */

        const cleanedCharacteristics =
            formData.characteristics.filter(
                (characteristic) =>
                    characteristic.name
                        .trim() &&
                    String(
                        characteristic.value
                    ).trim()
            );


        /* ====================================================
           PREPARE PROPERTY
        ==================================================== */

        const propertyToSave = {
            title: formData.title.trim(),

            subheader:
                formData.subheader.trim(),

            location:
                formData.location.trim(),

            type: formData.type,

            status: formData.status,

            price:
                formData.price === ""
                    ? 0
                    : Number(formData.price),

            surface:
                formData.surface.trim(),

            landArea:
                formData.landArea.trim(),

            bedrooms:
                formData.bedrooms === ""
                    ? 0
                    : Number(formData.bedrooms),

            bathrooms:
                formData.bathrooms === ""
                    ? 0
                    : Number(formData.bathrooms),

            description:
                formData.description.trim(),

            intro:
                formData.intro.trim(),

            features:
                formData.features,

            images:
                formData.images,

            characteristics:
                cleanedCharacteristics,
        };


        /* ====================================================
           SEND TO API
        ==================================================== */

        try {
            setSaving(true);

            if (isEditMode) {
                await updateProperty(
                    id,
                    propertyToSave
                );
            } else {
                await addProperty(
                    propertyToSave
                );
            }

            /* API succeeded */

            navigate("/admin/properties");
        } catch (saveError) {
            console.error(
                "Save property error:",
                saveError
            );

            setError(
                saveError.message ||
                "Impossible d'enregistrer le bien."
            );
        } finally {
            setSaving(false);
        }
    };


    /* ========================================================
       LOADING EDIT PROPERTY
    ======================================================== */

    if (
        isEditMode &&
        loadingProperty
    ) {
        return (
            <main className="property-form-page">

                <div
                    style={{
                        padding: "80px",
                        textAlign: "center",
                    }}
                >
                    <h2>
                        Chargement du bien...
                    </h2>
                </div>

            </main>
        );
    }


    /* ========================================================
       RENDER
    ======================================================== */

    return (
        <main className="property-form-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="property-form-header">

                <div className="property-form-header-left">

                    <Link
                        to="/admin/properties"
                        className="property-form-back"
                    >
                        <FaArrowLeft />

                        <span>
                            Retour aux propriétés
                        </span>
                    </Link>

                    <div>

                        <span className="property-form-label">
                            A2E IMMOBILIER
                        </span>

                        <h1>
                            {isEditMode
                                ? "Modifier le bien"
                                : "Ajouter un bien"}
                        </h1>

                    </div>

                </div>


                <button
                    type="submit"
                    form="property-form"
                    className="property-form-save-top"
                    disabled={saving}
                >
                    <FaSave />

                    <span>
                        {saving
                            ? "Enregistrement..."
                            : "Enregistrer"}
                    </span>

                </button>

            </header>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="property-form-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                    >
                        <FaTimes />
                    </button>

                </div>
            )}


            {/* ==================================================
                FORM
            ================================================== */}

            <form
                id="property-form"
                className="property-form"
                onSubmit={handleSubmit}
            >

                {/* =================================================
                    GENERAL INFORMATION
                ================================================= */}

                <section className="property-form-section">

                    <div className="property-form-section-heading">

                        <div>

                            <span>
                                01
                            </span>

                            <h2>
                                Informations générales
                            </h2>

                        </div>

                        <p>
                            Informations principales du bien.
                        </p>

                    </div>


                    <div className="property-form-grid">

                        {/* TITLE */}

                        <div className="form-field form-field-full">

                            <label htmlFor="title">
                                Titre du bien *
                            </label>

                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ex. Belle villa à Bouskoura"
                            />

                        </div>


                        {/* SUBHEADER */}

                        <div className="form-field">

                            <label htmlFor="subheader">
                                Sous-titre
                            </label>

                            <input
                                id="subheader"
                                name="subheader"
                                type="text"
                                value={formData.subheader}
                                onChange={handleChange}
                                placeholder="Ex. Bouskoura Dalia"
                            />

                        </div>


                        {/* LOCATION */}

                        <div className="form-field">

                            <label htmlFor="location">
                                Localisation *
                            </label>

                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Ex. Bouskoura, Casablanca"
                            />

                        </div>


                        {/* TYPE */}

                        <div className="form-field">

                            <label htmlFor="type">
                                Type
                            </label>

                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >

                                <option value="Villa">
                                    Villa
                                </option>

                                <option value="Appartement">
                                    Appartement
                                </option>

                                <option value="Maison">
                                    Maison
                                </option>

                                <option value="Terrain">
                                    Terrain
                                </option>

                                <option value="Bureau">
                                    Bureau
                                </option>

                                <option value="Commerce">
                                    Commerce
                                </option>

                                <option value="Autre">
                                    Autre
                                </option>

                            </select>

                        </div>


                        {/* STATUS */}

                        <div className="form-field">

                            <label htmlFor="status">
                                Statut
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="À VENDRE">
                                    À VENDRE
                                </option>

                                <option value="À LOUER">
                                    À LOUER
                                </option>

                                <option value="VENDU">
                                    VENDU
                                </option>

                                <option value="LOUÉ">
                                    LOUÉ
                                </option>

                            </select>

                        </div>


                        {/* PRICE */}

                        <div className="form-field">

                            <label htmlFor="price">
                                Prix (MAD)
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="2950000"
                            />

                        </div>


                        {/* SURFACE */}

                        <div className="form-field">

                            <label htmlFor="surface">
                                Surface
                            </label>

                            <input
                                id="surface"
                                name="surface"
                                type="text"
                                value={formData.surface}
                                onChange={handleChange}
                                placeholder="250 m²"
                            />

                        </div>


                        {/* LAND AREA */}

                        <div className="form-field">

                            <label htmlFor="landArea">
                                Surface terrain
                            </label>

                            <input
                                id="landArea"
                                name="landArea"
                                type="text"
                                value={formData.landArea}
                                onChange={handleChange}
                                placeholder="970 m²"
                            />

                        </div>


                        {/* BEDROOMS */}

                        <div className="form-field">

                            <label htmlFor="bedrooms">
                                Chambres
                            </label>

                            <input
                                id="bedrooms"
                                name="bedrooms"
                                type="number"
                                min="0"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="4"
                            />

                        </div>


                        {/* BATHROOMS */}

                        <div className="form-field">

                            <label htmlFor="bathrooms">
                                Salles de bain
                            </label>

                            <input
                                id="bathrooms"
                                name="bathrooms"
                                type="number"
                                min="0"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="2"
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <section className="property-form-section">

                    <div className="property-form-section-heading">

                        <div>

                            <span>
                                02
                            </span>

                            <h2>
                                Description
                            </h2>

                        </div>

                        <p>
                            Présentation du bien.
                        </p>

                    </div>


                    <div className="property-form-grid">

                        <div className="form-field form-field-full">

                            <label htmlFor="intro">
                                Introduction
                            </label>

                            <input
                                id="intro"
                                name="intro"
                                type="text"
                                value={formData.intro}
                                onChange={handleChange}
                                placeholder="✨ Une villa exceptionnelle composée de..."
                            />

                        </div>


                        <div className="form-field form-field-full">

                            <label htmlFor="description">
                                Description détaillée
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows="7"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Décrivez le bien..."
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PHOTOS
                ================================================= */}

                <section className="property-form-section">

                    <div className="property-form-section-heading">

                        <div>

                            <span>
                                03
                            </span>

                            <h2>
                                Photos
                            </h2>

                        </div>

                        <p>
                            Ajoutez les photos depuis votre appareil.
                        </p>

                    </div>


                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="property-file-input"
                        onChange={handleImageUpload}
                    />


                    <button
                        type="button"
                        className="property-upload-box"
                        onClick={openFilePicker}
                    >

                        <span className="property-upload-icon">
                            <FaImage />
                        </span>

                        <strong>
                            Ajouter des photos
                        </strong>

                        <span>
                            Cliquez ici pour choisir les photos
                            depuis votre ordinateur
                        </span>

                    </button>


                    {formData.images.length > 0 && (

                        <div className="property-image-preview-grid">

                            {formData.images.map(
                                (image, index) => (

                                    <div
                                        className="property-image-preview"
                                        key={`${image}-${index}`}
                                    >

                                        <img
                                            src={image}
                                            alt={`Aperçu ${index + 1}`}
                                        />


                                        {index === 0 && (
                                            <span className="property-main-image-badge">
                                                Photo principale
                                            </span>
                                        )}


                                        <button
                                            type="button"
                                            className="property-remove-image"
                                            onClick={() =>
                                                removeImage(
                                                    index
                                                )
                                            }
                                            aria-label="Supprimer la photo"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                    CHARACTERISTICS
                ================================================= */}

                <section className="property-form-section">

                    <div className="property-form-section-heading">

                        <div>

                            <span>
                                04
                            </span>

                            <h2>
                                Caractéristiques
                            </h2>

                        </div>

                        <p>
                            Créez vos propres caractéristiques.
                        </p>

                    </div>


                    <div className="characteristics-info">

                        Vous pouvez créer une caractéristique
                        avec votre propre icône, nom et valeur.

                    </div>


                    <div className="characteristics-list">

                        {formData.characteristics.map(
                            (characteristic, index) => {

                                const SelectedIcon =
                                    getIconComponent(
                                        characteristic.icon
                                    );

                                return (

                                    <div
                                        className="characteristic-editor"
                                        key={characteristic.id}
                                    >

                                        <div className="characteristic-editor-top">

                                            <strong>
                                                Caractéristique{" "}
                                                {index + 1}
                                            </strong>

                                            <button
                                                type="button"
                                                className="characteristic-delete"
                                                onClick={() =>
                                                    removeCharacteristic(
                                                        characteristic.id
                                                    )
                                                }
                                            >
                                                <FaTrash />

                                                Supprimer
                                            </button>

                                        </div>
                                        <div className="characteristic-icon-section">

                                            <label>
                                                Choisir une icône
                                            </label>

                                            <div className="characteristic-icon-grid">

                                                {characteristicIcons.map(
                                                    (item) => {

                                                        const Icon =
                                                            item.Icon;

                                                        const isSelected =
                                                            characteristic.icon ===
                                                            item.name;

                                                        return (

                                                            <button
                                                                type="button"
                                                                key={item.name}
                                                                className={`characteristic-icon-button ${
                                                                    isSelected
                                                                        ? "selected"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    updateCharacteristic(
                                                                        characteristic.id,
                                                                        "icon",
                                                                        item.name
                                                                    )
                                                                }
                                                                title={
                                                                    item.label
                                                                }
                                                            >

                                                                <Icon />

                                                                <span>
                                                                    {
                                                                        item.label
                                                                    }
                                                                </span>

                                                            </button>

                                                        );
                                                    }
                                                )}

                                            </div>

                                        </div>


                                        <div className="characteristic-fields">

                                            <div className="form-field">

                                                <label>
                                                    Nom
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        characteristic.name
                                                    }
                                                    onChange={(e) =>
                                                        updateCharacteristic(
                                                            characteristic.id,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Ex. Parking"
                                                />

                                            </div>


                                            <div className="form-field">

                                                <label>
                                                    Valeur / nombre
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        characteristic.value
                                                    }
                                                    onChange={(e) =>
                                                        updateCharacteristic(
                                                            characteristic.id,
                                                            "value",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Ex. 3 places"
                                                />

                                            </div>


                                            <div className="characteristic-live-preview">

                                                <span>
                                                    <SelectedIcon />
                                                </span>

                                                <div>

                                                    <small>
                                                        Aperçu
                                                    </small>

                                                    <strong>
                                                        {
                                                            characteristic.name ||
                                                            "Nom"
                                                        }
                                                    </strong>

                                                    <b>
                                                        {
                                                            characteristic.value ||
                                                            "Valeur"
                                                        }
                                                    </b>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>


                    <button
                        type="button"
                        className="add-characteristic-button"
                        onClick={addCharacteristic}
                    >

                        <FaPlus />

                        Ajouter une caractéristique

                    </button>

                </section>


                {/* =================================================
                    FEATURES
                ================================================= */}

                <section className="property-form-section">

                    <div className="property-form-section-heading">

                        <div>

                            <span>
                                05
                            </span>

                            <h2>
                                Points forts
                            </h2>

                        </div>

                        <p>
                            Ajoutez les détails importants du bien.
                        </p>

                    </div>


                    <div className="feature-add-row">

                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) =>
                                setNewFeature(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {
                                    e.preventDefault();

                                    addFeature();
                                }

                            }}
                            placeholder="Ex. Garage pour 2 voitures"
                        />

                        <button
                            type="button"
                            onClick={addFeature}
                        >
                            <FaPlus />

                            Ajouter
                        </button>

                    </div>


                    {formData.features.length > 0 && (

                        <div className="features-editor-list">

                            {formData.features.map(
                                (feature, index) => (

                                    <div
                                        className="feature-editor-item"
                                        key={`${feature}-${index}`}
                                    >

                                        <span>
                                            <FaCheck />
                                        </span>

                                        <p>
                                            {typeof feature ===
                                                "object" &&
                                            feature !== null
                                                ? `${feature.name || ""}${
                                                      feature.value
                                                          ? ` : ${feature.value}`
                                                          : ""
                                                  }`
                                                : feature}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFeature(
                                                    index
                                                )
                                            }
                                        >
                                            <FaTimes />
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                    BOTTOM ACTIONS
                ================================================= */}

                <div className="property-form-bottom-actions">

                    <Link
                        to="/admin/properties"
                        className="property-form-cancel"
                    >
                        Annuler
                    </Link>


                    <button
                        type="submit"
                        className="property-form-submit"
                        disabled={saving}
                    >

                        <FaSave />

                        {saving
                            ? "Enregistrement..."
                            : isEditMode
                            ? "Enregistrer les modifications"
                            : "Créer le bien"}

                    </button>

                </div>

            </form>

        </main>
    );
}


export default PropertyForm;

