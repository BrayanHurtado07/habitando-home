import puppeteer from 'puppeteer-core';

const URL = process.argv[2] || 'http://localhost:8765/tools/_preview.html';
const OUT = process.argv[3] || '/tmp/sofa_preview.png';
const W = +(process.argv[4] || 760), H = +(process.argv[5] || 760);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [
    '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--no-sandbox', '--hide-scrollbars',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

// Espera a que todos los <model-viewer> disparen 'load' (o timeout suave)
await page.evaluate(() => {
  const mvs = [...document.querySelectorAll('model-viewer')];
  return Promise.all(mvs.map(mv => mv.loaded ? Promise.resolve()
    : new Promise(res => { mv.addEventListener('load', res, { once: true }); setTimeout(res, 20000); })));
});
await new Promise(r => setTimeout(r, 1500)); // breve margen para el primer frame
await page.screenshot({ path: OUT });
await browser.close();
console.log('shot →', OUT);
