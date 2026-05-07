# Google Tag Manager - Guía de Implementación

## FreakJazz Website | GTM-5PF9FPTK

---

## ✅ LO QUE YA ESTÁ IMPLEMENTADO

### 1. Código GTM Instalado

✅ **GTM ID configurado:** `GTM-5PF9FPTK`
✅ **Variable de entorno:** `VITE_GTM_ID=GTM-5PF9FPTK`
✅ **Librería creada:** `src/lib/google-tag-manager.ts`
✅ **Inicialización automática:** En `src/main.tsx`

### 2. Funciones Disponibles

```typescript
// Tracking de eventos personalizados
import { trackEventGTM, pushToDataLayer } from 'src/lib/google-tag-manager';

// Tracking de pageviews
import { trackPageViewGTM } from 'src/lib/google-tag-manager';

// Tracking de formularios
import { trackFormSubmitGTM } from 'src/lib/google-tag-manager';

// Tracking de conversiones
import { trackConversionGTM } from 'src/lib/google-tag-manager';

// Quote form específico
import { trackQuoteFormGTM } from 'src/lib/google-tag-manager';
```

---

## 🚀 CÓMO FUNCIONA

### Flujo de Tracking

1. **GTM se carga automáticamente** al abrir el sitio
2. **Todos los eventos se envían al dataLayer** de GTM
3. **GTM gestiona qué hacer con cada evento:**
   - Enviar a Google Analytics 4
   - Enviar a Facebook Pixel
   - Enviar a LinkedIn Insight Tag
   - Ejecutar código personalizado
   - etc.

### Ventajas de GTM vs GA4 Directo

✅ **Gestión centralizada** - Un solo lugar para todos los tags
✅ **Sin redesplegar código** - Cambios desde GTM Dashboard
✅ **Múltiples plataformas** - GA4, Facebook, LinkedIn, etc.
✅ **Testing integrado** - Preview mode en GTM
✅ **Control de privacidad** - Fácil cumplir GDPR/CCPA

---

## 📊 CONFIGURAR GOOGLE ANALYTICS 4 EN GTM

### Paso 1: Crear Propiedad GA4

1. Ir a: https://analytics.google.com
2. Admin → Create Property
3. Property name: **FreakJazz Website**
4. Timezone: **Ecuador (GMT-5)**
5. Currency: **USD**
6. Create property → Web → Data Stream
7. Website URL: `https://freakjazz.com`
8. Copiar el **Measurement ID** (formato: `G-XXXXXXXXXX`)

### Paso 2: Agregar GA4 a GTM

1. Ir a: https://tagmanager.google.com
2. Seleccionar container **GTM-5PF9FPTK**
3. Click **"Tags"** → **"New"**
4. Tag Configuration:
   - Type: **Google Analytics: GA4 Configuration**
   - Measurement ID: **G-TU_MEASUREMENT_ID** (el que copiaste)
5. Triggering:
   - Trigger: **All Pages**
6. Click **"Save"**
7. Name: `GA4 - Configuration`

### Paso 3: Configurar Eventos en GTM

**Event 1: Quote Form Submit**

1. Click **"Tags"** → **"New"**
2. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: **GA4 - Configuration**
   - Event Name: `quote_form_submit`
3. Triggering:
   - Click **"+"** → **Custom Event**
   - Event name: `quote_form_submit`
   - Save trigger
4. Save tag

**Event 2: Quote Form Success**

1. Tags → New
2. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: **GA4 - Configuration**
   - Event Name: `quote_form_success`
   - Mark as conversion: ✅ (opcional)
3. Triggering:
   - Custom Event: `quote_form_success`
4. Save

**Event 3: CTA Clicks**

1. Tags → New
2. Tag Configuration:
   - Type: **Google Analytics: GA4 Event**
   - Configuration Tag: **GA4 - Configuration**
   - Event Name: `cta_click`
   - Event Parameters:
     - `cta_text`: `{{dlv - cta_text}}`
     - `cta_location`: `{{dlv - cta_location}}`
3. Triggering:
   - Custom Event: `cta_click`
4. Save

### Paso 4: Variables del DataLayer

Para capturar datos de los eventos:

