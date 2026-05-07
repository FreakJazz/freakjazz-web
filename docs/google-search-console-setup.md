# Google Search Console - Setup Guide

## FreakJazz Website Verification

---

## 📋 PREREQUISITOS

- Cuenta de Google
- Acceso al código del sitio (para agregar meta tag de verificación)
- Sitio desplegado en Vercel: https://freakjazz.com

---

## 🔍 PASO 1: CREAR PROPIEDAD EN SEARCH CONSOLE

### 1.1 Acceder a Google Search Console

1. Ir a: https://search.google.com/search-console
2. Iniciar sesión con tu cuenta de Google
3. Click en **"Add Property"** o **"Agregar Propiedad"**

### 1.2 Seleccionar Tipo de Propiedad

Hay dos opciones:

**Opción A: URL prefix** (Recomendado)

- Ingresar: `https://freakjazz.com`
- Este método verifica solo este dominio específico

**Opción B: Domain**

- Ingresar: `freakjazz.com`
- Verifica todas las variantes (http, https, www, subdominios)
- Requiere acceso a DNS del dominio

**Recomendación:** Usar **URL prefix** para simplificar.

---

## ✅ PASO 2: VERIFICACIÓN DEL SITIO

### Método Recomendado: HTML Tag

1. En Search Console, selecciona **"HTML tag"** como método de verificación
2. Copia el meta tag que te proporciona:

   ```html
   <meta name="google-site-verification" content="TU_CÓDIGO_ÚNICO_AQUÍ" />
   ```

3. El código ya está preparado en el componente SEO. Solo necesitas:

#### Agregar Variable de Entorno

En tu archivo `.env`:

```env
# Google Search Console Verification
VITE_GOOGLE_SITE_VERIFICATION=TU_CÓDIGO_ÚNICO_AQUÍ
```

4. El meta tag se agregará automáticamente en el `<head>` del sitio
5. Hacer deploy del sitio a Vercel
6. Volver a Search Console y click **"Verify"**

### Métodos Alternativos (si HTML tag falla)

**Opción 2: HTML File**

- Descargar el archivo HTML de verificación
- Subir a `public/` del proyecto
- Verificar en Search Console

**Opción 3: Google Analytics**

- Si ya tienes GA configurado en el sitio
- Search Console puede usar esa cuenta para verificar

**Opción 4: Google Tag Manager**

- Similar a GA, usa GTM existente

---

## 📤 PASO 3: ENVIAR SITEMAP

### 3.1 Verificar Sitemap

El sitemap ya está creado en `public/sitemap.xml`

URL completa: `https://freakjazz.com/sitemap.xml`

### 3.2 Enviar a Search Console

1. En Search Console, ir a **"Sitemaps"** en el menú lateral
2. En "Add a new sitemap", ingresar: `sitemap.xml`
3. Click **"Submit"**

Search Console procesará el sitemap (puede tomar unas horas).

---

## 🔎 PASO 4: SOLICITAR INDEXACIÓN

### URLs Prioritarias

Una vez verificado el sitio, solicita indexación manual de:

1. **Home:** `https://freakjazz.com/`
2. **Quote:** `https://freakjazz.com/cotizacion`
3. **About:** `https://freakjazz.com/about-us`

### Cómo Solicitar Indexación

1. En Search Console, ir a **"URL Inspection"**
2. Pegar la URL completa (ej: `https://freakjazz.com/cotizacion`)
3. Click **"Enter"**
4. Si la URL no está indexada, aparecerá botón **"Request Indexing"**
5. Click y esperar confirmación

**Nota:** Google puede tardar de 1-7 días en indexar.

---

## 📊 PASO 5: CONFIGURAR ALERTAS Y REPORTES

### 5.1 Configurar Email Notifications

1. En Search Console, ir a **Settings (⚙️)** → **Users and permissions**
2. Verificar que tu email esté como Owner
3. Ir a **Settings** → **Email preferences**
4. Activar:
   - ✅ Coverage issues
   - ✅ Manual actions
   - ✅ Security issues
   - ✅ Mobile usability

### 5.2 Conectar con Google Analytics

1. En Search Console, ir a **Settings** → **Associations**
2. Click **"Associate"** → seleccionar tu propiedad de GA4
3. Esto permite ver datos de Search Console dentro de GA4

