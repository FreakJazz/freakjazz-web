# Modalidades de Servicio - Guía de Implementación

## FreakJazz | Servicios Profesionales de Desarrollo

---

## 🎯 SECCIÓN PRINCIPAL: MODALIDADES DE SERVICIO

### Componente: quote-service-modes.tsx

Esta sección va **inmediatamente después del Hero** y antes del formulario de cotización.

---

## 📋 CONTENIDO PARA LA PÁGINA

### H2 Principal

```
Modalidades de Servicio Profesional
```

### Subtítulo

```
Elige la modalidad que mejor se adapte a las necesidades de tu empresa
```

---

## 🎨 DISEÑO: DOS CARDS COMPARATIVAS

### Card 1: PROYECTOS PERSONALIZADOS

**Icono:** 💻 (o icon: `solar:code-square-bold-duotone`)

**Título:** Proyectos de Software a Medida

**Descripción:**

```
Desarrollo completo de tu aplicación desde cero hasta producción.
Ideal para crear nuevos productos o modernizar sistemas existentes.
```

**✅ Ideal para:**

- Crear un nuevo producto digital
- Modernizar sistema existente
- MVP de startup
- Aplicación web o móvil
- E-commerce personalizado

**📦 Qué incluye:**

- Análisis de requerimientos y arquitectura técnica
- Desarrollo full stack (frontend + backend + base de datos)
- Testing automatizado y QA
- Despliegue en producción (AWS/Azure/Firebase)
- Documentación técnica completa
- Capacitación al equipo
- Garantía de 30 días

**⏱️ Duración:**

- MVP: 1-2 meses
- Aplicación completa: 2-4 meses
- Sistema empresarial: 3-6+ meses

**💰 Rango de inversión:**

- MVP web: $3,000 - $8,000
- App completa: $8,000 - $20,000
- Sistema ERP/CRM: $15,000 - $40,000+

**🎯 CTA:**

```
[Solicitar Cotización de Proyecto →]
```

**Badge:**

```
🚀 Más Solicitado
```

---

### Card 2: CONTRATACIÓN PROFESIONAL

**Icono:** 👤 (o icon: `solar:user-bold-duotone`)

**Título:** Contratación Profesional / Freelance

**Descripción:**

```
Refuerzo profesional para tu equipo de desarrollo.
Disponibilidad garantizada para proyectos en curso o liderazgo técnico.
```

**✅ Ideal para:**

- Necesitas más capacidad de desarrollo
- Proyecto con equipo interno
- Expertise técnico específico (.NET, Python, React)
- Mentoría y liderazgo técnico
- Consultoría de arquitectura

**📦 Qué incluye:**

- Disponibilidad garantizada (40h o 20h/semana)
- Reuniones de equipo y daily standups
- Code review y pair programming
- Reportes semanales de progreso
- Colaboración en Slack/Teams/Jira
- Integración con tu workflow existente

**⏱️ Duración:**

- Contrato mensual renovable
- Mínimo 1 mes
- Máxima flexibilidad

**💼 Modalidades:**

- **Full-time:** 40h/semana (tarifa mensual)
- **Part-time:** 20h/semana (50% de full-time)
- **Por horas:** Según compromiso mensual
- **Consultoría:** Para asesorías puntuales

**💰 Inversión:**

- Consultar según modalidad y duración

**🎯 CTA:**

```
[Consultar Disponibilidad →]
```

**Badge:**

```
⚡ Inicio Rápido
```

---

## 📊 TABLA DE DECISIÓN RÁPIDA

### H3

```
¿Qué modalidad es para ti?
```

### Tabla Comparativa (Mobile-friendly)

| ¿Qué necesitas?                     | Modalidad Recomendada          |
| ----------------------------------- | ------------------------------ |
| 🆕 Crear una aplicación desde cero  | 💻 Proyectos Personalizados    |
| 👥 Más desarrolladores en mi equipo | 👤 Contratación Full/Part-time |
| 🔄 Modernizar un sistema existente  | 💻 Proyectos Personalizados    |
| 💡 Consultoría técnica puntual      | 👤 Contratación Por Horas      |
| 🚀 MVP para startup                 | 💻 Proyectos Personalizados    |
| 🎯 Liderazgo técnico temporal       | 👤 Contratación Full-time      |
| 📱 App móvil nueva (iOS + Android)  | 💻 Proyectos Personalizados    |
| 🔍 Code review y mentoría           | 👤 Contratación Por Horas      |

