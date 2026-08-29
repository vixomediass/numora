# Deployment — Cómo publicar Numora en internet

El proyecto está listo para desplegar. Elige la plataforma que prefieras.

---

## Opción 1: Netlify (Recomendado — más fácil)

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta gratuita.
2. En el dashboard, pulsa **"Add new site"** → **"Import an existing project"**.
3. Conecta tu repositorio GitHub/GitLab/Gitbucket (ve a GitHub primero si no tienes repo allí).
4. Netlify detectará `netlify.toml` y hará el deployment automático.
5. Tu sitio estará en `tudominio.netlify.app` (o tu propio dominio, ver abajo).

**Con tu propio dominio:**
- En Netlify: **Site settings** → **Custom domain** → añade tu dominio.
- En tu registrador de dominios: apunta el DNS a los servidores de Netlify.
- Netlify genera certificado HTTPS automático.

---

## Opción 2: Vercel (Similar a Netlify)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Pulsa **"New Project"** → importa tu repo.
3. Vercel despliega automáticamente. Tu sitio: `tuproyecto.vercel.app`.

---

## Opción 3: GitHub Pages (Gratuito, menos configuración)

Para que funcione, el repo debe ser **público**.

1. Sube el código a GitHub en un repo público.
2. Ve a **Settings** → **Pages**.
3. En "Source", selecciona **"Deploy from a branch"** → rama `main` (o `master`).
4. GitHub publica automáticamente en `tuusuario.github.io/numora`.

---

## Opción 4: Hosting tradicional (cPanel, Hostinger, etc.)

1. Descarga el código en tu máquina.
2. En el panel del hosting, abre el **administrador de archivos**.
3. Sube todos los archivos al directorio `public_html/` (o la carpeta raíz del sitio).
4. Listo. Tu sitio está vivo en tu dominio.

**No necesitas npm, node ni nada especial.** Es HTML puro.

---

## Paso a paso: GitHub + Netlify (El flujo completo)

### 1. Crear repositorio en GitHub

```bash
cd "C:\Users\Pablo\Documents\DROP COD\Primera Landing Page"

# El Git ya está inicializado, pero solo localmente.
# Crea un repo en github.com (vacío, sin README) y luego:

git remote add origin https://github.com/TUUSUARIO/numora.git
git branch -M main
git push -u origin main
```

### 2. Conectar a Netlify

1. Ve a netlify.com, crea cuenta.
2. Pulsa **"New site from Git"**.
3. Selecciona GitHub y autoriza.
4. Elige el repo `numora`.
5. Verifica que **Publish directory** esté vacío (el `.` actual es correcto).
6. Pulsa **"Deploy"**.

En 30 segundos tu sitio está vivo.

---

## Archivos de configuración que he añadido

### `.gitignore`
Excluye archivos que no deben subirse a Git (cachés, logs, dependencias).

### `netlify.toml`
Instrucciones para Netlify:
- **Caché de navegador**: CSS/JS/imágenes se guardan 1 año (sin cambios = carga instantánea).
- **HTML sin caché**: cambios en la landing se ven inmediatamente.
- **Redirección**: `/index.html` → `/` (limpia).

---

## Checklist antes de publicar

- [ ] Cambiar el email de contacto en el footer (hola@numora.example → tu email real).
- [ ] Cambiar los links de redes sociales.
- [ ] Si es para un negocio real: cambiar testimonios por reales (no marcados como ejemplo).
- [ ] Añadir Google Analytics o similiar si quieres medir conversión.
- [ ] Revisar que todos los links funcionen (especialmente en mobile).

---

## Deployments futuros

Cada vez que hagas `git push` a tu rama principal, Netlify/Vercel/GitHub Pages redeploya automáticamente.

```bash
# Editas archivos localmente
git add .
git commit -m "Cambio de descripción"
git push
# En 1 minuto está vivo en tu sitio
```

---

## Problemas comunes

**"El sitio se ve roto / faltan estilos"**
→ Probablemente rutas relativas. Verifica que los `href` y `src` sean rutas relativas (así: `css/styles.css`, no `/css/styles.css`). Revisa la consola del navegador (F12 → Network/Console).

**"Cache viejo aparece"**
→ Netlify cachea 24h por defecto en CDN. Puedes forzar rebuild en Netlify dashboard → **Deploys** → **Trigger deploy**.

**"Quiero mi propio dominio"**
→ En Netlify: **Site settings** → **Custom domain**. En tu registrador (Namecheap, GoDaddy, etc.): apunta el DNS. Netlify hace el HTTPS automático.

---

## Precio

- **Netlify Free**: 100 GB transferencia/mes, builds ilimitados. Perfecto para esta landing.
- **Vercel Free**: Similar.
- **GitHub Pages**: Completamente gratuito.
- **Hosting tradicional**: depende (5–10 $/mes típico).

Para una landing page, Free es más que suficiente.
