/* =========================================================
   NUMORA — JavaScript
   Configuración de Shopify + tres comportamientos.
   Todo lo demás lo resuelve el CSS.
     0. Enlaces de compra hacia el carrito de Shopify
     1. Menú móvil (abrir / cerrar)
     2. Header con borde al hacer scroll
     3. Aparición de elementos al entrar en pantalla
   ========================================================= */

// 'defer' no hace falta porque el <script> está al final del <body>:
// para cuando se ejecuta, todo el HTML ya existe.

/* ---------------------------------------------------------
   0. CONEXIÓN CON SHOPIFY

   Rellena estos 5 valores con los datos de tu tienda y los
   botones "Comprar" pasarán a añadir el producto al carrito
   y abrir el checkout de Shopify.

   Mientras estén vacíos no pasa nada: los botones siguen
   funcionando como hasta ahora (bajan a la sección de compra).

   Dónde sacar el ID de variante: en el admin de Shopify entra
   en el producto, pulsa la variante y mira el final de la URL:
   .../products/8123456789012/variants/44012345678901
                                       ^^^^^^^^^^^^^^ este
   --------------------------------------------------------- */
const SHOPIFY = {
  dominio: '',          // ejemplo: 'numora-store.myshopify.com'
  variantes: {
    whey:     '',       // ejemplo: '44012345678901'
    creatina: '',
    greens:   '',
    pack:     ''
  }
};

/* ---------------------------------------------------------
   0b. CONTACTO POR WHATSAPP

   Pon tu número con código de país y sin signos ni espacios.
   Chile: 56 + 9 + los ocho dígitos. Ejemplo: 56912345678

   Mientras esté vacío, el botón flotante no se muestra.
   --------------------------------------------------------- */
const CONTACTO = {
  whatsapp: '',   // ejemplo: '56912345678'
  mensaje:  'Hola, quiero hacer un pedido de Numora'
};

// Busca los enlaces marcados con data-shopify en el HTML y les
// pone la URL real del carrito de Shopify.
//   data-shopify="whey"           -> 1 unidad de Whey Isolate
//   data-shopify="whey,creatina"  -> varios productos de golpe
document.querySelectorAll('[data-shopify]').forEach(enlace => {
  const claves = enlace.dataset.shopify.split(',').map(c => c.trim());
  const ids    = claves.map(c => SHOPIFY.variantes[c]);

  // Si falta el dominio o algún ID, dejamos el botón como estaba
  if (!SHOPIFY.dominio || ids.some(id => !id)) return;

  enlace.href = 'https://' + SHOPIFY.dominio + '/cart/' +
                ids.map(id => id + ':1').join(',');
});



/* ---------------------------------------------------------
   1. MENÚ MÓVIL
   --------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const nav       = document.getElementById('nav');

// Abre o cierra el panel añadiendo/quitando la clase .is-open.
// El CSS es quien realmente lo muestra o lo esconde.
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);

  // aria-expanded le dice a los lectores de pantalla si está abierto
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Al pulsar cualquier enlace del menú, lo cerramos:
// si no, el panel taparía la sección a la que acabamos de saltar.
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


/* ---------------------------------------------------------
   2. HEADER AL HACER SCROLL
   Añade una sombra y un borde cuando ya no estamos arriba del todo,
   para que el header se separe visualmente del contenido.
   --------------------------------------------------------- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });   // passive: true = scroll más fluido en móvil


/* ---------------------------------------------------------
   3. APARICIÓN AL HACER SCROLL
   IntersectionObserver avisa cuando un elemento entra en pantalla.
   Es mucho más eficiente que escuchar el evento scroll y calcular
   posiciones a mano.
   --------------------------------------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);   // una vez visible, dejamos de observarlo
    }
  });
}, {
  // Umbral bajo a propósito: en móvil un bloque alto (como la imagen del hero)
  // solo asoma unos pocos píxeles, y con un umbral alto nunca llegaría a mostrarse.
  threshold: 0.05,
  rootMargin: '0px 0px -20px 0px'  // se adelanta un poco para que no parezca tardío
});

revealElements.forEach(el => observer.observe(el));


/* ---------------------------------------------------------
   EXTRA (opcional): acordeón FAQ de apertura única.
   El HTML usa <details>, que ya funciona solo. Esto únicamente
   cierra los demás al abrir uno, para mantener la lista corta.
   --------------------------------------------------------- */
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});


/* ---------------------------------------------------------
   4. BOTÓN DE WHATSAPP
   Solo aparece si has puesto tu número arriba, en CONTACTO.
   --------------------------------------------------------- */
const btnWhatsapp = document.getElementById('whatsapp');

if (CONTACTO.whatsapp) {
  btnWhatsapp.href = 'https://wa.me/' + CONTACTO.whatsapp +
                     '?text=' + encodeURIComponent(CONTACTO.mensaje);
  btnWhatsapp.hidden = false;
}


/* ---------------------------------------------------------
   5. BARRA FIJA DE COMPRA (móvil)

   Aparece cuando el usuario ya ha pasado el hero, y se esconde
   al llegar al CTA final: ahí ya hay un botón grande y no tiene
   sentido tapar la pantalla con otro.
   --------------------------------------------------------- */
const stickyCta = document.getElementById('stickyCta');
const ctaFinal  = document.getElementById('comprar');

let ctaFinalALaVista = false;

function actualizarBarraFija() {
  const yaPasoElHero = window.scrollY > 500;
  stickyCta.classList.toggle('is-visible', yaPasoElHero && !ctaFinalALaVista);
}

// Vigila si el CTA final está en pantalla
new IntersectionObserver(entradas => {
  ctaFinalALaVista = entradas[0].isIntersecting;
  actualizarBarraFija();
}).observe(ctaFinal);

window.addEventListener('scroll', actualizarBarraFija, { passive: true });