---

## 🎨 ESTILOS Y DISEÑO RECOMENDADO

### Layout

- **Desktop:** 2 columnas lado a lado (Grid 50/50)
- **Mobile:** Stack vertical (una card debajo de otra)
- **Espaciado:** 80px entre secciones

### Cards

- **Background:** Blanco con border sutil o gradient suave
- **Hover:** Elevación (box-shadow) y ligero scale (1.02)
- **Border radius:** 16px
- **Padding:** 40px

### Colores

- **Card Proyectos (azul):**
  - Border-top: 4px solid #078DEE (color primario)
  - Badge background: rgba(7, 141, 238, 0.1)
- **Card Contratación (verde):**
  - Border-top: 4px solid #00A76F (color success)
  - Badge background: rgba(0, 167, 111, 0.1)

### Iconos

- Tamaño: 48px
- Color: Mismo del border-top de cada card
- Ubicación: Top-center o top-left

### CTAs

- **Botón Proyectos:** Variant="contained" color="primary"
- **Botón Contratación:** Variant="outlined" color="success"
- **Width:** 100% en mobile, auto en desktop
- **Tamaño:** large

---

## 💻 ESTRUCTURA DE COMPONENTE REACT

```typescript
// src/sections/quote/quote-service-modes.tsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { useTranslate } from 'src/locales';
import { Iconify } from 'src/components/iconify';

export function QuoteServiceModes() {
  const { t } = useTranslate();

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2">
            {t('quote.serviceModesTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
            {t('quote.serviceModesSubtitle')}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {/* Card 1: Proyectos Personalizados */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                position: 'relative',
                borderTop: '4px solid',
                borderTopColor: 'primary.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 20,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* Badge */}
              <Chip
                label={t('quote.mostRequested')}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                }}
              />

              {/* Icon */}
              <Box sx={{ mb: 3 }}>
                <Iconify
                  icon="solar:code-square-bold-duotone"
                  width={48}
                  sx={{ color: 'primary.main' }}
                />
              </Box>

              {/* Content */}
              <Typography variant="h4" sx={{ mb: 2 }}>
                {t('quote.mode1Title')}
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                {t('quote.mode1Description')}
              </Typography>

              {/* Ideal para */}
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('quote.idealFor')}
              </Typography>
              <Stack spacing={1} sx={{ mb: 3 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <Iconify icon="eva:checkmark-circle-2-fill" width={20} sx={{ color: 'success.main' }} />
                    <Typography variant="body2">{t(`quote.mode1Ideal${i}`)}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Investment */}
              <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('quote.investmentRange')}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                  $3,000 - $40,000+
                </Typography>
              </Box>

              {/* CTA */}
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={scrollToForm}
                startIcon={<Iconify icon="solar:document-text-bold" />}
              >
                {t('quote.requestQuote')}
              </Button>
            </Card>
          </Grid>

          {/* Card 2: Contratación Profesional */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                position: 'relative',
                borderTop: '4px solid',
                borderTopColor: 'success.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 20,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* Badge */}
              <Chip
                label={t('quote.quickStart')}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                  color: 'success.main',
                }}
              />

              {/* Icon */}
              <Box sx={{ mb: 3 }}>
                <Iconify
                  icon="solar:user-bold-duotone"
                  width={48}
                  sx={{ color: 'success.main' }}
                />
              </Box>

              {/* Content */}
              <Typography variant="h4" sx={{ mb: 2 }}>
                {t('quote.mode2Title')}
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                {t('quote.mode2Description')}
              </Typography>

              {/* Ideal para */}
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('quote.idealFor')}
              </Typography>
              <Stack spacing={1} sx={{ mb: 3 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <Iconify icon="eva:checkmark-circle-2-fill" width={20} sx={{ color: 'success.main' }} />
                    <Typography variant="body2">{t(`quote.mode2Ideal${i}`)}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Modalities */}
              <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('quote.availableModalities')}
                </Typography>
                <Stack spacing={0.5} sx={{ mt: 1 }}>
                  <Typography variant="body2">• Full-time (40h/semana)</Typography>
                  <Typography variant="body2">• Part-time (20h/semana)</Typography>
                  <Typography variant="body2">• Por horas</Typography>
                </Stack>
              </Box>

              {/* CTA */}
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="success"
                onClick={scrollToForm}
                startIcon={<Iconify icon="solar:calendar-bold" />}
              >
                {t('quote.checkAvailability')}
              </Button>
            </Card>
          </Grid>
        </Grid>

        {/* Decision Table */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            {t('quote.decisionTableTitle')}
          </Typography>
          {/* Table implementation here */}
        </Box>
      </Container>
    </Box>
  );
}
```

