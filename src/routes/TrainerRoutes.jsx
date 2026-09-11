import React from "react";
import { Routes, Route } from "react-router-dom";

// Trainer Layout
import TrainerLayout from "../Layouts/TrainerLayout/TrainerLayout";
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard/TrainerDashboard"

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrainerLayout />}>
        {/* Trainer Dashboard */}
        <Route index element={<TrainerDashboard />} />

        {/* Trainer Learners */}
        <Route path="trainer-learners" element={<div>Trainer Learners</div>} />

        {/* Trainer Courses */}
        <Route path="trainer-courses" element={<div>Trainer Courses</div>} />

        {/* Trainer Quizzes */}
        <Route path="trainer-quizzes" element={<div>Trainer Quizzes</div>} />

        {/* Trainer Assignments */}
        <Route
          path="trainer-assignments"
          element={<div>Trainer Assignments</div>}
        />

        {/* Trainer Attendance */}
        <Route
          path="trainer-attendance"
          element={<div>Trainer Attendance</div>}
        />

        {/* Trainer Performance */}
        <Route
          path="trainer-performance"
          element={<div>Trainer Performance</div>}
        />

        {/* Trainer Schedule */}
        <Route path="trainer-schedule" element={<div>Trainer Schedule</div>} />

        {/* Trainer Notifications */}
        <Route
          path="trainer-notifications"
          element={<div>Trainer Notifications</div>}
        />

        {/* Trainer Profile */}
        <Route path="trainer-profile" element={<div>Trainer Profile</div>} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
