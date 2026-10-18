// § playtest: packs index.html and every module under src/ into one HTML
// file, for the private playtest Artifact (D-073). Not part of the game: the
// game itself has no build step. No dependencies.
//
//   node tools/playtest.js out.html          the game as players see it
//   node tools/playtest.js --dev out.html    dev mode starts on
//
// Each module becomes a function that returns its exports, in dependency
// order. It handles only the forms the code uses: `import { a, b as c } from
// './x.js'`, `export const` and `export function`. Anything else stops it.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRY = 'src/main.js';
const TAG = `<script type="module" src="${ENTRY}"></script>`;
const DEV_KEY = 'gloamdeep-dev'; // the key src/dev/dev.js keeps its switches under

// § modules: read each file once, deps before the files that use them
const IMPORT = /^import\s*\{([^}]*)\}\s*from\s*'([^']+)';?[ \t]*$/gm;
const order = [];
const seen = new Set();
function visit(file, path = []) {
  if (path.includes(file)) throw new Error(`circular import: ${[...path, file].join(' → ')}`);
  if (seen.has(file)) return;
  seen.add(file);
  const text = readFileSync(join(ROOT, file), 'utf8');
  const imports = [...text.matchAll(IMPORT)].map(([line, names, from]) => ({
    line, names, file: normalize(join(dirname(file), from)).split('\\').join('/'),
  }));
  for (const dep of imports) visit(dep.file, [...path, file]);
  order.push({ file, text, imports });
}

// § wrap: one module as `__gd['src/x.js'] = (() => { …; return { … }; })();`
function wrap({ file, text, imports }) {
  let body = text;
  for (const { line, names, file: dep } of imports) {
    const fields = names.split(',').map((n) => n.trim()).filter(Boolean)
      .map((n) => n.replace(/^(\w+)\s+as\s+(\w+)$/, '$1: $2')).join(', ');
    body = body.replace(line, `const { ${fields} } = __gd['${dep}'];`);
  }
  const exported = [];
  body = body.replace(/^export\s+(const|function)\s+(\w+)/gm, (_, kind, name) => {
    exported.push(name);
    return `${kind} ${name}`;
  });
  const left = body.match(/^\s*(import|export)\b.*$/m);
  if (left) throw new Error(`${file}: can't pack this line: ${left[0].trim()}`);
  return `__gd['${file}'] = (() => {\n${body}\nreturn { ${exported.join(', ')} };\n})();`;
}

// § page: swap the module tag for the packed code
const args = process.argv.slice(2);
const dev = args.includes('--dev');
const out = args.find((a) => !a.startsWith('--'));
if (!out) {
  console.error('usage: node tools/playtest.js [--dev] out.html');
  process.exit(1);
}
const page = readFileSync(join(ROOT, 'index.html'), 'utf8');
if (!page.includes(TAG)) throw new Error(`index.html has no ${TAG}`);
visit(ENTRY);
const devOn = dev
  ? `<script>try { if (!localStorage.getItem('${DEV_KEY}')) localStorage.setItem('${DEV_KEY}', '{}'); } catch { /* dev stays off */ }</script>\n`
  : '';
const code = `${devOn}<script type="module">\nconst __gd = {};\n${order.map(wrap).join('\n')}\n</script>`;
writeFileSync(out, page.replace(TAG, () => code));
console.log(`playtest: ${order.length} modules → ${out}${dev ? ' (dev on)' : ''}`);
