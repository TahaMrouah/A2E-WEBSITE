import React from "react";

import "../Style/about.css";

function About() {
  return (
    <main className="about-page">

      {/* HERO */}
      <header className="about-hero">
        <span className="about-label">
          A2E IMMOBILIER
        </span>

        <h1>
          L'immobilier,
          <br />
          <em>avec une autre vision.</em>
        </h1>

        <p>
          A2E Immobilier accompagne ses clients dans leurs projets
          immobiliers avec une approche fondée sur l'écoute,
          la valorisation et l'expertise.
        </p>
      </header>


      {/* WHO WE ARE */}
      <section className="about-intro">
        <div className="about-intro-label">
          <span aria-hidden="true"></span>
          QUI SOMMES-NOUS ?
        </div>

        <div className="about-intro-content">
          <h2>
            Une approche humaine
            <br />
            de <em>l'immobilier.</em>
          </h2>

          <div>
            <p>
              A2E Immobilier est une agence spécialisée dans la vente
              et la valorisation de biens immobiliers.
            </p>

            <p>
              Nous mettons notre expertise, notre connaissance du marché
              et notre réseau au service de chaque projet afin de proposer
              un accompagnement personnalisé et transparent.
            </p>
          </div>
        </div>
      </section>


      {/* VALUES */}
      <section className="about-values">

        <article className="about-value">
          <span aria-hidden="true">
            01
          </span>

          <h3>
            Expertise
          </h3>

          <p>
            Une connaissance du marché et une analyse précise
            de chaque bien.
          </p>
        </article>

        <article className="about-value">
          <span aria-hidden="true">
            02
          </span>

          <h3>
            Valorisation
          </h3>

          <p>
            Nous révélons le potentiel de votre propriété grâce
            à une présentation soignée.
          </p>
        </article>

        <article className="about-value">
          <span aria-hidden="true">
            03
          </span>

          <h3>
            Accompagnement
          </h3>

          <p>
            Un suivi personnalisé de la première estimation
            jusqu'à la signature.
          </p>
        </article>

      </section>


            {/* LOCATIONS */}
      <section className="about-locations">

        <header className="locations-header">
          <span className="about-label">
            NOS IMPLANTATIONS
          </span>

          <h2>
            Une présence au cœur
            <br />
            des <em>marchés immobiliers.</em>
          </h2>

          <p>
            Retrouvez A2E Immobilier dans les principales zones
            où nous développons notre activité.
          </p>
        </header>


        <div className="locations-content">

          {/* LOCATION INFORMATION */}
          <article className="location-card">

            <span
              className="location-number"
              aria-hidden="true"
            >
              01
            </span>

            <i
              className="fa-solid fa-location-dot"
              aria-hidden="true"
            ></i>

            <h3>
              104 Bd Sidi Abderrahmane, Casablanca
            </h3>

            <address>
               Casablanca, Maroc
            </address>

            <span className="location-status">
              Notre implantation
            </span>

          </article>


          {/* GOOGLE MAP */}
          <div className="location-map">

            <iframe
              title="Localisation de A2E Immobilier à Casablanca"
              src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_URL"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>
          <span>
            VOTRE PROJET
          </span>

          <h2>
            Parlons de votre
            <em> projet immobilier.</em>
          </h2>
        </div>

        <a href="/contact">
          Nous contacter

          <i
            className="fa-solid fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>

      </section>

    </main>
  );
}

export default About;