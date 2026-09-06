import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Normal Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Landing + Login Overlay */}
        <Route
          path="/login"
          element={
            <>
              <Landing />
              <Login />
            </>
          }
        />

        {/* Landing + Register Overlay */}
        <Route
          path="/register"
          element={
            <>
              <Landing />
              <Register />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;