// Builds src/components/iconify/generated-icons.json: ONLY the icons this app actually uses,
// instead of bundling the complete solar / mdi / devicon / circle-flags / game-icons collections
// (~20 MB of JSON). Runs automatically before `dev` and `build` (see package.json).
//
// It scans the source for literal names like 'solar:home-angle-bold-duotone' and also expands
// the country flags used by the phone selector (circle-flags:<iso>).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const SRC = path.resolve('src');
const OUTPUT = path.join(SRC, 'components', 'iconify', 'generated-icons.json');
const PREFIXES = ['solar', 'mdi', 'devicon', 'circle-flags', 'game-icons'];

// ---------------------------------------------------------------- scan source
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
})(SRC);

const names = new Map(PREFIXES.map((prefix) => [prefix, new Set()]));
const literal = new RegExp(`['"\`](${PREFIXES.join('|')}):([a-z0-9]+(?:-[a-z0-9]+)*)['"\`]`, 'g');

for (const file of files) {
  if (file.endsWith('icon-sets.ts') || file.endsWith('generated-icons.json')) continue;
  const text = fs.readFileSync(file, 'utf8');

  for (const match of text.matchAll(literal)) {
    names.get(match[1]).add(match[2]);
  }

  // Phone selector flags are built dynamically: circle-flags:${iso.toLowerCase()}
  if (file.endsWith('phone-field.tsx')) {
    for (const match of text.matchAll(/iso:\s*'([A-Z]{2})'/g)) {
      names.get('circle-flags').add(match[1].toLowerCase());
    }
  }
}

// ---------------------------------------------------------------- build subsets
const subsets = [];
let total = 0;
const missing = [];

for (const prefix of PREFIXES) {
  const used = [...names.get(prefix)].sort();
  if (used.length === 0) continue;

  const collection = require(`@iconify/json/json/${prefix}.json`);
  const icons = {};
  const aliases = {};

  for (const name of used) {
    if (collection.icons[name]) {
      icons[name] = collection.icons[name];
    } else if (collection.aliases?.[name]) {
      const alias = collection.aliases[name];
      aliases[name] = alias;
      if (collection.icons[alias.parent]) icons[alias.parent] = collection.icons[alias.parent];
    } else {
      missing.push(`${prefix}:${name}`);
    }
  }

  total += Object.keys(icons).length + Object.keys(aliases).length;
  subsets.push({
    prefix,
    icons,
    ...(Object.keys(aliases).length ? { aliases } : {}),
    ...(collection.width ? { width: collection.width } : {}),
    ...(collection.height ? { height: collection.height } : {}),
  });
}

fs.writeFileSync(OUTPUT, `${JSON.stringify(subsets)}\n`);

const kb = (fs.statSync(OUTPUT).size / 1024).toFixed(0);
console.log(`icons: ${total} used icons written (${kb} KB)`);
if (missing.length) console.warn(`icons: not found in collections -> ${missing.join(', ')}`);
