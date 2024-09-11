// mainScreenFunctionalTests.js

import { expect } from "@playwright/test";
import { locators } from "../../test-utils/locators";

async function checkDrawerOpens(buttonLocator, drawerLocator) {
  const button = await buttonLocator;
  await button.click();
  const drawer = await drawerLocator;
  // await drawer.waitFor({ state: "visible" });
  await expect(drawer).toBeVisible();
}

// async function checkFilterEvents(page, filterButtonLocator, filterOption, expectedCount) {
//   const button = await filterButtonLocator(page);
//   await button.click();

//   // Select a filter option (you may need to adjust the selector)
//   await page.getByRole("button", { name: filterOption }).click();
//   await page.getByRole("button", { name: "Apply" }).click();

//   // Check that the number of events is filtered correctly
//   const filteredEventCount = await page.locator('[aria-label="event card"]').count();
//   expect(filteredEventCount).toBeLessThanOrEqual(expectedCount);
// }

// async function checkSearchFilter(page, searchQuery, expectedCount) {
//   const searchInput = await locators.searchInput(page);
//   await searchInput.fill(searchQuery);

//   const filteredEventCount = await page.locator('[aria-label="event card"]').count();
//   expect(filteredEventCount).toBeLessThanOrEqual(expectedCount);
// }

// async function checkAppReset(page, totalEventsCount) {
//   await locators.logo(page).click();

//   // Check that the search bar is cleared
//   const searchInput = await locators.searchInput(page);
//   await expect(searchInput).toHaveValue("");

//   // Check that all events are displayed again
//   const resetEventCount = await page.locator('[aria-label="event card"]').count();
//   expect(resetEventCount).toBe(totalEventsCount);
// }

export {
  checkDrawerOpens,
  // checkFilterEvents, checkSearchFilter, checkAppReset
};

// // mainScreenFunctionalTests.spec.js

// const { test, expect } = require("@playwright/test");
// const { getTranslations } = require("../../../src/utils/i18n");
// const { getEventCountFromDatabase } = require("../../test-utils/firebaseFuncs");
// const { locators } = require("./mainScreenLocators");

// // Function to wait for the drawer to be visible
// async function waitForDrawer(page) {
//   await expect(page.locator('[role="dialog"]')).toBeVisible();
// }

// test.describe("functional tests - main screen", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000/");
//   });

//   test("Should open drawer when filter buttons are clicked", async ({ page }) => {
//     const translations = getTranslations("he");

//     // Click on "Topics" filter button and check if the drawer opens
//     await locators.topicsButton(page).click();
//     await waitForDrawer(page);

//     // Close the drawer
//     await page.locator('[aria-label="close"]').click();

//     // Click on "Time" filter button and check if the drawer opens
//     await locators.timeButton(page).click();
//     await waitForDrawer(page);

//     // Close the drawer
//     await page.locator('[aria-label="close"]').click();

//     // Click on "Location" filter button and check if the drawer opens
//     await locators.locationButton(page).click();
//     await waitForDrawer(page);

//     // Close the drawer
//     await page.locator('[aria-label="close"]').click();
//   });

//   test("Should filter events based on selected filter criteria", async ({ page }) => {
//     // Fetch the total number of events from the database
//     const totalEvents = await getEventCountFromDatabase();

//     // Click on the "Time" filter button
//     await locators.timeButton(page).click();

//     // Select the first available time slot (for example purposes)
//     await page.getByRole("button", { name: "Morning" }).click(); // Adjust this to match your filter values
//     await page.getByRole("button", { name: "Apply" }).click();

//     // Ensure that the event count is now less than the total (meaning filtered)
//     const filteredEventCount = await page.locator('[aria-label="event card"]').count();
//     expect(filteredEventCount).toBeLessThan(totalEvents);
//   });

//   test("Should filter events based on search input", async ({ page }) => {
//     // Fetch total number of events from database
//     const totalEvents = await getEventCountFromDatabase();

//     // Type in search input (e.g., "test") to filter events
//     const searchInput = await locators.searchInput(page, getTranslations("he"));
//     await searchInput.fill("specific event name"); // Adjust this with an event name that exists in the database

//     // Check that the number of events has been filtered
//     const filteredEventCount = await page.locator('[aria-label="event card"]').count();
//     expect(filteredEventCount).toBeLessThan(totalEvents);
//   });

//   test("Should reset the app to initial state when logo is clicked", async ({ page }) => {
//     const translations = getTranslations("he");
//     const totalEvents = await getEventCountFromDatabase();

//     // Apply a filter to change the state of the app
//     await locators.timeButton(page).click();
//     await page.getByRole("button", { name: "Morning" }).click(); // Adjust as necessary
//     await page.getByRole("button", { name: "Apply" }).click();

//     // Verify that events are filtered
//     const filteredEventCount = await page.locator('[aria-label="event card"]').count();
//     expect(filteredEventCount).toBeLessThan(totalEvents);

//     // Click the logo to reset the app
//     await locators.logo(page).click();

//     // Check that the event count is reset to the original value (no filters)
//     const resetEventCount = await page.locator('[aria-label="event card"]').count();
//     expect(resetEventCount).toBe(totalEvents);

//     // Ensure the search input is cleared
//     const searchInput = await locators.searchInput(page, translations);
//     await expect(searchInput).toHaveValue("");
//   });
// });
