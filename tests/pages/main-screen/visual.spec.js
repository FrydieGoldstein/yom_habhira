const { test, expect } = require("@playwright/test");
const { getTranslations } = require("../../../src/utils/i18n");

test.describe("visual tests - main screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  async function checkButton(page, name, text) {
    const button = await page.getByRole("button", { name });
    await expect(button).toBeVisible();
    await expect(button).toHaveText(text);
  }

  async function checkUI(page, language) {
    const translations = getTranslations(language);

    await expect(page).toHaveTitle("Yom Habhira Events");
    await expect(page.getByPlaceholder(translations.searchPlaceholder)).toBeVisible();

    await checkButton(page, "topics filter button", translations.topics);
    await checkButton(page, "time filter button", translations.time);
    await checkButton(page, "location filter button", translations.location);
    await checkButton(page, "language filter button", translations.language);

    await expect(page.getByRole("button", { name: "map toggle" })).toBeVisible();
  }

  test("Should have the correct title and elements in Hebrew", async ({ page }) => {
    await checkUI(page, "he");
  });

  test("Should have the correct title and elements in English", async ({ page }) => {
    await page.getByRole("button", { name: "language-toggle" }).click();
    await checkUI(page, "en");
  });
});

//   // await page.getByRole("button", { name: "מפה" }).click();
