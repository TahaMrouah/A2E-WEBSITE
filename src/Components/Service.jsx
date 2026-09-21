import img from "../assets/bg.webp";
import "../Style/service.css";

function Service() {
  return (
    <section className="service" id="services">

      {/* LEFT — INTRODUCTION */}
      <div className="vente">

        <div className="service-label">
          <span></span>
          NOTRE EXPERTISE
        </div>

        <h2>
          Vous souhaitez
          <br />
          <em>vendre votre propriété ?</em>
        </h2>

        <p>
          A2E vous accompagne dans la valorisation, la commercialisation
          et la vente de votre bien, en vous offrant une stratégie sur
          mesure et un réseau d'acheteurs qualifiés.
        </p>

        <button>
          Contactez-nous
          <span>→</span>
        </button>

      </div>


      {/* CENTER — IMAGE */}
      <div className="image">

        <div className="image-frame">
          <img src={img} alt="Propriété A2E Immobilier" />
        </div>

      </div>


      {/* RIGHT — STEPS */}
      <div className="steps">

        <div className="step">

          <div className="step-icon">
            <i className="fa-solid fa-money-check-dollar"></i>
          </div>

          <div className="text">
            <h5>Estimation juste et réaliste</h5>
            <p>
              Une analyse précise de la valeur de votre bien.
            </p>
          </div>

        </div>


        <div className="step">

          <div className="step-icon">
            <i className="fa-regular fa-camera"></i>
          </div>

          <div className="text">
            <h5>Mise en valeur professionnelle</h5>
            <p>
              Photos, vidéos, visites virtuelles et contenus ciblés.
            </p>
          </div>

        </div>


        <div className="step">

          <div className="step-icon">
            <i className="fa-solid fa-share-nodes"></i>
          </div>

          <div className="text">
            <h5>Diffusion multi-canaux</h5>
            <p>
              Réseaux sociaux, portails spécialisés et réseau privé.
            </p>
          </div>

        </div>


        <div className="step">

          <div className="step-icon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div className="text">
            <h5>Accompagnement complet</h5>
            <p>
              Jusqu'à la signature chez le notaire.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Service;