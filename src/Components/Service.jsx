import img from "../assets/bg.webp"
import "../Style/service.css"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Service() {
  return (
    <section className="service">
      <div className="vente">
        <h2>
          Vous souhaitez <br /> vendre votre propriété?
        </h2>
        <p>
          A2E vous accompagne dans la valorisation la commercialisation et la
          vente de votre bien , en vous offrant une stratégie sur musure et un
          réseau d'achteurs gualifiés
        </p>
        <button>Contactez Nous</button>
      </div>
      <div className="image">
        <img src={img} alt="" srcset="" />
      </div>
      <div className="steps">
        <div className="step">
          <div>
            <i class="fa-solid fa-money-check-dollar"></i>
          </div>
          <div className="text">
            <h5>Estimation juste et réaliste</h5>
            <p>Une analyse précise de la valeur de votre bien.</p>
          </div>
        </div>
        <div className="step">
          <div>
            <i class="fa-regular fa-camera"></i>
          </div>
          <div className="text">
            <h5>Mise en valuer professionnelle</h5>
            <p>Photos, vidéos, visites vituélles, contenus ciblés.</p>
          </div>
        </div>
        <div className="step">
          <div>
           <i class="fa-mosaic fa-solid fa-share-nodes"></i>
          </div>
          <div className="text">
            <h5>Diffusion multi-canaux</h5>
            <p>Réseaux sociaux, portails spécialisés, réseau privé.</p>
          </div>
        </div>
        <div className="step">
          <div>
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="text">
            <h5>Accompagnement complet</h5>
            <p>Jusqu'à la signature chez le notaire.</p>
          </div>
        </div>
        
        
      </div>
    </section>
  );
}
export default Service;
