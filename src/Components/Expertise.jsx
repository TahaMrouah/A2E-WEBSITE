import "../Style/expertise.css";
import {Link} from "react-router-dom";
const steps = [
  {
    number: "01",
    icon: "📐",
    title: "Estimation",
    description: "Analyse du marché et de votre bien.",
  },
  {
    number: "02",
    icon: "📈",
    title: "Valorisation",
    description: "Mise en valeur avec des contenus professionnels.",
  },
  {
    number: "03",
    icon: "📣",
    title: "Marketing",
    description: "Diffusion ciblée sur les bons canaux.",
  },
  {
    number: "04",
    icon: "👥",
    title: "Prospection",
    description: "Identification d'acheteurs qualifiés.",
  },
  {
    number: "05",
    icon: "🏠",
    title: "Visites",
    description: "Organisation et suivi des visites.",
  },
  {
    number: "06",
    icon: "🤝",
    title: "Négociation",
    description: "Obtention de la meilleure offre.",
  },
  {
    number: "07",
    icon: "🏷️",
    title: "Vente",
    description: "Signature de l'acte chez le notaire.",
  },
];

function Expertise() {
  return (
    <section className="steps-section" id
    ="expertise">

      {/* HEADER */}
      <div className="expertise-header">

        <div className="expertise-label">
          <span></span>
          NOTRE EXPERTISE
        </div>

        <h2>
          Une méthode pensée pour
          <br />
          <em>valoriser votre bien.</em>
        </h2>

        <p>
          Une méthode éprouvée pour vendre votre bien dans les meilleures
          conditions, de la première estimation jusqu'à la signature.
        </p>

      </div>


      {/* STEPS */}
      <div className="steps-container">

        {steps.map((step) => (
          <div className="step-card" key={step.number}>

            <div className="step-top">

              <span className="step-number">
                {step.number}
              </span>

              <div className="step-icon">
                {step.icon}
              </div>

            </div>

            <div className="step-content">

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>

            <div className="step-line"></div>

          </div>
        ))}

      </div>


      {/* CTA */}
      <Link to="/contact" className="btn">
        Contactez-nous
        <span>→</span>
      </Link>

    </section>
  );
}

export default Expertise;