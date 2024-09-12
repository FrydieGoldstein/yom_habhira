import { render, screen, fireEvent } from "@testing-library/react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { EventContext } from "../../../contexts/EventContext";
import TimeAndAddress from "../TimeAndAddress";
import "@testing-library/jest-dom";

// Mocking useLanguage hook
jest.mock("../../../contexts/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mocking event data
const mockEvent = {
  id: 1,
  startTime: "2023-09-15T18:30:00",
  address: {
    street: {
      hebrew: "רחוב דיזנגוף",
      english: "Dizengoff Street",
    },
    number: 123,
    city: {
      hebrew: "תל אביב",
      english: "Tel Aviv",
    },
  },
};

const renderTimeAndAddress = (language) => {
  useLanguage.mockReturnValue({
    lang: language === "he" ? "hebrew" : "english",
    language,
    translations: {},
    toggleLanguage: jest.fn(),
  });

  return render(
    <EventContext.Provider value={{ events: [mockEvent] }}>
      <TimeAndAddress eventId={1} />
    </EventContext.Provider>,
  );
};

test("displays address in Hebrew and then changes to English dynamically", () => {
  renderTimeAndAddress("he");

  expect(screen.getByText("רחוב דיזנגוף 123, תל אביב")).toBeInTheDocument();

  renderTimeAndAddress("en");

  expect(screen.getByText("Dizengoff Street 123, Tel Aviv")).toBeInTheDocument();
});
