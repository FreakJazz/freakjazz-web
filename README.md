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
- 🔐 **Multi-Auth** - Support for JWT, Firebase, Supabase, Auth0, AWS Amplify
- 🌐 **i18n** - Complete internationalization
- 📊 **Data Grid** - Advanced tables with MUI X
- 📅 **FullCalendar** - Integrated calendar system
- 📝 **TipTap Editor** - Rich text editor
- 🗺️ **Mapbox** - Map integration
- 📱 **Responsive** - Complete adaptive design
- 🎭 **Framer Motion** - Smooth animations
- 🎯 **React Router** - Modern navigation
- 📦 **Drag & Drop** - Draggable components with dnd-kit

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
- **Zod** 3.24.2 (schema validation)

### Authentication

- **JWT** (custom implementation)
- **Firebase** 11.9.1
- **Supabase** 2.49.8
- **Auth0** 2.3.0
- **AWS Amplify** 6.15.1

### Charts & Visualization

- **ApexCharts** 4.7.0
- **React ApexCharts** 1.7.0

### Editing & Content

- **TipTap** 2.22.0 (WYSIWYG editor)
- **React Markdown** 10.1.0

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
│   └── logo/                         # Application logos
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
    │   ├── carousel/                 # Carousels (Embla)
    │   ├── chart/                    # Charts (ApexCharts)
    │   ├── color-utils/              # Color utilities
    │   ├── country-select/           # Country selector
    │   ├── custom-breadcrumbs/       # Custom breadcrumbs
    │   ├── custom-data-grid/         # Custom Data Grid
    │   ├── custom-date-range-picker/ # Date range picker
    │   ├── custom-dialog/            # Custom dialogs
    │   ├── custom-popover/           # Custom popovers
    │   ├── editor/                   # TipTap editor
    │   ├── empty-content/            # Empty state
    │   ├── file-thumbnail/           # File thumbnails
    │   ├── filters-result/           # Filter results
    │   ├── flag-icon/                # Flag icons
    │   ├── hook-form/                # React Hook Form components
    │   ├── iconify/                  # Iconify wrapper
    │   ├── image/                    # Optimized image component
    │   ├── label/                    # Custom labels
    │   ├── lightbox/                 # Image lightbox
    │   ├── loading-screen/           # Loading screen
    │   ├── logo/                     # Logo component
    │   ├── map/                      # Mapbox integration
    │   ├── markdown/                 # Markdown renderer
    │   ├── mega-menu/                # Mega menu
    │   ├── nav-basic/                # Basic navigation
    │   ├── nav-section/              # Navigation sections
    │   ├── number-input/             # Number input
    │   ├── organizational-chart/     # Organizational chart
    │   ├── phone-input/              # Phone input
    │   ├── progress-bar/             # Progress bar
    │   ├── scrollbar/                # Custom scrollbar
    │   ├── search-not-found/         # Search not found
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
    │   ├── firebase.ts               # Firebase configuration
    │   └── supabase.ts               # Supabase configuration
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

# Mapbox
VITE_MAPBOX_API_KEY=your_mapbox_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APPID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF123

# AWS Amplify
VITE_AWS_AMPLIFY_USER_POOL_ID=us-east-1_XXXXXXXX
VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID=xxxxxxxxx
VITE_AWS_AMPLIFY_REGION=us-east-1

# Auth0
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CALLBACK_URL=http://localhost:8080/auth/callback

# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
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

The project supports multiple authentication methods:

### Available Methods

1. **JWT** (default)

   - Custom implementation with tokens
   - Own backend required

2. **Firebase Authentication**

   - Email/Password
   - Google, Facebook, Twitter
   - Configure in `src/lib/firebase.ts`

3. **Supabase Auth**

   - Complete auth with database
   - Configure in `src/lib/supabase.ts`

4. **Auth0**

   - OAuth 2.0
   - Single Sign-On (SSO)

5. **AWS Amplify**
   - Cognito User Pools
   - Identity federation

### Change Authentication Method

In `src/global-config.ts`:

```typescript
auth: {
  method: 'firebase', // Change here
  skip: false,        // true for development without auth
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

## 📄 License

[Specify license]

## 👥 Authors

FreakJazz Team

## 🤝 Contributing

[Indicate contribution process]

---

**Version**: 7.3.0  
**Node**: >= 22  
**Build**: Vite 6.3.3  
**Framework**: React 19.1.0
