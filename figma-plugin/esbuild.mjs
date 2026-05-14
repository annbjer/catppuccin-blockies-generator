import * as esbuild from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const watch = process.argv.includes('--watch');

async function buildUi() {
  const result = await esbuild.build({
    entryPoints: ['src/ui.ts'],
    bundle: true,
    format: 'iife',
    target: 'es2020',
    write: false,
    minify: false,
  });

  const html = await readFile('src/ui.html', 'utf8');
  const js = result.outputFiles[0].text;

  await mkdir('dist', { recursive: true });
  await writeFile('dist/ui.html', html.replace('<!-- UI_SCRIPT -->', `<script>\n${js}\n</script>`));
}

async function buildAll() {
  await mkdir('dist', { recursive: true });

  await esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    format: 'iife',
    target: 'es2020',
    minify: false,
  });

  await buildUi();
}

if (watch) {
  const mainContext = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/main.js',
    format: 'iife',
    target: 'es2020',
    minify: false,
  });

  await mainContext.watch();
  await buildUi();
  console.log('Watching figma-plugin sources...');
} else {
  await buildAll();
}
