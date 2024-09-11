// scenari1

import { test, expect } from "@playwright/test";
import { runVisualTests } from "../pages/main-screen/mainScreenTests.spec";
import { en } from "../../src/constants/En";
import { getTranslations } from "../../src/utils/i18n";
import { fetchTags, fetchOrFilterEventsByTags } from "../test-utils/firebaseFuncs";
import { checkButtonVisibility, checkEventCount } from "../pages/main-screen/mainScreenVisualTests";
import { checkDrawerOpens } from "../pages/main-screen/mainScreenFunctionalTests";
import { locators } from "../test-utils/locators";
import { hexToRgba } from "../test-utils/utils";
// import { runEventDetailsVisualTests } from "../pages/event-details/EventDetailsVisualTests.spec";

async function checkVisualDrawerCommonElements(page, language) {
  const translations = getTranslations(language);
  expect(await locators.closeButton(page)).toBeVisible();
  const clearButton = locators.clearButton(page);
  expect(clearButton).toBeVisible();
  expect(clearButton).toHaveText(translations.clear);
  const applyButton = locators.applyButton(page);
  expect(applyButton).toBeVisible();
  expect(applyButton).toHaveText(translations.apply);
}

async function checkVisualDrawerElements(page, filter, elements, language) {
  const drawer = locators.filterDrawer(page, filter);
  await checkVisualDrawerCommonElements(page, language);
  const lang = language === "en" ? "english" : "hebrew";
  for (const element of elements) {
    const elementLocator = drawer.getByTestId(`${filter}-button-${element.title.english.toLowerCase()}`);
    await checkButtonVisibility(elementLocator, element.title[lang]);
  }
}

async function verifyButtonColor(buttonLocator, expectedColor) {
  const backgroundColor = await buttonLocator.evaluate((button) => {
    return window.getComputedStyle(button).backgroundColor;
  });
  // console.log(`Button color for ${await buttonLocator.getAttribute("data-testid")}: `, backgroundColor);
  expect(backgroundColor).toBe(expectedColor);
}

async function selectAndVerifyButtonColor(page, filter, tag, color) {
  const selectedButton = locators.filterDrawer(page, filter).getByTestId(`${filter}-button-${tag}`);
  await selectedButton.click();
  // console.log(`Selected button for ${tag}: `, selectedButton);
  // console.log(`Color for ${tag}: `, color);
  await page.waitForTimeout(400);

  await verifyButtonColor(selectedButton, color);
}

test.use({ storageState: "google-session.json" });

