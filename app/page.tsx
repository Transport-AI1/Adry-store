"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, ShoppingBag, Check, Menu, Minus, Pause, Play, Plus, Search, X } from "lucide-react";
import { FaqAssistant } from "@/components/faq-assistant";

type Product = { id: string; name: string; category: string; price: number; image: string; description: string; tone: string };

const products: Product[] = [
  { id: "01", name: "Silueta de domingo", category: "Prendas", price: 48, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85", description: "Una pieza de demostración para imaginar tu próxima favorita.", tone: "#ded6c7" },
  { id: "02", name: "Bolso de cada día", category: "Complementos", price: 36, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85", description: "Diseño de demostración. Los detalles finales están por llegar.", tone: "#d8ccbc" },
  { id: "03", name: "Luz de tarde", category: "Prendas", price: 54, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85", description: "Una pieza de demostración con un aire especial.", tone: "#e2d8cb" },
  { id: "04", name: "Pequeño tesoro", category: "Complementos", price: 24, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85", description: "Accesorio de demostración, sujeto a catálogo real.", tone: "#ddd3c2" },
  { id: "05", name: "Aire natural", category: "Prendas", price: 62, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85", description: "Una propuesta provisional para explorar el estilo.", tone: "#d7d0c1" },
  { id: "06", name: "Forma esencial", category: "Complementos", price: 32, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85", description: "Producto visual de demostración, no disponible para compra real.", tone: "#d9cdbb" },
];

const categories = ["Todo", "Prendas", "Complementos"];

type CartLine = { product: Product; quantity: number };

export default function Home() {
  const [active, setActive] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % products.length), 7200);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);
  const [filter, setFilter] = useState("Todo");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const visibleProducts = useMemo(() => {
    const list = products.filter((product) => (filter === "Todo" || product.category === filter) && product.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, query, sort]);
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce((total, line) => total + line.product.price * line.quantity, 0);

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      return existing ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { product, quantity: 1 }];
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function changeQuantity(id: string, amount: number) {
    setCart((current) => current.map((line) => line.product.id === id ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0));
  }

  return (
    <main>
      <div className="announcement"><span>UNA MIRADA PROPIA · RIVAS-VACIAMADRID, MADRID</span><span>DESCUBRE ALGO DIFERENTE</span></div>
      <div className="demo-notice" role="status"><strong>WEB DE DEMOSTRACIÓN</strong><span>Imágenes y productos ilustrativos. Fotos y precios reales pendientes de confirmar con Adry Store. La tienda todavía no admite compras ni pagos.</span></div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <a className="wordmark" href="#inicio" aria-label="Adry Store, inicio">ADRY<span>STORE</span><i>®</i></a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navegación principal">
          <a onClick={() => setMenuOpen(false)} href="#inicio">Inicio</a><a onClick={() => setMenuOpen(false)} href="#coleccion">Colección</a><a onClick={() => setMenuOpen(false)} href="#novedades">Novedades</a><a onClick={() => setMenuOpen(false)} href="#sobre-nosotros">Sobre nosotros</a><a onClick={() => setMenuOpen(false)} href="#contacto">Contacto</a>
        </nav>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Abrir bolsa, ${cartCount} productos`}><span>Bolsa</span><ShoppingBag aria-hidden="true" /><b>{String(cartCount).padStart(2, "0")}</b></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-text">
          <p className="eyebrow"><span className="eyebrow-line" /> UN ESTILO QUE ES TUYO</p>
          <h1>Encuentra eso<br />que habla <em>de ti.</em></h1>
          <p className="hero-description">Piezas especiales, detalles que importan y una forma de vestir que se siente como tú.</p>
          <a className="button-dark" href="#coleccion">Descubrir colección <ArrowUpRight /></a>
          <div className="hero-foot"><span>{String(active + 1).padStart(2, "0")} — {String(products.length).padStart(2, "0")}</span><span>Selección de muestra · fotos reales pendientes</span></div>
        </div>
        <div className="hero-visual hero-product-visual" id="novedades">
          <div className="hero-carousel" aria-label="Carrusel automático de productos de muestra" aria-roledescription="carrusel">
            <div className="carousel-topline"><span>SELECCIÓN DE ESTUDIO</span><button className="carousel-toggle" onClick={() => setCarouselPaused((paused) => !paused)} aria-label={carouselPaused ? "Reanudar carrusel" : "Pausar carrusel"}>{carouselPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}<span>{carouselPaused ? "REANUDAR" : "PAUSAR"}</span></button></div>
            <div className="floating-product" key={products[active].id}>
              <div className="floating-shadow" />
              <div className="floating-image-shell" style={{ backgroundColor: products[active].tone }}><Image src={products[active].image} alt={`${products[active].name}, foto provisional; fotografía real pendiente`} fill priority sizes="(max-width: 760px) 76vw, 30vw" className="floating-image" /><span className="photo-pending">FOTO PROVISIONAL <i>FOTO REAL PENDIENTE</i></span></div>
            </div>
            <div className="hero-product-info" aria-live="off"><div><span>{products[active].category.toUpperCase()} · MUESTRA</span><h2>{products[active].name}</h2></div><b>€ {products[active].price.toFixed(2)}</b></div>
            <div className="hero-carousel-progress" aria-hidden="true">{products.map((product, index) => <span key={product.id} className={active === index ? "active" : ""} />)}</div>
          </div>
          <p className="hero-product-caption">PRODUCTOS ILUSTRATIVOS · FOTOGRAFÍAS REALES PENDIENTES</p>
        </div>
        <a className="scroll-cue" href="#coleccion"><span>BAJA PARA DESCUBRIR</span><ArrowDown /></a>
      </section>

      <section className="ticker" aria-label="Manifiesto de marca"><div className="ticker-track"><span>VÍSTETE A TU MANERA</span><i>✳</i><span>ENCUENTRA TU ESENCIA</span><i>✳</i><span>DETALLES QUE HABLAN</span><i>✳</i><span>VÍSTETE A TU MANERA</span><i>✳</i></div></section>

      <section className="catalog" id="coleccion">
        <div className="section-heading catalog-title"><div><p className="eyebrow">02 / EL UNIVERSO ADRY</p><h2>Descubre tu <em>favorito.</em></h2></div><span className="catalog-count">{String(visibleProducts.length).padStart(2, "0")} PIEZAS DE DEMOSTRACIÓN</span></div>
        <div className="catalog-controls"><div className="filter-list" aria-label="Filtrar por categoría">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={filter === category ? "selected" : ""}>{category}</button>)}</div><div className="catalog-tools"><label className="search-field"><Search /><span className="sr-only">Buscar productos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" /></label><label className="sort-field"><span className="sr-only">Ordenar productos</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Destacados</option><option value="low">Precio: menor a mayor</option><option value="high">Precio: mayor a menor</option></select></label></div></div>
        <div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card" key={product.id}>
          <button className="product-image-button" onClick={() => { setActive(products.findIndex((item) => item.id === product.id)); document.querySelector(".hero-product-visual")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} aria-label={`Ver ${product.name} en la selección protagonista`}><div className="product-image-wrap" style={{ backgroundColor: product.tone }}><Image src={product.image} alt={`${product.name}, foto provisional; fotografía real pendiente`} fill sizes="(max-width: 700px) 50vw, 25vw" className="product-image" /><span className="demo-tag">FOTO PROVISIONAL <i>FOTO REAL PENDIENTE</i></span><span className="quick-view"><ArrowUpRight /></span></div></button>
          <div className="product-meta"><div><span>{product.category}</span><h3>{product.name}</h3></div><b>€ {product.price.toFixed(2)}</b></div><button className="add-inline" onClick={() => addToCart(product)}>Añadir a la bolsa <Plus /></button><span className="product-order">0{index + 1}</span>
        </article>)}</div>
        {visibleProducts.length === 0 && <p className="empty-result">No encontramos piezas con ese nombre. Prueba otra búsqueda.</p>}
        <div className="catalog-footer"><span>PRECIOS Y PIEZAS DE DEMOSTRACIÓN</span><a href="#contacto">¿Tienes dudas? Hablemos <ArrowUpRight /></a></div>
      </section>

      <section className="brand-story" id="sobre-nosotros"><div className="story-visual"><Image src="/adry-editorial.png" alt="Texturas cálidas de un editorial de moda de inspiración" fill sizes="(max-width: 760px) 100vw, 45vw" className="story-image" /><span className="story-number">RIVAS<br />VACIAMADRID</span></div><div className="story-copy"><p className="eyebrow">03 / CERCA DE TI</p><h2>Un lugar para<br />encontrar algo <em>tuyo.</em></h2><p>ADRY STORE es un comercio local en Rivas-Vaciamadrid. Un espacio cercano donde descubrir piezas con personalidad y elegir con calma aquello que conecta contigo.</p><p className="story-signature">Nos vemos en Rivas. <span>— ADRY STORE</span></p><a className="text-link" href="#contacto">Ven a conocernos <ArrowUpRight /></a></div></section>

      <section className="contact" id="contacto"><div className="contact-top"><p className="eyebrow">04 / ESTAMOS CERCA</p><h2>¿Hablamos?</h2><p>Nos encantará ayudarte a encontrar lo que buscas.</p></div><div className="contact-details"><div><span>UBICACIÓN</span><p>Rivas-Vaciamadrid<br />Madrid, España</p></div><div><span>CONTACTO</span><p>Información de contacto<br />próximamente</p></div><div><span>SÍGUENOS</span><p>Redes sociales<br />próximamente</p></div><span className="contact-mark">ADRY<br /><i>STORE</i></span></div></section>

      <footer className="site-footer"><a className="wordmark" href="#inicio">ADRY<span>STORE</span><i>®</i></a><p>Una mirada propia, desde Rivas-Vaciamadrid.</p><span>© {new Date().getFullYear()} ADRY STORE</span><a href="#inicio" className="back-top">VOLVER ARRIBA ↑</a></footer>

      {added && <div className="cart-feedback" role="status"><Check /> Añadido a tu bolsa <button aria-label="Abrir bolsa" onClick={() => setCartOpen(true)}>Ver bolsa</button></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" aria-label="Tu bolsa" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">TU SELECCIÓN</p><h2>La bolsa <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Cerrar bolsa" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length ? <><div className="cart-lines">{cart.map(({ product, quantity }) => <article className="cart-line" key={product.id}><div className="cart-thumb" style={{ backgroundColor: product.tone }}><Image src={product.image} alt="" fill sizes="80px" /></div><div className="cart-line-copy"><span>{product.category}</span><h3>{product.name}</h3><b>€ {(product.price * quantity).toFixed(2)}</b><div className="quantity-control"><button aria-label={`Quitar una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, -1)}><Minus /></button><span>{quantity}</span><button aria-label={`Añadir una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, 1)}><Plus /></button></div></div><button className="remove-line" onClick={() => setCart((current) => current.filter((line) => line.product.id !== product.id))}>Eliminar</button></article>)}</div><div className="cart-summary"><div><span>Subtotal de demostración</span><b>€ {subtotal.toFixed(2)}</b></div><p>Contenido provisional. No se procesan pagos ni pedidos.</p><button className="button-dark" onClick={() => setCartOpen(false)}>Seguir explorando <ArrowRight /></button></div></> : <div className="cart-empty"><ShoppingBag /><p>Tu bolsa está esperando<br />algo especial.</p><button className="text-link" onClick={() => setCartOpen(false)}>Descubrir la colección <ArrowRight /></button></div>}</aside></div>}
      <FaqAssistant />
    </main>
  );
}
