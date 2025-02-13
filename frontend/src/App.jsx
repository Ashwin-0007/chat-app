import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./component/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
