// visualTests.js
const { test, expect } = require("@playwright/test");
const { locators } = require("./mainScreenLocators");

async function checkButtonVisibility(page, buttonLocator, text) {
  const button = await buttonLocator(page);
  await expect(button).toBeVisible();
  await expect(button).toHaveText(text);
}

async function checkSearchBar(page, translations) {
  const search = await locators.searchInput(page, translations);
  await expect(search).toBeVisible();
  await search.fill("test");
  await expect(search).toHaveValue("test");
  await search.clear();
}

async function checkEventCount(page, expectedCount) {
  const eventCards = await locators.eventCards(page);
  await expect(eventCards).toHaveCount(expectedCount);
}

async function checkMapPins(page, expectedCount) {
  const mapPins = await locators.mapPins(page);
  await expect(mapPins).toHaveCount(expectedCount);
}

module.exports = {
  checkButtonVisibility,
  checkSearchBar,
  checkEventCount,
  checkMapPins,
};
