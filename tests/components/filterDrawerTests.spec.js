// // filterDrawerTests.spec.js
// import { test } from "@playwright/test";
// import {
//   checkDrawerOpens,
//   checkDrawerElements,
//   checkDrawerResetState,
//   checkButtonClicked,
//   checkCheckboxClicked,
//   checkApplyAndClose,
// } from "./drawerFuncs";
// import { locators } from "../test-utils/locators";

// test.describe("Filter Drawer Tests", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000/");
//   });

//   test("Should open and display all elements for filters drawer", async ({ page }) => {
//     // const filter = "location";
//     // const elements = ["TelAviv", "RestOfTheWorld"];

//     await checkDrawerOpens(page, filter);
//     // await checkVisualDrawerElements(page, filter, elements);
//     // await checkDrawerResetState(page, filter, elements);
//   });

//   //   test("Should mark Tel Aviv as selected when clicked", async ({ page }) => {
//   //     const filter = "location";
//   //     const item = "TelAviv";

//   //     await checkButtonClicked(page, filter, item);
//   //   });

//   //   test('Should select all countries when "Rest of the World" checkbox is checked', async ({ page }) => {
//   //     const filter = "location";
//   //     const item = "RestOfTheWorld";

//   //     await checkCheckboxClicked(page, filter, item);
//   //   });

//   //   test("Should apply selection and close drawer", async ({ page }) => {
//   //     const filter = "location";

//   //     await checkApplyAndClose(page, filter);
//   //   });
// });
