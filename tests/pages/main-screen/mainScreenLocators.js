// mainScreenLocators.js

export const locators = {
  // Locator for the search input field
  searchInput: (page, translations) => page.getByPlaceholder(translations.searchPlaceholder),

  // Locators for the filter buttons
  topicsButton: (page) => page.getByRole("button", { name: "topics filter button" }),
  timeButton: (page) => page.getByRole("button", { name: "time filter button" }),
  locationButton: (page) => page.getByRole("button", { name: "location filter button" }),
  languageButton: (page) => page.getByRole("button", { name: "language filter button" }),

  // Locator for the map toggle button
  mapToggleButton: (page, translations) => page.getByRole("button", { name: "map toggle" }),

  // Locator for the event cards
  eventCards: (page) => page.getByLabel("event card"),

  // Locator for the map pins (markers)
  mapPins: (page) => page.locator('[title="map-pin"]'),

  // Locator for the language toggle button
  languageToggleButton: (page) => page.getByRole("button", { name: "language-toggle" }),
};
