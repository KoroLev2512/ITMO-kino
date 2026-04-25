/**
 * react-snap uses Puppeteer/Chromium and fails on Vercel (missing libnss3, etc.).
 * Vercel sets VERCEL=1 during build — skip prerender there; static CRA build is enough.
 */
const { execSync } = require('child_process');
const path = require('path');

if (process.env.VERCEL || process.env.SKIP_REACT_SNAP === '1') {
  console.log('Skipping react-snap (unsupported on this environment).');
  process.exit(0);
}

execSync('npx react-snap', {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});
