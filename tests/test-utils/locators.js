// locators.js

export const locators = {
  // Locator for the search input field
  searchBox: (page) => page.getByTestId("search-box"),
  searchInput: (page) => page.getByTestId("search-input"),

  // Locartoes for the filter button and drawer
  filterButton: (page, filter) => page.getByTestId(`${filter}-filter-button`),
  filterDrawer: (page, filter) => page.getByTestId(`${filter}-filter-drawer`),

  selectionButton: (page, filter, item) => page.getByTestId(`${filter}-button-${item}`),

  closeButton: (page) => page.locator("_react=IconButton >> _react=CloseIcon"),
  // closeButton: (page) => page.getByTestId("close-button"),
  clearButton: (page) => page.getByTestId("clear-button"),
  // clearButton: (page) => page.locator("_react=ButtonBase").filter({ has: page.locator('[onClick="onClear"]') }),
  applyButton: (page) => page.getByTestId("apply-button"),
  // applyButton: (page) => page.locator("_react=Button").filter({ has: page.locator('[onClick*="onApply"]') }),
  checkbox: (page, item) => page.getByTestId(`checkbox-${item}`),
  // button: (page, filter, item) => page.getByTestId(`${filter}-button-${item}`),
  // // Locator for the map toggle button
  // mapToggleButton: (page, translations) => page.getByRole("button", { name: "map toggle" }),

  // Locator for the event cards
  eventCards: (page) => page.getByLabel("event card"),

  // // Locator for the map pins (markers)
  // mapPins: (page) => page.locator('[title="map-pin"]'),

  // Locator for the language toggle button
  languageToggleButton: (page) => page.getByRole("button", { name: "language-toggle" }),

  // // Locator for the logo (to reset the app)
  // logo: (page) => page.getByRole("button", { name: "logo" }),

  // Locator for the drawers
  // drawer: (page) => page.getByTestId("filter-drawer"),
};
