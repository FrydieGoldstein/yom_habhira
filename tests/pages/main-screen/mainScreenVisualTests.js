// mainScreenVisualTests.spec.js
import { test, expect } from "@playwright/test";
import { locators } from "../../test-utils/locators";

async function checkSearchBar(page, translations) {
  const searchBox = await locators.searchBox(page);
  await expect(searchBox).toBeVisible();
  const search = await locators.searchInput(page);
  await expect(search).toBeVisible();
  await expect(search).toHaveAttribute("placeholder", translations.searchPlaceholder);
  await expect(search).toHaveValue("");
  //הפקודות הבאות מתאימות לתרחישים או כאלב ולא פשוט לויזואליות של הדף הראשי במידה ולא עושים כלום -לטפל בהמשך
  // await search.fill("test");
  // await expect(search).toHaveValue("test");
  // await search.clear();
}

async function checkButtonVisibility(buttonLocator, text) {
  const button = await buttonLocator;
  await expect(button).toBeVisible();
  await expect(button).toHaveText(text);
}

async function checkEventCount(page, expectedCount) {
  const eventCards = await locators.eventCards(page);
  await expect(eventCards).toHaveCount(expectedCount);
}

async function checkMapPins(page, expectedCount) {
  const mapPins = await locators.mapPins(page);
  await expect(mapPins).toHaveCount(expectedCount);
}

export { checkButtonVisibility, checkSearchBar, checkEventCount, checkMapPins };
