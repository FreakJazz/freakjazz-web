Act as a Senior Frontend Architect and Product Engineer.

Build a multi-page professional portfolio platform using React / Next.js with a clean architecture approach.

All code, variables, components, and comments MUST be in English.

---

# OBJECTIVE

Create a scalable portfolio website that combines:

1. Personal CV (technical profile)
2. Services offering (as a software engineer / architect)
3. Real-world projects (case studies)
4. Trust & credibility (companies, achievements)
5. Contact & conversion (hire / collaborate)

---

# ARCHITECTURE

Follow strict separation:

/pages → routes
/views → page composition
/components → reusable UI
/hooks → logic
/data → structured content (JSON)
/lib → helpers

---

# PAGES TO IMPLEMENT

## 1. Home (/)

- Hero banner
- Short professional summary
- Key strengths
- Featured technologies
- CTA (Hire me / View projects)

---

## 2. About (/about)

- Full professional profile
- Philosophy of life
- Areas of interest
- Strengths

---

## 3. Experience (/experience)

- Timeline of work experience
- Responsibilities
- Technologies
- Impact

---

## 4. Projects (/projects)

- Real projects (case studies)

Each project must include:

- Title
- Description
- Problem
- Solution
- Technologies
- Impact
- Optional: images

Include:

- Banking loyalty platform
- Subscription/payment system
- Logistics platform
- Electoral systems

---

## 5. Services (/services)

Define services like a consulting engineer:

- Full-stack development
- Software architecture design
- Cloud & DevOps implementation
- API & microservices design
- AI-assisted development

Each service:

- Description
- Value proposition
- Technologies used

---

## 6. Technologies (/technologies)

Grouped visualization:

- Programming languages
- Backend & architecture
- Cloud & DevOps
- Databases
- AI & Data

---

## 7. Certifications (/certifications)

List all certifications from CV

---

## 8. Achievements (/achievements)

- Hackathon winner
- Robotics competition
- Entrepreneurship finalist

---

## 9. Contact (/contact)

- Contact form
- Social links
- CTA

---

# TRUST SECTION (IMPORTANT)

Create a section:

“Companies & Projects I’ve Contributed To”

Even if not explicit logos, represent:

- Government (Electoral systems)
- Financial systems
- Logistics platforms

---

# COMPONENTS

- Navbar
- Footer
- PageHeader
- MotionSection (Framer Motion)
- ProjectCard
- ServiceCard
- Timeline
- TechBadge
- CTASection

---

# UX/UI

- Modern, minimal, technical
- Smooth animations (Framer Motion)
- Scroll-based reveal
- Responsive

---

# I18N

- English (default)
- Spanish

All content from /data

---

# DATA-DRIVEN DESIGN

All CV content must be structured in JSON:

/data/profile.json
/data/experience.json
/data/projects.json
/data/services.json

---

# PERFORMANCE

- Lazy loading
- Dynamic imports
- Optimized images

---

# OUTPUT

- Full project structure
- Pages implemented
- Components reusable
- Data extracted from CV
- Documentation in /docs
