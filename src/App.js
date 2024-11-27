import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import EventDetails from "./pages/EventDetails";
import EventsForm from "./pages/EventsForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/form" element={<EventsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
