import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================================
// PUBLIC PAGES
// ================================
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";

// ================================
// LEARNER ROUTES
// ================================
import LearnerRoutes from "./routes/LearnerRoutes";

// ================================
// TRAINER ROUTES
// ================================
import TrainerRoutes from "./routes/TrainerRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================
            PUBLIC PAGES
        ======================================== */}

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <>
              <Landing />
              <Login />
            </>
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            <>
              <Landing />
              <Register />
            </>
          }
        />

        {/* ========================================
            LEARNER APPLICATION
        ======================================== */}

        {/*
          All learner routes are handled
          inside LearnerRoutes.jsx

          Examples:
          /learner
          /learner/dashboard
          /learner/learning
          /learner/courses
          /learner/skills
          /learner/skill-gaps
          /learner/recommendations
          /learner/certificates
          /learner/knowledge-hub
          /learner/profile
          /learner/settings
        */}
        <Route path="/learner/*" element={<LearnerRoutes />} />

        {/* ========================================
            TRAINER APPLICATION
        ======================================== */}

        {/*
          All trainer routes are handled
          inside TrainerRoutes.jsx

          Examples:
          /trainer
          /trainer/trainer-learners
          /trainer/trainer-courses
          /trainer/trainer-quizzes
          /trainer/trainer-assignments
          /trainer/trainer-attendance
          /trainer/trainer-performance
          /trainer/trainer-schedule
          /trainer/trainer-notifications
          /trainer/trainer-profile
        */}
        <Route path="/trainer/*" element={<TrainerRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
