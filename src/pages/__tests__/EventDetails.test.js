import { render, fireEvent } from "@testing-library/react";
import EventDetails from "../EventDetails";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { EventContext } from "../../contexts/EventContext";
import "@testing-library/jest-dom";
import { Description } from "@mui/icons-material";

// Mocking react-router's useParams to return the correct event id
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1", // זה ה-id של האירוע שנמצא במערך mockEvents
  }),
}));

// Mocking event data
const mockEvents = [
  {
    id: "1",
    address: {
      street: { hebrew: "רחוב התמר", english: "Tamar Street" },
      number: 10,
      city: { hebrew: "תל אביב", english: "Tel Aviv" },
    },
    startTime: "2024-09-12T18:00:00",
    lecturer: {
      name: { hebrew: "יונתן כהן", english: "Jonathan Cohen" },
    },
    title: { hebrew: "הרצאה על תולדות ישראל", english: "Lecture on the history" },
    description: { hebrew: "הרצאה מרתקת על תולדות ישראל", english: "A fascinating lecture on the history" },
    tags: [{ id: "1", title: { hebrew: "היסטוריה", english: "History" } }],
  },
];

test("updates address text based on language change", () => {
  const { getByText, getByRole } = render(
    <LanguageProvider>
      <EventContext.Provider value={{ events: mockEvents }}>
        <EventDetails />
      </EventContext.Provider>
    </LanguageProvider>,
  );

  expect(getByText("רחוב התמר 10, תל אביב")).toBeInTheDocument();

  const languageToggleButton = getByRole("button", { name: /language-toggle/i });
  fireEvent.click(languageToggleButton);

  expect(getByText("Tamar Street 10, Tel Aviv")).toBeInTheDocument();
});
