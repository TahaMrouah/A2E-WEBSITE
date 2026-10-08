import { useState } from "react";
import "../Style/collaborer.css";

function Collaborer() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Contact
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    preferredContact: "",

    // Property
    propertyType: "",
    propertyTitle: "",
    propertyLocation: "",
    propertySurface: "",
    builtSurface: "",
    bedrooms: "",
    bathrooms: "",
    condition: "",
    ownership: "",

    // Project
    estimatedPrice: "",
    sellingReason: "",
    availability: "",
    description: "",

    // Consent
    consent: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.consent) {
      alert(
        "Veuillez accepter que vos informations soient utilisées afin que notre équipe puisse vous contacter."
      );

      return;
    }

    console.log("Collaboration request:", formData);

    /*
      TODO:
      Connect this form to your A2E API.

      Example:

      await fetch(
        "https://api.a2eimmo.ma/api/collaboration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    */

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="collaborer-page">

        <section className="collaborer-success">

          <div className="success-icon">
            ✓
          </div>

          <span className="collaborer-eyebrow">
            A2E IMMOBILIER
          </span>

          <h1>
            Merci pour votre confiance.
          </h1>

          <p>
            Votre demande a bien été reçue.
            Notre équipe étudiera les informations
            concernant votre bien et vous contactera
            prochainement.
          </p>

          <button
            type="button"
            className="collaborer-back"
            onClick={() => setSubmitted(false)}
          >
            Envoyer une autre demande
          </button>

        </section>

      </main>
    );
  }

  return (
    <main className="collaborer-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="collaborer-hero">

        <div className="collaborer-hero-content">

          <span className="collaborer-eyebrow">
            A2E IMMOBILIER
          </span>

          <h1>
            Confiez-nous
            <br />
            votre bien.
          </h1>

          <p>
            Vous souhaitez vendre votre propriété ?
            Présentez-nous votre bien et notre équipe
            vous accompagnera dans sa commercialisation.
          </p>

        </div>

      </section>


      {/* =================================
          FORM
      ================================= */}

      <section className="collaborer-form-section">

        <div className="collaborer-form-intro">

          <span className="collaborer-section-number">
            01
          </span>

          <div>
            <span className="collaborer-eyebrow">
              Votre projet
            </span>

            <h2>
              Parlons de votre bien
            </h2>

            <p>
              Les informations ci-dessous nous permettent
              de mieux comprendre votre propriété et de
              préparer un premier échange avec vous.
            </p>
          </div>

        </div>


        <form
          className="collaborer-form"
          onSubmit={handleSubmit}
        >

          {/* =================================
              PERSONAL INFORMATION
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>01</span>

              <div>
                <h3>
                  Vos coordonnées
                </h3>

                <p>
                  Comment pouvons-nous vous contacter ?
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="firstName">
                  Prénom *
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                />
              </div>


              <div className="form-field">
                <label htmlFor="lastName">
                  Nom *
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>


              <div className="form-field">
                <label htmlFor="email">
                  Adresse e-mail *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  required
                />
              </div>


              <div className="form-field">
                <label htmlFor="phone">
                  Téléphone *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6 XX XX XX XX"
                  required
                />
              </div>


              <div className="form-field">
                <label htmlFor="city">
                  Ville de résidence
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Casablanca"
                />
              </div>


              <div className="form-field">
                <label htmlFor="preferredContact">
                  Moyen de contact préféré
                </label>

                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="phone">
                    Téléphone
                  </option>

                  <option value="whatsapp">
                    WhatsApp
                  </option>

                  <option value="email">
                    E-mail
                  </option>
                </select>
              </div>

            </div>

          </div>


          {/* =================================
              PROPERTY
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>02</span>

              <div>
                <h3>
                  Votre propriété
                </h3>

                <p>
                  Donnez-nous les principales informations
                  concernant le bien.
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="propertyType">
                  Type de bien *
                </label>

                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="villa">
                    Villa
                  </option>

                  <option value="appartement">
                    Appartement
                  </option>

                  <option value="maison">
                    Maison
                  </option>

                  <option value="terrain">
                    Terrain
                  </option>

                  <option value="riad">
                    Riad
                  </option>

                  <option value="bureau">
                    Bureau
                  </option>

                  <option value="local-commercial">
                    Local commercial
                  </option>

                  <option value="immeuble">
                    Immeuble
                  </option>

                  <option value="autre">
                    Autre
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label htmlFor="propertyTitle">
                  Nom / désignation du bien
                </label>

                <input
                  id="propertyTitle"
                  name="propertyTitle"
                  type="text"
                  value={formData.propertyTitle}
                  onChange={handleChange}
                  placeholder="Ex. Villa Californie"
                />
              </div>


              <div className="form-field form-field-full">
                <label htmlFor="propertyLocation">
                  Localisation du bien *
                </label>

                <input
                  id="propertyLocation"
                  name="propertyLocation"
                  type="text"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  placeholder="Quartier, ville, adresse..."
                  required
                />
              </div>


              <div className="form-field">
                <label htmlFor="propertySurface">
                  Surface du terrain
                </label>

                <div className="input-with-unit">
                  <input
                    id="propertySurface"
                    name="propertySurface"
                    type="number"
                    min="0"
                    value={formData.propertySurface}
                    onChange={handleChange}
                    placeholder="600"
                  />

                  <span>m²</span>
                </div>
              </div>


              <div className="form-field">
                <label htmlFor="builtSurface">
                  Surface construite
                </label>

                <div className="input-with-unit">
                  <input
                    id="builtSurface"
                    name="builtSurface"
                    type="number"
                    min="0"
                    value={formData.builtSurface}
                    onChange={handleChange}
                    placeholder="300"
                  />

                  <span>m²</span>
                </div>
              </div>


              <div className="form-field">
                <label htmlFor="bedrooms">
                  Nombre de chambres
                </label>

                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                />
              </div>


              <div className="form-field">
                <label htmlFor="bathrooms">
                  Nombre de salles de bain
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


              <div className="form-field">
                <label htmlFor="condition">
                  État du bien
                </label>

                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="excellent">
                    Excellent état
                  </option>

                  <option value="bon">
                    Bon état
                  </option>

                  <option value="a-renover">
                    À rénover
                  </option>

                  <option value="non-fini">
                    Non terminé
                  </option>

                  <option value="demolition">
                    À démolir
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label htmlFor="ownership">
                  Situation du bien
                </label>

                <select
                  id="ownership"
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleChange}
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="owner">
                    Je suis propriétaire
                  </option>

                  <option value="representative">
                    Je représente le propriétaire
                  </option>

                  <option value="company">
                    Société / entreprise
                  </option>
                </select>
              </div>

            </div>

          </div>


          {/* =================================
              PROJECT
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>03</span>

              <div>
                <h3>
                  Votre projet de vente
                </h3>

                <p>
                  Aidez-nous à comprendre vos attentes.
                </p>
              </div>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="estimatedPrice">
                  Prix de vente souhaité
                </label>

                <div className="input-with-unit">
                  <input
                    id="estimatedPrice"
                    name="estimatedPrice"
                    type="number"
                    min="0"
                    value={formData.estimatedPrice}
                    onChange={handleChange}
                    placeholder="9 000 000"
                  />

                  <span>MAD</span>
                </div>
              </div>


              <div className="form-field">
                <label htmlFor="availability">
                  Disponibilité du bien
                </label>

                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="immediate">
                    Disponible immédiatement
                  </option>

                  <option value="occupied">
                    Actuellement occupé
                  </option>

                  <option value="after-sale">
                    Disponible après la vente
                  </option>

                  <option value="other">
                    Autre
                  </option>
                </select>
              </div>


              <div className="form-field form-field-full">
                <label htmlFor="sellingReason">
                  Motif de la vente
                </label>

                <select
                  id="sellingReason"
                  name="sellingReason"
                  value={formData.sellingReason}
                  onChange={handleChange}
                >
                  <option value="">
                    Sélectionnez
                  </option>

                  <option value="investment">
                    Investissement
                  </option>

                  <option value="relocation">
                    Changement de résidence
                  </option>

                  <option value="family">
                    Raisons familiales
                  </option>

                  <option value="financial">
                    Raisons financières
                  </option>

                  <option value="other">
                    Autre
                  </option>
                </select>
              </div>


              <div className="form-field form-field-full">

                <label htmlFor="description">
                  Présentez-nous votre bien
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez votre propriété, ses caractéristiques, son emplacement, ses points forts ou toute information que vous jugez importante..."
                  rows="7"
                />

              </div>

            </div>

          </div>


          {/* =================================
              CONSENT
          ================================= */}

          <div className="form-consent">

            <label className="consent-label">

              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />

              <span>
                J'accepte que les informations fournies
                soient utilisées par A2E Immobilier afin
                de traiter ma demande et de me contacter
                concernant mon projet immobilier.
              </span>

            </label>

          </div>


          {/* =================================
              SUBMIT
          ================================= */}

          <div className="form-submit">

            <div>
              <span>
                A2E IMMOBILIER
              </span>

              <p>
                Votre propriété mérite la bonne stratégie
                de commercialisation.
              </p>
            </div>

            <button
              type="submit"
              className="collaborer-submit"
            >
              Soumettre ma demande
              <span>→</span>
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default Collaborer;