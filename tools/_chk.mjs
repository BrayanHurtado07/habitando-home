import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
const p=await b.newPage();const errs=[];
p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error'&&!/404|favicon|lenis/i.test(m.text()))errs.push('CONSOLE: '+m.text());});
await p.goto('http://localhost:8765/index.html',{waitUntil:'networkidle0',timeout:60000});
await new Promise(r=>setTimeout(r,3000));
// recorrer a ambiente para inicializarlo
await p.evaluate(()=>document.querySelector('#ambiente').scrollIntoView());
await new Promise(r=>setTimeout(r,3000));
const n=await p.evaluate(()=>document.querySelectorAll('#ctelas .ctela').length);
console.log('telas en configurador:',n);
console.log('JS errors:',errs.length?errs.join(' | '):'NINGUNO');
await b.close();
