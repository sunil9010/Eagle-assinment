import Home from "././Components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RaceTrack from "./Components/RaceTrack";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RaceTrack" element={<RaceTrack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
