import "../Style/expertise.css";
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
    description: "Mise en valeur avec des contenus professionels.",
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
    description: "Organisation de la meilleure offre.",
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
    <section className="steps-section">
      <div style={{margin:"10px "}}>
        <h2 style={{color:"#000"}}>Notre expertise</h2>
        <h6>
          Une méthode éprouvée pour vendre votre bien dabs les meilleures
          conditions.
        </h6>
        
      </div>
      <div className="steps-container">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-top">
              <span className="step-number">{step.number}</span>

              <div className="step-icon">{step.icon}</div>
            </div>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn">Contactez Nous</button>
    </section>
  );
}

/*function Expertise(){
    return (
        <section className="expertise">
                <div>
                    <h2>Notre expertise</h2>
                    <h6>Une méthode éprouvée pour vendre votre bien dabs les meilleures conditions.</h6>
                    <button className="btn">Contactez Nous</button>
                </div>
                <div>

                </div>
        </section>
    )
}*/
export default Expertise;
