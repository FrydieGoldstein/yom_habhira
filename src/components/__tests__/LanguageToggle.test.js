import { render, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import React from "react";

test("toggles language when clicked", () => {
  const { getByRole } = render(
    <LanguageProvider>
      <LanguageToggle />
    </LanguageProvider>,
  );

  const toggleButton = getByRole("button", { name: /language-toggle/i });

  expect(toggleButton.querySelector("img").getAttribute("src")).toContain("gb-flag.png");

  fireEvent.click(toggleButton);

  expect(toggleButton.querySelector("img").getAttribute("src")).toContain("il-flag.png");
});
