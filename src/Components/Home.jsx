import '../Style/home.css'

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h3 style={{color:"#C9A24A"}}>A2E IMMOBILIER</h3>
        <h1 className='title' >L'immobilier d'exception, <br/> autrement.</h1>
        <p>Spécialisés dans la cente de biens immobilier de standing,
            nous vous accompagnons dans la réalisation de vos projets avec
            une approche personnalisée et une expertise reconnue .</p>
        <button className='btn'>Découvrir nos propriétés </button>
      </div>
    </section>
  );
}

export default Home;

