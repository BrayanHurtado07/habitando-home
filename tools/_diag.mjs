import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
const p=await b.newPage();await p.setViewport({width:2000,height:980});
await p.goto('http://localhost:8765/index.html',{waitUntil:'networkidle0',timeout:60000});
await new Promise(r=>setTimeout(r,5000));
const info=await p.evaluate(()=>{const mv=document.getElementById('heroViewer');const w=mv.parentElement;const r=mv.getBoundingClientRect();const wr=w.getBoundingClientRect();
return {loaded:mv.loaded,mv:{x:Math.round(r.x),w:Math.round(r.width),h:Math.round(r.height)},wrap:{x:Math.round(wr.x),w:Math.round(wr.width),h:Math.round(wr.height)},camOrbit:mv.getAttribute('camera-orbit'),target:mv.getAttribute('camera-target')};});
console.log(JSON.stringify(info));await b.close();
