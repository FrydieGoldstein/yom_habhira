//drawerFuncs.js

import { locators } from "../test-utils/locators";

async function checkDrawerOpens(page, filter) {
  const filterButton = locators.filterButton(page, filter);
  const filterDrawer = locators.filterDrawer(page, filter);

  await filterButton.click();
  expect(filterDrawer).toBeVisible();
}

async function checkVisualDrawerElements(page, filter, elements = []) {
  await locators.closeButton(page).toBeVisible();
  await locators.clearButton(page).toBeVisible();
  //   for (const element of elements) {
  //     const checkbox = locators.checkbox(page, element);
  //     expect(checkbox).toBeVisible();
  //   }
  for (const element of elements) {
    const elementLocator = locators.selectionButton(page, filter, element);
    expect(elementLocator).toBeVisible();
  }
  await locators.applyButton(page).toBeVisible();
}

export { checkDrawerOpens, checkVisualDrawerElements };
