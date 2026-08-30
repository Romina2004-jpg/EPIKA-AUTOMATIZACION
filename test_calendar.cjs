const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Click the calendar button to open the picker
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const calBtn = buttons.find(b => b.textContent.includes('Semana Actual'));
    if(calBtn) calBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click "Ultimos 14 dias" preset
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const pBtn = buttons.find(b => b.textContent.includes('14'));
    if(pBtn) pBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
