const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  try {
    // Attempt to click the StackAdapt campaign dropdown/tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const stackBtn = buttons.find(b => b.textContent && b.textContent.includes('StackAdapt'));
      if(stackBtn) stackBtn.click();
    });
    
    await new Promise(r => setTimeout(r, 1000));
  } catch(e) {
    console.log(e);
  }
  
  await browser.close();
})();
