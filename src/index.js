import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { EventProvider } from "./contexts/EventContext";
import { TagsProvider } from "./contexts/TagsContext";
import { FilterProvider } from "./contexts/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <EventProvider>
        <TagsProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </TagsProvider>
      </EventProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
