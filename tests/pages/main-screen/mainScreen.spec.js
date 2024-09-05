// mainScreenTests.spec.js

const { test, expect } = require("@playwright/test");
const { getTranslations } = require("../../../src/utils/i18n");
const { getEventCountFromDatabase } = require("../../test-utils/firebaseFuncs");
const { checkButtonVisibility, checkSearchBar, checkEventCount, checkMapPins } = require("./visualTests");
const { locators } = require("./mainScreenLocators");

test.describe("visual tests - main screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  async function checkUI(page, language) {
    const translations = getTranslations(language);
    const eventCountInDatabase = await getEventCountFromDatabase();

    // Check filter buttons
    await checkButtonVisibility(page, locators.topicsButton, translations.topics);
    await checkButtonVisibility(page, locators.timeButton, translations.time);
    await checkButtonVisibility(page, locators.locationButton, translations.location);
    await checkButtonVisibility(page, locators.languageButton, translations.language);

    // Check the search bar
    await checkSearchBar(page, translations);

    // Check the number of events displayed
    await checkEventCount(page, eventCountInDatabase);

    // Switch to the map view and check the pins
    await checkButtonVisibility(page, locators.mapToggleButton, translations.map);
    await locators.mapToggleButton(page, translations).click();
    await checkMapPins(page, eventCountInDatabase);

    // Switch back to the list view
    await checkButtonVisibility(page, locators.mapToggleButton, translations.list);
  }

  test("Should have the correct texts and elements in Hebrew", async ({ page }) => {
    await checkUI(page, "he");
  });

  test("Should have the correct texts and elements in English", async ({ page }) => {
    await locators.languageToggleButton(page).click();
    await checkUI(page, "en");
  });
});
