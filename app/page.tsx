export default function Home() {
  return (
    <main>
      <div className="announcement">ADRY STORE · RIVAS-VACIAMADRID</div>
      <header className="header">
        <a className="wordmark" href="/">ADRY<span>STORE</span></a>
        <nav aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#sobre-nosotros">La tienda</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href="#coleccion">Descubrir <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">ESTILO · PERSONALIDAD · DETALLES</p>
          <h1>Encuentra eso<br />que habla <em>de ti.</em></h1>
          <p className="intro">Una selección especial, pensada para quienes disfrutan descubriendo piezas con personalidad.</p>
          <a className="primary-button" href="#coleccion">Explorar la colección <span>→</span></a>
          <p className="local-note">Tu tienda de confianza en Rivas-Vaciamadrid</p>
        </div>
        <div className="hero-art" role="img" aria-label="Espacio visual reservado para fotografía de producto de Adry Store">
          <div className="art-frame">
            <span className="art-kicker">ADRY STORE</span>
            <span className="art-center">NEW<br /><i>EDIT</i></span>
            <span className="art-bottom">UNA FORMA PROPIA DE EXPRESARTE</span>
          </div>
          <span className="art-index">01 / 03</span>
        </div>
      </section>

      <section className="collection" id="coleccion">
        <div>
          <p className="eyebrow">DESCUBRE ADRY STORE</p>
          <h2>Un espacio para <em>inspirarte.</em></h2>
        </div>
        <p className="collection-note">Esta es una primera estructura visual. La colección, las fotografías y las categorías reales se incorporarán en la siguiente fase.</p>
      </section>

      <section className="about" id="sobre-nosotros">
        <span>01 — NUESTRA ESENCIA</span>
        <p>Más que una tienda, un lugar donde descubrir algo diferente.</p>
      </section>

      <footer id="contacto">
        <a className="wordmark" href="/">ADRY<span>STORE</span></a>
        <p>Rivas-Vaciamadrid · Madrid</p>
        <span>© {new Date().getFullYear()} Adry Store</span>
      </footer>
    </main>
  );
}