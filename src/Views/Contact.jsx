
import React from "react";
import "../Style/contact.css";

function Contact() {
  return (
    <section className="contact-page" id="contact">
      <div className="contact-header">
        <span className="contact-label">A2E IMMOBILIER</span>

        <h1>
          Parlons de votre
          <br />
          <em>projet immobilier.</em>
        </h1>

        <p>
          Vous souhaitez vendre votre bien ou obtenir plus d'informations ?
          Notre équipe est à votre disposition pour vous accompagner.
        </p>
      </div>

      <div className="contact-container">
        {/* WhatsApp */}
        <a
          href="https://wa.me/212600000000"
          className="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-card-icon">
            <i className="fa-brands fa-whatsapp"></i>
          </div>

          <div>
            <span>WhatsApp</span>
            <h3>Échangez avec nous</h3>
            <p>Contactez-nous directement sur WhatsApp.</p>
          </div>

          <i className="fa-solid fa-arrow-right contact-arrow"></i>
        </a>

        {/* Téléphone */}
        <a
          href="tel:+212600000000"
          className="contact-card"
        >
          <div className="contact-card-icon">
            <i className="fa-solid fa-phone"></i>
          </div>

          <div>
            <span>Téléphone</span>
            <h3>Appelez-nous</h3>
            <p>
              Notre équipe est disponible pour répondre à vos questions.
            </p>
          </div>

          <i className="fa-solid fa-arrow-right contact-arrow"></i>
        </a>

        {/* Email */}
        <a
          href="mailto:contact@a2e-immobilier.ma"
          className="contact-card"
        >
          <div className="contact-card-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>

          <div>
            <span>Email</span>
            <h3>Écrivez-nous</h3>
            <p>Envoyez-nous votre demande par email.</p>
          </div>

          <i className="fa-solid fa-arrow-right contact-arrow"></i>
        </a>
      </div>

      <div className="contact-bottom">
        <div>
          <span>UNE QUESTION ?</span>
          <h2>Votre projet commence par une conversation.</h2>
        </div>

        <a href="mailto:contact@a2e-immobilier.ma">
          Nous contacter
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}

export default Contact;

