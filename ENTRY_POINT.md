# 🤖 AI Entry Point

This file is the main execution entry for AI agents.

You MUST follow the steps EXACTLY in the defined order.
Do NOT skip steps. Do NOT assume missing information.

---

# 🧠 PROJECT CONTEXT

This project is a **professional portfolio platform** for a Senior Software Engineer specialized in:

- Software Architecture
- Microservices & Distributed Systems
- Cloud & DevOps
- AI-assisted development
- Full Stack Engineering

The application is built using:

- React
- Clean Architecture principles
- Component-based design (pages / views / components / hooks)

---

# 📌 SOURCE OF TRUTH

All dynamic content MUST come from:

👉 `/docs/data/`

This includes:

- profile information
- experience
- projects
- services
- technologies
- achievements

⚠️ DO NOT hardcode business content inside components

---

# 🏗️ PROJECT STRUCTURE

You MUST understand the structure BEFORE making changes:

/pages → route entry points  
/views → page composition (UI orchestration)  
/components → reusable UI blocks  
/hooks → reusable logic  
/lib → utilities  
/docs → documentation and structured data

---

# 📥 REQUIRED READING ORDER

You MUST read files in this exact order:

1. `/docs/prompts/content.md`
2. Execute shortcut: `$prepare`
3. `/README.md`
4. Analyze full project structure
5. `/docs/**/*.md`
6. `/docs/data/**/*.json`

---

# ⚙️ WORKFLOW EXECUTION

- Follow ALL workflows defined in:
  `/docs/ai-development/workflows/`

- Treat workflows as **executable instructions**
- Do NOT improvise outside defined workflows

---

# 📊 DATA HANDLING RULES

- All UI content must be data-driven
- Data must be loaded from `/docs/data`
- Support multilingual structure (EN / ES)
- Ensure consistency between data and UI

---

# 🎯 DEVELOPMENT GOAL

Build and maintain a **multi-page professional portfolio** including:

- Home
- About
- Experience
- Projects
- Services
- Technologies
- Certifications
- Achievements
- Contact

---

# 🧩 UI/UX RULES

- Use reusable components
- Maintain consistent layout
- Apply modern UI patterns
- Use animations (Framer Motion when applicable)

---

# 📝 CODE STANDARDS

- All code MUST be in English
- All comments MUST be inline and in English
- Use clean, readable, maintainable code
- Follow separation of concerns strictly

---

# 🧹 CLEANUP RULE

The project must ONLY contain features relevant to the portfolio.

REMOVE:

- dashboards
- admin panels
- unused components
- dead code

DO NOT BREAK:

- build
- i18n
- theming
- layout system

---

# 📚 DOCUMENTATION RULE

Every action MUST be documented in:

/docs/

Minimum required:

- architecture-review.md
- cleanup-report.md
- implementation-notes.md

---

# ⚡ SHORTCUTS

After running `$prepare`, list ALL available shortcuts and explain them to the user.

---

# ❗ FINAL INSTRUCTION

Do NOT proceed with implementation until:

✔ Project structure is fully understood  
✔ Documentation is fully reviewed  
✔ Data sources are validated

Then proceed following workflows strictly.
