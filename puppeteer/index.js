const puppeteerFirefox = require('puppeteer');

(async () => {
  const browser = await puppeteerFirefox.launch({headless:false, product: 'firefox', });
  const page = await browser.newPage();
  await page.goto('https://chercher.tech');
  await page.screenshot({path: 'chercher-tech.png'});
  await browser.close();
})();