const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 1366 } });
  
  await page.goto('http://localhost:8888/', { waitUntil: 'networkidle' });
  
  // Auto answer all questions
  for (let qIdx = 0; qIdx < 8; qIdx++) {
    const option = await page.locator('.w-full.text-left').first();
    if (await option.isVisible()) {
      await option.click();
      await page.waitForTimeout(200);
    }
    
    if (qIdx < 7) {
      const nextBtn = await page.locator('button:has-text("次へ")').first();
      await nextBtn.click();
      await page.waitForTimeout(300);
    }
  }
  
  // Final click to show result
  const nextBtn = await page.locator('button:has-text("次へ")').first();
  if (await nextBtn.isVisible()) {
    await nextBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Screenshot of result
  await page.screenshot({ path: '/tmp/result_full.png' });
  
  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/result_full_scroll1.png' });
  
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/result_full_scroll2.png' });
  
  // Mobile view
  const page2 = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page2.goto('http://localhost:8888/', { waitUntil: 'networkidle' });
  
  // Auto answer mobile
  for (let qIdx = 0; qIdx < 8; qIdx++) {
    const option = await page2.locator('.w-full.text-left').first();
    if (await option.isVisible()) {
      await option.click();
      await page2.waitForTimeout(200);
    }
    
    if (qIdx < 7) {
      const nextBtn = await page2.locator('button:has-text("次へ")').first();
      await nextBtn.click();
      await page2.waitForTimeout(300);
    }
  }
  
  const nextBtn2 = await page2.locator('button:has-text("次へ")').first();
  if (await nextBtn2.isVisible()) {
    await nextBtn2.click();
    await page2.waitForTimeout(500);
  }
  
  await page2.screenshot({ path: '/tmp/mobile_result.png' });

  await browser.close();
  process.exit(0);
})();
