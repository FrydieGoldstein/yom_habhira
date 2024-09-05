// const { test, expect } = require("@playwright/test");
// const { getTranslations } = require("../../../src/utils/i18n");
// const { getEventCountFromDatabase } = require("../../test-utils/firebaseFuncs");

// test.describe("visual tests - main screen", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000/");
//   });

//   async function checkButton(page, name, text) {
//     const button = await page.getByRole("button", { name });
//     await expect(button).toBeVisible();
//     await expect(button).toHaveText(text);
//   }

//   async function checkUI(page, language) {
//     const translations = getTranslations(language);

//     await expect(page).toHaveTitle("Yom Habhira Events");

//     const search = await page.getByPlaceholder(translations.searchPlaceholder);
//     await expect(search).toBeVisible();
//     await search.fill("test");
//     await expect(search).toHaveValue("test");
//     await search.clear();

//     await checkButton(page, "topics filter button", translations.topics);
//     await checkButton(page, "time filter button", translations.time);
//     await checkButton(page, "location filter button", translations.location);
//     await checkButton(page, "language filter button", translations.language);

//     const eventCountInDatabase = await getEventCountFromDatabase();

//     await expect(page.getByLabel("event card")).toHaveCount(eventCountInDatabase);

//     await checkButton(page, "map toggle", translations.map);
//     await page.getByRole("button", { name: "map toggle" }).click();
//     await checkButton(page, "map toggle", translations.list);

//     await page.waitForFunction(() => window.google && window.google.maps);
//     //wait for  map to load
//     // await page.waitForTimeout(5000);
//     await expect(page.locator('[title="map-pin"]')).toHaveCount(eventCountInDatabase);
//     // await expect(page.locator('img[src="/assets/map-point.png"]')).toHaveCount(eventCountInDatabase);
//     // await page.getByRole("button", { name: "map toggle" }).click();
//   }

//   test("Should have the correct texts and elements in Hebrew", async ({ page }) => {
//     await checkUI(page, "he");
//   });

//   test("Should have the correct texts and elements in English", async ({ page }) => {
//     await page.getByRole("button", { name: "language-toggle" }).click();
//     await checkUI(page, "en");
//   });
// });
