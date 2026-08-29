/* =========================================================
   NUMORA — JavaScript
   Solo tres comportamientos. Todo lo demás lo resuelve el CSS.
     1. Menú móvil (abrir / cerrar)
     2. Header con borde al hacer scroll
     3. Aparición de elementos al entrar en pantalla
   ========================================================= */

// 'defer' no hace falta porque el <script> está al final del <body>:
// para cuando se ejecuta, todo el HTML ya existe.


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