1. Click **"Variables"** → **"New"**
2. Variable Configuration:
   - Type: **Data Layer Variable**
   - Data Layer Variable Name: `cta_text`
3. Save → Name: `dlv - cta_text`

Repetir para:

- `cta_location`
- `form_name`
- `company_type`
- `solution_type`
- `budget`
- etc.

### Paso 5: Publicar Cambios

1. Click **"Submit"** (arriba derecha)
2. Version Name: `Initial GA4 Setup`
3. Version Description: `GA4 configuration + quote form events`
4. Click **"Publish"**

---

## 🔍 VERIFICAR QUE GTM FUNCIONA

### Opción 1: GTM Preview Mode

1. En GTM Dashboard, click **"Preview"**
2. Ingresar: `https://freakjazz.com`
3. Click **"Connect"**
4. Se abrirá tu sitio con GTM debugger
5. Verificar que los eventos se disparan correctamente

### Opción 2: Verificar en el Sitio

1. Deploy del sitio: `vercel --prod`
2. Abrir: `https://freakjazz.com`
3. Abrir DevTools → Console
4. Buscar mensaje: `GTM: Initialized successfully GTM-5PF9FPTK`
5. En Console, ejecutar: `dataLayer`
6. Deberías ver el array con eventos

### Opción 3: Google Tag Assistant

1. Instalar extensión: [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abrir tu sitio
3. Click en la extensión
4. Deberías ver GTM container activo

---

## 💻 USAR GTM EN TU CÓDIGO

### Quote Form - Implementación Completa

Archivo: `src/sections/quote/quote-form-detailed.tsx`

```typescript
import { useEffect } from 'react';
import { trackQuoteFormGTM } from 'src/lib/google-tag-manager';

export function QuoteFormDetailed() {
  // Track cuando el usuario inicia el formulario
  useEffect(() => {
    trackQuoteFormGTM.started();
  }, []);

  // Track al completar cada bloque (opcional)
  const handleBlockComplete = (blockNumber: number, blockName: string) => {
    trackQuoteFormGTM.blockCompleted(blockNumber, blockName);
  };

  // Track al enviar el formulario
  const onSubmit = async (data: QuoteFormData) => {
    try {
      // Track intento de envío
      trackQuoteFormGTM.submitted({
        companyType: data.companyType,
        solutionType: data.solutionType,
        budget: data.budget,
        industry: data.industry,
        timeline: data.timeline,
      });

      // Enviar formulario
      const response = await emailService.sendQuoteEmail(data);

      if (response.success) {
        // Track conversión exitosa
        trackQuoteFormGTM.success();
      }
    } catch (error) {
      // Track error
      trackQuoteFormGTM.error(error.message);
    }
  };

  return (
    // ... rest of form JSX
  );
}
```

### Tracking de Navegación

```typescript
import { trackNavigationGTM } from 'src/lib/google-tag-manager';

// En tu componente de menú
const handleMenuClick = (itemName: string) => {
  trackNavigationGTM.menuClick(itemName);
  navigate(itemPath);
};

// En CTAs
const handleCTAClick = () => {
  trackNavigationGTM.ctaClick('Solicitar Cotización', 'Hero Section');
  navigate('/cotizacion');
};
```

### Tracking de Pageviews (para SPA)

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackPageViewGTM } from 'src/lib/google-tag-manager';

export function App() {
  const location = useLocation();

  useEffect(() => {
    // Track pageview en cada cambio de ruta
    trackPageViewGTM(location.pathname);
  }, [location]);

  return (
    // ... app JSX
  );
}
```

---

## 📈 EVENTOS DISPONIBLES

### Eventos Pre-configurados

```typescript
// Quote Form
trackQuoteFormGTM.started();
trackQuoteFormGTM.submitted(data);
trackQuoteFormGTM.success();
trackQuoteFormGTM.error(message);

// Navegación
trackNavigationGTM.menuClick(menuItem);
trackNavigationGTM.linkClick(url, text);
trackNavigationGTM.ctaClick(text, location);

// Genéricos
trackEventGTM('event_name', { custom: 'data' });
trackFormSubmitGTM('contact_form', { email: 'user@example.com' });
trackConversionGTM('lead_generated', 1, 'USD');
trackPageViewGTM('/cotizacion');
```

### Eventos Personalizados

```typescript
import { pushToDataLayer } from 'src/lib/google-tag-manager';

