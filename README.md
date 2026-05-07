# 🎵 FreakJazz Web

Modern web application built with React, TypeScript and Vite, based on the Minimal UI template. Complete platform with administrative dashboard, multiple authentication system and reusable components.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Main Modules](#-main-modules)
- [Authentication](#-authentication)
- [Components](#-components)

## ✨ Features

- 🚀 **Vite** - Ultra-fast build tool with HMR
- ⚛️ **React 19** - Latest UI framework features
- 📘 **TypeScript** - Complete static typing
- 🎨 **Material-UI v7** - Professional design system
- � **SEO Optimized** - Google Tag Manager, Schema.org markup, sitemap, robots.txt
- 🌐 **i18n** - Complete internationalization (English/Spanish)
- 🔐 **JWT Auth** - Custom JWT authentication
- 📱 **Responsive** - Complete adaptive design
- 🎭 **Framer Motion** - Smooth animations
- 🎯 **React Router** - Modern navigation v7
- 📧 **Email Service** - Integrated with Mailjet
- 📦 **Drag & Drop** - Draggable components
- 📊 **Form Validation** - React Hook Form + Zod

## 🛠️ Tech Stack

### Core

- **React** 19.1.0
- **TypeScript** 5.8.3
- **Vite** 6.3.3
- **React Router** 7.6.0

### UI & Styling

- **Material-UI** 7.1.2
- **Emotion** (styled components)
- **Framer Motion** 12.18.1
- **Iconify** 6.0.0

### Forms & Validation

- **React Hook Form** 7.58.1
- **Zod** 3.25.67 (schema validation)

### Authentication

- **JWT** (custom implementation)
- Token-based authentication
- Route protection guards

### SEO & Analytics

- **Google Tag Manager** - GTM integration
- **React Helmet Async** 3.0.0 - Dynamic meta tags
- **Schema.org** - Structured data (Person, Service, Organization)
- **Sitemap.xml** - Search engine indexing
- **Robots.txt** - Crawler directives

### Email & Communication

- **Mailjet** - Email service integration
- **Vercel Functions** - Serverless API endpoints

### Utilities

- **Axios** 1.10.0
- **Day.js** 1.11.13
- **Lodash-es** 4.17.21
- **es-toolkit** 1.39.3
- **nprogress** 0.2.0

## 📁 Project Structure

```
freakjazz-web/
│
├── 📄 ENTRY_POINT.md                  # Documentation entry point
├── 📄 README.md                       # This file
├── 📄 package.json                    # Dependencies and scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 vite.config.ts                  # Vite configuration
├── 📄 eslint.config.mjs              # ESLint configuration
├── 📄 prettier.config.mjs            # Prettier configuration
├── 📄 vercel.json                    # Vercel deployment config
├── 📄 index.html                     # Main HTML file
│
├── 📁 docs/                          # Documentation
│   └── prompts/                      # AI prompts
│       ├── content.md
│       └── instructions.md
│
├── 📁 public/                        # Static files
│   ├── assets/                       # Public assets
│   │   ├── background/               # Background images
│   │   ├── icons/                    # Icons
│   │   ├── illustrations/            # Illustrations
│   │   └── images/                   # General images
│   ├── fonts/                        # Custom fonts
│   ├── logo/                         # Application logos
│   ├── sitemap.xml                   # SEO sitemap
│   ├── robots.txt                    # Crawler directives
│   └── favicon.ico                   # Site favicon
│
└── 📁 src/                           # Source code
    ├── 📄 main.tsx                   # React entry point
    ├── 📄 app.tsx                    # Main App component
    ├── 📄 global-config.ts           # Global configuration
    ├── 📄 global.css                 # Global styles
    ├── 📄 vite-env.d.ts             # Vite types
    │
    ├── 📁 _mock/                     # Mock data for development
    │   ├── _blog.ts                  # Blog mock
    │   ├── _calendar.ts              # Calendar mock
    │   ├── _files.ts                 # Files mock
    │   ├── _invoice.ts               # Invoices mock
    │   ├── _job.ts                   # Jobs mock
    │   ├── _order.ts                 # Orders mock
    │   ├── _product.ts               # Products mock
    │   ├── _tour.ts                  # Tours mock
    │   ├── _user.ts                  # Users mock
    │   ├── _overview.ts              # Overview mock
    │   ├── _others.ts                # Other mocks
    │   ├── assets.ts                 # Assets mock
    │   └── _map/                     # Map mocks
    │
    ├── 📁 actions/                   # State management actions
    │   ├── blog.ts                   # Blog actions
    │   ├── calendar.ts               # Calendar actions
    │   ├── chat.ts                   # Chat actions
    │   ├── kanban.ts                 # Kanban actions
    │   ├── mail.ts                   # Mail actions
    │   └── product.ts                # Product actions
    │
    ├── 📁 assets/                    # Code assets
    │   ├── data/                     # Static data
    │   ├── icons/                    # SVG icons
    │   └── illustrations/            # SVG illustrations
    │
    ├── 📁 auth/                      # Authentication system
    │   ├── types.ts                  # Authentication types
    │   ├── components/               # Auth components
    │   ├── context/                  # Auth contexts (JWT, Firebase, Supabase, Auth0, Amplify)
    │   ├── guard/                    # Route protection guards
    │   ├── hooks/                    # Authentication hooks
    │   ├── utils/                    # Auth utilities
    │   └── view/                     # Login/register views
    │
    ├── 📁 components/                # Reusable components
    │   ├── animate/                  # Animated components
    │   ├── color-utils/              # Color utilities
    │   ├── country-select/           # Country selector
    │   ├── custom-breadcrumbs/       # Custom breadcrumbs
    │   ├── custom-dialog/            # Custom dialogs
    │   ├── custom-popover/           # Custom popovers
    │   ├── empty-content/            # Empty state
    │   ├── file-thumbnail/           # File thumbnails
    │   ├── filters-result/           # Filter results
    │   ├── flag-icon/                # Flag icons
    │   ├── hook-form/                # React Hook Form components
    │   ├── iconify/                  # Iconify wrapper
    │   ├── image/                    # Optimized image component
    │   ├── label/                    # Custom labels
    │   ├── loading-screen/           # Loading screen
    │   ├── logo/                     # Logo component
    │   ├── nav-basic/                # Basic navigation
    │   ├── nav-section/              # Navigation sections
    │   ├── number-input/             # Number input
    │   ├── progress-bar/             # Progress bar
    │   ├── scrollbar/                # Custom scrollbar
    │   ├── search-not-found/         # Search not found
    │   ├── seo/                      # SEO components (SeoHead, Schema markup)
    │   ├── settings/                 # Settings panel
    │   ├── snackbar/                 # Notifications
    │   ├── svg-color/                # SVG with color
    │   ├── table/                    # Table components
    │   └── upload/                   # File upload
    │
    ├── 📁 layouts/                   # Application layouts
    │   ├── nav-config-account.tsx    # Account navigation
    │   ├── nav-config-dashboard.tsx  # Dashboard navigation
    │   ├── nav-config-main-demo.tsx  # Demo navigation
    │   ├── nav-config-main.tsx       # Main navigation
    │   ├── nav-config-workspace.tsx  # Workspace navigation
    │   ├── auth-centered/            # Centered auth layout
    │   ├── auth-split/               # Split auth layout
    │   ├── components/               # Layout components
    │   ├── core/                     # Core layouts
    │   ├── dashboard/                # Dashboard layout
    │   ├── main/                     # Main layout
    │   └── simple/                   # Simple layout
    │
    ├── 📁 lib/                       # Library configurations
    │   ├── axios.ts                  # Axios configuration
    │   ├── google-tag-manager.ts     # GTM integration
    │   └── google-analytics.ts       # GA4 configuration
    │
    ├── 📁 locales/                   # Internationalization
    │   ├── i18n-provider.tsx         # i18n provider
    │   ├── index.ts                  # Exports
    │   ├── locales-config.ts         # Language configuration
    │   ├── localization-provider.tsx # Localization provider
    │   ├── use-locales.ts            # Locales hook
    │   ├── langs/                    # Translation files
    │   └── utils/                    # i18n utilities
    │
    ├── 📁 pages/                     # Application pages
    │   ├── home.tsx                  # Home page
    │   ├── about-us/                 # About us
    │   ├── auth/                     # Authentication pages
    │   ├── auth-demo/                # Authentication demo
    │   ├── blank/                    # Blank page
    │   ├── coming-soon/              # Coming soon
    │   ├── components/               # Components showcase
    │   ├── contact-us/               # Contact
    │   ├── dashboard/                # Dashboard pages
    │   ├── error/                    # Error pages
    │   ├── faqs/                     # FAQs
    │   ├── maintenance/              # Maintenance
    │   ├── payment/                  # Payment pages
    │   ├── post/                     # Blog posts
    │   ├── pricing/                  # Pricing
    │   └── product/                  # Products
    │
    ├── 📁 routes/                    # Route configuration
    │   ├── paths.ts                  # Path definitions
    │   ├── components/               # Routing components
    │   ├── hooks/                    # Routing hooks
    │   └── sections/                 # Route sections
    │
    ├── 📁 sections/                  # Application sections
    │   ├── _examples/                # Section examples
    │   ├── about/                    # About section
    │   ├── account/                  # Account management
    │   ├── auth/                     # Authentication sections
    │   ├── blog/                     # Blog sections
    │   ├── calendar/                 # Calendar sections
    │   ├── chat/                     # Chat sections
    │   ├── checkout/                 # Checkout sections
    │   ├── contact/                  # Contact sections
    │   ├── dashboard/                # Dashboard sections
    │   ├── error/                    # Error sections
    │   ├── faqs/                     # FAQs sections
    │   ├── file/                     # File management
    │   ├── invoice/                  # Invoices
    │   ├── job/                      # Jobs
    │   ├── kanban/                   # Kanban board
    │   ├── mail/                     # Mail system
    │   ├── order/                    # Orders
    │   ├── overview/                 # Overview/dashboard
    │   ├── payment/                  # Payments
    │   ├── permission/               # Permissions
    │   ├── pricing/                  # Pricing
    │   ├── product/                  # Products
    │   ├── tour/                     # Tours
    │   └── user/                     # Users
    │
    ├── 📁 theme/                     # Theme system
    │   ├── core/                     # Theme core
    │   ├── styles/                   # Global styles
    │   └── with-settings/            # HOC with settings
    │
    ├── 📁 types/                     # Global TypeScript types
    │   ├── blog.ts
    │   ├── calendar.ts
    │   ├── chat.ts
    │   ├── file.ts
    │   ├── invoice.ts
    │   ├── job.ts
    │   ├── kanban.ts
    │   ├── mail.ts
    │   ├── order.ts
    │   ├── product.ts
    │   ├── tour.ts
    │   └── user.ts
    │
    └── 📁 utils/                     # General utilities
        ├── axios.ts                  # Axios helpers
        ├── format-number.ts          # Number formatting
        ├── format-time.ts            # Time formatting
        ├── highlight.ts              # Highlight utilities
        └── ...                       # Other utilities
```

## 🚀 Installation

### Prerequisites

- **Node.js** >= 22.0.0
- **Yarn** 1.22.22 (recommended) or npm

### Installation with Yarn (Recommended)

```bash
# Clone the repository
git clone <repository-url>

# Navigate to directory
cd freakjazz-web

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Installation with npm

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 📜 Available Scripts

### Development

```bash
yarn dev              # Start development server (port 8080)
yarn tsc:dev          # Development with TypeScript watch mode
yarn tsc:watch        # TypeScript watch mode only
```

### Production

```bash
yarn build            # Build for production
yarn start            # Preview production build
```

### Code Quality

```bash
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn lint:print       # View ESLint configuration

yarn fm:check         # Check format with Prettier
yarn fm:fix           # Fix format with Prettier

yarn fix:all          # Fix ESLint and Prettier
```

### Utilities

```bash
yarn clean            # Clean node_modules and builds
yarn re:dev           # Clean + install + dev
yarn re:build         # Clean + install + build
yarn re:build-npm     # Rebuild with npm
```

### TypeScript

```bash
yarn tsc:print        # View TypeScript configuration
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Server
VITE_SERVER_URL=https://api.yourserver.com

# Assets
VITE_ASSETS_DIR=https://cdn.yourserver.com

# Google Services
VITE_GTM_ID=GTM-XXXXXXX                    # Google Tag Manager ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX        # Google Analytics 4 Measurement ID
VITE_GOOGLE_SITE_VERIFICATION=xxxxx        # Google Search Console verification

# CV Downloads (Firebase Storage or CDN)
VITE_CV_URL_ES=https://your-cdn.com/cv-es.pdf
VITE_CV_URL_EN=https://your-cdn.com/cv-en.pdf

# Email Service (Mailjet)
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_API_SECRET=your_mailjet_secret
MAILJET_FROM_EMAIL=noreply@yoursite.com
MAILJET_FROM_NAME=Your Name
MAILJET_TO_EMAIL=your-email@example.com
```

### Global Configuration

Edit `src/global-config.ts`:

```typescript
export const CONFIG: ConfigValue = {
  appName: 'Your App Name',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  auth: {
    method: 'jwt', // 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0'
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  // ... rest of configuration
};
```

## 🔐 Authentication

The project uses JWT-based authentication:

### Implementation

- **JWT Tokens** - Secure token-based authentication
- **Auth Guards** - Route protection with AuthGuard component
- **Context Provider** - Authentication state management
- **Login/Register** - Complete authentication flows

### Configuration

In `src/global-config.ts`:

```typescript
auth: {
  method: 'jwt',
  skip: false,        // true to skip auth in development
  redirectPath: paths.dashboard.root,
}
```

### Protection Guards

```typescript
// In routes/sections
{
  Component: () => (
    <AuthGuard>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AuthGuard>
  ),
  children: [...],
}
```

## 🔍 SEO & Analytics

### Google Tag Manager

Integrated GTM for centralized analytics and tracking:

```typescript
// Initialized in src/app.tsx
import { loadGoogleTagManager } from 'src/lib/google-tag-manager';

useEffect(() => {
  loadGoogleTagManager();
}, []);
```

### SEO Components

**SeoHead Component** - Dynamic meta tags with multilingual support:

```typescript
import { SeoHead } from 'src/components/seo';

<SeoHead
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2"
  lang="en" // or "es" for Spanish
/>
```

**Schema Markup** - Structured data for rich search results:

```typescript
import { PersonSchema, ServiceSchema, AllSchemas } from 'src/components/seo';

<AllSchemas /> // Complete schema markup
```

### Sitemap & Robots

- **sitemap.xml** - Located in `/public/sitemap.xml`
- **robots.txt** - Located in `/public/robots.txt`

### Multilingual SEO

- **Hreflang tags** - Automatic for en/es languages
- **Dynamic og:locale** - en_US / es_EC
- **Translated content** - SEO translations in locales files

## 🎨 Components

### Key Components

- **DataGrid**: Advanced tables with sorting, filtering, pagination
- **Editor**: TipTap WYSIWYG editor
- **Calendar**: FullCalendar with events, drag & drop
- **Charts**: Multiple chart types with ApexCharts
- **Upload**: Drag & drop file upload with preview
- **Carousel**: Configurable carousels with Embla
- **Map**: Mapbox GL integration
- **Forms**: React Hook Form with Zod validation

### Usage Example

```typescript
import { DataGrid } from 'src/components/custom-data-grid';
import { Editor } from 'src/components/editor';

// DataGrid
<DataGrid
  rows={data}
  columns={columns}
  loading={loading}
/>

// Editor
<Editor
  value={content}
  onChange={setContent}
  placeholder="Write something..."
/>
```

## 📦 Main Modules

### Dashboard

- Overview with metrics and charts
- User, product, order management
- File system
- Integrated calendar
- Chat and mail
- Kanban board
- Invoices and reports

### E-commerce

- Product catalog
- Shopping cart
- Checkout process
- Order management
- Payment system

### Blog

- Post list
- Content editor
- Categories and tags
- Comments

### CRM

- Customer management
- Sales pipeline
- Activities and tracking

## 🌐 Internationalization

Supported languages:

- Spanish
- English
- French
- German
- Arabic
- Vietnamese
- Chinese

```typescript
// Use translation
import { useTranslate } from 'src/locales';

const { t } = useTranslate();
t('dashboard.title');
```

## 🎯 Deployment

### Vercel (Recommended)

```bash
# Configuration included in vercel.json
vercel deploy
```

### Manual Build

```bash
yarn build
# Files will be in /dist
```

## 📝 Code Conventions

- **TypeScript** strict mode enabled
- **ESLint** with custom configuration
- **Prettier** for consistent formatting
- **Naming**: camelCase for variables, PascalCase for components
- **Imports**: use `src/` alias for absolute imports

## � Recent Changes & Improvements

### SEO Implementation (May 2026)

- ✅ **Google Tag Manager** integration (GTM-5PF9FPTK)
- ✅ **SEO Components**: SeoHead with multilingual support, Schema.org markup
- ✅ **Sitemap & Robots**: Complete SEO files for search engines
- ✅ **Hreflang Tags**: Automatic multilingual SEO (en/es)
- ✅ **Google Search Console**: Verification code implemented
- ✅ **Dynamic Meta Tags**: Per-page SEO with translations

### UI/UX Enhancements

- ✅ **Navigation Alignment**: Centered menu items in desktop/mobile
- ✅ **CV Downloads**: Open in new tab with proper security attributes
- ✅ **Footer Cleanup**: Removed terms/conditions (legal pages not applicable)
- ✅ **Contact Privacy**: Removed phone number display
- ✅ **Hourly Rate Display**: Transparent pricing ($15-25/hour)

### Email Service

- ✅ **Mailjet Integration**: Quote request system via Vercel Functions
- ✅ **API Endpoint**: `/api/quote` for form submissions

## 🗑️ Removed Modules

The following modules were removed from the original Minimal template to optimize the project:

### Authentication Libraries (REMOVED)

- ❌ **Firebase** (11.9.1) - Not needed, using only JWT
- ❌ **Supabase** (2.49.8) - Not needed, using only JWT
- ❌ **Auth0** (2.3.0) - Not needed, using only JWT
- ❌ **AWS Amplify** (6.15.1) - Not needed, using only JWT

### Visualization & Charts (REMOVED)

- ❌ **ApexCharts** (4.7.0) - Removed from dependencies
- ❌ **React ApexCharts** (1.7.0) - Removed from dependencies
- ❌ Component: `components/chart/` - Removed directory

### Mapping (REMOVED)

- ❌ **Mapbox GL** - Removed map integration
- ❌ Component: `components/map/` - Removed directory
- ❌ Mock: `_mock/_map/` - Removed directory

### Editors & Content (REMOVED)

- ❌ **TipTap** (2.22.0) - WYSIWYG editor removed
- ❌ **React Markdown** (10.1.0) - Markdown renderer removed
- ❌ Component: `components/editor/` - Removed directory
- ❌ Component: `components/markdown/` - Removed directory

### Calendar & Scheduling (REMOVED)

- ❌ **FullCalendar** - Calendar system removed
- ❌ Component: `components/calendar/` - Removed directory

### Data Grid (REMOVED)

- ❌ **MUI X Data Grid** - Advanced tables removed
- ❌ Component: `components/custom-data-grid/` - Removed directory

### UI Components (REMOVED)

- ❌ Component: `components/carousel/` - Carousels removed
- ❌ Component: `components/lightbox/` - Image lightbox removed
- ❌ Component: `components/organizational-chart/` - Org chart removed
- ❌ Component: `components/phone-input/` - Phone input removed
- ❌ Component: `components/custom-date-range-picker/` - Date picker removed
- ❌ Component: `components/mega-menu/` - Mega menu removed

### Why Were They Removed?

1. **Simplified Stack**: Focus on core functionality without bloat
2. **Performance**: Reduced bundle size significantly
3. **Maintenance**: Fewer dependencies to maintain and update
4. **Use Case**: These features weren't needed for the current project scope
5. **SEO Priority**: Shifted focus to search optimization and performance

### Current Focus

- ✅ **SEO & Analytics**: Google services integration
- ✅ **Performance**: Optimized build with essential packages only
- ✅ **Internationalization**: Bilingual support (en/es)
- ✅ **Professional UI**: Clean, fast, and accessible design
- ✅ **Email Communication**: Serverless quote request system

## 📄 License

[Specify license]

## 👥 Authors

FreakJazz Team - Jazmin Rodriguez

## 🤝 Contributing

[Indicate contribution process]

---

**Version**: 7.3.0  
**Node**: >= 22.0.0  
**Build**: Vite 6.3.5  
**Framework**: React 19.1.0  
**Last Updated**: May 7, 2026
