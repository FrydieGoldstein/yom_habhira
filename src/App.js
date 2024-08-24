import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
