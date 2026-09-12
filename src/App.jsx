import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================================
// PUBLIC PAGES
// =========================================================

import Landing from "./Pages/Landing/Landing";

import Register from "./Pages/Auth/Register/Register";

import Login from "./Pages/Auth/Login/Login";

import AboutUs from "./Pages/AboutUs/AboutUs";

import ContactUs from "./Pages/ContactUs/ContactUs";

// =========================================================
// APPLICATION ROUTES
// =========================================================

import LearnerRoutes from "./routes/LearnerRoutes";

import TrainerRoutes from "./routes/TrainerRoutes";

import AdminRoutes from "./routes/AdminRoutes";

// =========================================================
// ERROR PAGE
// =========================================================

import NotFound from "./Pages/Errors/NotFound/NotFound";

// =========================================================
// APP
// =========================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================================
            PUBLIC PAGES
        ================================================= */}

        {/* -------------------------------------------------
            LANDING
        ------------------------------------------------- */}

        <Route path="/" element={<Landing />} />

        {/* -------------------------------------------------
            ABOUT US
        ------------------------------------------------- */}

        <Route path="/about-us" element={<AboutUs />} />

        {/* -------------------------------------------------
            CONTACT US
        ------------------------------------------------- */}

        <Route path="/contact-us" element={<ContactUs />} />

        {/* -------------------------------------------------
            LOGIN
        ------------------------------------------------- */}

        <Route
          path="/login"
          element={
            <>
              <Landing />
              <Login />
            </>
          }
        />

        {/* -------------------------------------------------
            REGISTER
        ------------------------------------------------- */}

        <Route
          path="/register"
          element={
            <>
              <Landing />
              <Register />
            </>
          }
        />

        {/* =================================================
            LEARNER APPLICATION
        ================================================= */}

        <Route path="/learner/*" element={<LearnerRoutes />} />

        {/* =================================================
            TRAINER APPLICATION
        ================================================= */}

        <Route path="/trainer/*" element={<TrainerRoutes />} />

        {/* =================================================
            ADMIN APPLICATION
        ================================================= */}

        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* =================================================
            GLOBAL 404
        ================================================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
