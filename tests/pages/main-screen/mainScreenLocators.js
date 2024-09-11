// mainScreenLocators.js

export const locators = {
  // Locator for the search input field
  searchBox: (page) => page.getByTestId("search-box"),
  searchInput: (page) => page.getByTestId("search-input"),

  // Locators for the filter buttons
  // topicsButton: (page) => page.getByTestId("topics-filter-button"),
  // timeButton: (page) => page.getByTestId("time-filter-button"),
  // locationButton: (page) => page.getByTestId("location-filter-button"),
  // languageButton: (page) => page.getByTestId("language-filter-button"),

  // Locartoes for the filter button and drawer
  filterButton: (page, filter) => page.getByTestId(`${filter}-filter-button`),
  filterDrawer: (page, filter) => page.getByTestId(`${filter}-filter-drawer`),

  // // Locator for the map toggle button
  // mapToggleButton: (page, translations) => page.getByRole("button", { name: "map toggle" }),

  // // Locator for the event cards
  // eventCards: (page) => page.getByLabel("event card"),

  // // Locator for the map pins (markers)
  // mapPins: (page) => page.locator('[title="map-pin"]'),

  // Locator for the language toggle button
  languageToggleButton: (page) => page.getByRole("button", { name: "language-toggle" }),

  // // Locator for the logo (to reset the app)
  // logo: (page) => page.getByRole("button", { name: "logo" }),

  // Locator for the drawers
  // drawer: (page) => page.getByTestId("filter-drawer"),
};
