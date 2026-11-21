// Post-build: generates one static HTML per public route so crawlers receive the right
// <title>, description, canonical and visible text BEFORE running any JavaScript.
// React still mounts on #root and replaces the placeholder content.
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://freakjazz.com';

// Crawlers read this text, visitors never see it (no flash of unstyled HTML before React mounts).
// Not display:none, so search engines still treat it as real content.
const HIDDEN =
  'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const ROUTES = [
  {
    path: 'about',
    title: 'Sobre Jazmin Rodriguez | Historia, Trayectoria y Stack Tecnológico',
    description:
      'Conoce a Jazmin Rodriguez, ingeniera de software en Quito, Ecuador: su historia profesional, trayectoria, stack tecnológico, formación, idiomas e intereses fuera del código.',
    h1: 'Sobre mí',
    text: 'Jazmin Rodriguez, ingeniera de software en Quito, Ecuador. Historia profesional, trayectoria, stack tecnológico, formación, idiomas e intereses fuera del código.',
  },
  {
    path: 'projects',
    title: 'Proyectos y casos de estudio | Jazmin Rodriguez',
    description:
      'Casos de estudio de software financiero, sistemas públicos, IA generativa y geolocalización, más proyectos de código abierto en GitHub. Senior Software Engineer, Ecuador.',
    h1: 'Proyectos',
    text: 'Productos comerciales como Geodecodify y Murildental, casos de estudio de plataformas financieras, sistemas públicos, IA generativa y geolocalización, y proyectos de código abierto en GitHub.',
  },
  {
    path: 'contact-us',
    title: 'Contactar a Jazmin Rodriguez | Senior Software Engineer',
    description:
      'Cuéntame sobre tu proyecto de software. Desarrollo full stack, arquitectura de software, microservicios e IA generativa. Disponible para consultoría y desarrollo.',
    h1: '¿Listo para Construir Algo Increíble?',
    text: 'Cuéntame sobre tu proyecto de software: desarrollo full stack, arquitectura, microservicios e IA generativa.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${key} not found in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

// Home: keep index.html as is, but give crawlers visible text before JS runs.
// Preload the hero image (desktop / mobile) so it starts downloading before the JS finishes.
const config = fs.readFileSync(path.resolve('src/global-config.ts'), 'utf8');
const imageUrl = (key) =>
  config.match(new RegExp(key + String.raw`:\s*(?:import\.meta\.env\.\w+ \?\?\s*)?'([^']+)'`))?.[1];
const heroDesktop = imageUrl('hero');
const heroMobile = imageUrl('heroMobile');
const attr = (url) => url.replace(/&/g, '&amp;');
const preloads = [
  heroMobile &&
    '<link rel="preload" as="image" href="' + attr(heroMobile) + '" media="(max-width: 899px)" fetchpriority="high" />',
  heroDesktop &&
    '<link rel="preload" as="image" href="' + attr(heroDesktop) + '" media="(min-width: 900px)" fetchpriority="high" />',
]
  .filter(Boolean)
  .join('\n    ');

const homeHtml = template.replace('</head>', `    ${preloads}\n  </head>`).replace(
  '<div id="root"></div>',
  `<div id="root"><main style="${HIDDEN}"><h1>Jazmin Rodriguez</h1><p>Senior Software Engineer: .NET, Python, React, IA generativa y agentes LLM, microservicios y arquitectura de software. Quito, Ecuador.</p><nav><a href="/about">Sobre mí</a> <a href="/projects">Proyectos</a> <a href="/contact-us">Contacto</a></nav></main></div>`
);
fs.writeFileSync(path.join(dist, 'index.html'), homeHtml);
console.log('prerendered /');

for (const r of ROUTES) {
  const url = `${BASE}/${r.path}`;
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`);
  html = setMeta(html, 'name', 'title', r.title);
  html = setMeta(html, 'name', 'description', r.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', r.title);
  html = setMeta(html, 'property', 'og:description', r.description);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = setMeta(html, 'name', 'twitter:title', r.title);
  html = setMeta(html, 'name', 'twitter:description', r.description);

  html = html.replace(
    '</head>',
    `    <link rel="canonical" href="${url}" data-rh="true" />\n  </head>`
  );

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><main style="${HIDDEN}"><h1>${esc(r.h1)}</h1><p>${esc(r.text)}</p><nav><a href="/">Inicio</a> <a href="/about">Sobre mí</a> <a href="/projects">Proyectos</a> <a href="/contact-us">Contacto</a></nav></main></div>`
  );

  const dir = path.join(dist, r.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`prerendered /${r.path}`);
}