test.describe("scenario number 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  const lang = "he";
  const language = lang === "en" ? "english" : "hebrew";
  let event;

  test("Complete scenario flow without refreshing the page", async ({ page }) => {
    // Step 1: User enters the web - all elements are visible
    await test.step("Display all elements on the main screen", async () => {
      await runVisualTests(page, lang);
    });

    // Step 2: User clicks on the topics filter button
    await test.step("Open drawer when topics filter button is clicked and all the elements in the drawer are visible", async () => {
      const tags = await fetchTags();
      const filter = en.topics.toLowerCase();
      await checkDrawerOpens(locators.filterButton(page, filter), locators.filterDrawer(page, filter));
      await checkVisualDrawerElements(page, filter, tags, lang);
    });

    // Step 3: User clicks on LGBT and Bible buttons
    await test.step("Select LGBT and Bible buttons and verify their colors", async () => {
      const filter = "topics";
      const tag1 = "lgbt";
      const tag2 = "bible";
      const selectedButtonColor = hexToRgba("#7863D8");

      await selectAndVerifyButtonColor(page, filter, tag1, selectedButtonColor);
      await selectAndVerifyButtonColor(page, filter, tag2, selectedButtonColor);
    });

    // Step 4: User clicks on the clear button
    await test.step("Buttons color should change back to default", async () => {
      const clearButton = locators.clearButton(page);
      await clearButton.click();
      await page.waitForTimeout(500);
      const defaultButtonColor = "rgba(0, 0, 0, 0)";
      const filter = "topics";
      const tag1 = "lgbt";
      const tag2 = "bible";

      const lgbtButton = locators.filterDrawer(page, filter).getByTestId(`${filter}-button-${tag1}`);
      const bibleButton = locators.filterDrawer(page, filter).getByTestId(`${filter}-button-${tag2}`);

      await verifyButtonColor(lgbtButton, defaultButtonColor);
      await verifyButtonColor(bibleButton, defaultButtonColor);
    });

    // Step 5: User clicks on Music and Family buttons
    await test.step("Select Tables and Family buttons and verify their colors", async () => {
      const filter = "topics";
      const tag1 = "music";
      const tag2 = "family";
      const selectedButtonColor = hexToRgba("#7863D8");

      await selectAndVerifyButtonColor(page, filter, tag1, selectedButtonColor);
      await selectAndVerifyButtonColor(page, filter, tag2, selectedButtonColor);
    });

    // step 6: User clicks on the apply button
    await test.step("Drawer should be closed and only the events that fit the filter applied should be displayed", async () => {
      const tag1 = "music";
      const tag2 = "family";

      // Close the drawer and check that it is closed
      const applyButton = locators.applyButton(page);
      await applyButton.click();
      await page.waitForTimeout(500);
      expect(await locators.filterDrawer(page, "topics")).not.toBeVisible();

      // Check that only the events that fit the filter are displayed
      const resultDB = await fetchOrFilterEventsByTags([tag1, tag2]);
      const eventCards = await locators.eventCards(page);
      await expect(eventCards).toHaveCount(resultDB.length);

      for (const event of resultDB) {
        let lecturerName = event.lecturer.name[language].toLowerCase();
        let nameFound = false;
        for (let i = 0; i < resultDB.length; i++) {
          const eventCard = eventCards.nth(i);
          const cardText = await eventCard.innerText();
          if (cardText.toLowerCase().includes(lecturerName.toLowerCase())) {
            nameFound = true;
            break;
          }
        }
        expect(nameFound).toBeTruthy();
      }
    });

    // Step 7: User clicks on the card of the first event
    await test.step("Click on the card of the first event and check that the event details are displayed", async () => {
      const eventCards = await locators.eventCards(page);
      const eventCard = eventCards.nth(0);
      await eventCard.click();
      await page.waitForTimeout(500);
      //Find in the ui the lecturer name and the title of the event
      //here:
      // const lecturerName = here function to get the lecturer name from the ui;
      // const title = here function to get the title of the event from the ui;
      //locate the event object from the resultDB by the lecturer name and the title

      const lecturerAndTitle = await page.locator("p.MuiTypography-body1").first().innerText();
      const [lecturerName, title] = lecturerAndTitle.split(" - ");
      console.log("lecturerName: ", lecturerName);
      console.log("title: ", title);
      const resultDB = await fetchOrFilterEventsByTags();
      const event = resultDB.find(
        (e) =>
          e.lecturer.name[language].toLowerCase() === lecturerName.trim().toLowerCase() &&
          e.title[language].toLowerCase() === title.trim().toLowerCase(),
      );
      expect(event).not.toBeUndefined();
      console.log("event: ", event);
      // await runEventDetailsVisualTests(page, lang, event);
      // });

      // Step 8: User clicks on the 'Add to Calendar' button
      // await test.step("Click on 'Add to Calendar' and check that Google Calendar opens with correct details from the database", async () => {
      const addToCalendarButton = page.locator("button:has-text('הוספה ליומן')");

      const [newPage] = await Promise.all([page.waitForEvent("popup"), await addToCalendarButton.click()]);

      await newPage.waitForLoadState("load");

      const url = newPage.url();

      expect(url).toContain("https://calendar.google.com/calendar/u/0/r/eventedit");

      const urlParams = new URLSearchParams(url.split("?")[1]);

      const titleEvent = decodeURIComponent(urlParams.get("text"));
      const details = decodeURIComponent(urlParams.get("details"));
      const location = decodeURIComponent(urlParams.get("location"));

      expect(titleEvent).toBe(event.title[language]);
      expect(details).toBe(event.description[language]);
      expect(location).toBe(`${event.address.street[language]} ${event.address.number}, ${event.address.city[language]}`);
    });
  });
});
