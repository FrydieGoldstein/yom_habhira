import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://accounts.google.com/");

  await page.fill('input[type="email"]', "atfortesting@gmail.com");
  await page.click('button:has-text("Next")');
  await page.fill('input[type="password"]', "aft159aft");
  await page.click('button:has-text("Next")');

  await page.waitForNavigation();

  await page.context().storageState({ path: "google-session.json" });

  await browser.close();
})();
