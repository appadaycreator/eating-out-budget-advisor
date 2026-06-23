const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 1366 } });
  
  // Open the service directly from the eating-out-budget-advisor directory
  await page.goto('http://localhost:8888/', { waitUntil: 'networkidle' });
  
  // Screenshot 1: Initial page
  await page.screenshot({ path: '/tmp/01_initial_page.png' });
  console.log('Screenshot 1: Initial page');
  
  // Get page content info
  const title = await page.title();
  const bodyText = await page.locator('body').textContent();
  
  await browser.close();
  process.exit(0);
})();
