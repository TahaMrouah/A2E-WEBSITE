import React from "react";
import "../Style/footer.css";
import { Link } from "react-router-dom";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <MDBFooter className="a2e-footer" >

      {/* =================================
          MAIN FOOTER
      ================================= */}

      <MDBContainer className="footer-container">

        <MDBRow className="footer-main">

          {/* BRAND */}
          <MDBCol lg="5" md="12" className="footer-brand">

            <div className="footer-logo">
              A2E <span>Immobilier</span>
            </div>

            <div className="footer-tagline">
              L'immobilier d'exception, autrement.
            </div>

            <p className="footer-description">
              A2E vous accompagne dans la vente et la valorisation
              de vos biens immobiliers avec une approche personnalisée,
              une stratégie adaptée et un accompagnement complet.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="footer-social">

              <a href="https://www.instagram.com/a2eimmoo/?hl=en" aria-label="Instagram">
                <MDBIcon fab icon="instagram" />
              </a>

              <a href="https://www.facebook.com/profile.php?id=61594556755558" aria-label="Facebook">
                <MDBIcon fab icon="facebook-f" />
              </a>

              <a href="https://www.tiktok.com/@a2eimmoo" aria-label="TikTok">
                <MDBIcon fab icon="tiktok" />
              </a>

            </div>

          </MDBCol>


          {/* NAVIGATION */}
          <MDBCol lg="3" md="6" className="footer-column">

            <h3>Navigation</h3>

            <a href="#home">
              Accueil
            </a>

            <a href="#services">
              Nos Services
            </a>

            <a href="#offres">
              Nos Offres
            </a>

            <a href="#expertise">
              Notre Expertise
            </a>

            <Link to="/contact">
              Contact
            </Link>
            <Link
              to="/admin/login"
              aria-label="admin"
            >
              {/* invisible, just needs to be clickable */}
            </Link>

          </MDBCol>


          {/* CONTACT */}
          <MDBCol lg="4" md="6" className="footer-column">

            <h3>Contact</h3>

            <div className="footer-contact">

              <div className="contact-item">
                <span className="contact-icon">
                  <MDBIcon fas icon="location-dot" />
                </span>

                <div>
                  <small>Adresse</small>
                  <p>104 Bd Sidi Abderrahmane, Casablanca, Maroc</p>
                </div>
              </div>


              <div className="contact-item">
                <span className="contact-icon">
                  <MDBIcon fas icon="phone" />
                </span>

                <div>
                  <small>Téléphone</small>
                  <a href="tel:+212521443858">
                    +212 521443858
                  </a>
                </div>
              </div>


              <div className="contact-item">
                <span className="contact-icon">
                  <MDBIcon fas icon="envelope" />
                </span>

                <div>
                  <small>Email</small>
                  <a href="mailto:contact@a2eimmoo@gmail.com">
                    A2eimmoo@gmail.com
                  </a>
                </div>
              </div>

            </div>

          </MDBCol>

        </MDBRow>


        {/* =================================
            GOLD DIVIDER
        ================================= */}

        <div className="footer-divider"></div>


        {/* =================================
            BOTTOM
        ================================= */}

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} A2E Immobilier.
            Tous droits réservés.
          </p>

          <div className="footer-legal">

            <a href="#">
              Mentions légales
            </a>

            <a href="#">
              Politique de confidentialité
            </a>

          </div>

        </div>

      </MDBContainer>

    </MDBFooter>
  );
}

export default Footer;