---

## 🌐 TRADUCCIONES NECESARIAS

### Agregar a es.json:

```json
"quote": {
  // ... existing keys

  "serviceModesTitle": "Modalidades de Servicio Profesional",
  "serviceModesSubtitle": "Elige la modalidad que mejor se adapte a las necesidades de tu empresa",

  "mostRequested": "🚀 Más Solicitado",
  "quickStart": "⚡ Inicio Rápido",
  "idealFor": "✅ Ideal para:",

  "mode1Title": "Proyectos de Software a Medida",
  "mode1Description": "Desarrollo completo de tu aplicación desde cero hasta producción. Ideal para crear nuevos productos o modernizar sistemas existentes.",
  "mode1Ideal1": "Crear un nuevo producto digital",
  "mode1Ideal2": "Modernizar sistema existente",
  "mode1Ideal3": "MVP de startup",
  "mode1Ideal4": "Aplicación web o móvil",
  "mode1Ideal5": "E-commerce personalizado",

  "mode2Title": "Contratación Profesional / Freelance",
  "mode2Description": "Refuerzo profesional para tu equipo de desarrollo. Disponibilidad garantizada para proyectos en curso o liderazgo técnico.",
  "mode2Ideal1": "Necesitas más capacidad de desarrollo",
  "mode2Ideal2": "Proyecto con equipo interno",
  "mode2Ideal3": "Expertise técnico específico",
  "mode2Ideal4": "Mentoría y liderazgo técnico",
  "mode2Ideal5": "Consultoría de arquitectura",

  "investmentRange": "💰 Rango de inversión:",
  "availableModalities": "💼 Modalidades disponibles:",
  "requestQuote": "Solicitar Cotización",
  "checkAvailability": "Consultar Disponibilidad",

  "decisionTableTitle": "¿Qué modalidad es para ti?",
  "decisionNeed1": "Crear una aplicación desde cero",
  "decisionMode1": "💻 Proyectos Personalizados",
  "decisionNeed2": "Más desarrolladores en mi equipo",
  "decisionMode2": "👤 Contratación Full/Part-time",
  "decisionNeed3": "Modernizar un sistema existente",
  "decisionNeed4": "Consultoría técnica puntual",
  "decisionMode4": "👤 Contratación Por Horas",
  "decisionNeed5": "MVP para startup",
  "decisionNeed6": "Liderazgo técnico temporal",
  "decisionMode6": "👤 Contratación Full-time",
  "decisionNeed7": "App móvil nueva",
  "decisionNeed8": "Code review y mentoría"
}
```

### Agregar a en.json (traducción al inglés):

