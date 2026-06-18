import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--hide-scrollbars']});
const p=await b.newPage();await p.setViewport({width:2000,height:980});
await p.goto('http://localhost:8765/index.html',{waitUntil:'networkidle0',timeout:60000});
await new Promise(r=>setTimeout(r,5000));
const el=await p.$('#top');await el.screenshot({path:'/tmp/real.png'});await b.close();console.log('ok');
