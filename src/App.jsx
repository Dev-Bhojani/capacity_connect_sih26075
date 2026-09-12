import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================================
// PUBLIC PAGES
// =========================================================

import Landing from "./Pages/Landing/Landing";

import Register from "./Pages/Auth/Register/Register";

import Login from "./Pages/Auth/Login/Login";

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
