# Numora — Landing page de suplementos

Landing page de una tienda ficticia de suplementos deportivos, construida como
proyecto de aprendizaje. Sin frameworks: HTML, CSS y JavaScript puro.

> Numora no existe. Los productos, precios y testimonios son inventados y están
> marcados como ejemplos dentro de la propia página.

---

## Cómo verla

Doble clic en `index.html` y se abre en tu navegador. No hace falta nada más.

Si prefieres verla con un servidor local (recomendable cuando el proyecto crece,
porque replica cómo funciona en producción):

```bash
node -e "const http=require('http'),fs=require('fs'),p=require('path');const t={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};http.createServer((q,s)=>{let f=p.join(process.cwd(),decodeURIComponent(q.url.split('?')[0]));if(f.endsWith(p.sep))f=p.join(f,'index.html');fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);return s.end('404');}s.writeHead(200,{'Content-Type':t[p.extname(f)]||'application/octet-stream'});s.end(d);});}).listen(4321,()=>console.log('http://localhost:4321'));"
```

---

## Estructura

```
Primera Landing Page/
├── index.html          Estructura y contenido (las 9 secciones)
├── css/styles.css      Todos los estilos
├── js/main.js          Menú móvil, header al scroll, animaciones
├── assets/img/         Ilustraciones SVG (productos y laboratorio)
├── .claude/            Config del servidor de previsualización (opcional)
└── README.md           Este archivo
```

### Las 9 secciones del `index.html`

Cada una está marcada con un comentario grande en el HTML, en este orden:

| # | Sección | id | Función en la conversión |
|---|---------|-----|--------------------------|
| 1 | Header | — | Navegación siempre visible + CTA permanente |
| 2 | Hero | `#inicio` | Promesa principal en 3 segundos |
| 3 | Beneficios | `#beneficios` | Por qué esta marca y no otra |
| 4 | Productos | `#productos` | Catálogo con precio y botón de compra |
| 5 | Confianza | `#calidad` | Calidad, envíos y garantía: quita el miedo a comprar |
| 6 | Testimonios | `#opiniones` | Prueba social (aquí, de ejemplo) |
| 7 | FAQ | `#faq` | Resuelve las objeciones que frenan la compra |
| 8 | CTA final | `#comprar` | Último empujón con una oferta concreta |
| 9 | Footer | — | Enlaces, redes y datos de contacto |

---

## Cómo tocar el diseño

### Cambiar los colores

Todo el color vive en un solo sitio: el bloque `:root` al principio de
`css/styles.css`. Cambia una variable y cambia toda la web.

```css
--ink:         #101215;   /* texto y botones oscuros  */
--ink-soft:    #5A6068;   /* texto secundario         */
--bg-alt:      #F6F6F3;   /* fondo de secciones alternas */
--accent:      #C6F24E;   /* color de acento (lima)   */
--accent-deep: #4A7A12;   /* acento oscuro, para texto sobre blanco */
```

**Importante:** `--accent` siempre lleva texto oscuro encima. Si pones texto
blanco sobre lima, el contraste baja de lo que exige la accesibilidad. Para
texto de color sobre fondo blanco se usa `--accent-deep`.

### Cambiar textos, precios o productos

Todo está en `index.html`. Un producto es un bloque `<article class="card card--product">`:
copia uno entero y cambia imagen, título, descripción y precio.

### Añadir una pregunta al FAQ

Copia un bloque `<details class="faq__item">`. El acordeón funciona con HTML
nativo, no necesita JavaScript.

---

## Cómo está pensado el CSS

- **Mobile-first.** Todo el CSS base es la versión móvil. Al final del archivo,
  las `@media (min-width: ...)` van ampliando el diseño para tablet (640px) y
  escritorio (900px). Es más fácil añadir que quitar.
- **Nombres tipo BLOQUE__elemento--variante** (`card__title`, `btn--primary`).
  Al leer una clase ya sabes a qué bloque pertenece y qué es.
- **Utilidades reutilizables** (`.container`, `.btn`, `.card`, `.grid`) para no
  repetir estilos en cada sección.

## Qué hace el JavaScript

Solo tres cosas (`js/main.js`), y ninguna es imprescindible para leer la página:

1. **Menú móvil** — añade o quita la clase `.is-open`; el CSS hace el resto.
2. **Header al hacer scroll** — añade `.is-scrolled` pasados 20px para separarlo
   del contenido con una sombra.
3. **Aparición al entrar en pantalla** — con `IntersectionObserver`, que avisa
   cuando un elemento entra en el viewport. Es mucho más eficiente que calcular
   posiciones en cada evento de scroll.

Extra: al abrir una pregunta del FAQ se cierran las demás.

---

## Siguientes pasos posibles

- Sustituir los SVG por fotos reales de producto (`assets/img/`).
- Página de producto individual y carrito.
- Conectar los botones "Comprar" a Shopify, Stripe Checkout o WooCommerce.
- Formulario de captación de email antes del footer.
- Medición: Google Analytics o Meta Pixel para saber qué CTA convierte.