```json
"quote": {
  "serviceModesTitle": "Professional Service Modes",
  "serviceModesSubtitle": "Choose the mode that best fits your company's needs",

  "mostRequested": "🚀 Most Requested",
  "quickStart": "⚡ Quick Start",
  "idealFor": "✅ Ideal for:",

  "mode1Title": "Custom Software Projects",
  "mode1Description": "Complete development of your application from scratch to production. Ideal for creating new products or modernizing existing systems.",
  "mode1Ideal1": "Create a new digital product",
  "mode1Ideal2": "Modernize existing system",
  "mode1Ideal3": "Startup MVP",
  "mode1Ideal4": "Web or mobile application",
  "mode1Ideal5": "Custom e-commerce",

  "mode2Title": "Professional Hiring / Freelance",
  "mode2Description": "Professional reinforcement for your development team. Guaranteed availability for ongoing projects or technical leadership.",
  "mode2Ideal1": "Need more development capacity",
  "mode2Ideal2": "Project with internal team",
  "mode2Ideal3": "Specific technical expertise",
  "mode2Ideal4": "Mentorship and technical leadership",
  "mode2Ideal5": "Architecture consulting",

  "investmentRange": "💰 Investment range:",
  "availableModalities": "💼 Available modalities:",
  "requestQuote": "Request Quote",
  "checkAvailability": "Check Availability",

  "decisionTableTitle": "Which mode is for you?",
  // ... rest of translations
}
```

---

## 📍 UBICACIÓN EN LA PÁGINA

```
┌─────────────────────────────────────┐
│  HERO (quote-hero.tsx)              │  ← Existente
├─────────────────────────────────────┤
│  MODALIDADES DE SERVICIO            │  ← NUEVA SECCIÓN
│  (quote-service-modes.tsx)          │
├─────────────────────────────────────┤
│  FORMULARIO DE COTIZACIÓN           │  ← Existente
│  (quote-form-detailed.tsx)          │
├─────────────────────────────────────┤
│  RESTO DE SECCIONES                 │
│  (Stack, Process, FAQ, etc.)        │
└─────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Componente Base

- [ ] Crear `src/sections/quote/quote-service-modes.tsx`
- [ ] Importar en `quote-view.tsx`
- [ ] Agregar justo después del QuoteHero

### Fase 2: Traducciones

- [ ] Agregar keys a `es.json`
- [ ] Agregar keys a `en.json`
- [ ] Verificar que todas las keys funcionan

### Fase 3: Estilos

- [ ] Ajustar colores según theme
- [ ] Verificar responsive en mobile
- [ ] Testear hover effects

### Fase 4: Funcionalidad

- [ ] Implementar scroll al formulario al hacer clic en CTAs
- [ ] Agregar parámetro URL para pre-seleccionar modalidad
- [ ] Testear en ambos idiomas

### Fase 5: Contenido Adicional (Opcional)

- [ ] Agregar tabla de decisión interactiva
- [ ] Agregar iconos personalizados
- [ ] Agregar animaciones de entrada

---

## 🎨 VARIACIONES DE DISEÑO

### Opción 1: Cards Verticales (actual)

- Dos cards lado a lado en desktop
- Stack vertical en mobile
- Cada card con toda su información

### Opción 2: Tabs

- Tabs horizontales para alternar entre modalidades
- Contenido cambia según tab activa
- Más compacto visualmente

### Opción 3: Slider/Carousel

- Carousel con 2 slides (modalidades)
- Bueno para mobile
- Swipe para cambiar

**Recomendación:** Opción 1 (Cards Verticales) por claridad y accesibilidad.

---

## 📱 RESPONSIVE DESIGN

### Desktop (≥960px)

```
┌──────────────────────────┬──────────────────────────┐
│  💻 Proyectos            │  👤 Contratación         │
│  Personalizados          │  Profesional             │
│                          │                          │
│  • Ideal para: ...       │  • Ideal para: ...       │
│  • Incluye: ...          │  • Incluye: ...          │
│  • Inversión: ...        │  • Modalidades: ...      │
│                          │                          │
│  [Solicitar Cotización]  │  [Consultar Disp.]       │
└──────────────────────────┴──────────────────────────┘
```

### Mobile (<960px)

```
┌──────────────────────────┐
│  💻 Proyectos            │
│  Personalizados          │
│  • ...                   │
│  [Solicitar Cotización]  │
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│  👤 Contratación         │
│  Profesional             │
│  • ...                   │
│  [Consultar Disp.]       │
└──────────────────────────┘
```

---

**Documento listo para implementar | Mayo 2026**
