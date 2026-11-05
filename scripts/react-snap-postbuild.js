/**
 * Prerender the CRA build with react-snap.
 *
 * - Vercel: skipped (VERCEL=1). Puppeteer can't launch Chromium there (missing libnss3 etc.),
 *   and the plain CRA build is served as-is.
 * - SKIP_REACT_SNAP=1: skipped explicitly.
 * - Otherwise a modern Chrome is required. react-snap ships puppeteer 1.20 with Chromium 78,
 *   which can't parse the bundle (optional chaining → "SyntaxError: Unexpected token '.'")
 *   and would snapshot an empty page. We point puppeteer at a system Chrome via
 *   PUPPETEER_EXECUTABLE_PATH (set it yourself to override) and skip if none is found.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

if (process.env.VERCEL || process.env.SKIP_REACT_SNAP === '1') {
  console.log('Skipping react-snap (unsupported on this environment).');
  process.exit(0);
}

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH || CHROME_CANDIDATES.find((p) => fs.existsSync(p));

if (!chromePath) {
  console.warn(
    'Skipping react-snap: no modern Chrome found (bundled Chromium 78 cannot run this app).\n' +
      'Install Chrome or set PUPPETEER_EXECUTABLE_PATH to prerender. The CRA build in build/ is still valid.'
  );
  process.exit(0);
}

console.log(`react-snap: using ${chromePath}`);
execSync('npx react-snap', {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
  env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: chromePath },
});