// Cualquier evento personalizado
pushToDataLayer('custom_event_name', {
  custom_param_1: 'value1',
  custom_param_2: 'value2',
});
```

---

## 🎯 CONFIGURACIONES RECOMENDADAS EN GTM

### 1. Enhanced Measurement (Opcional en GA4)

En GA4 Property → Data Streams → Enhanced measurement:

- ✅ Page views
- ✅ Scrolls (25%, 50%, 75%, 90%)
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

### 2. Conversion Events

Marcar como conversiones en GA4:

- `quote_form_success`
- `contact_form_submit` (si tienes)
- `phone_call_clicked` (si tienes)
- `email_clicked`

### 3. User Properties (Opcional)

Para segmentar usuarios:

- `user_type`: new / returning
- `traffic_source`: organic / paid / direct
- `device_category`: mobile / desktop / tablet

---

## 🔒 PRIVACIDAD Y COOKIES

### Cookie Consent (Futuro)

Si necesitas cumplir con GDPR/CCPA, puedes controlar GTM:

```typescript
// Bloquear GTM hasta que el usuario acepte cookies
// No cargar GTM en main.tsx

// Cargar solo cuando el usuario acepta
import { loadGoogleTagManager } from 'src/lib/google-tag-manager';

const handleAcceptCookies = () => {
  localStorage.setItem('cookies_accepted', 'true');
  loadGoogleTagManager();
};
```

---

## 🚀 DESPLIEGUE FINAL

### Checklist Pre-Deploy

- [x] GTM ID en `.env`: `VITE_GTM_ID=GTM-5PF9FPTK`
- [x] Search Console verification: `VITE_GOOGLE_SITE_VERIFICATION=MXZx...`
- [x] GTM library creada: `src/lib/google-tag-manager.ts`
- [x] GTM inicializado en `main.tsx`
- [ ] GA4 property creada y Measurement ID obtenido
- [ ] GA4 tag configurado en GTM
- [ ] Eventos configurados en GTM
- [ ] Variables del dataLayer creadas
- [ ] Cambios publicados en GTM
- [ ] Build sin errores: `npm run build`
- [ ] Deploy a Vercel: `vercel --prod`

### Comandos de Deploy

```powershell
# 1. Verificar que no haya errores
npm run build

# 2. Deploy a producción
vercel --prod

# 3. Verificar en producción
# Abrir: https://freakjazz.com
# DevTools → Console → Buscar "GTM: Initialized"
# Verificar que dataLayer tenga contenido
```

---

## 📊 PRÓXIMOS PASOS

### Inmediato (Hoy)

1. ✅ Crear GA4 property y obtener Measurement ID
2. ✅ Configurar GA4 tag en GTM
3. ✅ Configurar eventos básicos (pageview, quote_form)
4. ✅ Publicar cambios en GTM
5. ✅ Deploy del sitio a producción
6. ✅ Verificar que GTM funcione

### Corto Plazo (Esta semana)

1. ⏳ Verificar sitio en Google Search Console
2. ⏳ Enviar sitemap.xml
3. ⏳ Solicitar indexación de páginas principales
4. ⏳ Implementar tracking en quote form
5. ⏳ Implementar tracking en navegación

### Mediano Plazo (Próximas semanas)

1. ⏳ Configurar más eventos en GTM (CTAs, links, etc.)
2. ⏳ Agregar Facebook Pixel (si usas Facebook Ads)
3. ⏳ Agregar LinkedIn Insight Tag (si usas LinkedIn Ads)
4. ⏳ Configurar remarketing audiences
5. ⏳ Implementar cookie consent banner (si necesario)

---

## 📞 RECURSOS

- **GTM Documentation:** https://developers.google.com/tag-platform/tag-manager
- **GA4 + GTM:** https://support.google.com/tagmanager/answer/9442095
- **GTM Community:** https://www.simoahava.com/ (blog excelente)
- **GA4 Dashboard:** https://analytics.google.com
- **GTM Dashboard:** https://tagmanager.google.com

---

**Container ID:** GTM-5PF9FPTK  
**Site:** https://freakjazz.com  
**Documento creado:** Mayo 6, 2026
