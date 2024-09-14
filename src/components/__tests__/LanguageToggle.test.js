import { render, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "../../contexts/LanguageContext";

import React from "react";
import "@testing-library/jest-dom";

// jest.doMock("../../assets/gb-flag.png", () => "mocked-gb-flag");
// jest.doMock("../../assets/il-flag.png", () => "mocked-il-flag");
import LanguageToggle from "../../components/LanguageToggle";
beforeEach(() => {
  jest.resetAllMocks();
});

test("toggles language when clicked", () => {
  const { getByRole, getByAltText } = render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>,
  );

  const toggleButton = getByRole("button", { name: /language-toggle/i });
  // console.log("toggleButton.querySelector('img'): ", toggleButton.querySelector("img"));
  // console.log("toggleButton.querySelector('img').getAttribute('src')): ", toggleButton.querySelector("img").getAttribute("src"));
  // console.log("toggleButton.querySelector('img').getAttribute('alt')): ", toggleButton.querySelector("img").getAttribute("alt"));
  expect(getByAltText("language flag - english")).toBeInTheDocument();

  fireEvent.click(toggleButton);
  // console.log("toggleButton.querySelector('img'): ", toggleButton.querySelector("img"));
  // console.log("toggleButton.querySelector('img').getAttribute('src')): ", toggleButton.querySelector("img").getAttribute("src"));
  // console.log("toggleButton.querySelector('img').getAttribute('alt')): ", toggleButton.querySelector("img").getAttribute("alt"));
  expect(getByAltText("language flag - hebrew")).toBeInTheDocument();
});

// expect(toggleButton.querySelector("img").getAttribute("src")).toBe("gb-flag");
// expect(toggleButton.querySelector("img").getAttribute("src")).toBe("il-flag");
