import "../Style/home.css";

function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <div className="hero-label">
          <span></span>
          A2E IMMOBILIER
          <span></span>
        </div>

        <h1 className="title">
          L'immobilier d'exception,
          <br />
          <em>autrement.</em>
        </h1>

        <p>
          Spécialisés dans la vente de biens immobiliers de standing,
          nous vous accompagnons dans la réalisation de vos projets
          avec une approche personnalisée et une expertise reconnue.
        </p>

        <div className="hero-actions">
          <button className="btn" 
            onClick={() =>
              document.getElementById("offres")?.scrollIntoView({
                behavior: "smooth",
              })
            }>
            Découvrir nos propriétés
            <span>→</span>
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() =>
              document.getElementById("expertise")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Notre expertise
          </button>

        </div>

      </div>

      <div className="hero-scroll">
        <span></span>
        <p>Explorer</p>
      </div>

    </section>
  );
}

export default Home;