---

## 📈 PASO 6: MONITOREO INICIAL

### Qué Revisar en las Primeras Semanas

#### Performance (Rendimiento)

- **Impresiones:** Cuántas veces aparece tu sitio en búsquedas
- **Clicks:** Cuántos clicks recibiste
- **CTR (Click-through rate):** % de clicks vs impresiones
- **Position:** Posición promedio en resultados

**Objetivo inicial:**

- 50+ impresiones/día en el primer mes
- CTR > 2%
- Posición < 30 para keywords principales

#### Coverage (Cobertura)

- **Valid pages:** Páginas indexadas correctamente
- **Errors:** Errores de indexación
- **Warnings:** Advertencias

**Objetivo:**

- 100% de páginas importantes indexadas
- 0 errores

#### Core Web Vitals

Métricas de rendimiento:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🎯 KEYWORDS A MONITOREAR

### Primary Keywords (prioridad alta)

1. `desarrolladora full stack Ecuador`
2. `senior software engineer freelance`
3. `desarrolladora .NET Python React`

### Secondary Keywords

4. `contratar desarrollador senior Ecuador`
5. `freelance developer available hire`
6. `software developer hourly rate Ecuador`

### Long-Tail Keywords

7. `desarrolladora con experiencia microservicios AWS`
8. `freelance full stack developer master degree`
9. `React developer available Ecuador`

---

## 📝 CHECKLIST DE VERIFICACIÓN

### Pre-Setup

- [ ] Cuenta de Google creada
- [ ] Sitio desplegado en producción
- [ ] URL accesible públicamente

### Verificación

- [ ] Propiedad creada en Search Console
- [ ] Método de verificación seleccionado (HTML tag)
- [ ] Meta tag agregado al código
- [ ] Deploy realizado
- [ ] Verificación completada exitosamente

### Post-Verificación

- [ ] Sitemap enviado (`sitemap.xml`)
- [ ] URLs principales solicitadas para indexación
- [ ] Alertas de email configuradas
- [ ] Conectado con Google Analytics (opcional)

### Monitoreo Semanal

- [ ] Revisar impresiones y clicks
- [ ] Verificar posición de keywords
- [ ] Comprobar errores de cobertura
- [ ] Analizar Core Web Vitals

---

## 🔧 TROUBLESHOOTING

### Problema: "Verification failed"

**Solución:**

1. Verificar que el meta tag esté en el `<head>` del HTML
2. Hacer hard refresh (Ctrl+F5) en el sitio
3. Ver el código fuente (Ctrl+U) y buscar `google-site-verification`
4. Esperar 5-10 minutos y reintentar verificación

### Problema: "Sitemap could not be read"

**Solución:**

1. Verificar que `https://freakjazz.com/sitemap.xml` sea accesible
2. Validar XML en: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Verificar que no haya errores de sintaxis XML
4. Comprobar que el archivo esté en `public/` no en `src/`

### Problema: "URL is not on Google"

**Solución:**

1. Es normal para sitios nuevos
2. Esperar 1-7 días después de solicitar indexación
3. Asegurar que robots.txt no esté bloqueando
4. Verificar que no haya `noindex` en la página

---

## 📊 DASHBOARD RECOMENDADO

### Vista Semanal

Crear un reporte personalizado con:

1. **Queries:** Top 20 búsquedas que traen tráfico
2. **Pages:** Páginas con más impresiones
3. **Countries:** De dónde viene el tráfico
4. **Devices:** Desktop vs Mobile

### Export Datos

Para análisis más profundo:

- Search Console → Performance → Export
- Formato: CSV o Google Sheets
- Frecuencia: Semanal

---

## 🚀 PRÓXIMOS PASOS

Después de completar el setup:

1. **Semana 1-2:** Monitorear indexación de páginas
2. **Semana 3-4:** Analizar primeras impresiones y keywords
3. **Mes 2:** Optimizar contenido basado en queries reales
4. **Mes 3:** Analizar tendencias y ajustar estrategia

---

## 📞 SOPORTE

**Google Search Console Help:**

- https://support.google.com/webmasters

**Documentación:**

- https://developers.google.com/search/docs

**Community:**

- https://support.google.com/webmasters/community

---

**Documento creado:** Mayo 6, 2026
**Última actualización:** Mayo 6, 2026
