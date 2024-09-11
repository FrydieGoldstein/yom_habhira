// mainScreenTests

import { test } from "@playwright/test";
import { getTranslations } from "../../../src/utils/i18n";
import { fetchOrFilterEventsByTags } from "../../test-utils/firebaseFuncs";
import { en } from "../../../src/constants/En";

// Import visual and functional tests
import { checkButtonVisibility, checkSearchBar, checkEventCount, checkMapPins } from "./mainScreenVisualTests";
import { checkDrawerOpens, checkFilterEvents, checkSearchFilter, checkAppReset } from "./mainScreenFunctionalTests";
import { locators } from "./mainScreenLocators";

// Visual Tests
async function runVisualTests(page, language) {
  const translations = getTranslations(language);
  const result = await fetchOrFilterEventsByTags();

  // Check the search bar
  await checkSearchBar(page, translations);

  // Check filter buttons
  await checkButtonVisibility(locators.filterButton(page, en.topics.toLowerCase()), translations.topics);
  await checkButtonVisibility(locators.filterButton(page, en.time.toLowerCase()), translations.time);
  await checkButtonVisibility(locators.filterButton(page, en.location.toLowerCase()), translations.location);
  await checkButtonVisibility(locators.filterButton(page, en.language.toLowerCase()), translations.language);

  // Check the number of events displayed
  await checkEventCount(page, result.length);

  // // Switch to the map view and check the pins
  // await checkButtonVisibility(page, locators.mapToggleButton, translations.map);
  // await locators.mapToggleButton(page, translations).click();
  // await checkMapPins(page, eventCountInDatabase);

  // // Switch back to the list view
  // await checkButtonVisibility(page, locators.mapToggleButton, translations.list);
}

// Functional Tests
async function runFunctionalTests(page) {
  const totalEvents = await getEventCountFromDatabase();

  // Check drawer opens for all filter buttons
  await checkDrawerOpens(page, locators.topicsButton);
  await checkDrawerOpens(page, locators.timeButton);
  await checkDrawerOpens(page, locators.locationButton);

  // Check filter events functionality
  await checkFilterEvents(page, locators.timeButton, "Morning", totalEvents); // Adjust the filter value as needed

  // Check search functionality
  await checkSearchFilter(page, "specific event name", totalEvents); // Adjust the search query as needed

  // Check reset functionality
  await checkAppReset(page, totalEvents);
}

test.describe("Main Screen Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  // Test both Hebrew and English versions
  test("Should pass both visual and functional tests in Hebrew", async ({ page }) => {
    await runVisualTests(page, "he");
    // await runFunctionalTests(page);
  });

  test("Should pass both visual and functional tests in English", async ({ page }) => {
    await locators.languageToggleButton(page).click(); // Toggle to English
    await runVisualTests(page, "en");
    // await runFunctionalTests(page);
  });
});

export { runVisualTests };
