import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
for(const page of ['index.html','telas.html']){
  const p=await b.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/404|favicon|lenis/i.test(m.text()))errs.push(m.text());});
  await p.goto('http://localhost:8765/'+page,{waitUntil:'networkidle0',timeout:60000});
  await new Promise(r=>setTimeout(r,2500));
  console.log(page, errs.length?('ERRORS: '+errs.join(' | ')):'OK sin errores');
  await p.close();
}
await b.close();
