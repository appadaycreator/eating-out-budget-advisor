const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 1366 } });
  
  // Open the service
  await page.goto('http://localhost:8888/', { waitUntil: 'networkidle' });
  
  // Answer Q1: 月の食費予算
  const btn1 = await page.locator('button:has-text("2万円未満")').first();
  await btn1.click();
  await page.waitForTimeout(300);
  
  // Take screenshot of Q2
  const nextBtn1 = await page.locator('button:has-text("次へ")').first();
  await nextBtn1.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/02_q2.png' });
  
  // Answer Q2: 月の外食回数
  const btn2 = await page.locator('button:has-text("5~10回")').first();
  if (await btn2.isVisible()) {
    await btn2.click();
    await page.waitForTimeout(300);
  }
  
  const nextBtn2 = await page.locator('button:has-text("次へ")').first();
  await nextBtn2.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/03_q3.png' });
  
  // Answer remaining questions
  const btn3 = await page.locator('button:has-text("4人")').first();
  if (await btn3.isVisible()) {
    await btn3.click();
    await page.waitForTimeout(300);
  }
  
  const nextBtn3 = await page.locator('button:has-text("次へ")').first();
  await nextBtn3.click();
  await page.waitForTimeout(500);
  
  // Q4
  const btn4 = await page.locator('button:has-text("毎日")').first();
  if (await btn4.isVisible()) {
    await btn4.click();
    await page.waitForTimeout(300);
  }
  
  const nextBtn4 = await page.locator('button:has-text("次へ")').first();
  await nextBtn4.click();
  await page.waitForTimeout(500);
  
  // Take screenshot of result page
  await page.screenshot({ path: '/tmp/04_result.png' });
  
  // Scroll down to see full result
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/05_result_scroll.png' });
  
  await browser.close();
  process.exit(0);
})();
