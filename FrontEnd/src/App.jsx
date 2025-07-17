import "./App.css"
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Landing from "./Components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {

  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<PrivateRoute>
            <Landing />
          </PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
