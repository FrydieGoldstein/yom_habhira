// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click the get started link.
  // await page.getByRole("button", { name: "מפה" }).click();

  // await page.getByRole("button", { name: "נושאי שיחה" }).click();
  // await page.getByRole("button", { name: "מיקום" }).click();

  await page.getByRole("button", { name: "שפת הרצאה" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "זמן" }).click();
  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole("heading", { name: "" })).toBeVisible();
});
