import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppBarDesktop from "../AppBarDesktop";
import { LanguageProvider } from "../../../contexts/LanguageContext";

test("AppBarDesktop updates button texts after language toggle", () => {
  const { getByRole } = render(
    <LanguageProvider>
      <AppBarDesktop />
    </LanguageProvider>,
  );
  const topicsButton = getByRole("button", { name: /נושאי שיחה/i });
  expect(topicsButton).toBeInTheDocument();
  expect(topicsButton).toHaveTextContent("נושאי שיחה");

  const languageToggleButton = getByRole("button", { name: /language-toggle/i });
  fireEvent.click(languageToggleButton);

  expect(topicsButton).toHaveTextContent("Topics");
});
