const puppeteerFirefox = require('puppeteer');
const iPhone = puppeteerFirefox.devices['iPhone 6'];

(async () => {
  const browser = await puppeteerFirefox.launch({
    headless:false,
    product: 'firefox',
    // devtools: true,
    // defaultViewport: {
    //   width: 375,
    //   height: 667,
    //   isMobile: true,
    // },
  });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');
  await page.emulate(iPhone);
  // await page.screenshot({path: 'chercher-tech.png'});
  // await browser.close();
})();