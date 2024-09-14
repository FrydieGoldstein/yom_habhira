import { render, fireEvent } from "@testing-library/react";
import MainScreen from "../MainScreen";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEventFilters } from "../../hooks/useEventFilters";
import "@testing-library/jest-dom";
import React from "react";

// Mocking contexts
jest.mock("../../contexts/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("../../hooks/useEventFilters", () => ({
  useEventFilters: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks(); // Reset mocks before each test
});

test("renders MainScreen with correct toggle text based on initial list view", () => {
  // Mocking the language and filters
  useLanguage.mockReturnValue({ language: "en", translations: { list: "List", map: "Map" } });
  useEventFilters.mockReturnValue({});

  const mockEvents = [{ id: "68qWSnD8ac9lV1XS9IZg" }, { id: "abc123" }];

  const { getByRole } = render(<MainScreen events={mockEvents} />);

  const toggleButton = getByRole("button", { name: /map/i });
  expect(toggleButton).toBeInTheDocument();
  expect(toggleButton).toHaveTextContent("Map");

  fireEvent.click(toggleButton);

  expect(toggleButton).toHaveTextContent("List");
});
